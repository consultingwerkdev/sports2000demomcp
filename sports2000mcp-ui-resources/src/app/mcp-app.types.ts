export type McpAppStatus =
  | 'booting'
  | 'awaitingToolInput'
  | 'authenticating'
  | 'loadingCustomer'
  | 'ready'
  | 'notFound'
  | 'error';

export interface McpAppViewState {
  status: McpAppStatus;
  custNum: number | null;
  toolResultText: string | null;
  lastHostContext: unknown | null;
  errorMessage: string | null;
}
