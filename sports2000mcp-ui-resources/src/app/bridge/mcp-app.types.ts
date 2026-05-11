/**
 * Represents the lifecycle states of the MCP customer shell.
 *
 * @memberof McpAppTypes
 */
export type McpAppStatus =
  | 'booting'
  | 'awaitingToolInput'
  | 'authenticating'
  | 'loadingForm'
  | 'ready'
  | 'error';

/**
 * Represents the host theme values supported by the shell.
 *
 * @memberof McpAppTypes
 */
export type McpUiTheme = 'light' | 'dark';

/**
 * Represents tool arguments received from the MCP host.
 *
 * @memberof McpAppTypes
 */
export type McpToolArguments = Record<string, unknown>;

/**
 * Represents a JSON-safe value that can be forwarded to MCP model context.
 *
 * @memberof McpAppTypes
 */
export type McpJsonValue =
  | null
  | string
  | number
  | boolean
  | McpJsonValue[]
  | { [key: string]: McpJsonValue };

/**
 * Describes a text content block sent to the host as model context.
 *
 * @memberof McpAppTypes
 */
export interface McpModelContextTextContentBlock {
  type: 'text';
  text: string;
}

/**
 * Describes a model-context update sent from the widget to the host.
 *
 * @memberof McpAppTypes
 */
export interface McpModelContextUpdate {
  content?: McpModelContextTextContentBlock[];
  structuredContent?: Record<string, McpJsonValue>;
}

/**
 * Describes the state mirrored by the bridge for the Angular shell.
 *
 * @memberof McpAppTypes
 */
export interface McpAppViewState {
  status: McpAppStatus;
  toolArguments: McpToolArguments | null;
  toolResultText: string | null;
  lastHostContext: unknown | null;
  hostTheme: McpUiTheme | null;
  hostStyleVariables: Record<string, string>;
  errorMessage: string | null;
}
