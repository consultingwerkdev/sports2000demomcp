import { Component, Input, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SmartAuthenticationService, SmartServiceAdapter } from '@consultingwerk/smartcomponent-library';
import { App } from './app';
import { McpAppBridgeService } from './mcp-app-bridge.service';
import { McpAppViewState } from './mcp-app.types';

const createState = (overrides: Partial<McpAppViewState> = {}): McpAppViewState => ({
  status: 'awaitingToolInput',
  custNum: null,
  toolResultText: null,
  lastHostContext: null,
  errorMessage: null,
  ...overrides
});

class MockMcpAppBridgeService {
  private readonly stateSource = signal<McpAppViewState>(createState());

  readonly state = this.stateSource.asReadonly();

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

  beforeEach(async () => {
    bridge = new MockMcpAppBridgeService();
    serviceAdapter = new MockSmartServiceAdapter();

    await TestBed.configureTestingModule({
      declarations: [App, FakeMcpFormComponent],
      providers: [
        { provide: McpAppBridgeService, useValue: bridge },
        { provide: SmartAuthenticationService, useClass: MockSmartAuthenticationService },
        { provide: SmartServiceAdapter, useValue: serviceAdapter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
  });

  it('shows the neutral placeholder before tool input', () => {
    bridge.pushState(createState());
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Waiting for a customer request');
    expect(text).toContain('stay neutral until an approved show-customer tool call');
    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).toBeNull();
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

  it('renders the form once the customer is loading and the adapter is authenticated', async () => {
    serviceAdapter.adapterState.set({ authenticated: true });
    bridge.pushState(
      createState({
        status: 'loadingCustomer',
        custNum: 42
      })
    );

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('smart-mcp-form'))).not.toBeNull();
  });
});
