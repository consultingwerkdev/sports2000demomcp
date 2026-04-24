import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const CACHE_BUST_QUERY_PARAM = '_mcpnocache';

@Injectable()
export class SmartMcpCacheBustingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.shouldBypassCache(req)) {
      return next.handle(req);
    }

    const cacheBustedRequest = req.clone({
      params: req.params.set(CACHE_BUST_QUERY_PARAM, Date.now().toString())
    });

    return next.handle(cacheBustedRequest);
  }

  private shouldBypassCache(req: HttpRequest<unknown>): boolean {
    if (req.method.toUpperCase() !== 'GET') {
      return false;
    }

    return this.getCacheBustingBaseUrls().some((baseUrl) => req.url.startsWith(baseUrl));
  }

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
