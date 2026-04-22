import { DestroyRef, Injectable, effect, inject, signal } from '@angular/core';
import { McpAppBridgePort } from './mcp-app-bridge.port';
import { McpAppStatus, McpAppViewState, McpUiTheme } from './mcp-app.types';

type JsonRpcId = number;

interface JsonRpcError {
  code: number;
  message: string;
}

interface JsonRpcMessage {
  jsonrpc: '2.0';
  id?: JsonRpcId;
  method?: string;
  params?: unknown;
  result?: unknown;
  error?: JsonRpcError;
}

interface PendingRequest {
  resolve: (result: unknown) => void;
  reject: (error: Error) => void;
}

const INITIAL_STATE: McpAppViewState = {
  status: 'booting',
  custNum: null,
  toolResultText: null,
  lastHostContext: null,
  hostTheme: null,
  hostStyleVariables: {},
  errorMessage: null
};

@Injectable({ providedIn: 'root' })
export class McpAppBridgeService implements McpAppBridgePort {
  private readonly destroyRef = inject(DestroyRef);
  private readonly stateSignal = signal<McpAppViewState>(INITIAL_STATE);
  private readonly pendingRequests = new Map<JsonRpcId, PendingRequest>();
  private readonly messageHandler = (event: MessageEvent<unknown>) => {
    this.handleMessage(event);
  };

  private nextRequestId = 1;
  private hostInitialized = false;
  private resizeObserver: ResizeObserver | null = null;

  readonly state = this.stateSignal.asReadonly();
  readonly isDevEmulator = false;

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

  setStatus(status: McpAppStatus): void {
    this.patchState({
      status,
      errorMessage: status === 'error' ? this.stateSignal().errorMessage : null
    });
  }

  setError(message: string): void {
    this.patchState({
      status: 'error',
      errorMessage: message
    });
  }

  clearError(): void {
    if (this.stateSignal().status !== 'error') {
      this.patchState({ errorMessage: null });
      return;
    }

    this.patchState({
      status: this.stateSignal().custNum === null ? 'awaitingToolInput' : 'authenticating',
      errorMessage: null
    });
  }

  submitCustomerInput(custNum: number): void {
    this.startCustomerFlow(custNum, null);
  }

  clearCustomerInput(): void {
    this.patchState({
      status: 'awaitingToolInput',
      custNum: null,
      toolResultText: null,
      errorMessage: null
    });
  }

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

  private handleHostNotification(method: string, params: unknown): void {
    switch (method) {
      case 'ui/notifications/tool-input-partial':
        console.debug('[sports2000-mcp-ui] Tool input partial', params);
        return;
      case 'ui/notifications/tool-input':
        this.handleToolInput(params);
        return;
      case 'ui/notifications/tool-result':
        this.patchState({
          toolResultText: this.extractToolResultText(params)
        });
        return;
      case 'ui/notifications/tool-cancelled':
        this.patchState({
          status: 'awaitingToolInput',
          custNum: null,
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

  private handleToolInput(params: unknown): void {
    const custNum = this.extractCustNum(params);
    if (custNum === null) {
      this.setError('The show-customer tool requires a numeric custNum input.');
      this.patchState({
        custNum: null,
        toolResultText: null
      });
      return;
    }

    this.startCustomerFlow(custNum, null);
  }

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

  private startResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.disconnectResizeObserver();
    this.resizeObserver = new ResizeObserver(() => this.publishSize());
    this.resizeObserver.observe(document.body);
  }

  private disconnectResizeObserver(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

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

  private sendNotification(method: string, params: unknown): void {
    this.postMessage({
      jsonrpc: '2.0',
      method,
      params
    });
  }

  private sendResponse(id: JsonRpcId, result: unknown): void {
    this.postMessage({
      jsonrpc: '2.0',
      id,
      result
    });
  }

  private postMessage(message: JsonRpcMessage): void {
    window.parent.postMessage(message, '*');
  }

  private patchState(patch: Partial<McpAppViewState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch
    }));
  }

  private startCustomerFlow(custNum: number, toolResultText: string | null): void {
    this.patchState({
      status: 'authenticating',
      custNum,
      toolResultText,
      errorMessage: null
    });
  }

  private extractCustNum(params: unknown): number | null {
    const argumentsRecord =
      this.asRecord(this.asRecord(params)?.['arguments']) ??
      this.asRecord(params);

    const rawCustNum = argumentsRecord?.['custNum'];

    if (typeof rawCustNum === 'number' && Number.isInteger(rawCustNum)) {
      return rawCustNum;
    }

    if (typeof rawCustNum === 'string') {
      const parsedCustNum = Number.parseInt(rawCustNum, 10);
      if (Number.isInteger(parsedCustNum)) {
        return parsedCustNum;
      }
    }

    return null;
  }

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

  private extractCancellationReason(params: unknown): string {
    const reason = this.asRecord(params)?.['reason'];
    return typeof reason === 'string' && reason.length > 0
      ? reason
      : 'The tool execution was cancelled.';
  }

  private extractTheme(value: unknown): McpUiTheme | null {
    return value === 'light' || value === 'dark' ? value : null;
  }

  private extractHostStyleVariables(styles: unknown): Record<string, string> {
    const variables = this.asRecord(this.asRecord(styles)?.['variables']);
    if (!variables) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(variables).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    );
  }

  private asJsonRpcMessage(value: unknown): JsonRpcMessage | null {
    const record = this.asRecord(value);
    if (!record || record['jsonrpc'] !== '2.0') {
      return null;
    }

    return record as JsonRpcMessage;
  }

  private asRecord(value: unknown): Record<string, any> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return null;
    }

    return value as Record<string, any>;
  }

  private toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }

  private dispose(): void {
    window.removeEventListener('message', this.messageHandler);
    this.disconnectResizeObserver();

    for (const pendingRequest of this.pendingRequests.values()) {
      pendingRequest.reject(new Error('The MCP Apps bridge was disposed.'));
    }

    this.pendingRequests.clear();
  }
}
