import { McpUiTheme } from '../../bridge/mcp-app.types';

/**
 * Resolves the theme that should be applied to the document.
 *
 * @param {McpUiTheme | null} hostTheme - The theme explicitly provided by the host.
 * @returns {McpUiTheme} - The resolved document theme.
 * @memberof HostThemeUtils
 */
export function resolveDocumentTheme(hostTheme: McpUiTheme | null): McpUiTheme {
  if (hostTheme) {
    return hostTheme;
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

/**
 * Applies the resolved theme to the root document element.
 *
 * @param {McpUiTheme} theme - The theme to apply.
 * @param {HTMLElement} root - The root element that should receive the theme metadata.
 * @memberof HostThemeUtils
 */
export function applyDocumentTheme(theme: McpUiTheme, root: HTMLElement = document.documentElement): void {
  root.dataset['theme'] = theme;
  root.style.colorScheme = theme;
}

/**
 * Applies host-provided CSS custom properties and removes stale ones from the previous render.
 *
 * @param {Record<string, string>} variables - The host-provided CSS variables.
 * @param {ReadonlySet<string>} previousVariableNames - The variable names applied during the previous render.
 * @param {HTMLElement} root - The root element that should receive the CSS variables.
 * @returns {Set<string>} - The set of variable names applied during this render.
 * @memberof HostThemeUtils
 */
export function applyHostStyleVariables(
  variables: Record<string, string>,
  previousVariableNames: ReadonlySet<string>,
  root: HTMLElement = document.documentElement
): Set<string> {
  const nextVariableNames = new Set<string>();

  for (const [key, value] of Object.entries(variables)) {
    const normalizedKey = normalizeCssVariableName(key);
    if (!normalizedKey || typeof value !== 'string' || value.trim().length === 0) {
      continue;
    }

    nextVariableNames.add(normalizedKey);
    root.style.setProperty(normalizedKey, value);
  }

  for (const previousVariableName of previousVariableNames) {
    if (!nextVariableNames.has(previousVariableName)) {
      root.style.removeProperty(previousVariableName);
    }
  }

  return nextVariableNames;
}

/**
 * Normalizes a candidate CSS variable name so it can be safely applied to the document root.
 *
 * @param {string} name - The raw CSS variable name supplied by the host.
 * @returns {string | null} - The normalized CSS variable name, if valid.
 * @memberof HostThemeUtils
 */
function normalizeCssVariableName(name: string): string | null {
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return null;
  }

  return trimmedName.startsWith('--') ? trimmedName : `--${trimmedName}`;
}
