import { Component, Input, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SmartAuthenticationService, SmartServiceAdapter } from '@consultingwerk/smartcomponent-library';
import { App } from './app';
import { MCP_APP_BRIDGE, McpAppBridgePort } from './mcp-app-bridge.port';
import { McpAppViewState } from './mcp-app.types';

const createState = (overrides: Partial<McpAppViewState> = {}): McpAppViewState => ({
  status: 'awaitingToolInput',
  custNum: null,
  toolResultText: null,
  lastHostContext: null,
  hostTheme: 'light',
  hostStyleVariables: {},
  errorMessage: null,
  ...overrides
});

class MockMcpAppBridgeService implements McpAppBridgePort {
  private readonly stateSource = signal<McpAppViewState>(createState());

  readonly state = this.stateSource.asReadonly();
  readonly isDevEmulator: boolean;

  constructor(isDevEmulator = false) {
    this.isDevEmulator = isDevEmulator;
  }

  setStatus(status: McpAppViewState['status']): void {
    this.stateSource.update((state) => ({
      ...state,
      status,
      errorMessage: status === 'error' ? state.errorMessage : null
    }));
  }

  setError(message: string): void {
    this.stateSource.update((state) => ({
      ...state,
      status: 'error',
      errorMessage: message
    }));
  }

  clearError(): void {
    this.stateSource.update((state) => ({
      ...state,
      errorMessage: null
    }));
  }

  submitCustomerInput(custNum: number): void {
    this.stateSource.update((state) => ({
      ...state,
      status: 'authenticating',
      custNum,
      toolResultText: `Dev emulator opening customer ${custNum}.`,
      errorMessage: null
    }));
  }

  clearCustomerInput(): void {
    this.stateSource.set(createState());
  }

  pushState(state: McpAppViewState): void {
    this.stateSource.set(state);
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

@Component({
  selector: 'smart-mcp-form',
  template: '',
  standalone: false
})
class FakeMcpFormComponent {
  @Input('smart-form-layout') formLayout = '';

  readonly fetch = jasmine.createSpy('fetch').and.resolveTo({
    data: [{ CustNum: 42 }],
    total: 1
  });

  getFormDatasourceAsObservable() {
    return of({
      fetch: this.fetch
    });
  }
}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let bridge: MockMcpAppBridgeService;
  let serviceAdapter: MockSmartServiceAdapter;

  async function configureTestingModule(isDevEmulator = false): Promise<void> {
    bridge = new MockMcpAppBridgeService(isDevEmulator);
    serviceAdapter = new MockSmartServiceAdapter();

    await TestBed.configureTestingModule({
      declarations: [App, FakeMcpFormComponent],
      providers: [
        { provide: MCP_APP_BRIDGE, useValue: bridge },
        { provide: SmartAuthenticationService, useClass: MockSmartAuthenticationService },
        { provide: SmartServiceAdapter, useValue: serviceAdapter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
  }

  beforeEach(async () => {
    await configureTestingModule();
  });

  it('shows the neutral logo placeholder before tool input', () => {
    bridge.pushState(createState());
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.loading-brand__logo'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.status-copy'))).toBeNull();
    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).toBeNull();
  });

  it('does not show the dev toolbar in MCP mode', () => {
    bridge.pushState(createState());
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.dev-toolbar'))).toBeNull();
  });

  it('shows a not found state with the requested customer number', () => {
    bridge.pushState(
      createState({
        status: 'notFound',
        custNum: 42
      })
    );

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Customer 42 was not found');
    expect(text).toContain('The backend returned no record for customer 42');
  });

  it('shows a single centered error state when the shell is in an error state', () => {
    bridge.pushState(
      createState({
        status: 'error',
        errorMessage: 'Authentication failed.'
      })
    );

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Unable to open the customer form');
    expect(text).toContain('Authentication failed.');
    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).toBeNull();
  });

  it('renders the form once the customer is loading and the adapter is authenticated', async () => {
    serviceAdapter.adapterState.set({ authenticated: true });
    bridge.pushState(
      createState({
        status: 'ready',
        custNum: 42
      })
    );

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).not.toBeNull();
  });

  it('shows the dev toolbar and loads a customer only after a manual submit', async () => {
    TestBed.resetTestingModule();
    await configureTestingModule(true);

    bridge.pushState(createState());
    fixture.detectChanges();

    const toolbar = fixture.debugElement.query(By.css('.dev-toolbar'));
    expect(toolbar).not.toBeNull();
    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).toBeNull();

    bridge.submitCustomerInput(42);
    serviceAdapter.adapterState.set({ authenticated: true });
    bridge.pushState(
      createState({
        status: 'ready',
        custNum: 42,
        toolResultText: 'Dev emulator opening customer 42.'
      })
    );

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).not.toBeNull();
    expect(bridge.state().custNum).toBe(42);
  });

  it('clears the active customer in dev mode', async () => {
    TestBed.resetTestingModule();
    await configureTestingModule(true);

    bridge.pushState(
      createState({
        status: 'ready',
        custNum: 42
      })
    );
    serviceAdapter.adapterState.set({ authenticated: true });

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).not.toBeNull();

    bridge.clearCustomerInput();
    fixture.detectChanges();

    expect(bridge.state().status).toBe('awaitingToolInput');
    expect(bridge.state().custNum).toBeNull();
    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).toBeNull();
  });
});
