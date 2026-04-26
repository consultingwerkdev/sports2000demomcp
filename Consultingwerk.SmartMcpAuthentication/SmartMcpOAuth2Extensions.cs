using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Consultingwerk.SmartMcpAuthentication
{
    /// <summary>
    /// Extension methods for configuring MCP OAuth2 authentication.
    /// </summary>
    public static class SmartMcpOAuth2Extensions
    {
        /// <summary>
        /// Adds MCP OAuth2 authentication services to the service collection.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The configuration instance.</param>
        /// <returns>The service collection for chaining.</returns>
        public static IServiceCollection AddSmartMcpOAuth2Authentication(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var options = new SmartMcpOAuth2Options();
            configuration.GetSection(SmartMcpOAuth2Options.SectionName).Bind(options);

            // Log configuration at initialization
            var logger = services.BuildServiceProvider().GetService<ILoggerFactory>()?.CreateLogger(SmartMcpConstants.LoggerCategory);
            
            logger?.LogInformation("=== SmartMCP OAuth2 Authentication Configuration ===");
            logger?.LogInformation("OAuth2 Authentication Enabled: {Enabled}", options.Enabled);
            logger?.LogInformation("Token Acquisition Mode: {TokenAcquisition}", options.TokenAcquisition);
            
            if (options.Enabled)
            {
                if (options.TokenAcquisition == TokenAcquisitionMode.Oidc)
                {
                    logger?.LogInformation("Authorization Endpoint: {Endpoint}", options.AuthorizationEndpoint);
                    logger?.LogInformation("Token Endpoint: {Endpoint}", options.TokenEndpoint);
                    logger?.LogInformation("Client ID: {ClientId}", options.ClientId);
                    logger?.LogInformation("Client Secret: {ClientSecret}", string.IsNullOrEmpty(options.ClientSecret) ? "(not set - public client)" : "***");
                    logger?.LogInformation("Scopes: {Scopes}", string.Join(", ", options.Scopes));
                    logger?.LogInformation("JWKS URI: {JwksUri}", options.JwksUri);
                    logger?.LogInformation("Issuer: {Issuer}", options.Issuer);
                    logger?.LogInformation("Audience: {Audience}", options.Audience);
                }
                else if (options.TokenAcquisition == TokenAcquisitionMode.JwtPassThrough)
                {
                    logger?.LogInformation("JWT Pass-Through mode: Tokens will be accepted from tool parameters");
                }
            }
            else
            {
                logger?.LogInformation("OAuth2 authentication is DISABLED - tokens will be stripped from tool calls");
            }
            logger?.LogInformation("====================================================");

            // Always register options (needed even when disabled for middleware to check state)
            services.AddSingleton(options);

            // Always register HTTP context accessor (needed by tool classes regardless of auth state)
            services.AddHttpContextAccessor();

            // Register Access Token Provider
            services.AddScoped<ISmartMcpAccessTokenProvider, HttpContextAccessTokenProvider>();

            // Register HttpClient factory
            services.AddHttpClient();

            // Only configure JWT Bearer authentication when Enabled=true AND TokenAcquisition=Oidc
            if (!options.Enabled || options.TokenAcquisition != TokenAcquisitionMode.Oidc)
            {
                return services;
            }

            // Configure JWT Bearer authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(jwtOptions =>
                {
                    jwtOptions.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = !string.IsNullOrEmpty(options.Issuer),
                        ValidateAudience = !string.IsNullOrEmpty(options.Audience),
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = options.Issuer,
                        ValidAudience = options.Audience,
                    };

                    // Configure JWKS endpoint
                    if (!string.IsNullOrEmpty(options.JwksUri))
                    {
                        jwtOptions.MetadataAddress = options.JwksUri.Replace("/protocol/openid-connect/certs", "/.well-known/openid-configuration");
                    }

                    // Challenge unauthenticated requests
                    jwtOptions.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context => 
                        {
                            // Debug: Log that we received a token
                            var loggerFactory = context.HttpContext.RequestServices.GetService<ILoggerFactory>();
                            var logger = loggerFactory?.CreateLogger(SmartMcpConstants.LoggerCategory);
                            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                            {
                                logger?.LogDebug("Received Bearer token (length: {Length})", authHeader.Length);
                            }
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            var loggerFactory = context.HttpContext.RequestServices.GetService<ILoggerFactory>();
                            var logger = loggerFactory?.CreateLogger(SmartMcpConstants.LoggerCategory);
                            logger?.LogWarning("Authentication challenge triggered for {Path}: {Error} - {ErrorDescription}", 
                                context.Request.Path, context.Error, context.ErrorDescription);
                            
                            context.HandleResponse();
                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/problem+json";
                            
                            // RFC 6750: Include WWW-Authenticate header with error details
                            var realm = string.IsNullOrEmpty(options.Issuer) ? "mcp-server" : options.Issuer;
                            var authenticateHeader = $"Bearer realm=\"{realm}\"";
                            if (!string.IsNullOrEmpty(context.Error))
                            {
                                authenticateHeader += $", error=\"{context.Error}\"";
                                if (!string.IsNullOrEmpty(context.ErrorDescription))
                                {
                                    authenticateHeader += $", error_description=\"{context.ErrorDescription}\"";
                                }
                            }
                            context.Response.Headers["WWW-Authenticate"] = authenticateHeader;
                            
                            var problemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails
                            {
                                Status = 401,
                                Title = "Unauthorized",
                                Detail = !string.IsNullOrEmpty(context.ErrorDescription) ? context.ErrorDescription : "Authentication required. Please provide a valid JWT token in the Authorization header.",
                                Type = "https://tools.ietf.org/html/rfc6750#section-3.1"
                            };
                            
                            if (!string.IsNullOrEmpty(context.Error))
                            {
                                problemDetails.Extensions["error"] = context.Error;
                            }

                            return context.Response.WriteAsJsonAsync(problemDetails);
                        },
                        OnAuthenticationFailed = context =>
                        {
                            var loggerFactory = context.HttpContext.RequestServices.GetService<ILoggerFactory>();
                            var logger = loggerFactory?.CreateLogger(SmartMcpConstants.LoggerCategory);
                            logger?.LogError(context.Exception, "JWT authentication failed for {Path}", context.Request.Path);
                            
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            var loggerFactory = context.HttpContext.RequestServices.GetService<ILoggerFactory>();
                            var logger = loggerFactory?.CreateLogger(SmartMcpConstants.LoggerCategory);
                            var principal = context.Principal;
                            var userId = principal?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value 
                                      ?? principal?.FindFirst("sub")?.Value 
                                      ?? "unknown";
                            
                            logger?.LogInformation("JWT token validated successfully for {Path} - User: {UserId}", 
                                context.Request.Path, userId);
                            return Task.CompletedTask;
                        }
                    };
                });

            // Add authorization policy that requires authentication for all requests when enabled
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAuthentication", policy =>
                {
                    policy.RequireAuthenticatedUser();
                });
            });

            return services;
        }

        /// <summary>
        /// Uses MCP OAuth2 authentication middleware and registers discovery endpoints.
        /// </summary>
        /// <param name="app">The application builder.</param>
        /// <returns>The application builder for chaining.</returns>
        public static IApplicationBuilder UseSmartMcpOAuth2Authentication(this IApplicationBuilder app)
        {
            var options = app.ApplicationServices.GetRequiredService<SmartMcpOAuth2Options>();
            
            // Only use auth middleware when Enabled=true AND TokenAcquisition=Oidc
            if (!options.Enabled || options.TokenAcquisition != TokenAcquisitionMode.Oidc)
            {
                return app;
            }

            // Use authentication middleware first to validate tokens
            app.UseAuthentication();
            
            // Use authorization to require authentication for all requests
            app.UseAuthorization();
            
            // Then use our middleware to extract and store validated tokens
            app.UseMiddleware<SmartMcpJwtTokenExtractor>();
            
            // Note: OAuth2 discovery/metadata endpoints are mapped separately
            // and are exempt from auth by the SmartMcpJwtTokenExtractor middleware

            return app;
        }

        /// <summary>
        /// Gets the JWT token from the HTTP context.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        /// <returns>The JWT token string, or empty string if not found.</returns>
        public static string GetJwtTokenFromContext(HttpContext context)
        {
            if (context.Items.TryGetValue(SmartMcpConstants.TokenContextKey, out var token) && token is string tokenString)
            {
                return tokenString;
            }
            return string.Empty;
        }
    }
}
