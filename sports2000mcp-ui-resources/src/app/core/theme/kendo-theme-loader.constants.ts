import { environment } from '../../../environments/environment';
import { McpUiTheme } from '../../bridge/mcp-app.types';

/**
 * Represents the DOM id used for the injected Kendo theme stylesheet link.
 *
 * @memberof KendoThemeLoaderService
 */
export const KENDO_THEME_LINK_ID = 'kendo-host-theme';

/**
 * Maps each supported host theme to the corresponding Kendo stylesheet URL.
 *
 * @memberof KendoThemeLoaderService
 */
export const KENDO_THEME_PATHS: Record<McpUiTheme, string> = {
  light: `${environment.app.assetBaseUrl}kendo-themes/bootstrap-main.css`,
  dark: `${environment.app.assetBaseUrl}kendo-themes/bootstrap-main-dark.css`
};
