namespace Consultingwerk.SmartMcpAuthentication
{
    /// <summary>
    /// Defines the token acquisition mode for OAuth2 authentication.
    /// </summary>
    public enum TokenAcquisitionMode
    {
        /// <summary>
        /// Require authentication via Authorization header (OIDC flow).
        /// </summary>
        Oidc,

        /// <summary>
        /// Token comes from pcJwtToken tool parameter (pass-through mode).
        /// </summary>
        JwtPassThrough
    }

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
        /// The token acquisition mode. Determines how tokens are obtained and validated.
        /// </summary>
        public TokenAcquisitionMode TokenAcquisition { get; set; } = TokenAcquisitionMode.Oidc;

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

        /// <summary>
        /// OAuth2 Dynamic Client Registration endpoint URL (RFC 7591).
        /// If not set, will be discovered from the authorization server's OIDC metadata.
        /// </summary>
        public string? RegistrationEndpoint { get; set; }

        /// <summary>
        /// Gets the registration endpoint, falling back to constructing it from the Issuer if not explicitly set.
        /// </summary>
        /// <returns>The registration endpoint URL.</returns>
        public string GetRegistrationEndpoint()
        {
            if (!string.IsNullOrEmpty(RegistrationEndpoint))
            {
                return RegistrationEndpoint;
            }
            
            // Default to Keycloak's standard path if not configured
            if (!string.IsNullOrEmpty(Issuer))
            {
                return $"{Issuer}/clients-registrations/openid-connect";
            }
            
            return string.Empty;
        }
    }
}
