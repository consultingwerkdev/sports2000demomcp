/**
 * Describes the bearer token payload supplied by the MCP host.
 *
 * @memberof McpUiAuth
 */
export interface McpUiAuthPayload {
  accessToken: string;
  tokenType: 'Bearer';
  expiresAtUtc: string;
}
