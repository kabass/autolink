# Keycloak Setup Guide

This guide explains how to set up Keycloak for authentication in the AutoLink API.

## Overview

Keycloak is used as the authentication provider in the background. Users authenticate through the custom login form (they don't see Keycloak's UI), and the application uses Keycloak's Direct Access Grants API to authenticate users.

## Prerequisites

- Docker and Docker Compose installed
- Keycloak will run on port 9090

## Step 1: Start Keycloak

Start Keycloak using Docker Compose:

```bash
cd autolink-api
docker-compose up -d keycloak
```

Wait for Keycloak to be ready (it may take 1-2 minutes). You can check the logs:

```bash
docker-compose logs -f keycloak
```

## Step 2: Access Keycloak Admin Console

1. Open your browser and go to: `http://localhost:9090`
2. Click on "Administration Console"
3. Login with:
   - Username: `admin`
   - Password: `admin`

## Step 3: Create a Realm

1. In the top-left corner, hover over "Master" realm
2. Click "Create Realm"
3. Enter realm name: `autolink`
4. Click "Create"

## Step 4: Create a Client

1. In the left sidebar, click "Clients"
2. Click "Create client"
3. Configure:
   - **Client type**: OpenID Connect
   - **Client ID**: `autolink-api`
   - Click "Next"
4. On the Capability config page:
   - Enable "Client authentication" (this enables client secret)
   - Enable "Direct access grants" (this allows password-based authentication)
   - Click "Next"
5. On the Login settings page:
   - Leave defaults
   - Click "Save"
6. After saving, go to the "Credentials" tab
7. Copy the "Client secret" value
8. Update `application.properties` with the client secret:
   ```properties
   keycloak.client-secret=YOUR_CLIENT_SECRET_HERE
   ```

## Step 5: Configure Direct Access Grants

1. Go to "Clients" → `autolink-api`
2. Go to the "Settings" tab
3. Ensure "Direct access grants" is enabled (should already be enabled)
4. Under "Advanced settings":
   - **Access Token Lifespan**: 5 Minutes (or as needed)
   - **Refresh Token Lifespan**: 30 Minutes (or as needed)
5. Click "Save"

## Step 6: Create Test Users (Optional)

If you want to create users manually in Keycloak:

1. Go to "Users" in the left sidebar
2. Click "Create new user"
3. Fill in:
   - **Username**: user email (e.g., `jean.dupont@email.com`)
   - **Email**: user email
   - **First name**: User's first name
   - **Last name**: User's last name
   - Enable "Email verified"
4. Click "Create"
5. Go to the "Credentials" tab
6. Click "Set password"
7. Enter password and disable "Temporary"
8. Click "Save"

**Note**: The application will automatically create users in Keycloak when they register through the API.

## Step 7: Verify Configuration

Check that your `application.properties` has the correct values:

```properties
keycloak.server-url=http://localhost:9090
keycloak.realm=autolink
keycloak.client-id=autolink-api
keycloak.client-secret=YOUR_CLIENT_SECRET_HERE
keycloak.admin-username=admin
keycloak.admin-password=admin
```

## How It Works

1. **Login**: When a user logs in through your custom login form, the API calls Keycloak's Direct Access Grants endpoint with the username and password.
2. **Authentication**: Keycloak validates the credentials and returns an access token and refresh token.
3. **Response**: The API returns the tokens along with user information to the frontend.
4. **Registration**: When a new user registers, the API creates the user in both the database and Keycloak.

## Testing

1. Start the application
2. Try to login with test credentials (e.g., `jean.dupont@email.com` / `password`)
3. The login should succeed and return an access token

## Troubleshooting

### Keycloak not accessible
- Check if Keycloak is running: `docker ps`
- Check logs: `docker-compose logs keycloak`
- Verify port 9090 is not in use

### Authentication fails
- Verify the client secret is correct in `application.properties`
- Check that "Direct access grants" is enabled for the client
- Verify the realm name matches (`autolink`)
- Check Keycloak logs for errors

### User creation fails
- Verify admin credentials are correct
- Check that the admin user has permissions to create users
- Ensure the realm exists

## Production Considerations

For production:

1. **Change default passwords**: Update Keycloak admin password
2. **Use HTTPS**: Configure Keycloak with SSL/TLS
3. **Secure client secret**: Store client secret in environment variables or secrets manager
4. **Token expiration**: Adjust token lifespans based on security requirements
5. **Database**: Use a dedicated database for Keycloak (already configured in docker-compose.yml)
6. **Backup**: Set up regular backups of Keycloak data

## Environment Variables

You can override Keycloak settings using environment variables:

```bash
export KEYCLOAK_SERVER_URL=http://localhost:9090
export KEYCLOAK_REALM=autolink
export KEYCLOAK_CLIENT_ID=autolink-api
export KEYCLOAK_CLIENT_SECRET=your-secret
export KEYCLOAK_ADMIN_USERNAME=admin
export KEYCLOAK_ADMIN_PASSWORD=admin
```

