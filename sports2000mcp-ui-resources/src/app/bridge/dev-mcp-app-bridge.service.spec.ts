import { TestBed } from '@angular/core/testing';
import { DevMcpAppBridgeService } from './dev-mcp-app-bridge.service';

describe('DevMcpAppBridgeService', () => {
  let service: DevMcpAppBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevMcpAppBridgeService);
  });

  it('starts in awaitingToolInput', () => {
    expect(service.isDevEmulator).toBeTrue();
    expect(service.state().status).toBe('awaitingToolInput');
    expect(service.state().toolArguments).toBeNull();
    expect(service.state().hostTheme).toBe('light');
  });

  it('moves to authenticating when a valid customer number is submitted', () => {
    service.submitToolArguments({ custNum: 42 });

    expect(service.state().status).toBe('authenticating');
    expect(service.state().toolArguments?.['custNum']).toBe(42);
    expect(service.state().toolResultText).toContain('42');
  });

  it('moves to error when the customer number is invalid', () => {
    service.submitToolArguments({ custNum: 42.5 });

    expect(service.state().status).toBe('error');
    expect(service.state().errorMessage).toContain('custNum');
  });

  it('clears back to the neutral shell state', () => {
    service.submitToolArguments({ custNum: 42 });

    service.clearToolArguments();

    expect(service.state().status).toBe('awaitingToolInput');
    expect(service.state().toolArguments).toBeNull();
    expect(service.state().toolResultText).toBeNull();
    expect(service.state().errorMessage).toBeNull();
  });
});
