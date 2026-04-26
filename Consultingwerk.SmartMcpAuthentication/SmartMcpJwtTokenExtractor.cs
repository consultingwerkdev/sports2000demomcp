using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Text.Json;

namespace Consultingwerk.SmartMcpAuthentication
{
    /// <summary>
    /// Middleware that extracts and validates JWT tokens from requests.
    /// </summary>
    public class SmartMcpJwtTokenExtractor
    {
        private readonly RequestDelegate _next;
        private readonly SmartMcpOAuth2Options _options;
        private readonly ILogger<SmartMcpJwtTokenExtractor>? _logger;

        /// <summary>
        /// Initializes a new instance of the SmartMcpJwtTokenExtractor middleware.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        /// <param name="options">The OAuth2 options.</param>
        /// <param name="logger">Optional logger.</param>
        public SmartMcpJwtTokenExtractor(
            RequestDelegate next,
            SmartMcpOAuth2Options options,
            ILogger<SmartMcpJwtTokenExtractor>? logger = null)
        {
            _next = next;
            _options = options;
            _logger = logger;
        }

        /// <summary>
        /// Invokes the middleware.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        public async Task InvokeAsync(HttpContext context)
        {
            // Only enforce token requirements when Enabled=true AND TokenAcquisition=Oidc
            // This middleware should only be registered in that case, but check for safety
            if (!_options.Enabled || _options.TokenAcquisition != TokenAcquisitionMode.Oidc)
            {
                _logger?.LogDebug("OAuth2 authentication not in OIDC mode - allowing request to {Path} without authentication", context.Request.Path);
                await _next(context);
                return;
            }

            // Check if this is a discovery/metadata endpoint - these must be allowed without auth
            if (IsDiscoveryEndpoint(context))
            {
                _logger?.LogInformation("Discovery endpoint request to {Path}", context.Request.Path);
                await _next(context);
                return;
            }

            // Check if this is an MCP initialize request - these must be allowed without auth
            // so clients can discover OAuth2 configuration
            bool isInitializeRequest = await IsInitializeRequestAsync(context);
            
            if (isInitializeRequest)
            {
                _logger?.LogInformation("MCP 'initialize' request received (OAuth2 discovery)");
                await _next(context);
                return;
            }

            // Log request details
            _logger?.LogInformation("MCP Request received: {Method} {Path} - Authentication REQUIRED", 
                context.Request.Method, context.Request.Path);

            // Extract token from Authorization header and store in context
            // Authentication middleware has already run and validated the token
            string? token = ExtractTokenFromHeader(context);
            
            if (string.IsNullOrEmpty(token))
            {
                // No token provided - reject the request
                _logger?.LogWarning("REJECTING request to {Path} - No JWT token found in Authorization header", 
                    context.Request.Path);
                
                // Don't modify response if it's already started
                if (!context.Response.HasStarted)
                {
                    await WriteUnauthorizedResponseAsync(context, "invalid_request", "Authentication required. Please provide a valid JWT token in the Authorization header.");
                }
                return;
            }

            // Check if user is authenticated (token was validated by auth middleware)
            if (context.User?.Identity?.IsAuthenticated != true)
            {
                _logger?.LogWarning("REJECTING request to {Path} - JWT token validation failed", 
                    context.Request.Path);
                
                // Don't modify response if it's already started
                if (!context.Response.HasStarted)
                {
                    await WriteUnauthorizedResponseAsync(context, "invalid_token", "The access token is invalid or expired");
                }
                return;
            }

            // Store validated token in context for later use by tool methods
            context.Items[SmartMcpConstants.TokenContextKey] = token;
            _logger?.LogInformation("JWT token validated successfully for request to {Path} - User: {UserId}", 
                context.Request.Path, 
                context.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value 
                    ?? context.User?.FindFirst("sub")?.Value 
                    ?? "unknown");

            // Continue to next middleware
            await _next(context);
        }

        /// <summary>
        /// Writes a standard RFC 7807 ProblemDetails response for unauthorized requests.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        /// <param name="error">The error code (e.g., invalid_token).</param>
        /// <param name="errorDescription">The human-readable error description.</param>
        private async Task WriteUnauthorizedResponseAsync(HttpContext context, string error, string errorDescription)
        {
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/problem+json";
            
            var realm = string.IsNullOrEmpty(_options.Issuer) ? "mcp-server" : _options.Issuer;
            context.Response.Headers.Append("WWW-Authenticate", $"Bearer realm=\"{realm}\", error=\"{error}\", error_description=\"{errorDescription}\"");

            var problemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails
            {
                Status = 401,
                Title = "Unauthorized",
                Detail = errorDescription,
                Type = "https://tools.ietf.org/html/rfc6750#section-3.1"
            };
            
            problemDetails.Extensions["error"] = error;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }

        /// <summary>
        /// Checks if the current request is for a discovery/metadata endpoint.
        /// These endpoints must be publicly accessible for OAuth2 discovery.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        /// <returns>True if this is a discovery endpoint, false otherwise.</returns>
        private static bool IsDiscoveryEndpoint(HttpContext context)
        {
            var path = context.Request.Path.Value?.ToLowerInvariant() ?? string.Empty;
            
            // Standard OAuth2/OIDC discovery endpoints (RFC 8414, RFC 8707)
            return path.StartsWith("/.well-known/") || 
                   path == SmartMcpConstants.Endpoints.OAuth2Metadata;
        }

        /// <summary>
        /// Checks if the current request is an MCP initialize request.
        /// The initialize request must be allowed without authentication so clients
        /// can discover OAuth2 configuration.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        /// <returns>True if this is an initialize request, false otherwise.</returns>
        private static async Task<bool> IsInitializeRequestAsync(HttpContext context)
        {
            // Only POST requests can be initialize requests
            if (!context.Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            // Check if the request has a body
            if (context.Request.ContentLength == null || context.Request.ContentLength == 0)
            {
                return false;
            }

            // Security: Enforce size limit for initialize check to prevent DoS
            if (context.Request.ContentLength > 4096)
            {
                return false;
            }

            try
            {
                // Enable buffering so we can read the body multiple times
                context.Request.EnableBuffering();

                // Read the body
                using var reader = new StreamReader(
                    context.Request.Body,
                    encoding: Encoding.UTF8,
                    detectEncodingFromByteOrderMarks: false,
                    bufferSize: 1024,
                    leaveOpen: true);

                var body = await reader.ReadToEndAsync();

                // Reset the stream position for the next middleware
                context.Request.Body.Position = 0;

                // Check if the body contains "method":"initialize" or "method": "initialize"
                // This is a simple string check to avoid full JSON parsing overhead
                if (string.IsNullOrEmpty(body))
                {
                    return false;
                }

                // Try to parse as JSON-RPC to check method name
                try
                {
                    using var jsonDoc = JsonDocument.Parse(body);
                    if (jsonDoc.RootElement.TryGetProperty("method", out var methodProperty))
                    {
                        var method = methodProperty.GetString();
                        return method?.Equals("initialize", StringComparison.OrdinalIgnoreCase) == true;
                    }
                }
                catch (JsonException)
                {
                    // Not valid JSON, not an initialize request
                    return false;
                }
            }
            catch (Exception)
            {
                // If we can't read the body, assume it's not an initialize request
                // Reset stream position just in case
                try { context.Request.Body.Position = 0; } catch { }
                return false;
            }

            return false;
        }

        /// <summary>
        /// Extracts the JWT token from the Authorization header.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        /// <returns>The JWT token string, or null if not found.</returns>
        private static string? ExtractTokenFromHeader(HttpContext context)
        {
            if (!context.Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                return null;
            }

            var authHeaderValue = authHeader.ToString();
            if (string.IsNullOrEmpty(authHeaderValue))
            {
                return null;
            }

            // Check for Bearer token format: "Bearer <token>"
            if (authHeaderValue.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                return authHeaderValue.Substring("Bearer ".Length).Trim();
            }

            return null;
        }
    }
}

