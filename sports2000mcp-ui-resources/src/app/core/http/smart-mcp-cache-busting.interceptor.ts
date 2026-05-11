import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CACHE_BUST_QUERY_PARAM } from './smart-mcp-cache-busting.constants';

/**
 * Appends a cache-busting query parameter to selected GET requests in the MCP shell.
 *
 * @memberof SmartMcpHttp
 */
@Injectable()
export class SmartMcpCacheBustingInterceptor implements HttpInterceptor {
  /**
   * Intercepts outgoing HTTP requests and appends a cache-busting token when needed.
   *
   * @param {HttpRequest<unknown>} req - The outgoing request.
   * @param {HttpHandler} next - The next HTTP handler in the chain.
   * @returns {Observable<HttpEvent<unknown>>} - The handled HTTP event stream.
   * @memberof SmartMcpCacheBustingInterceptor
   */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.shouldBypassCache(req)) {
      return next.handle(req);
    }

    const cacheBustedRequest = req.clone({
      params: req.params.set(CACHE_BUST_QUERY_PARAM, Date.now().toString())
    });

    return next.handle(cacheBustedRequest);
  }

  /**
   * Determines whether a request targets one of the backend endpoints that should bypass caching.
   *
   * @param {HttpRequest<unknown>} req - The outgoing request.
   * @returns {boolean} - True when the request should receive a cache-busting query parameter.
   * @memberof SmartMcpCacheBustingInterceptor
   */
  private shouldBypassCache(req: HttpRequest<unknown>): boolean {
    if (req.method.toUpperCase() !== 'GET') {
      return false;
    }

    return this.getCacheBustingBaseUrls().some((baseUrl) => req.url.startsWith(baseUrl));
  }

  /**
   * Returns the distinct backend base URLs that should opt out of caching.
   *
   * @returns {string[]} - The base URLs that should receive cache-busting query parameters.
   * @memberof SmartMcpCacheBustingInterceptor
   */
  private getCacheBustingBaseUrls(): string[] {
    return Array.from(
      new Set(
        [
          environment.app.smartComponentLibraryServiceUri,
          environment.app.smartServiceUri
        ].filter((value): value is string => value.length > 0)
      )
    );
  }
}
