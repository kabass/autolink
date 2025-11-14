package com.autolink.api.service;

import com.autolink.api.dto.LoginRequest;
import com.autolink.api.dto.RegisterRequest;
import com.autolink.api.dto.SocialLoginRequest;
import com.autolink.api.dto.UserResponse;
import com.autolink.api.entity.User;
import com.autolink.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final KeycloakService keycloakService;

    public Optional<UserResponse> login(LoginRequest request) {
        // Authenticate with Keycloak first
        Optional<KeycloakService.KeycloakTokenResponse> keycloakResponse = 
            keycloakService.authenticate(request.getEmail(), request.getPassword());
        
        if (keycloakResponse.isEmpty()) {
            return Optional.empty();
        }
        
        // Get user from database
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            UserResponse response = mapToResponse(userOpt.get());
            // Include access token in response
            response.setAccessToken(keycloakResponse.get().getAccessToken());
            response.setRefreshToken(keycloakResponse.get().getRefreshToken());
            return Optional.of(response);
        }
        
        return Optional.empty();
    }
    
    public Optional<UserResponse> socialLogin(SocialLoginRequest request) {
        Optional<KeycloakService.KeycloakTokenResponse> tokenResponse =
            keycloakService.exchangeAuthorizationCode(request.getCode(), request.getRedirectUri());
        
        if (tokenResponse.isEmpty()) {
            return Optional.empty();
        }
        
        Optional<KeycloakService.KeycloakUserInfo> userInfo =
            keycloakService.getUserInfo(tokenResponse.get().getAccessToken());
        
        if (userInfo.isEmpty() || userInfo.get().getEmail() == null) {
            return Optional.empty();
        }
        
        User user = userRepository.findByEmail(userInfo.get().getEmail())
            .orElseGet(() -> createUserFromSocial(userInfo.get()));
        
        UserResponse response = mapToResponse(user);
        response.setAccessToken(tokenResponse.get().getAccessToken());
        response.setRefreshToken(tokenResponse.get().getRefreshToken());
        return Optional.of(response);
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create user in Keycloak first
        boolean keycloakCreated = keycloakService.createUser(
            request.getEmail(),
            request.getPassword(),
            request.getFirstName(),
            request.getLastName()
        );
        
        if (!keycloakCreated) {
            log.warn("Failed to create user in Keycloak, but continuing with database user creation");
        }

        // Create user in database
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        // Passwords are managed exclusively in Keycloak
        user.setPassword(null);
        user.setPhone(request.getPhone());
        user.setRole(request.getRole() != null ? request.getRole() : User.UserRole.BUYER);
        user.setCity(request.getCity());

        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    public Optional<UserResponse> getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::mapToResponse);
    }

    public Optional<UserResponse> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::mapToResponse);
    }

    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setAvatar(user.getAvatar());
        response.setRole(user.getRole());
        response.setIsVerified(user.getIsVerified());
        response.setCity(user.getCity());
        response.setBirthDate(user.getBirthDate());
        response.setGender(user.getGender());
        response.setCreatedAt(user.getCreatedAt());

        // Calculer les permissions
        response.setCanSell(user.getRole() == User.UserRole.SELLER || user.getRole() == User.UserRole.SUPERVISOR);
        response.setCanBuy(true);
        response.setCanRent(true);
        response.setCanSupervise(user.getRole() == User.UserRole.SUPERVISOR);
        response.setCanManageUsers(user.getRole() == User.UserRole.SUPERVISOR);

        return response;
    }
    
    private User createUserFromSocial(KeycloakService.KeycloakUserInfo userInfo) {
        User user = new User();
        user.setFirstName(Optional.ofNullable(userInfo.getGivenName())
            .orElseGet(() -> extractNamePart(userInfo.getPreferredUsername(), true)));
        user.setLastName(Optional.ofNullable(userInfo.getFamilyName())
            .orElseGet(() -> extractNamePart(userInfo.getPreferredUsername(), false)));
        user.setEmail(userInfo.getEmail());
        user.setPhone(Optional.ofNullable(userInfo.getPhoneNumber()).orElse(""));
        user.setRole(User.UserRole.BUYER);
        user.setCity(null);
        user.setIsVerified(userInfo.getEmailVerified() != null ? userInfo.getEmailVerified() : Boolean.TRUE);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
    
    private String extractNamePart(String value, boolean firstName) {
        if (value == null || value.isBlank()) {
            return firstName ? "AutoLink" : "User";
        }
        if (!value.contains("@")) {
            return value;
        }
        String username = value.substring(0, value.indexOf('@'));
        if (!username.contains(".") && !username.contains("_")) {
            return username;
        }
        String[] parts = username.split("[._]");
        if (parts.length == 0) {
            return username;
        }
        return firstName ? parts[0] : parts[parts.length - 1];
    }
}

