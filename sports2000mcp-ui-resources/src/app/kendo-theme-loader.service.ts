import { Injectable } from '@angular/core';
import { McpUiTheme } from './mcp-app.types';

const KENDO_THEME_LINK_ID = 'kendo-host-theme';
declare const __SPORTS2000_ASSET_BASE_URL__: string;
const ASSET_BASE_URL =
  typeof __SPORTS2000_ASSET_BASE_URL__ !== 'undefined' ? __SPORTS2000_ASSET_BASE_URL__ : '';
const KENDO_THEME_PATHS: Record<McpUiTheme, string> = {
  light: `${ASSET_BASE_URL}kendo-themes/bootstrap-main.css`,
  dark: `${ASSET_BASE_URL}kendo-themes/bootstrap-main-dark.css`
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
