import { McpUiTheme } from './mcp-app.types';

export function resolveDocumentTheme(hostTheme: McpUiTheme | null): McpUiTheme {
  if (hostTheme) {
    return hostTheme;
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

export function applyDocumentTheme(theme: McpUiTheme, root: HTMLElement = document.documentElement): void {
  root.dataset['theme'] = theme;
  root.style.colorScheme = theme;
}

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

function normalizeCssVariableName(name: string): string | null {
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return null;
  }

  return trimmedName.startsWith('--') ? trimmedName : `--${trimmedName}`;
}
