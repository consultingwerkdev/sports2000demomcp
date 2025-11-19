namespace Consultingwerk.SmartMCPAuthentication
{
    /// <summary>
    /// Constants used throughout the SmartMCP Authentication library.
    /// </summary>
    public static class SmartMcpConstants
    {
        /// <summary>
        /// The key used to store the validated JWT token in HttpContext.Items.
        /// </summary>
        public const string TokenContextKey = "SmartMcpJwtToken";

        /// <summary>
        /// The logger category name.
        /// </summary>
        public const string LoggerCategory = "SmartMCPAuthentication";

        /// <summary>
        /// Endpoint paths.
        /// </summary>
        public static class Endpoints
        {
            public const string ProtectedResource = "/.well-known/oauth-protected-resource";
            public const string AuthorizationServer = "/.well-known/oauth-authorization-server";
            public const string OpenIdConfiguration = "/.well-known/openid-configuration";
            public const string OAuth2Metadata = "/oauth2/metadata";
        }
    }
}

