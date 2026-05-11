import { Injectable, signal } from '@angular/core';
import { McpAppBridgePort } from './mcp-app-bridge.port';
import {
  McpAppStatus,
  McpAppViewState,
  McpModelContextUpdate,
  McpToolArguments
} from './mcp-app.types';
import { McpUiAuthPayload } from '../auth/mcp-ui-auth.types';
import { INITIAL_DEV_MCP_APP_VIEW_STATE } from './mcp-app-bridge.constants';

/**
 * Implements a local-only bridge used while developing the Angular shell outside an MCP host.
 *
 * @memberof McpAppBridge
 */
@Injectable({ providedIn: 'root' })
export class DevMcpAppBridgeService implements McpAppBridgePort {
  private readonly stateSignal = signal<McpAppViewState>(INITIAL_DEV_MCP_APP_VIEW_STATE);
  private readonly uiAuthSignal = signal<McpUiAuthPayload | null>(null);

  readonly state = this.stateSignal.asReadonly();
  readonly uiAuth = this.uiAuthSignal.asReadonly();
  readonly isDevEmulator = true;

  /**
   * Updates the shell status in the dev emulator.
   *
   * @param {McpAppStatus} status - The next shell status.
   * @memberof DevMcpAppBridgeService
   */
  setStatus(status: McpAppStatus): void {
    this.patchState({
      status,
      errorMessage: status === 'error' ? this.stateSignal().errorMessage : null
    });
  }

  /**
   * Publishes an error state in the dev emulator.
   *
   * @param {string} message - The error message to show in the shell.
   * @memberof DevMcpAppBridgeService
   */
  setError(message: string): void {
    this.patchState({
      status: 'error',
      errorMessage: message
    });
  }

  /**
   * Clears the current dev-emulator error and restores the next workflow state.
   *
   * @memberof DevMcpAppBridgeService
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
   * Normalizes the provided dev-emulator tool arguments and starts the shell flow.
   *
   * @param {McpToolArguments} argumentsRecord - The tool arguments supplied from the local dev UI.
   * @memberof DevMcpAppBridgeService
   */
  submitToolArguments(argumentsRecord: McpToolArguments): void {
    const custNum = this.extractCustNum(argumentsRecord);
    if (custNum === null) {
      this.setError('The show-customer tool requires a numeric custNum input.');
      return;
    }

    this.patchState({
      status: 'authenticating',
      toolArguments: { custNum },
      toolResultText: `Dev emulator opening customer ${custNum}.`,
      errorMessage: null
    });
  }

  /**
   * Clears the current dev-emulator tool flow.
   *
   * @memberof DevMcpAppBridgeService
   */
  clearToolArguments(): void {
    this.patchState({
      status: 'awaitingToolInput',
      toolArguments: null,
      toolResultText: null,
      errorMessage: null
    });
  }

  /**
   * Rejects token refresh requests because the local emulator does not provide host-managed auth.
   *
   * @returns {Promise<McpUiAuthPayload>} - A rejected promise describing the unsupported operation.
   * @memberof DevMcpAppBridgeService
   */
  refreshUiAuthToken(): Promise<McpUiAuthPayload> {
    return Promise.reject(
      new Error('The ng serve emulator does not support MCP-managed bearer token refresh.')
    );
  }

  /**
   * Logs model-context updates locally so the shell can exercise that path during development.
   *
   * @param {McpModelContextUpdate} update - The context payload that would be sent to a host.
   * @returns {Promise<void>} - A resolved promise because no host acknowledgment is required.
   * @memberof DevMcpAppBridgeService
   */
  updateModelContext(update: McpModelContextUpdate): Promise<void> {
    console.debug('[sports2000-mcp-ui] Dev model context update', update);
    return Promise.resolve();
  }

  /**
   * Applies a partial state update to the local dev-emulator bridge state.
   *
   * @param {Partial<McpAppViewState>} patch - The state fragment to merge.
   * @memberof DevMcpAppBridgeService
   */
  private patchState(patch: Partial<McpAppViewState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch
    }));
  }

  /**
   * Extracts a numeric customer number from the dev-emulator tool arguments.
   *
   * @param {McpToolArguments} argumentsRecord - The tool arguments to inspect.
   * @returns {number | null} - The parsed customer number, if valid.
   * @memberof DevMcpAppBridgeService
   */
  private extractCustNum(argumentsRecord: McpToolArguments): number | null {
    const rawCustNum = argumentsRecord['custNum'];

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
}
