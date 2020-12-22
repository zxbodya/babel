export function JSXAttribute(node: any) {
  this.print(node.name, node);
  if (node.value) {
    this.token("=");
    this.print(node.value, node);
  }
}

export function JSXIdentifier(node: any) {
  this.word(node.name);
}

export function JSXNamespacedName(node: any) {
  this.print(node.namespace, node);
  this.token(":");
  this.print(node.name, node);
}

export function JSXMemberExpression(node: any) {
  this.print(node.object, node);
  this.token(".");
  this.print(node.property, node);
}

export function JSXSpreadAttribute(node: any) {
  this.token("{");
  this.token("...");
  this.print(node.argument, node);
  this.token("}");
}

export function JSXExpressionContainer(node: any) {
  this.token("{");
  this.print(node.expression, node);
  this.token("}");
}

export function JSXSpreadChild(node: any) {
  this.token("{");
  this.token("...");
  this.print(node.expression, node);
  this.token("}");
}

export function JSXText(node: any) {
  const raw = this.getPossibleRaw(node);

  if (raw != null) {
    this.token(raw);
  } else {
    this.token(node.value);
  }
}

export function JSXElement(node: any) {
  const open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  for (const child of node.children as Array<any>) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingElement, node);
}

function spaceSeparator() {
  this.space();
}

export function JSXOpeningElement(node: any) {
  this.token("<");
  this.print(node.name, node);
  this.print(node.typeParameters, node); // TS
  if (node.attributes.length > 0) {
    this.space();
    this.printJoin(node.attributes, node, { separator: spaceSeparator });
  }
  if (node.selfClosing) {
    this.space();
    this.token("/>");
  } else {
    this.token(">");
  }
}

export function JSXClosingElement(node: any) {
  this.token("</");
  this.print(node.name, node);
  this.token(">");
}

export function JSXEmptyExpression(node: any) {
  this.printInnerComments(node);
}

export function JSXFragment(node: any) {
  this.print(node.openingFragment, node);

  this.indent();
  for (const child of node.children as Array<any>) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingFragment, node);
}

export function JSXOpeningFragment() {
  this.token("<");
  this.token(">");
}

export function JSXClosingFragment() {
  this.token("</");
  this.token(">");
}
