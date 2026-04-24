export type McpAppStatus =
  | 'booting'
  | 'awaitingToolInput'
  | 'authenticating'
  | 'loadingForm'
  | 'ready'
  | 'error';

export type McpUiTheme = 'light' | 'dark';
export type McpToolArguments = Record<string, unknown>;

export interface McpAppViewState {
  status: McpAppStatus;
  toolArguments: McpToolArguments | null;
  toolResultText: string | null;
  lastHostContext: unknown | null;
  hostTheme: McpUiTheme | null;
  hostStyleVariables: Record<string, string>;
  errorMessage: string | null;
}
