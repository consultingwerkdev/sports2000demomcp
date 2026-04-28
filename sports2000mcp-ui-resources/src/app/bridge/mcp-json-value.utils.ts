import { McpJsonValue } from './mcp-app.types';
import {
  MAX_CONTEXT_ARRAY_ITEMS,
  MAX_CONTEXT_DEPTH,
  MAX_CONTEXT_OBJECT_KEYS
} from './mcp-json-value.constants';

/**
 * Normalizes an arbitrary runtime value into a bounded, JSON-safe structure for MCP context payloads.
 *
 * @param {unknown} value - The value to normalize.
 * @param {number} depth - The current recursion depth used to limit nested structures.
 * @param {WeakSet<object>} seen - Tracks visited objects to avoid circular traversal.
 * @returns {McpJsonValue} - The normalized JSON-safe representation.
 * @memberof McpJsonValue
 */
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
