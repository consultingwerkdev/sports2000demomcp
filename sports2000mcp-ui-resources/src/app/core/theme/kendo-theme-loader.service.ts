import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { McpUiTheme } from '../../bridge/mcp-app.types';

const KENDO_THEME_LINK_ID = 'kendo-host-theme';
const KENDO_THEME_PATHS: Record<McpUiTheme, string> = {
  light: `${environment.app.assetBaseUrl}kendo-themes/bootstrap-main.css`,
  dark: `${environment.app.assetBaseUrl}kendo-themes/bootstrap-main-dark.css`
};

@Injectable({ providedIn: 'root' })
export class KendoThemeLoaderService {
  private activeTheme: McpUiTheme | null = null;

  applyTheme(theme: McpUiTheme): void {
    if (this.activeTheme === theme) {
      return;
    }

    const themeLink = this.ensureThemeLink();
    themeLink.href = KENDO_THEME_PATHS[theme];
    this.activeTheme = theme;
  }

  private ensureThemeLink(): HTMLLinkElement {
    const existingLink = document.getElementById(KENDO_THEME_LINK_ID);
    if (existingLink instanceof HTMLLinkElement) {
      return existingLink;
    }

    const themeLink = document.createElement('link');
    themeLink.id = KENDO_THEME_LINK_ID;
    themeLink.rel = 'stylesheet';
    document.head.appendChild(themeLink);
    return themeLink;
  }
}
