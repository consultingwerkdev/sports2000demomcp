import { Injectable } from '@angular/core';
import {
  SmartFormLayoutService,
  SmartFormConfiguration,
  SmartHttpService,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';
import { firstValueFrom } from 'rxjs';
import { isFrontendUrl, processFormLayout, resolveFrontendUrl } from '@consultingwerk/smartcomponent-library';

/**
 * Resolves SmartForm layouts in a way that works for both hosted MCP resources and local assets.
 *
 * @memberof SmartMcpHttp
 */
@Injectable()
export class SmartMcpFormLayoutService extends SmartFormLayoutService {
  /**
   * Creates the layout service with the Smart backend services required by the base class.
   *
   * @param {SmartServiceAdapter} smartServiceAdapter - The Smart service adapter used to resolve template URLs.
   * @param {SmartHttpService} smartHttp - The HTTP service used to fetch layout content.
   * @memberof SmartMcpFormLayoutService
   */
  constructor(
    private readonly smartServiceAdapter: SmartServiceAdapter,
    private readonly smartHttp: SmartHttpService
  ) {
    super(smartServiceAdapter, smartHttp);
  }

  /**
   * Fetches and processes the form layout for the requested URL.
   *
   * @param {string} url - The layout URL or form identifier supplied by the Smart runtime.
   * @returns {Promise<SmartFormConfiguration>} - The processed SmartForm configuration.
   * @memberof SmartMcpFormLayoutService
   */
  override async getFormLayout(url: string): Promise<SmartFormConfiguration> {
    this.flushCache();

    const templateUrl: string = isFrontendUrl(url)
      ? resolveFrontendUrl(url)
      : url.startsWith('http')
        ? url
        : url.startsWith('/')
          ? `${this.smartServiceAdapter.templateURI}${url}`
          : `${this.smartServiceAdapter.templateURI}/SmartForm/Form/${url}`;

    const layout = await firstValueFrom(this.smartHttp.get(templateUrl));
    return processFormLayout(layout as SmartFormConfiguration);
  }
}
