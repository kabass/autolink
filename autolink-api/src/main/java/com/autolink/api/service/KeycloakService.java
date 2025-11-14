package com.autolink.api.service;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import jakarta.ws.rs.core.Response;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeycloakService {
    
    @Value("${keycloak.server-url}")
    private String serverUrl;
    
    @Value("${keycloak.realm}")
    private String realm;
    
    @Value("${keycloak.client-id}")
    private String clientId;
    
    @Value("${keycloak.client-secret}")
    private String clientSecret;
    
    @Value("${keycloak.admin-username}")
    private String adminUsername;
    
    @Value("${keycloak.admin-password}")
    private String adminPassword;
    
    private final RestTemplate restTemplate;
    
    /**
     * Authenticate user using Direct Access Grants (Resource Owner Password Credentials)
     * This allows authentication without showing Keycloak UI
     */
    public Optional<KeycloakTokenResponse> authenticate(String email, String password) {
        try {
            String tokenUrl = String.format("%s/realms/%s/protocol/openid-connect/token", serverUrl, realm);
            
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "password");
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("username", email);
            params.add("password", password);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            
            ResponseEntity<KeycloakTokenResponse> response = restTemplate.postForEntity(
                tokenUrl, request, KeycloakTokenResponse.class
            );
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return Optional.of(response.getBody());
            }
            
            return Optional.empty();
        } catch (HttpClientErrorException e) {
            log.warn("Keycloak authentication failed for user: {}", email);
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error authenticating with Keycloak", e);
            return Optional.empty();
        }
    }
    
    /**
     * Exchange an authorization code (from social login) for tokens
     */
    public Optional<KeycloakTokenResponse> exchangeAuthorizationCode(String code, String redirectUri) {
        try {
            String tokenUrl = String.format("%s/realms/%s/protocol/openid-connect/token", serverUrl, realm);
            
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("code", code);
            params.add("redirect_uri", redirectUri);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            
            ResponseEntity<KeycloakTokenResponse> response = restTemplate.postForEntity(
                tokenUrl, request, KeycloakTokenResponse.class
            );
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return Optional.of(response.getBody());
            }
            
            return Optional.empty();
        } catch (HttpClientErrorException e) {
            log.warn("Keycloak code exchange failed: {}", e.getStatusCode());
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error exchanging authorization code with Keycloak", e);
            return Optional.empty();
        }
    }
    
    /**
     * Fetch user info from Keycloak's userinfo endpoint
     */
    public Optional<KeycloakUserInfo> getUserInfo(String accessToken) {
        try {
            String userInfoUrl = String.format("%s/realms/%s/protocol/openid-connect/userinfo", serverUrl, realm);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<Void> request = new HttpEntity<>(headers);
            
            ResponseEntity<KeycloakUserInfo> response = restTemplate.exchange(
                userInfoUrl, HttpMethod.GET, request, KeycloakUserInfo.class
            );
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return Optional.of(response.getBody());
            }
            
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error fetching user info from Keycloak", e);
            return Optional.empty();
        }
    }
    
    /**
     * Create a new user in Keycloak
     */
    public boolean createUser(String email, String password, String firstName, String lastName) {
        try {
            Keycloak keycloak = getAdminKeycloak();
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersResource = realmResource.users();
            
            UserRepresentation user = new UserRepresentation();
            user.setEnabled(true);
            user.setUsername(email);
            user.setEmail(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmailVerified(true);
            
            Response response = usersResource.create(user);
            
            if (response.getStatus() == 201) {
                String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
                
                // Set password
                CredentialRepresentation credential = new CredentialRepresentation();
                credential.setType(CredentialRepresentation.PASSWORD);
                credential.setValue(password);
                credential.setTemporary(false);
                
                usersResource.get(userId).resetPassword(credential);
                
                log.info("User created in Keycloak: {}", email);
                return true;
            } else {
                log.warn("Failed to create user in Keycloak. Status: {}", response.getStatus());
                return false;
            }
        } catch (Exception e) {
            log.error("Error creating user in Keycloak", e);
            return false;
        }
    }
    
    /**
     * Check if user exists in Keycloak
     */
    public boolean userExists(String email) {
        try {
            Keycloak keycloak = getAdminKeycloak();
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersResource = realmResource.users();
            
            return usersResource.search(email, true).stream()
                .anyMatch(user -> email.equals(user.getEmail()));
        } catch (Exception e) {
            log.error("Error checking user existence in Keycloak", e);
            return false;
        }
    }
    
    /**
     * Get admin Keycloak client for user management
     */
    private Keycloak getAdminKeycloak() {
        return KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm("master")
            .username(adminUsername)
            .password(adminPassword)
            .clientId("admin-cli")
            .build();
    }
    
    /**
     * Validate access token
     */
    public boolean validateToken(String token) {
        try {
            String introspectUrl = String.format("%s/realms/%s/protocol/openid-connect/token/introspect", serverUrl, realm);
            
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("token", token);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                introspectUrl,
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                Boolean active = (Boolean) body.get("active");
                return active != null && active;
            }
            
            return false;
        } catch (Exception e) {
            log.error("Error validating token", e);
            return false;
        }
    }
    
    /**
     * Token response from Keycloak
     */
    public static class KeycloakTokenResponse {
        private String access_token;
        private String refresh_token;
        private String token_type;
        private int expires_in;
        private int refresh_expires_in;
        
        public String getAccessToken() {
            return access_token;
        }
        
        public void setAccess_token(String access_token) {
            this.access_token = access_token;
        }
        
        public String getRefreshToken() {
            return refresh_token;
        }
        
        public void setRefresh_token(String refresh_token) {
            this.refresh_token = refresh_token;
        }
        
        public String getTokenType() {
            return token_type;
        }
        
        public void setToken_type(String token_type) {
            this.token_type = token_type;
        }
        
        public int getExpiresIn() {
            return expires_in;
        }
        
        public void setExpires_in(int expires_in) {
            this.expires_in = expires_in;
        }
        
        public int getRefreshExpiresIn() {
            return refresh_expires_in;
        }
        
        public void setRefresh_expires_in(int refresh_expires_in) {
            this.refresh_expires_in = refresh_expires_in;
        }
    }
    
    /**
     * User info response from Keycloak
     */
    @Data
    public static class KeycloakUserInfo {
        private String sub;
        private String email;
        @JsonProperty("email_verified")
        private Boolean emailVerified;
        @JsonProperty("given_name")
        private String givenName;
        @JsonProperty("family_name")
        private String familyName;
        @JsonProperty("preferred_username")
        private String preferredUsername;
        @JsonProperty("phone_number")
        private String phoneNumber;
        private String locale;
    }
}

