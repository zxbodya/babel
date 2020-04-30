import type Printer from "../printer";
import * as t from "@babel/types";

export function ClassDeclaration(this: Printer, node: any, parent: any) {
  if (
    !this.format.decoratorsBeforeExport ||
    (!t.isExportDefaultDeclaration(parent) &&
      !t.isExportNamedDeclaration(parent))
  ) {
    this.printJoin(node.decorators, node);
  }

  if (node.declare) {
    // TS
    this.word("declare");
    this.space();
  }

  if (node.abstract) {
    // TS
    this.word("abstract");
    this.space();
  }

  this.word("class");

  if (node.id) {
    this.space();
    this.print(node.id, node);
  }

  this.print(node.typeParameters, node);

  if (node.superClass) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.superClass, node);
    this.print(node.superTypeParameters, node);
  }

  if (node.implements) {
    this.space();
    this.word("implements");
    this.space();
    this.printList(node.implements, node);
  }

  this.space();
  this.print(node.body, node);
}

export { ClassDeclaration as ClassExpression };

export function ClassBody(this: Printer, node: any) {
  this.token("{");
  this.printInnerComments(node);
  if (node.body.length === 0) {
    this.token("}");
  } else {
    this.newline();

    this.indent();
    this.printSequence(node.body, node);
    this.dedent();

    if (!this.endsWith("\n")) this.newline();

    this.rightBrace();
  }
}

export function ClassProperty(this: Printer, node: any) {
  this.printJoin(node.decorators, node);
  this.tsPrintClassMemberModifiers(node, /* isField */ true);

  if (node.computed) {
    this.token("[");
    this.print(node.key, node);
    this.token("]");
  } else {
    this._variance(node);
    this.print(node.key, node);
  }

  // TS
  if (node.optional) {
    this.token("?");
  }
  if (node.definite) {
    this.token("!");
  }

  this.print(node.typeAnnotation, node);
  if (node.value) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.value, node);
  }
  this.semicolon();
}

export function ClassPrivateProperty(this: Printer, node: any) {
  this.printJoin(node.decorators, node);
  if (node.static) {
    this.word("static");
    this.space();
  }
  this.print(node.key, node);
  this.print(node.typeAnnotation, node);
  if (node.value) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.value, node);
  }
  this.semicolon();
}

export function ClassMethod(this: Printer, node: any) {
  this._classMethodHead(node);
  this.space();
  this.print(node.body, node);
}

export function ClassPrivateMethod(this: Printer, node: any) {
  this._classMethodHead(node);
  this.space();
  this.print(node.body, node);
}

export function _classMethodHead(this: Printer, node) {
  this.printJoin(node.decorators, node);
  this.tsPrintClassMemberModifiers(node, /* isField */ false);
  this._methodHead(node);
}

export function StaticBlock(node) {
  this.word("static");
  this.space();
  this.token("{");
  if (node.body.length === 0) {
    this.token("}");
  } else {
    this.newline();
    this.printSequence(node.body, node, {
      indent: true,
    });
    this.rightBrace();
  }
}
