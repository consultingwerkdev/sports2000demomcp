# Keycloak Setup Guide for MCP OAuth2 Authentication

This guide provides step-by-step instructions for configuring Keycloak to work with the SmartMcpAuthentication library.

## Prerequisites

- Keycloak server installed and running
- Access to Keycloak Admin Console
- Basic understanding of OAuth2/OpenID Connect

## Step 1: Create a Realm

1. Log in to the Keycloak Admin Console
2. Click on the realm dropdown in the top-left corner
3. Click **"Create Realm"**
4. Enter a realm name (e.g., `sfrbo`)
5. Click **"Create"**

## Step 2: Create a Client

1. In your realm, navigate to **Clients** in the left sidebar
2. Click **"Create client"**
3. Fill in the following:
   - **Client type**: `OpenID Connect`
   - **Client ID**: `sports2000mcpserver` (or your preferred client ID)
   - Click **"Next"**

4. Configure client settings:
   - **Client authentication**: `On` (for confidential clients) or `Off` (for public clients)
   - **Authorization**: `Off` (unless you need fine-grained authorization)
   - **Authentication flow**: `Standard flow`
   - Click **"Next"**

5. Configure login settings:
   - **Root URL**: Leave empty or set to your MCP server base URL
   - **Home URL**: Leave empty
   - **Valid redirect URIs**: Configure based on your client application's needs (e.g., for `mcp-remote` the client handles OAuth2 flow)
   - **Valid post logout redirect URIs**: Leave empty
   - **Web origins**: Add your MCP server origin (e.g., `http://localhost:5118`)
   - Click **"Save"**

## Step 3: Configure Client Credentials

1. After creating the client, go to the **Credentials** tab
2. If you enabled client authentication, note the **Client secret** (you'll need this for configuration)
3. If you're using a public client, no secret is needed

## Step 4: Configure Users (Optional)

If you need user authentication:

1. Navigate to **Users** in the left sidebar
2. Click **"Create new user"**
3. Fill in user details:
   - **Username**: Choose a username
   - **Email**: User's email address
   - **Email verified**: Toggle on if verified
   - Click **"Create"**
4. Go to the **Credentials** tab for the user
5. Set a temporary password and toggle **"Temporary"** off
6. Click **"Set password"**

## Step 5: Configure OAuth2 Settings

The SmartMcpAuthentication library uses .NET's configuration system, which supports multiple sources including `appsettings.json` and environment variables.

### Option A: Using appsettings.json

Add the following section to your `appsettings.json`:

```json
{
  "SmartMcpOAuth2": {
    "Enabled": true,
    "AuthorizationEndpoint": "https://marbles.consultingwerkcloud.com:8443/realms/sfrbo/protocol/openid-connect/auth",
    "TokenEndpoint": "https://marbles.consultingwerkcloud.com:8443/realms/sfrbo/protocol/openid-connect/token",
    "ClientId": "sports2000mcpserver",
    "Scopes": [ "openid" ],
    "JwksUri": "https://marbles.consultingwerkcloud.com:8443/realms/sfrbo/protocol/openid-connect/certs",
    "Issuer": "https://marbles.consultingwerkcloud.com:8443/realms/sfrbo",
    "Audience": "sports2000mcpserver"
  }
}
```

### Option B: Using Environment Variables

Set the following environment variables (using the nested configuration format):

```bash
# Enable OAuth2 authentication
SmartMcpOAuth2__Enabled=true

# Keycloak endpoints (replace with your Keycloak server URL and realm name)
SmartMcpOAuth2__AuthorizationEndpoint=https://marbles.consultingwerkcloud.com:8443/realms/sfrbo/protocol/openid-connect/auth
SmartMcpOAuth2__TokenEndpoint=https://marbles.consultingwerkcloud.com:8443/realms/sfrbo/protocol/openid-connect/token
SmartMcpOAuth2__JwksUri=https://marbles.consultingwerkcloud.com:8443/realms/sfrbo/protocol/openid-connect/certs

# Client configuration
SmartMcpOAuth2__ClientId=sports2000mcpserver
SmartMcpOAuth2__ClientSecret=your-client-secret-here  # Only if using confidential client

# Scopes (comma-separated for environment variables)
SmartMcpOAuth2__Scopes=openid

# JWT validation settings
SmartMcpOAuth2__Issuer=https://marbles.consultingwerkcloud.com:8443/realms/sfrbo
SmartMcpOAuth2__Audience=sports2000mcpserver  # Optional, typically the same as Client ID
```

**Note**: The double underscore (`__`) in environment variable names represents nested configuration sections in .NET. Alternatively, you can use a colon (`:`) on non-Windows systems.

## Step 6: Testing the Configuration

1. Start your MCP server with the configuration set
2. Use `mcp-remote` to connect to your server:
   ```bash
   npx mcp-remote http://localhost:5118
   ```
3. `mcp-remote` should automatically:
   - Detect that authentication is required
   - Open a browser for user authentication
   - Complete the OAuth2 flow
   - Store the access token
   - Use the token for subsequent requests

## How OAuth2 Flow Works with MCP

When OAuth2 authentication is enabled, here's the complete flow:

### 1. Initial Discovery (No Authentication Required)
- The MCP client sends an `initialize` request to the server
- **Important**: The `initialize` request does NOT require authentication
- This allows the client to discover OAuth2 configuration without having a token yet
- This follows standard OAuth2 discovery patterns (similar to OpenID Connect's `.well-known` endpoints)

### 2. Server Response with OAuth2 Configuration
The server responds with OAuth2 configuration in the `initialize` response:
- Authorization endpoint URL
- Token endpoint URL  
- Client ID
- Required scopes
- Redirect URI

### 3. Client Initiates OAuth2 Flow
The client (e.g., `mcp-remote`) automatically:
- Opens a web browser to the authorization endpoint
- User authenticates with Keycloak
- User grants permissions to the client
- Keycloak redirects back with an authorization code
- Client exchanges the authorization code for an access token (JWT)

### 4. Authenticated Requests (Authentication Required)
All subsequent MCP requests **require** the JWT token:
- `list_tools` - requires authentication
- `tools/call` - requires authentication  
- All other MCP requests - require authentication

The JWT token must be sent in the `Authorization: Bearer <token>` header.

### 5. Token Propagation to Backend
The SmartMcpAuthentication library:
- Extracts and validates the JWT token from the request
- Stores it in the HTTP context for use by tool methods
- Tool methods can access it via `ISmartMcpAccessTokenProvider` (dependency injection)
- Tool methods can forward it to backend services using the `pcJwtToken` parameter

### Authentication Enforcement Summary
- **`initialize` request**: Allowed without authentication (for OAuth2 discovery)
- **`.well-known/*` endpoints**: Allowed without authentication (OAuth2/OIDC metadata)
- **All other requests**: Require valid JWT token, return HTTP 401 if missing/invalid

**Note**: The OAuth2 authorization flow (browser redirect, callback) is handled entirely by the MCP client (e.g., `mcp-remote`), not by this server. The server only provides discovery endpoints and validates JWT tokens.

### OAuth2 Discovery Endpoints

The MCP server provides standard OAuth2/OIDC discovery endpoints (RFC 8414, RFC 8707):

**`GET /.well-known/oauth-protected-resource`** (RFC 8707)
- Describes this MCP server as a protected resource
- Returns information about the authorization server (Keycloak)
- Example response:
```json
{
  "resource": "sports2000mcpserver",
  "authorization_servers": ["https://marbles.consultingwerkcloud.com:8443/realms/sfrbo"],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://modelcontextprotocol.io"
}
```

**`GET /.well-known/oauth-authorization-server`** (RFC 8414)
- Provides authorization server metadata
- Points to Keycloak's endpoints and configuration
- Example response includes:
  - `authorization_endpoint`
  - `token_endpoint`
  - `jwks_uri`
  - `scopes_supported`

**`GET /.well-known/openid-configuration`** (OpenID Connect Discovery)
- OpenID Connect Discovery metadata
- For compatibility with OIDC clients
- References Keycloak's full OIDC configuration

**Note**: Dynamic client registration is not supported by this library. Clients must be pre-configured in Keycloak. If dynamic registration is needed, clients should register directly with Keycloak's client registration endpoint.

### HTTP 401 Response Format

When authentication fails, the server returns:
- **HTTP Status**: 401 Unauthorized
- **Content-Type**: `application/problem+json` (RFC 7807 ProblemDetails)
- **WWW-Authenticate Header** (RFC 6750): 
  - For missing token: `Bearer realm="<issuer>", error="invalid_request"`
  - For invalid token: `Bearer realm="<issuer>", error="invalid_token", error_description="The access token is invalid or expired"`
- **JSON Body** (RFC 7807 ProblemDetails format):
```json
{
  "type": "https://tools.ietf.org/html/rfc6750#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Authentication required. Please provide a valid JWT token in the Authorization header.",
  "error": "invalid_request"
}
```

This follows the OAuth 2.0 Bearer Token Usage specification (RFC 6750) and RFC 7807 Problem Details.

## Troubleshooting

### Authentication Fails with 401

- Verify that `SmartMcpOAuth2__Enabled=true` (or `Enabled: true` in appsettings.json) is set
- Check that the JWT token is being sent in the `Authorization: Bearer <token>` header
- Verify that the token hasn't expired
- Check Keycloak logs for authentication errors
- Review application logs for detailed error messages (the library uses structured logging)

### Token Validation Fails

- Ensure `SmartMcpOAuth2__Issuer` matches exactly with the token's `iss` claim
- Verify that `SmartMcpOAuth2__JwksUri` is accessible and returns valid keys
- Check that the token signature is valid (the library validates this automatically via JWKS)
- **Note**: Audience validation is currently disabled by default. If you need strict audience validation, you may need to configure it in Keycloak to include the audience claim in tokens.

### Configuration Not Loading

- Verify the configuration section name is `SmartMcpOAuth2` (case-sensitive)
- Check that environment variables use double underscores (`__`) for nested properties
- Ensure `appsettings.json` is in the correct location and properly formatted JSON
- Review application startup logs for configuration loading messages

### Redirect URI Mismatch

- Ensure the redirect URI used by your MCP client exactly matches one of the Valid redirect URIs in Keycloak client configuration
- Check for trailing slashes or protocol mismatches (http vs https)
- Verify the redirect URI is configured in the Keycloak client settings

### Client Secret Issues

- If using a confidential client, ensure `SmartMcpOAuth2__ClientSecret` is set correctly
- If using a public client, ensure client authentication is disabled in Keycloak and don't set the secret
- Verify the client secret hasn't been regenerated in Keycloak (which would invalidate existing tokens)

## Additional Keycloak Configuration

### Token Lifespan

To adjust token expiration:

1. Go to **Realm settings** → **Tokens**
2. Adjust **Access Token Lifespan** (default: 5 minutes)
3. Adjust **SSO Session Idle** and **SSO Session Max** as needed

### Scopes and Roles

To add custom scopes or roles:

1. Navigate to **Client scopes** or **Roles** in the left sidebar
2. Create custom scopes/roles as needed
3. Assign them to clients or users
4. Include them in `SmartMcpOAuth2__Scopes` configuration if needed

### Audience Configuration (Optional)

If you need strict audience validation:

1. Navigate to your client in Keycloak
2. Go to **Client scopes** tab
3. Click on your client's dedicated scope (e.g., `sports2000mcpserver-dedicated`)
4. Click **Add mapper** → **Audience**
5. Configure:
   - **Name**: `audience-mapper`
   - **Included Client Audience**: Your client ID (e.g., `sports2000mcpserver`)
   - **Add to access token**: **On**
6. Click **Save**

This will ensure tokens include the `aud` claim with your client ID.

## Support for Other OAuth2 Providers

While this guide focuses on Keycloak, the SmartMcpAuthentication library is designed to work with any OAuth2 provider that supports:

- Authorization Code flow
- JWKS endpoint for token validation (RFC 7517)
- Standard JWT token format (RFC 7519)
- OpenID Connect Discovery (optional, but recommended)

To use a different provider, simply update the configuration with the appropriate endpoints and settings for your provider. The library will automatically:
- Fetch signing keys from the JWKS endpoint
- Validate token signatures
- Verify token expiration
- Check issuer claims
