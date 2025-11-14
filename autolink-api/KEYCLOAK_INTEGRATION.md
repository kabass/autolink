# Keycloak Integration Summary

## Overview

The AutoLink API now uses Keycloak as the authentication provider. Users authenticate through the custom login form (they don't see Keycloak's UI), and the application uses Keycloak's Direct Access Grants API in the background.

## What Changed

### 1. Dependencies Added
- `spring-boot-starter-oauth2-resource-server` - For OAuth2/JWT support
- `keycloak-admin-client` (v23.0.0) - For Keycloak user management

### 2. New Service
- **KeycloakService**: Handles authentication and user management with Keycloak
  - `authenticate()`: Authenticates users using Direct Access Grants
  - `createUser()`: Creates users in Keycloak
  - `userExists()`: Checks if user exists in Keycloak
  - `validateToken()`: Validates access tokens

### 3. Updated Services
- **UserService**: Now uses Keycloak for authentication
  - Login flow: Authenticates with Keycloak first, then returns user data with tokens
  - Registration: Creates user in both Keycloak and database

### 4. Updated DTOs
- **UserResponse**: Added `accessToken` and `refreshToken` fields

### 5. Configuration
- **SecurityConfig**: Added JWT decoder and RestTemplate bean
- **application.properties**: Added Keycloak configuration properties
- **docker-compose.yml**: Added Keycloak service

### 6. Data Initialization
- **DataInitializer**: Now syncs test users with Keycloak on startup

## Authentication Flow

### Login
1. User submits credentials through custom login form
2. API calls Keycloak's Direct Access Grants endpoint
3. Keycloak validates credentials and returns tokens
4. API returns user data + access token + refresh token to frontend

### Registration
1. User submits registration form
2. API creates user in Keycloak
3. API creates user in database
4. User can immediately login

## Configuration

Keycloak settings are configured in `application.properties`:

```properties
keycloak.server-url=http://localhost:9090
keycloak.realm=autolink
keycloak.client-id=autolink-api
keycloak.client-secret=your-client-secret
keycloak.admin-username=admin
keycloak.admin-password=admin
```

## Setup Steps

1. Start Keycloak: `docker-compose up -d keycloak`
2. Access admin console: `http://localhost:9090`
3. Create realm: `autolink`
4. Create client: `autolink-api` with Direct Access Grants enabled
5. Copy client secret to `application.properties`
6. Start the application

See `KEYCLOAK_SETUP.md` for detailed setup instructions.

## Benefits

- **Centralized Authentication**: All authentication handled by Keycloak
- **Token-based Security**: JWT tokens for stateless authentication
- **User Management**: Keycloak provides user management capabilities
- **Scalability**: Keycloak can handle multiple applications
- **Security**: Industry-standard OAuth2/OIDC implementation
- **No UI Change**: Users still see the custom login form

## API Response Changes

### Login Response
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  ...
}
```

The frontend should store these tokens and include the access token in subsequent API requests.

## Next Steps

1. Update frontend to store and use access tokens
2. Add token refresh logic in frontend
3. Protect API endpoints with token validation
4. Configure token expiration based on security requirements

