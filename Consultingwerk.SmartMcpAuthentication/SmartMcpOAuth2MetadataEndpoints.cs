using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Text.Json;

namespace Consultingwerk.SmartMcpAuthentication
{
    /// <summary>
    /// Provides OAuth2 metadata and discovery endpoints for the MCP server.
    /// </summary>
    public static class SmartMcpOAuth2MetadataEndpoints
    {
        private static readonly JsonSerializerOptions s_jsonOptions = new JsonSerializerOptions { WriteIndented = true };

        /// <summary>
        /// Maps OAuth2 discovery and metadata endpoints to the application.
        /// 
        /// These endpoints are publicly accessible and provide information about
        /// the OAuth2 configuration, following RFC 8414 (OAuth 2.0 Authorization Server Metadata).
        /// </summary>
        /// <param name="app">The application builder.</param>
        /// <returns>The application builder for chaining.</returns>
        public static IApplicationBuilder MapSmartMcpOAuth2Metadata(this IApplicationBuilder app)
        {
            var options = app.ApplicationServices.GetService(typeof(SmartMcpOAuth2Options)) as SmartMcpOAuth2Options;
            
            if (options == null || !options.Enabled)
            {
                return app;
            }

            // Use endpoint routing to map the metadata endpoints
            return app.UseEndpoints(endpoints =>
            {
                // RFC 8707: OAuth 2.0 Resource Server Metadata
                // This endpoint describes the protected resource (our MCP server)
                endpoints.MapGet(SmartMcpConstants.Endpoints.ProtectedResource, async context =>
                {
                    await ServeProtectedResourceMetadata(context, options);
                });

                // RFC 8414: OAuth 2.0 Authorization Server Metadata
                // Since we're not the authorization server (Keycloak is), we redirect/reference it
                endpoints.MapGet(SmartMcpConstants.Endpoints.AuthorizationServer, async context =>
                {
                    await ServeAuthorizationServerReference(context, options);
                });

                // OpenID Connect Discovery (optional, for compatibility)
                endpoints.MapGet(SmartMcpConstants.Endpoints.OpenIdConfiguration, async context =>
                {
                    await ServeOpenIDConfiguration(context, options);
                });
            });
        }

        /// <summary>
        /// Serves the protected resource metadata (RFC 8707).
        /// 
        /// This describes the MCP server as a protected resource and points to
        /// the authorization server (Keycloak) where clients can obtain tokens.
        /// </summary>
        private static async Task ServeProtectedResourceMetadata(HttpContext context, SmartMcpOAuth2Options options)
        {
            // RFC 8707: Resource Indicators for OAuth 2.0
            // This tells clients what resource/audience to request when obtaining tokens
            var metadata = new
            {
                resource = options.Audience,
                authorization_servers = new[] { options.Issuer },
                bearer_methods_supported = new[] { "header" },
                resource_documentation = "https://modelcontextprotocol.io",
                resource_signing_alg_values_supported = new[] { "RS256", "RS384", "RS512" },
                scopes_supported = options.Scopes,
                audience = options.Audience
            };

            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(metadata, s_jsonOptions));
        }

        /// <summary>
        /// Serves a reference to the authorization server metadata.
        /// 
        /// Since Keycloak is the authorization server (not our MCP server),
        /// we provide a reference to Keycloak's metadata endpoint.
        /// </summary>
        private static async Task ServeAuthorizationServerReference(HttpContext context, SmartMcpOAuth2Options options)
        {
            // Point to the actual authorization server (Keycloak)
            var metadata = new
            {
                issuer = options.Issuer,
                authorization_endpoint = options.AuthorizationEndpoint,
                token_endpoint = options.TokenEndpoint,
                jwks_uri = options.JwksUri,
                registration_endpoint = options.GetRegistrationEndpoint(),
                response_types_supported = new[] { "code" },
                response_modes_supported = new[] { "query", "fragment" },
                grant_types_supported = new[] { "authorization_code", "refresh_token" },
                token_endpoint_auth_methods_supported = new[] { "client_secret_basic", "client_secret_post", "none" },
                code_challenge_methods_supported = new[] { "plain", "S256" },
                scopes_supported = options.Scopes,
                resource_indicators_supported = true,
                resource = options.Audience,
                revocation_endpoint = options.TokenEndpoint,
                authorization_server_metadata = $"{options.Issuer}/.well-known/openid-configuration"
            };

            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(metadata, s_jsonOptions));
        }

        /// <summary>
        /// Serves OpenID Connect Discovery metadata.
        /// 
        /// This is provided for compatibility with OIDC clients.
        /// The full OIDC configuration is available at the authorization server (Keycloak).
        /// </summary>
        private static async Task ServeOpenIDConfiguration(HttpContext context, SmartMcpOAuth2Options options)
        {   
            // Redirect to Keycloak's actual OIDC configuration
            var metadata = new
            {
                issuer = options.Issuer,
                authorization_endpoint = options.AuthorizationEndpoint,
                token_endpoint = options.TokenEndpoint,
                jwks_uri = options.JwksUri,
                registration_endpoint = options.GetRegistrationEndpoint(),
                response_types_supported = new[] { "code" },
                response_modes_supported = new[] { "query", "fragment" },
                grant_types_supported = new[] { "authorization_code", "refresh_token" },
                subject_types_supported = new[] { "public" },
                id_token_signing_alg_values_supported = new[] { "RS256" },
                scopes_supported = options.Scopes,
                token_endpoint_auth_methods_supported = new[] { "client_secret_basic", "client_secret_post", "none" },
                // RFC 7636: PKCE support
                code_challenge_methods_supported = new[] { "plain", "S256" },
                claims_supported = new[] { "sub", "iss", "aud", "exp", "iat", "auth_time", "name", "email" },
                revocation_endpoint = options.TokenEndpoint,
                // Note: This is a proxy/reference. For full OIDC metadata, query Keycloak directly
                full_metadata_endpoint = $"{options.Issuer}/.well-known/openid-configuration"
            };

            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(metadata, s_jsonOptions));
        }
    }
}
