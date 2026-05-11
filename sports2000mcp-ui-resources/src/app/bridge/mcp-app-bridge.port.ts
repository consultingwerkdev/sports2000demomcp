import { InjectionToken, Signal } from '@angular/core';
import {
  McpAppStatus,
  McpAppViewState,
  McpModelContextUpdate,
  McpToolArguments
} from './mcp-app.types';
import { McpUiAuthPayload } from '../auth/mcp-ui-auth.types';

/**
 * Describes the bridge API used by Angular code to communicate with the MCP host.
 *
 * @memberof McpAppBridge
 */
export interface McpAppBridgePort {
  readonly state: Signal<McpAppViewState>;
  readonly uiAuth: Signal<McpUiAuthPayload | null>;
  readonly isDevEmulator: boolean;

  /**
   * Updates the shell status shown to the Angular UI.
   *
   * @param {McpAppStatus} status - The next shell status to publish.
   * @memberof McpAppBridgePort
   */
  setStatus(status: McpAppStatus): void;

  /**
   * Moves the shell into an error state with a message for the user.
   *
   * @param {string} message - The error message to expose through the bridge state.
   * @memberof McpAppBridgePort
   */
  setError(message: string): void;

  /**
   * Clears the current shell error and restores the appropriate workflow state.
   *
   * @memberof McpAppBridgePort
   */
  clearError(): void;

  /**
   * Starts the form flow with a new set of tool arguments.
   *
   * @param {McpToolArguments} argumentsRecord - The tool arguments to submit to the shell.
   * @memberof McpAppBridgePort
   */
  submitToolArguments(argumentsRecord: McpToolArguments): void;

  /**
   * Resets the current tool arguments and returns the shell to its waiting state.
   *
   * @memberof McpAppBridgePort
   */
  clearToolArguments(): void;

  /**
   * Requests a fresh bearer token from the host-managed refresh tool.
   *
   * @returns {Promise<McpUiAuthPayload>} - The refreshed UI auth payload.
   * @memberof McpAppBridgePort
   */
  refreshUiAuthToken(): Promise<McpUiAuthPayload>;

  /**
   * Sends model-context content from the widget to the host.
   *
   * @param {McpModelContextUpdate} update - The context update payload to persist for later turns.
   * @returns {Promise<void>} - Resolves when the host acknowledges the context update.
   * @memberof McpAppBridgePort
   */
  updateModelContext(update: McpModelContextUpdate): Promise<void>;
}

/**
 * Provides the injected bridge implementation used by the Angular shell.
 *
 * @memberof McpAppBridge
 */
export const MCP_APP_BRIDGE = new InjectionToken<McpAppBridgePort>('MCP_APP_BRIDGE');
