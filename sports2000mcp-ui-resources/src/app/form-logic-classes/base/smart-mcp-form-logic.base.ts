import { SmartFormComponent, SmartFormLogic } from '@consultingwerk/smartcomponent-library';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../../bridge/mcp-app-bridge.port';
import { McpToolArguments } from '../../bridge/mcp-app.types';

export abstract class SmartMcpFormLogicBase<TRequest> extends SmartFormLogic {
  protected get form(): SmartFormComponent {
    return this.smartFormInstance;
  }

  protected get appBridge(): McpAppBridgePort {
    return this.getService(MCP_APP_BRIDGE);
  }

  public override init(): void {
    const request = this.parseRequest(this.appBridge.state().toolArguments);
    if (request === null) {
      return;
    }

    void this.runInitialLoad(request);
  }

  protected abstract parseRequest(toolArguments: McpToolArguments | null): TRequest | null;

  protected abstract runInitialLoad(request: TRequest): Promise<void>;

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

  protected setShellReady(): void {
    this.appBridge.setStatus('ready');
  }

  protected setShellError(message: string): void {
    this.appBridge.setError(message);
  }

  protected isCurrentRequest(matches: (toolArguments: McpToolArguments | null) => boolean): boolean {
    return matches(this.appBridge.state().toolArguments);
  }

  protected toErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
