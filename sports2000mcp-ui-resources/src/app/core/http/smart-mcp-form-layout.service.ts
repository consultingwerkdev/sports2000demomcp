import { Injectable } from '@angular/core';
import {
  SmartFormLayoutService,
  SmartFormConfiguration,
  SmartHttpService,
  SmartServiceAdapter
} from '@consultingwerk/smartcomponent-library';
import { firstValueFrom } from 'rxjs';
import { isFrontendUrl, processFormLayout, resolveFrontendUrl } from '@consultingwerk/smartcomponent-library';

@Injectable()
export class SmartMcpFormLayoutService extends SmartFormLayoutService {
  constructor(
    private readonly smartServiceAdapter: SmartServiceAdapter,
    private readonly smartHttp: SmartHttpService
  ) {
    super(smartServiceAdapter, smartHttp);
  }

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
