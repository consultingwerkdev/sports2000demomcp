import { McpJsonValue } from './mcp-app.types';

const MAX_CONTEXT_DEPTH = 4;
const MAX_CONTEXT_ARRAY_ITEMS = 25;
const MAX_CONTEXT_OBJECT_KEYS = 25;

export function toMcpJsonValue(
  value: unknown,
  depth = 0,
  seen = new WeakSet<object>()
): McpJsonValue {
  if (depth > MAX_CONTEXT_DEPTH) {
    return '[MaxDepth]';
  }

  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : String(value);
  }

  if (typeof value === 'bigint' || typeof value === 'symbol' || typeof value === 'function') {
    return String(value);
  }

  if (typeof value === 'undefined') {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value
      .slice(0, MAX_CONTEXT_ARRAY_ITEMS)
      .map((item) => toMcpJsonValue(item, depth + 1, seen));
  }

  if (typeof value === 'object') {
    if (seen.has(value)) {
      return '[Circular]';
    }

    seen.add(value);

    const result: Record<string, McpJsonValue> = {};
    for (const [key, entryValue] of Object.entries(value).slice(0, MAX_CONTEXT_OBJECT_KEYS)) {
      result[key] = toMcpJsonValue(entryValue, depth + 1, seen);
    }

    seen.delete(value);
    return result;
  }

  return null;
}
