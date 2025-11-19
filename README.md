# SmartFramework MCP

MCP Server for SmartComponent Library/SmartFramework development tasks.

## Notes

https://learn.microsoft.com/en-us/dotnet/ai/quickstarts/build-mcp-server

```
dotnet new install Microsoft.Extensions.AI.Templates
```

```
dotnet new mcpserver -n smartframeworkmcpserver
```

```
dotnet run --project smartframeworkmcpserver
```

## Sample MCP Server configuration

### Precompiled

```json
{
    "mcpServers": {
        "smartframeworkmcp": {
            "command": "C:\\Work_STREAM\\SmartComponentLibrary\\smartframeworkmcp\\smartframeworkmcpserver\\bin\\Debug\\net8.0\\smartframeworkmcpserver.exe",
            "args": [
                "--pasoeUrl",
                "https://sfrbo.consultingwerkcloud.com:8821/apsv"
            ],
            "disabledTools": [],
            "disabled": false
        }
    },
}
```

### Compiled on the fly

```json
{
    "mcpServers": {
        "smartframeworkmcp": {
            "command": "dotnet",
            "args": [
                "run",
                "--project",
                "smartframeworkmcpserver",
                "--pasoeUrl",
                "https://sfrbo.consultingwerkcloud.com:8821/apsv"
            ],
            "disabledTools": [],
            "disabled": false
        }
    },
}
```

## Sports2000 MCP Server Web

The `sports2000mcpserverweb` project provides a web-based MCP server implementation using ASP.NET Core with HTTP transport. This server supports OAuth2 authentication via Keycloak and provides tools for interacting with Sports2000 customer data.

### Running the Web Server

#### Development

```bash
dotnet run --project sports2000mcpserverweb
```

The server will start on `http://localhost:5118` by default (configurable in `Properties/launchSettings.json`).

#### Production

```bash
dotnet publish -c Release -o ./publish
dotnet ./publish/sports2000mcpserverweb.dll
```

### Configuration

The web server uses .NET's configuration system, supporting both `appsettings.json` and environment variables.

#### Environment Variables

The following environment variables can be set:

- `SMARTFRAMEWORKMCP_PASOE_URL`: PASOE server URL (default: `https://sfrbo.consultingwerkcloud.com:8821/apsv`)
- `SMARTFRAMEWORKMCP_AUTH_KEY`: Authentication key for PASOE communication

OAuth2 configuration is managed through the `SmartMcpOAuth2` configuration section. See the [Consultingwerk.SmartMCPAuthentication docdumentation](Consultingwerk.SmartMCPAuthentication/README.md) for detailed OAuth2 configuration instructions.

#### appsettings.json Example

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

### OAuth2 Authentication

The web server supports OAuth2 authentication via Keycloak. When enabled, most MCP requests require a valid JWT token in the `Authorization: Bearer <token>` header.

**Important**: The following endpoints are publicly accessible (no authentication required):
- `initialize` request (for OAuth2 discovery)
- `/.well-known/*` endpoints (OAuth2/OIDC metadata)

For detailed setup instructions, including Keycloak configuration, see the [Keycloak Setup Guide](Consultingwerk.SmartMCPAuthentication/README.md).

### Connecting with MCP Clients

#### Using mcp-remote

```bash
npx mcp-remote http://localhost:5118
```

The client will automatically:
1. Detect OAuth2 authentication requirements
2. Open a browser for user authentication (if OAuth2 is enabled)
3. Complete the OAuth2 flow
4. Store and use the access token for subsequent requests

#### Using Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
    "mcpServers": {
        "sports2000": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-remote",
                "http://localhost:5118"
            ]
        }
    }
}
```

### Available Tools

The server provides the following tools (via `Sports2000CustomerTools`):

- `GetCustomerDetails`: Returns customer details based on customer number or name
- `OpenCustomerForm`: Opens a customer form in the browser web application
- `QueryCustomers`: Queries customers using OpenEdge ABL query strings
- `UpdateCustomerDetails`: Updates customer record fields

### Discovery Endpoints

The server exposes standard OAuth2/OIDC discovery endpoints:

- `GET /.well-known/oauth-protected-resource` (RFC 8707)
- `GET /.well-known/oauth-authorization-server` (RFC 8414)
- `GET /.well-known/openid-configuration` (OpenID Connect Discovery)

These endpoints provide metadata about the OAuth2 configuration and are publicly accessible.