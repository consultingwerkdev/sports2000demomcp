import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  SmartAuthenticationService,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';
import { McpUiAuthSessionService } from './mcp-ui-auth-session.service';
import { Sports2000AuthFacade } from './sports2000-auth.facade';
import { MCP_APP_BRIDGE, McpAppBridgePort } from '../bridge/mcp-app-bridge.port';
import { McpAppViewState } from '../bridge/mcp-app.types';
import { McpUiAuthPayload } from './mcp-ui-auth.types';

const createState = (overrides: Partial<McpAppViewState> = {}): McpAppViewState => ({
  status: 'awaitingToolInput',
  toolArguments: null,
  toolResultText: null,
  lastHostContext: null,
  hostTheme: 'light',
  hostStyleVariables: {},
  errorMessage: null,
  ...overrides
});

const createUiAuthPayload = (): McpUiAuthPayload => ({
  accessToken: 'header.payload.signature',
  tokenType: 'Bearer',
  expiresAtUtc: '2099-01-01T00:00:00.000Z'
});

class MockMcpAppBridgeService implements McpAppBridgePort {
  private readonly stateSource = signal<McpAppViewState>(createState());
  private readonly uiAuthSource = signal<McpUiAuthPayload | null>(null);

  readonly state = this.stateSource.asReadonly();
  readonly uiAuth = this.uiAuthSource.asReadonly();
  readonly isDevEmulator: boolean;

  constructor(isDevEmulator: boolean) {
    this.isDevEmulator = isDevEmulator;
  }

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

  pushUiAuth(payload: McpUiAuthPayload | null): void {
    this.uiAuthSource.set(payload);
  }
}

class MockSmartAuthenticationService {
  readonly initialize = jasmine.createSpy('initialize').and.resolveTo(undefined);
}

class MockSmartServiceAdapter {
  readonly adapterState = signal({ authenticated: false });
  readonly stateSignal = this.adapterState.asReadonly();
  readonly login = jasmine.createSpy('login').and.resolveTo(undefined);
}

describe('Sports2000AuthFacade', () => {
  async function configure(isDevEmulator: boolean): Promise<{
    facade: Sports2000AuthFacade;
    bridge: MockMcpAppBridgeService;
    authService: MockSmartAuthenticationService;
    serviceAdapter: MockSmartServiceAdapter;
    authSession: McpUiAuthSessionService;
  }> {
    const bridge = new MockMcpAppBridgeService(isDevEmulator);
    const serviceAdapter = new MockSmartServiceAdapter();

    await TestBed.configureTestingModule({
      providers: [
        Sports2000AuthFacade,
        { provide: MCP_APP_BRIDGE, useValue: bridge },
        { provide: SmartAuthenticationService, useClass: MockSmartAuthenticationService },
        { provide: SmartServiceAdapter, useValue: serviceAdapter }
      ]
    }).compileComponents();

    return {
      facade: TestBed.inject(Sports2000AuthFacade),
      bridge,
      authService: TestBed.inject(
        SmartAuthenticationService
      ) as unknown as MockSmartAuthenticationService,
      serviceAdapter,
      authSession: TestBed.inject(McpUiAuthSessionService)
    };
  }

  afterEach(() => TestBed.resetTestingModule());

  it('waits for ui auth before authenticating in real host mode', async () => {
    const { facade, authService, serviceAdapter } = await configure(false);

    await facade.ensureAuthenticatedForState(
      createState({
        status: 'authenticating',
        toolArguments: { custNum: 42 }
      })
    );

    expect(authService.initialize).not.toHaveBeenCalled();
    expect(serviceAdapter.login).not.toHaveBeenCalled();
  });

  it('uses mcpbearer in real host mode once ui auth exists', async () => {
    const { facade, authService, serviceAdapter, authSession } = await configure(false);
    authSession.setPayload(createUiAuthPayload());

    await facade.ensureAuthenticatedForState(
      createState({
        status: 'authenticating',
        toolArguments: { custNum: 42 }
      })
    );

    expect(authService.initialize).toHaveBeenCalledWith(
      {
        strategy: 'mcpbearer'
      },
      {
        serviceURI: 'https://sfrbo.consultingwerkcloud.com:8821/smartkeycloak'
      }
    );
    expect(serviceAdapter.login).toHaveBeenCalled();
  });

  it('uses hybridrealm in dev emulator mode', async () => {
    const { facade, authService, serviceAdapter } = await configure(true);

    await facade.ensureAuthenticatedForState(
      createState({
        status: 'authenticating',
        toolArguments: { custNum: 42 }
      })
    );

    expect(authService.initialize).toHaveBeenCalledWith(
      {
        strategy: 'hybridrealm'
      },
      {
        serviceURI: 'https://sfrbo.consultingwerkcloud.com:8821',
        credentials: {
          username: 'admin',
          password: 'password'
        }
      }
    );
    expect(serviceAdapter.login).toHaveBeenCalled();
  });
});
