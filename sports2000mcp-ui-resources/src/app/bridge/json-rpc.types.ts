/**
 * Represents the identifier used to correlate JSON-RPC requests and responses.
 *
 * @memberof McpAppBridge
 */
export type JsonRpcId = number;

/**
 * Describes a JSON-RPC error returned by the host.
 *
 * @memberof McpAppBridge
 */
export interface JsonRpcError {
  code: number;
  message: string;
}

/**
 * Describes a JSON-RPC message exchanged with the host iframe parent.
 *
 * @memberof McpAppBridge
 */
export interface JsonRpcMessage {
  jsonrpc: '2.0';
  id?: JsonRpcId;
  method?: string;
  params?: unknown;
  result?: unknown;
  error?: JsonRpcError;
}

/**
 * Tracks the promise handlers for an in-flight JSON-RPC request.
 *
 * @memberof McpAppBridge
 */
export interface PendingRequest {
  resolve: (result: unknown) => void;
  reject: (error: Error) => void;
}
