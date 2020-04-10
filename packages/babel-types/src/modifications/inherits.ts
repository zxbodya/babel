import { INHERIT_KEYS } from "../constants";
import inheritsComments from "../comments/inheritsComments";
import type * as types from "../types";

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */
export default function inherits<T extends types.Node | null | undefined>(
  child: T,
  parent: types.Node | null | undefined,
): T {
  if (!child || !parent) return child;

  // optionally inherit specific properties if not null
  for (const key of INHERIT_KEYS.optional as Array<string>) {
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }

  // force inherit "private" properties
  for (const key of Object.keys(parent)) {
    if (key[0] === "_" && key !== "__clone") child[key] = parent[key];
  }

  // force inherit select properties
  for (const key of INHERIT_KEYS.force as Array<string>) {
    child[key] = parent[key];
  }

  inheritsComments(child, parent);

  return child;
}
