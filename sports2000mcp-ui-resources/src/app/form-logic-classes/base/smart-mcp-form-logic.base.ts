import { SmartFormComponent, SmartFormLogic } from '@consultingwerk/smartcomponent-library';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../../bridge/mcp-app-bridge.port';
import { McpToolArguments } from '../../bridge/mcp-app.types';

/**
 * Provides common bridge-aware helpers for Smart form logic classes hosted in the MCP shell.
 *
 * @memberof SmartMcpFormLogic
 */
export abstract class SmartMcpFormLogicBase<TRequest> extends SmartFormLogic {
  /**
   * Returns the typed SmartForm component associated with the current logic instance.
   *
   * @returns {SmartFormComponent} - The active SmartForm component.
   * @memberof SmartMcpFormLogicBase
   */
  protected get form(): SmartFormComponent {
    return this.smartFormInstance;
  }

  /**
   * Returns the injected MCP bridge used by the shell.
   *
   * @returns {McpAppBridgePort} - The injected bridge implementation.
   * @memberof SmartMcpFormLogicBase
   */
  protected get appBridge(): McpAppBridgePort {
    return this.getService(MCP_APP_BRIDGE);
  }

  /**
   * Parses the current tool arguments and starts the initial form load when valid.
   *
   * @memberof SmartMcpFormLogicBase
   */
  public override init(): void {
    const request = this.parseRequest(this.appBridge.state().toolArguments);
    if (request === null) {
      return;
    }

    void this.runInitialLoad(request);
  }

  /**
   * Parses the current tool arguments into the request shape required by the concrete logic.
   *
   * @param {McpToolArguments | null} toolArguments - The current bridge tool arguments.
   * @returns {TRequest | null} - The normalized request, if valid.
   * @memberof SmartMcpFormLogicBase
   */
  protected abstract parseRequest(toolArguments: McpToolArguments | null): TRequest | null;

  /**
   * Performs the initial form load for a valid parsed request.
   *
   * @param {TRequest} request - The normalized request created from tool arguments.
   * @returns {Promise<void>} - Resolves after the initial form load finishes.
   * @memberof SmartMcpFormLogicBase
   */
  protected abstract runInitialLoad(request: TRequest): Promise<void>;

  /**
   * Extracts an integer argument from the current tool arguments or raises a shell error.
   *
   * @param {McpToolArguments | null} toolArguments - The tool arguments to inspect.
   * @param {string} argumentName - The argument name to extract.
   * @param {string} errorMessage - The shell error to publish when parsing fails.
   * @returns {number | null} - The parsed integer value, if valid.
   * @memberof SmartMcpFormLogicBase
   */
  protected requireIntegerArgument(
    toolArguments: McpToolArguments | null,
    argumentName: string,
    errorMessage: string
  ): number | null {
    const rawValue = toolArguments?.[argumentName];

    if (typeof rawValue === 'number' && Number.isInteger(rawValue)) {
      return rawValue;
    }

    if (typeof rawValue === 'string') {
      const parsedValue = Number.parseInt(rawValue, 10);
      if (Number.isInteger(parsedValue)) {
        return parsedValue;
      }
    }

    this.setShellError(errorMessage);
    return null;
  }

  /**
   * Marks the shell as ready once the form has finished loading.
   *
   * @memberof SmartMcpFormLogicBase
   */
  protected setShellReady(): void {
    this.appBridge.setStatus('ready');
  }

  /**
   * Publishes a shell error through the MCP bridge.
   *
   * @param {string} message - The error message shown by the shell.
   * @memberof SmartMcpFormLogicBase
   */
  protected setShellError(message: string): void {
    this.appBridge.setError(message);
  }

  /**
   * Indicates whether the current bridge request still matches a caller-supplied predicate.
   *
   * @param {(toolArguments: McpToolArguments | null) => boolean} matches - The predicate used to compare the current request.
   * @returns {boolean} - True when the active bridge request still matches.
   * @memberof SmartMcpFormLogicBase
   */
  protected isCurrentRequest(matches: (toolArguments: McpToolArguments | null) => boolean): boolean {
    return matches(this.appBridge.state().toolArguments);
  }

  /**
   * Converts an unknown thrown value into a user-facing error message.
   *
   * @param {unknown} error - The thrown error candidate.
   * @param {string} fallback - The fallback message when no Error message is available.
   * @returns {string} - The resolved error text.
   * @memberof SmartMcpFormLogicBase
   */
  protected toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
