import { McpAppViewState } from './mcp-app.types';

/**
 * Represents the hidden tool used to refresh the host-managed bearer token.
 *
 * @memberof McpAppBridge
 */
export const REFRESH_UI_AUTH_TOOL_NAME = 'refresh-ui-auth-token';

/**
 * Represents the initial bridge state before the MCP host handshake completes.
 *
 * @memberof McpAppBridge
 */
export const INITIAL_MCP_APP_VIEW_STATE: McpAppViewState = {
  status: 'booting',
  toolArguments: null,
  toolResultText: null,
  lastHostContext: null,
  hostTheme: null,
  hostStyleVariables: {},
  errorMessage: null
};

/**
 * Represents the initial bridge state used by the local dev emulator.
 *
 * @memberof McpAppBridge
 */
export const INITIAL_DEV_MCP_APP_VIEW_STATE: McpAppViewState = {
  status: 'awaitingToolInput',
  toolArguments: null,
  toolResultText: null,
  lastHostContext: null,
  hostTheme: 'light',
  hostStyleVariables: {},
  errorMessage: null
};
