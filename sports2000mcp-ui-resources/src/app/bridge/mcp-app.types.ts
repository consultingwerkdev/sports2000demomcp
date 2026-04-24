export type McpAppStatus =
  | 'booting'
  | 'awaitingToolInput'
  | 'authenticating'
  | 'loadingCustomer'
  | 'ready'
  | 'notFound'
  | 'error';

export type McpUiTheme = 'light' | 'dark';

export interface McpAppViewState {
  status: McpAppStatus;
  custNum: number | null;
  toolResultText: string | null;
  lastHostContext: unknown | null;
  hostTheme: McpUiTheme | null;
  hostStyleVariables: Record<string, string>;
  errorMessage: string | null;
}
