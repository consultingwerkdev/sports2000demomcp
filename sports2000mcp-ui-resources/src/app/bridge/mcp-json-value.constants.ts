/**
 * Represents the maximum nesting depth allowed when coercing arbitrary values to MCP-safe JSON.
 *
 * @memberof McpJsonValue
 */
export const MAX_CONTEXT_DEPTH = 4;

/**
 * Represents the maximum number of items preserved from a single array during MCP JSON coercion.
 *
 * @memberof McpJsonValue
 */
export const MAX_CONTEXT_ARRAY_ITEMS = 25;

/**
 * Represents the maximum number of object properties preserved during MCP JSON coercion.
 *
 * @memberof McpJsonValue
 */
export const MAX_CONTEXT_OBJECT_KEYS = 25;
