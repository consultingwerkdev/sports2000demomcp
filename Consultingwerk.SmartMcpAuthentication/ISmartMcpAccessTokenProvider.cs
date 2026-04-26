using Microsoft.AspNetCore.Http;

namespace Consultingwerk.SmartMcpAuthentication
{
    /// <summary>
    /// Defines a provider for retrieving the current user's access token.
    /// </summary>
    public interface ISmartMcpAccessTokenProvider
    {
        /// <summary>
        /// Gets the current access token.
        /// </summary>
        /// <returns>The access token, or empty string if not available.</returns>
        string GetAccessToken();

        /// <summary>
        /// Resolves the token based on configuration and provided parameter.
        /// </summary>
        /// <param name="pcJwtToken">The JWT token from tool parameter, if any.</param>
        /// <returns>The resolved token based on configuration mode, or empty string.</returns>
        string ResolveToken(string? pcJwtToken);
    }

    /// <summary>
    /// Implementation of <see cref="ISmartMcpAccessTokenProvider"/> that retrieves the token from the current HTTP context.
    /// </summary>
    public class HttpContextAccessTokenProvider : ISmartMcpAccessTokenProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly SmartMcpOAuth2Options _options;

        public HttpContextAccessTokenProvider(IHttpContextAccessor httpContextAccessor, SmartMcpOAuth2Options options)
        {
            _httpContextAccessor = httpContextAccessor;
            _options = options;
        }

        public HttpContextAccessTokenProvider() {}

        public string GetAccessToken()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context == null)
            {
                return string.Empty;
            }

            return SmartMcpOAuth2Extensions.GetJwtTokenFromContext(context);
        }

        public string ResolveToken(string? pcJwtToken)
        {
            // If authentication is disabled, strip any pcJwtToken
            if (!_options.Enabled)
            {
                return string.Empty;
            }

            // If OIDC mode, use token from HTTP context (ignore pcJwtToken parameter)
            if (_options.TokenAcquisition == TokenAcquisitionMode.Oidc)
            {
                return GetAccessToken();
            }

            // If JwtPassThrough mode, use pcJwtToken if provided, otherwise empty
            if (_options.TokenAcquisition == TokenAcquisitionMode.JwtPassThrough)
            {
                return string.IsNullOrEmpty(pcJwtToken) ? string.Empty : pcJwtToken;
            }

            // Default fallback (should not happen with proper enum)
            return string.Empty;
        }
    }
}

