// This file contains methods that modify the path/node in some ways.

import { path as pathCache } from "../cache";
import PathHoister from "./lib/hoister";
import NodePath from "./index";
import * as t from "@babel/types";
import type Scope from "../scope";

/**
 * Insert the provided nodes before the current one.
 */

export function insertBefore(nodes_: t.Node | t.Node[]) {
  this._assertUnremoved();

  const nodes = this._verifyNodeList(nodes_);

  const { parentPath } = this;

  if (
    parentPath.isExpressionStatement() ||
    parentPath.isLabeledStatement() ||
    parentPath.isExportNamedDeclaration() ||
    (parentPath.isExportDefaultDeclaration() && this.isDeclaration())
  ) {
    return parentPath.insertBefore(nodes);
  } else if (
    (this.isNodeType("Expression") && !this.isJSXElement()) ||
    (parentPath.isForStatement() && this.key === "init")
  ) {
    if (this.node) nodes.push(this.node);
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return this._containerInsertBefore(nodes);
  } else if (this.isStatementOrBlock()) {
    const shouldInsertCurrentNode =
      this.node &&
      (!this.isExpressionStatement() || this.node.expression != null);

    this.replaceWith(
      t.blockStatement(shouldInsertCurrentNode ? [this.node] : []),
    );
    return this.unshiftContainer("body", nodes);
  } else {
    throw new Error(
      "We don't know what to do with this node type. " +
        "We were previously a Statement but we can't fit in here?",
    );
  }
}

export function _containerInsert(from, nodes) {
  this.updateSiblingKeys(from, nodes.length);

  const paths = [];

  this.container.splice(from, 0, ...nodes);
  for (let i = 0; i < nodes.length; i++) {
    const to = from + i;
    const path = this.getSibling(to);
    paths.push(path);

    if (this.context && this.context.queue) {
      path.pushContext(this.context);
    }
  }

  const contexts = this._getQueueContexts();

  for (const path of paths) {
    path.setScope();
    path.debug("Inserted.");

    for (const context of contexts) {
      context.maybeQueue(path, true);
    }
  }

  return paths;
}

export function _containerInsertBefore(nodes) {
  return this._containerInsert(this.key, nodes);
}

export function _containerInsertAfter(nodes) {
  return this._containerInsert(this.key + 1, nodes);
}

/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 */

export function insertAfter(nodes_: t.Node | t.Node[]) {
  this._assertUnremoved();

  const nodes = this._verifyNodeList(nodes_);

  const { parentPath } = this;
  if (
    parentPath.isExpressionStatement() ||
    parentPath.isLabeledStatement() ||
    parentPath.isExportNamedDeclaration() ||
    (parentPath.isExportDefaultDeclaration() && this.isDeclaration())
  ) {
    return parentPath.insertAfter(
      nodes.map(node => {
        // Usually after an expression we can safely insert another expression:
        //   A.insertAfter(B)
        //     foo = A;  -> foo = (A, B);
        // If A is an expression statement, it isn't safe anymore so we need to
        // convert B to an expression statement
        //     A;        -> A; B // No semicolon! It could break if followed by [!
        return t.isExpression(node) ? t.expressionStatement(node) : node;
      }),
    );
  } else if (
    (this.isNodeType("Expression") &&
      !this.isJSXElement() &&
      !parentPath.isJSXElement()) ||
    (parentPath.isForStatement() && this.key === "init")
  ) {
    if (this.node) {
      let { scope } = this;
      // Inserting after the computed key of a method should insert the
      // temporary binding in the method's parent's scope.
      if (parentPath.isMethod({ computed: true, key: this.node })) {
        scope = scope.parent;
      }
      const temp = scope.generateDeclaredUidIdentifier();
      nodes.unshift(
        t.expressionStatement(
          t.assignmentExpression("=", t.cloneNode(temp), this.node),
        ),
      );
      nodes.push(t.expressionStatement(t.cloneNode(temp)));
    }
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return this._containerInsertAfter(nodes);
  } else if (this.isStatementOrBlock()) {
    const shouldInsertCurrentNode =
      this.node &&
      (!this.isExpressionStatement() || this.node.expression != null);

    this.replaceWith(
      t.blockStatement(shouldInsertCurrentNode ? [this.node] : []),
    );
    return this.pushContainer("body", nodes);
  } else {
    throw new Error(
      "We don't know what to do with this node type. " +
        "We were previously a Statement but we can't fit in here?",
    );
  }
}

/**
 * Update all sibling node paths after `fromIndex` by `incrementBy`.
 */

export function updateSiblingKeys(fromIndex: number, incrementBy: number) {
  if (!this.parent) return;

  const paths = pathCache.get(this.parent);
  for (const [, path] of paths) {
    if (path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}

export function _verifyNodeList(nodes: t.Node | t.Node[]): t.Node[] {
  if (!nodes) {
    return [];
  }

  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    let msg;

    if (!node) {
      msg = "has falsy node";
    } else if (typeof node !== "object") {
      msg = "contains a non-object node";
    } else if (!node.type) {
      msg = "without a type";
    } else if (node instanceof NodePath) {
      msg = "has a NodePath when it expected a raw object";
    }

    if (msg) {
      const type = Array.isArray(node) ? "array" : typeof node;
      throw new Error(
        `Node list ${msg} with the index of ${i} and type of ${type}`,
      );
    }
  }

  return nodes;
}

export function unshiftContainer<Nodes extends t.Node | t.Node[]>(
  listKey: string,
  nodes: Nodes,
): NodePath[] {
  // todo: NodePaths<Nodes>
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway
  const path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: this.node[listKey],
    listKey,
    key: 0,
  }).setContext(this.context);

  return path._containerInsertBefore(nodes);
}

export function pushContainer(listKey: string, nodes: t.Node | t.Node[]) {
  this._assertUnremoved();

  const verifiedNodes = this._verifyNodeList(nodes);

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  const container = this.node[listKey];
  const path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey,
    key: container.length,
  }).setContext(this.context);

  return path.replaceWithMultiple(verifiedNodes);
}

/**
 * Hoist the current node to the highest scope possible and return a UID
 * referencing it.
 */
export function hoist<T extends t.Node>(
  this: NodePath<T>,
  scope: Scope = this.scope,
) {
  const hoister = new PathHoister<T>(this, scope);
  return hoister.run();
}
