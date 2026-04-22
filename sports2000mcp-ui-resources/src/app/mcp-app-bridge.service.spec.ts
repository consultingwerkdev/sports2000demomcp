import { TestBed } from '@angular/core/testing';
import { McpAppBridgeService } from './mcp-app-bridge.service';

describe('McpAppBridgeService', () => {
  let service: McpAppBridgeService;
  let postMessageSpy: jasmine.Spy;

  beforeEach(() => {
    postMessageSpy = spyOn(window.parent, 'postMessage');
    TestBed.configureTestingModule({});
    service = TestBed.inject(McpAppBridgeService);
  });

  function getInitializeRequest(): { id: number; method: string } {
    const initializeRequest = postMessageSpy.calls
      .allArgs()
      .map(([message]) => message as { id: number; method: string })
      .find((message) => message.method === 'ui/initialize');

    if (!initializeRequest) {
      throw new Error('Expected an initialize request to be sent to the host.');
    }

    return initializeRequest;
  }

  function completeInitializeHandshake(): void {
    const initializeRequest = getInitializeRequest();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          id: initializeRequest.id,
          result: {
            hostInfo: {
              name: 'Test Host'
            }
          }
        }
      })
    );
  }

  it('moves into awaitingToolInput once the host handshake completes', async () => {
    expect(service.state().status).toBe('booting');
    expect(getInitializeRequest().method).toBe('ui/initialize');

    completeInitializeHandshake();
    await Promise.resolve();
    await Promise.resolve();

    expect(service.state().status).toBe('awaitingToolInput');
    expect(
      postMessageSpy.calls
        .allArgs()
        .some(([message]) => (message as { method?: string }).method === 'ui/notifications/initialized')
    ).toBeTrue();
  });

  it('captures full tool input and moves to authenticating', () => {
    completeInitializeHandshake();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          method: 'ui/notifications/tool-input',
          params: {
            arguments: {
              custNum: 42
            }
          }
        }
      })
    );

    expect(service.state().status).toBe('authenticating');
    expect(service.state().custNum).toBe(42);
  });

  it('captures tool result text', () => {
    completeInitializeHandshake();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          method: 'ui/notifications/tool-result',
          params: {
            content: [
              {
                type: 'text',
                text: 'Opening customer 42 in the Sports2000 customer app.'
              }
            ]
          }
        }
      })
    );

    expect(service.state().toolResultText).toBe(
      'Opening customer 42 in the Sports2000 customer app.'
    );
  });

  it('captures host theme and style variables from host context notifications', () => {
    completeInitializeHandshake();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          method: 'ui/notifications/host-context-changed',
          params: {
            theme: 'dark',
            styles: {
              variables: {
                '--color-background-primary': '#101418',
                '--color-text-primary': '#f3f4f6'
              }
            }
          }
        }
      })
    );

    expect(service.state().hostTheme).toBe('dark');
    expect(service.state().hostStyleVariables['--color-background-primary']).toBe('#101418');
    expect(service.state().hostStyleVariables['--color-text-primary']).toBe('#f3f4f6');
  });

  it('ignores malformed host context payloads without throwing', () => {
    completeInitializeHandshake();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          method: 'ui/notifications/host-context-changed',
          params: {
            theme: 'sepia',
            styles: {
              variables: 'invalid'
            }
          }
        }
      })
    );

    expect(service.state().hostTheme).toBeNull();
    expect(service.state().hostStyleVariables).toEqual({});
  });

  it('responds to ping and resource teardown requests', () => {
    completeInitializeHandshake();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          id: 77,
          method: 'ping'
        }
      })
    );

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          id: 78,
          method: 'ui/resource-teardown'
        }
      })
    );

    const responses = postMessageSpy.calls
      .allArgs()
      .map(([message]) => message as { id?: number; result?: unknown });

    expect(responses.some((message) => message.id === 77)).toBeTrue();
    expect(responses.some((message) => message.id === 78)).toBeTrue();
  });

  it('moves to error when tool input is missing custNum', () => {
    completeInitializeHandshake();

    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          jsonrpc: '2.0',
          method: 'ui/notifications/tool-input',
          params: {
            arguments: {}
          }
        }
      })
    );

    expect(service.state().status).toBe('error');
    expect(service.state().errorMessage).toContain('custNum');
  });
});
