import { VISITOR_KEYS } from "../definitions";
import type * as types from "../types";

export type TraversalAncestors = Array<{
  node: types.Node;
  key: string;
  index?: number;
}>;
export type TraversalHandler<T> = (
  c: types.Node,
  b: TraversalAncestors,
  a: T,
) => void;
export type TraversalHandlers<T> = {
  enter?: TraversalHandler<T>;
  exit?: TraversalHandler<T>;
};

/**
 * A general AST traversal with both prefix and postfix handlers, and a
 * state object. Exposes ancestry data to each handler so that more complex
 * AST data can be taken into account.
 */
export default function traverse<T>(
  node: types.Node,
  handlers: TraversalHandler<T> | TraversalHandlers<T>,
  state?: T,
): void {
  if (typeof handlers === "function") {
    handlers = { enter: handlers };
  }

  const { enter, exit } = handlers as TraversalHandlers<T>;

  traverseSimpleImpl(node, enter, exit, state, []);
}

function traverseSimpleImpl<T>(
  node: any,
  enter: Function | undefined | null,
  exit: Function | undefined | null,
  state: T | undefined | null,
  ancestors: TraversalAncestors,
) {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  if (enter) enter(node, ancestors, state);

  for (const key of keys) {
    const subNode = node[key];

    if (Array.isArray(subNode)) {
      for (let i = 0; i < subNode.length; i++) {
        const child = subNode[i];
        if (!child) continue;

        ancestors.push({
          node,
          key,
          index: i,
        });

        traverseSimpleImpl(child, enter, exit, state, ancestors);

        ancestors.pop();
      }
    } else if (subNode) {
      ancestors.push({
        node,
        key,
      });

      traverseSimpleImpl(subNode, enter, exit, state, ancestors);

      ancestors.pop();
    }
  }

  if (exit) exit(node, ancestors, state);
}
