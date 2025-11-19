using Microsoft.AspNetCore.Http;

namespace Consultingwerk.SmartMCPAuthentication
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
    }

    /// <summary>
    /// Implementation of <see cref="ISmartMcpAccessTokenProvider"/> that retrieves the token from the current HTTP context.
    /// </summary>
    public class HttpContextAccessTokenProvider : ISmartMcpAccessTokenProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextAccessTokenProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetAccessToken()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context == null)
            {
                return string.Empty;
            }

            return SmartMcpOAuth2Extensions.GetJwtTokenFromContext(context);
        }
    }
}

