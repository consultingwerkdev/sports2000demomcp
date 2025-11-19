namespace Consultingwerk.SmartMCPAuthentication
{
    /// <summary>
    /// Configuration options for MCP OAuth2 authentication.
    /// </summary>
    public class SmartMcpOAuth2Options
    {
        /// <summary>
        /// The configuration section name in appsettings.json.
        /// </summary>
        public const string SectionName = "SmartMcpOAuth2";

        /// <summary>
        /// Whether OAuth2 authentication is required.
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// OAuth2 authorization endpoint URL.
        /// </summary>
        public string AuthorizationEndpoint { get; set; } = string.Empty;

        /// <summary>
        /// OAuth2 token exchange endpoint URL.
        /// </summary>
        public string TokenEndpoint { get; set; } = string.Empty;

        /// <summary>
        /// OAuth2 client ID.
        /// </summary>
        public string ClientId { get; set; } = string.Empty;

        /// <summary>
        /// OAuth2 client secret (optional for public clients).
        /// </summary>
        public string? ClientSecret { get; set; }

        /// <summary>
        /// Requested OAuth2 scopes.
        /// </summary>
        public string[] Scopes { get; set; } = ["openid", "profile"];

        /// <summary>
        /// JWKS endpoint URL for token validation.
        /// </summary>
        public string JwksUri { get; set; } = string.Empty;

        /// <summary>
        /// Expected JWT issuer.
        /// </summary>
        public string Issuer { get; set; } = string.Empty;

        /// <summary>
        /// Expected JWT audience (typically the client ID).
        /// </summary>
        public string Audience { get; set; } = string.Empty;
    }
}
