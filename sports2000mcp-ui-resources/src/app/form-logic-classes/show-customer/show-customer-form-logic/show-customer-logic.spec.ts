import { EnvironmentInjector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { McpAppBridgePort } from '../../../bridge/mcp-app-bridge.port';
import { McpAppViewState } from '../../../bridge/mcp-app.types';
import { McpUiAuthPayload } from '../../../auth/mcp-ui-auth.types';
import { MCP_APP_BRIDGE } from '../../../bridge/mcp-app-bridge.port';
import { Sports2000McpShowCustomerFormLogic } from './show-customer-logic';

const createState = (overrides: Partial<McpAppViewState> = {}): McpAppViewState => ({
  status: 'loadingForm',
  toolArguments: { custNum: 42 },
  toolResultText: null,
  lastHostContext: null,
  hostTheme: 'light',
  hostStyleVariables: {},
  errorMessage: null,
  ...overrides
});

class MockMcpAppBridgeService implements McpAppBridgePort {
  private readonly stateSource = signal<McpAppViewState>(createState());
  private readonly uiAuthSource = signal<McpUiAuthPayload | null>(null);

  readonly state = this.stateSource.asReadonly();
  readonly uiAuth = this.uiAuthSource.asReadonly();
  readonly isDevEmulator = false;

  setStatus(status: McpAppViewState['status']): void {
    this.stateSource.update((state) => ({ ...state, status }));
  }

  setError(message: string): void {
    this.stateSource.update((state) => ({ ...state, status: 'error', errorMessage: message }));
  }

  clearError(): void {}

  submitToolArguments(): void {}

  clearToolArguments(): void {}

  refreshUiAuthToken(): Promise<McpUiAuthPayload> {
    return Promise.reject(new Error('Not used in this test.'));
  }

  updateModelContext(): Promise<void> {
    return Promise.resolve();
  }

  pushState(state: McpAppViewState): void {
    this.stateSource.set(state);
  }
}

describe('Sports2000McpShowCustomerFormLogic', () => {
  let bridge: MockMcpAppBridgeService;

  beforeEach(async () => {
    bridge = new MockMcpAppBridgeService();

    await TestBed.configureTestingModule({
      providers: [{ provide: MCP_APP_BRIDGE, useValue: bridge }]
    }).compileComponents();
  });

  afterEach(() => TestBed.resetTestingModule());

  async function instantiateLogic(fetchImpl?: () => Promise<{ data: unknown[] }>): Promise<jasmine.Spy> {
    const injector = TestBed.inject(EnvironmentInjector);
    const fetch = jasmine
      .createSpy('fetch')
      .and.callFake(
        fetchImpl ??
          (() =>
            Promise.resolve({
              data: [{ CustNum: 42 }]
            }))
      );

    const fakeForm = {
      injector,
      getFormDatasourceAsObservable: () =>
        of({
          fetch
        })
    } as any;

    TestBed.runInInjectionContext(() => {
      new Sports2000McpShowCustomerFormLogic(fakeForm);
    });

    await Promise.resolve();
    await Promise.resolve();

    return fetch;
  }

  it('fetches the requested customer and marks the shell ready on a single match', async () => {
    const fetch = await instantiateLogic();

    expect(fetch).toHaveBeenCalled();
    expect(bridge.state().status).toBe('ready');
    expect(bridge.state().errorMessage).toBeNull();
  });

  it('moves to error when no customer matches', async () => {
    await instantiateLogic(() => Promise.resolve({ data: [] }));

    expect(bridge.state().status).toBe('error');
    expect(bridge.state().errorMessage).toBe('Customer 42 was not found.');
  });

  it('moves to error when multiple customers match', async () => {
    await instantiateLogic(() =>
      Promise.resolve({
        data: [{ CustNum: 42 }, { CustNum: 42 }]
      })
    );

    expect(bridge.state().status).toBe('error');
    expect(bridge.state().errorMessage).toBe('Customer lookup for 42 returned multiple records.');
  });

  it('moves to error when the customer datasource is missing', async () => {
    const injector = TestBed.inject(EnvironmentInjector);
    const fakeForm = {
      injector,
      getFormDatasourceAsObservable: () => null
    } as any;

    TestBed.runInInjectionContext(() => {
      new Sports2000McpShowCustomerFormLogic(fakeForm);
    });

    expect(bridge.state().status).toBe('error');
    expect(bridge.state().errorMessage).toContain('CustomerDataSource');
  });

  it('moves to error when fetching throws', async () => {
    await instantiateLogic(() => Promise.reject(new Error('Fetch exploded.')));

    expect(bridge.state().status).toBe('error');
    expect(bridge.state().errorMessage).toBe('Fetch exploded.');
  });

  it('moves to error when custNum is missing', async () => {
    bridge.pushState(
      createState({
        toolArguments: {}
      })
    );

    await instantiateLogic();

    expect(bridge.state().status).toBe('error');
    expect(bridge.state().errorMessage).toContain('custNum');
  });
});
