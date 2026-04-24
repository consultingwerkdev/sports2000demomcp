import {
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SmartMcpCacheBustingInterceptor } from './smart-mcp-cache-busting.interceptor';

describe('SmartMcpCacheBustingInterceptor', () => {
  let interceptor: SmartMcpCacheBustingInterceptor;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    interceptor = new SmartMcpCacheBustingInterceptor();
    next = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);
    next.handle.and.returnValue(of(new HttpResponse({ status: 200 })));
  });

  it('appends a cache-busting query parameter to GET requests for the smart service URI', () => {
    const request = new HttpRequest(
      'GET',
      `${environment.app.smartServiceUri}/rest/layouts/Sports2000Mcp_CustomerForm`
    );

    interceptor.intercept(request, next).subscribe();

    const forwardedRequest = next.handle.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(forwardedRequest.params.has('_mcpnocache')).toBeTrue();
  });

  it('appends a cache-busting query parameter to GET requests for the smart component library service URI', () => {
    const request = new HttpRequest(
      'GET',
      `${environment.app.smartComponentLibraryServiceUri}/rest/smart/form-layout`
    );

    interceptor.intercept(request, next).subscribe();

    const forwardedRequest = next.handle.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(forwardedRequest.params.has('_mcpnocache')).toBeTrue();
  });

  it('does not modify non-GET requests', () => {
    const request = new HttpRequest(
      'POST',
      `${environment.app.smartServiceUri}/rest/layouts/Sports2000Mcp_CustomerForm`,
      null
    );

    interceptor.intercept(request, next).subscribe();

    const forwardedRequest = next.handle.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(forwardedRequest.params.has('_mcpnocache')).toBeFalse();
  });

  it('does not modify unrelated GET requests', () => {
    const request = new HttpRequest('GET', 'https://example.com/health');

    interceptor.intercept(request, next).subscribe();

    const forwardedRequest = next.handle.calls.mostRecent().args[0] as HttpRequest<unknown>;
    expect(forwardedRequest.params.has('_mcpnocache')).toBeFalse();
  });
});
