import { DestroyRef, Injectable, effect, inject, signal } from '@angular/core';
import { McpAppBridgePort } from './mcp-app-bridge.port';
import {
  McpAppStatus,
  McpAppViewState,
  McpModelContextUpdate,
  McpToolArguments,
  McpUiTheme
} from './mcp-app.types';
import { McpUiAuthPayload } from '../auth/mcp-ui-auth.types';
import { JsonRpcId, JsonRpcMessage, PendingRequest } from './json-rpc.types';
import {
  INITIAL_MCP_APP_VIEW_STATE,
  REFRESH_UI_AUTH_TOOL_NAME
} from './mcp-app-bridge.constants';

/**
 * Implements the production MCP Apps bridge over postMessage JSON-RPC.
 *
 * @memberof McpAppBridge
 */
@Injectable({ providedIn: 'root' })
export class McpAppBridgeService implements McpAppBridgePort {
  private readonly destroyRef = inject(DestroyRef);
  private readonly stateSignal = signal<McpAppViewState>(INITIAL_MCP_APP_VIEW_STATE);
  private readonly uiAuthSignal = signal<McpUiAuthPayload | null>(null);
  private readonly pendingRequests = new Map<JsonRpcId, PendingRequest>();
  private readonly messageHandler = (event: MessageEvent<unknown>) => {
    this.handleMessage(event);
  };

  private nextRequestId = 1;
  private hostInitialized = false;
  private resizeObserver: ResizeObserver | null = null;

  readonly state = this.stateSignal.asReadonly();
  readonly uiAuth = this.uiAuthSignal.asReadonly();
  readonly isDevEmulator = false;

  /**
   * Creates the bridge, wires host listeners, and starts the MCP Apps handshake.
   *
   * @memberof McpAppBridgeService
   */
  constructor() {
    window.addEventListener('message', this.messageHandler);
    this.destroyRef.onDestroy(() => this.dispose());

    effect(() => {
      this.stateSignal();
      if (!this.hostInitialized) {
        return;
      }

      queueMicrotask(() => this.publishSize());
    });

    void this.initializeHost();
  }

  /**
   * Updates the shell status while preserving any current error text when appropriate.
   *
   * @param {McpAppStatus} status - The next shell status.
   * @memberof McpAppBridgeService
   */
  setStatus(status: McpAppStatus): void {
    this.patchState({
      status,
      errorMessage: status === 'error' ? this.stateSignal().errorMessage : null
    });
  }

  /**
   * Publishes an error state to the Angular shell.
   *
   * @param {string} message - The message shown to the user.
   * @memberof McpAppBridgeService
   */
  setError(message: string): void {
    this.patchState({
      status: 'error',
      errorMessage: message
    });
  }

  /**
   * Clears the current bridge error and restores the next appropriate shell state.
   *
   * @memberof McpAppBridgeService
   */
  clearError(): void {
    if (this.stateSignal().status !== 'error') {
      this.patchState({ errorMessage: null });
      return;
    }

    this.patchState({
      status: this.stateSignal().toolArguments === null ? 'awaitingToolInput' : 'authenticating',
      errorMessage: null
    });
  }

  /**
   * Starts a new tool-driven form flow from explicit tool arguments.
   *
   * @param {McpToolArguments} argumentsRecord - The tool arguments to store in bridge state.
   * @memberof McpAppBridgeService
   */
  submitToolArguments(argumentsRecord: McpToolArguments): void {
    this.startToolFlow(argumentsRecord, null);
  }

  /**
   * Clears the active tool flow and returns the shell to its waiting state.
   *
   * @memberof McpAppBridgeService
   */
  clearToolArguments(): void {
    this.uiAuthSignal.set(null);
    this.patchState({
      status: 'awaitingToolInput',
      toolArguments: null,
      toolResultText: null,
      errorMessage: null
    });
  }

  /**
   * Calls the hidden host refresh tool and stores the returned UI auth payload.
   *
   * @returns {Promise<McpUiAuthPayload>} - The refreshed UI auth payload.
   * @memberof McpAppBridgeService
   */
  async refreshUiAuthToken(): Promise<McpUiAuthPayload> {
    const result = await this.sendRequest('tools/call', {
      name: REFRESH_UI_AUTH_TOOL_NAME,
      arguments: {}
    });

    const payload = this.extractUiAuthPayload(result);
    if (!payload) {
      throw new Error('The host did not return a usable UI bearer token payload.');
    }

    this.uiAuthSignal.set(payload);
    return payload;
  }

  /**
   * Sends widget-owned model context to the host for later model turns.
   *
   * @param {McpModelContextUpdate} update - The context payload to persist on the host.
   * @returns {Promise<void>} - Resolves when the host acknowledges the update.
   * @memberof McpAppBridgeService
   */
  async updateModelContext(update: McpModelContextUpdate): Promise<void> {
    await this.sendRequest('ui/update-model-context', update);
  }

  /**
   * Performs the MCP Apps initialization handshake with the parent host.
   *
   * @returns {Promise<void>} - Resolves after the host handshake completes.
   * @memberof McpAppBridgeService
   */
  private async initializeHost(): Promise<void> {
    try {
      await this.sendRequest('ui/initialize', {
        appInfo: {
          name: 'Sports2000 Customer Shell',
          version: '0.1.0'
        },
        appCapabilities: {
          availableDisplayModes: ['inline']
        },
        protocolVersion: '2026-01-26'
      });

      this.hostInitialized = true;
      this.patchState({ status: 'awaitingToolInput' });
      this.sendNotification('ui/notifications/initialized', {});
      this.startResizeObserver();
      this.publishSize();
    } catch (error) {
      this.setError(this.toErrorMessage(error, 'Unable to initialize the MCP Apps host.'));
    }
  }

  /**
   * Dispatches incoming postMessage events to the appropriate JSON-RPC handler.
   *
   * @param {MessageEvent<unknown>} event - The browser message event emitted by the host.
   * @memberof McpAppBridgeService
   */
  private handleMessage(event: MessageEvent<unknown>): void {
    const message = this.asJsonRpcMessage(event.data);
    if (!message) {
      return;
    }

    if (typeof message.id === 'number' && this.pendingRequests.has(message.id) && !message.method) {
      const pendingRequest = this.pendingRequests.get(message.id)!;
      this.pendingRequests.delete(message.id);

      if (message.error) {
        pendingRequest.reject(new Error(message.error.message || 'Host request failed.'));
      } else {
        pendingRequest.resolve(message.result);
      }

      return;
    }

    if (typeof message.id === 'number' && typeof message.method === 'string') {
      this.handleHostRequest(message);
      return;
    }

    if (typeof message.method === 'string') {
      this.handleHostNotification(message.method, message.params);
    }
  }

  /**
   * Responds to host-originated JSON-RPC requests that target the widget.
   *
   * @param {JsonRpcMessage} message - The host request envelope.
   * @memberof McpAppBridgeService
   */
  private handleHostRequest(message: JsonRpcMessage): void {
    switch (message.method) {
      case 'ping':
        this.sendResponse(message.id!, {});
        return;
      case 'ui/resource-teardown':
        this.disconnectResizeObserver();
        this.sendResponse(message.id!, {});
        return;
      case 'ui/request-display-mode':
        this.sendResponse(message.id!, { mode: 'inline' });
        return;
      default:
        console.debug('[sports2000-mcp-ui] Ignoring host request', message.method);
        this.sendResponse(message.id!, {});
        return;
    }
  }

  /**
   * Processes host notifications that update bridge state or lifecycle.
   *
   * @param {string} method - The notification method name.
   * @param {unknown} params - The notification payload.
   * @memberof McpAppBridgeService
   */
  private handleHostNotification(method: string, params: unknown): void {
    switch (method) {
      case 'ui/notifications/tool-input-partial':
        console.debug('[sports2000-mcp-ui] Tool input partial', params);
        return;
      case 'ui/notifications/tool-input':
        this.handleToolInput(params);
        return;
      case 'ui/notifications/tool-result':
        {
          const uiAuthPayload = this.extractUiAuthPayload(params);
          if (uiAuthPayload) {
            this.uiAuthSignal.set(uiAuthPayload);
          }
        }
        this.patchState({
          toolResultText: this.extractToolResultText(params)
        });
        return;
      case 'ui/notifications/tool-cancelled':
        this.uiAuthSignal.set(null);
        this.patchState({
          status: 'awaitingToolInput',
          toolArguments: null,
          toolResultText: this.extractCancellationReason(params),
          errorMessage: null
        });
        return;
      case 'ui/notifications/host-context-changed':
        this.handleHostContextChanged(params);
        return;
      case 'ui/notifications/request-teardown':
        this.disconnectResizeObserver();
        return;
      default:
        console.debug('[sports2000-mcp-ui] Ignoring host notification', method, params);
        return;
    }
  }

  /**
   * Validates the final tool input payload and starts the shell flow.
   *
   * @param {unknown} params - The tool-input notification payload.
   * @memberof McpAppBridgeService
   */
  private handleToolInput(params: unknown): void {
    const toolArguments = this.extractToolArguments(params);
    this.uiAuthSignal.set(null);
    if (!toolArguments) {
      this.setError('The show-customer tool requires a numeric custNum input.');
      this.patchState({
        toolArguments: null,
        toolResultText: null
      });
      return;
    }

    this.startToolFlow(toolArguments, null);
  }

  /**
   * Merges host-context updates such as theme and style variables into bridge state.
   *
   * @param {unknown} params - The host-context notification payload.
   * @memberof McpAppBridgeService
   */
  private handleHostContextChanged(params: unknown): void {
    const context = this.asRecord(params);
    const patch: Partial<McpAppViewState> = {
      lastHostContext: params ?? null
    };

    if (context && Object.hasOwn(context, 'theme')) {
      patch.hostTheme = this.extractTheme(context['theme']);
    }

    if (context && Object.hasOwn(context, 'styles')) {
      patch.hostStyleVariables = this.extractHostStyleVariables(context['styles']);
    }

    this.patchState(patch);
  }

  /**
   * Starts observing document size changes so the host can resize the iframe.
   *
   * @memberof McpAppBridgeService
   */
  private startResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.disconnectResizeObserver();
    this.resizeObserver = new ResizeObserver(() => this.publishSize());
    this.resizeObserver.observe(document.body);
  }

  /**
   * Stops observing iframe content size changes.
   *
   * @memberof McpAppBridgeService
   */
  private disconnectResizeObserver(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  /**
   * Publishes the current document size to the host.
   *
   * @memberof McpAppBridgeService
   */
  private publishSize(): void {
    if (!this.hostInitialized) {
      return;
    }

    const width = Math.max(
      document.documentElement.scrollWidth,
      document.body?.scrollWidth ?? 0
    );
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight ?? 0
    );

    this.sendNotification('ui/notifications/size-changed', { width, height });
  }

  /**
   * Sends a JSON-RPC request to the host and tracks the pending response handlers.
   *
   * @param {string} method - The JSON-RPC method name.
   * @param {unknown} params - The request payload.
   * @returns {Promise<unknown>} - The host response payload.
   * @memberof McpAppBridgeService
   */
  private sendRequest(method: string, params: unknown): Promise<unknown> {
    const id = this.nextRequestId++;

    return new Promise<unknown>((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.postMessage({
        jsonrpc: '2.0',
        id,
        method,
        params
      });
    });
  }

  /**
   * Sends a JSON-RPC notification to the host.
   *
   * @param {string} method - The JSON-RPC method name.
   * @param {unknown} params - The notification payload.
   * @memberof McpAppBridgeService
   */
  private sendNotification(method: string, params: unknown): void {
    this.postMessage({
      jsonrpc: '2.0',
      method,
      params
    });
  }

  /**
   * Sends a JSON-RPC response back to the host.
   *
   * @param {JsonRpcId} id - The request id being answered.
   * @param {unknown} result - The response payload.
   * @memberof McpAppBridgeService
   */
  private sendResponse(id: JsonRpcId, result: unknown): void {
    this.postMessage({
      jsonrpc: '2.0',
      id,
      result
    });
  }

  /**
   * Posts a raw JSON-RPC message to the host window.
   *
   * @param {JsonRpcMessage} message - The JSON-RPC envelope to post.
   * @memberof McpAppBridgeService
   */
  private postMessage(message: JsonRpcMessage): void {
    window.parent.postMessage(message, '*');
  }

  /**
   * Applies a partial bridge-state update.
   *
   * @param {Partial<McpAppViewState>} patch - The state fragment to merge.
   * @memberof McpAppBridgeService
   */
  private patchState(patch: Partial<McpAppViewState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch
    }));
  }

  /**
   * Enters the authenticating phase for the current tool flow.
   *
   * @param {McpToolArguments} toolArguments - The normalized tool arguments.
   * @param {string | null} toolResultText - Optional text result already emitted by the host.
   * @memberof McpAppBridgeService
   */
  private startToolFlow(toolArguments: McpToolArguments, toolResultText: string | null): void {
    this.patchState({
      status: 'authenticating',
      toolArguments,
      toolResultText,
      errorMessage: null
    });
  }

  /**
   * Extracts normalized tool arguments from a host payload.
   *
   * @param {unknown} params - The host payload containing tool arguments.
   * @returns {McpToolArguments | null} - The normalized tool arguments, if valid.
   * @memberof McpAppBridgeService
   */
  private extractToolArguments(params: unknown): McpToolArguments | null {
    const argumentsRecord =
      this.asRecord(this.asRecord(params)?.['arguments']) ??
      this.asRecord(params);

    if (!argumentsRecord) {
      return null;
    }

    const rawCustNum = argumentsRecord['custNum'];

    if (typeof rawCustNum === 'number' && Number.isInteger(rawCustNum)) {
      return { custNum: rawCustNum };
    }

    if (typeof rawCustNum === 'string') {
      const parsedCustNum = Number.parseInt(rawCustNum, 10);
      if (Number.isInteger(parsedCustNum)) {
        return { custNum: parsedCustNum };
      }
    }

    return null;
  }

  /**
   * Extracts the first text content block from a tool result payload.
   *
   * @param {unknown} params - The tool result payload.
   * @returns {string | null} - The first text result, if present.
   * @memberof McpAppBridgeService
   */
  private extractToolResultText(params: unknown): string | null {
    const content = this.asRecord(params)?.['content'];
    if (!Array.isArray(content)) {
      return null;
    }

    for (const item of content) {
      const record = this.asRecord(item);
      if (record?.['type'] === 'text' && typeof record['text'] === 'string') {
        return record['text'];
      }
    }

    return null;
  }

  /**
   * Extracts the custom UI auth payload from a host result envelope.
   *
   * @param {unknown} params - The host result or notification payload.
   * @returns {McpUiAuthPayload | null} - The parsed UI auth payload, if present.
   * @memberof McpAppBridgeService
   */
  private extractUiAuthPayload(params: unknown): McpUiAuthPayload | null {
    const paramsRecord = this.asRecord(params);
    const candidateContainers = [
      paramsRecord,
      this.asRecord(paramsRecord?.['result']),
      this.asRecord(paramsRecord?.['data'])
    ];

    let payload: Record<string, any> | null = null;

    for (const container of candidateContainers) {
      if (!container) {
        continue;
      }

      const meta =
        this.asRecord(container['_meta']) ??
        this.asRecord(container['meta']);

      payload = this.asRecord(meta?.['consultingwerk/uiAuth']);
      if (payload) {
        break;
      }
    }

    if (!payload) {
      return null;
    }

    const accessToken = payload['accessToken'];
    const tokenType = payload['tokenType'];
    const expiresAtUtc = payload['expiresAtUtc'];

    if (
      typeof accessToken !== 'string' ||
      typeof tokenType !== 'string' ||
      typeof expiresAtUtc !== 'string'
    ) {
      return null;
    }

    if (tokenType !== 'Bearer') {
      return null;
    }

    return {
      accessToken,
      tokenType,
      expiresAtUtc
    };
  }

  /**
   * Extracts a human-readable cancellation reason from the host payload.
   *
   * @param {unknown} params - The cancellation payload.
   * @returns {string} - The resolved cancellation reason.
   * @memberof McpAppBridgeService
   */
  private extractCancellationReason(params: unknown): string {
    const reason = this.asRecord(params)?.['reason'];
    return typeof reason === 'string' && reason.length > 0
      ? reason
      : 'The tool execution was cancelled.';
  }

  /**
   * Validates a host theme value.
   *
   * @param {unknown} value - The candidate theme value.
   * @returns {McpUiTheme | null} - The normalized host theme, if valid.
   * @memberof McpAppBridgeService
   */
  private extractTheme(value: unknown): McpUiTheme | null {
    return value === 'light' || value === 'dark' ? value : null;
  }

  /**
   * Extracts host-provided CSS variables from a host-context payload.
   *
   * @param {unknown} styles - The styles payload emitted by the host.
   * @returns {Record<string, string>} - The validated CSS variable map.
   * @memberof McpAppBridgeService
   */
  private extractHostStyleVariables(styles: unknown): Record<string, string> {
    const variables = this.asRecord(this.asRecord(styles)?.['variables']);
    if (!variables) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(variables).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    );
  }

  /**
   * Validates that an arbitrary value conforms to the JSON-RPC message shape.
   *
   * @param {unknown} value - The value to inspect.
   * @returns {JsonRpcMessage | null} - The parsed JSON-RPC message, if valid.
   * @memberof McpAppBridgeService
   */
  private asJsonRpcMessage(value: unknown): JsonRpcMessage | null {
    const record = this.asRecord(value);
    if (!record || record['jsonrpc'] !== '2.0') {
      return null;
    }

    return record as JsonRpcMessage;
  }

  /**
   * Coerces an arbitrary value into a plain record when possible.
   *
   * @param {unknown} value - The candidate value to convert.
   * @returns {Record<string, any> | null} - The record view of the value, if valid.
   * @memberof McpAppBridgeService
   */
  private asRecord(value: unknown): Record<string, any> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return null;
    }

    return value as Record<string, any>;
  }

  /**
   * Resolves an error-like value to a user-facing message.
   *
   * @param {unknown} error - The thrown error candidate.
   * @param {string} fallback - The fallback message to use when no Error message is available.
   * @returns {string} - The user-facing error text.
   * @memberof McpAppBridgeService
   */
  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }

  /**
   * Tears down browser listeners and rejects any pending host requests.
   *
   * @memberof McpAppBridgeService
   */
  private dispose(): void {
    window.removeEventListener('message', this.messageHandler);
    this.disconnectResizeObserver();

    for (const pendingRequest of this.pendingRequests.values()) {
      pendingRequest.reject(new Error('The MCP Apps bridge was disposed.'));
    }

    this.pendingRequests.clear();
  }
}
