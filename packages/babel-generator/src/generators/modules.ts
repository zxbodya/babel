import * as t from "@babel/types";

export function ImportSpecifier(node: any) {
  if (node.importKind === "type" || node.importKind === "typeof") {
    this.word(node.importKind);
    this.space();
  }

  this.print(node.imported, node);
  if (node.local && node.local.name !== node.imported.name) {
    this.space();
    this.word("as");
    this.space();
    this.print(node.local, node);
  }
}

export function ImportDefaultSpecifier(node: any) {
  this.print(node.local, node);
}

export function ExportDefaultSpecifier(node: any) {
  this.print(node.exported, node);
}

export function ExportSpecifier(node: any) {
  this.print(node.local, node);
  if (node.exported && node.local.name !== node.exported.name) {
    this.space();
    this.word("as");
    this.space();
    this.print(node.exported, node);
  }
}

export function ExportNamespaceSpecifier(node: any) {
  this.token("*");
  this.space();
  this.word("as");
  this.space();
  this.print(node.exported, node);
}

export function ExportAllDeclaration(node: any) {
  this.word("export");
  this.space();
  if (node.exportKind === "type") {
    this.word("type");
    this.space();
  }
  this.token("*");
  this.space();
  this.word("from");
  this.space();
  this.print(node.source, node);
  this.printAssertions(node);
  this.semicolon();
}

export function ExportNamedDeclaration(node: any) {
  if (
    this.format.decoratorsBeforeExport &&
    t.isClassDeclaration(node.declaration)
  ) {
    this.printJoin(node.declaration.decorators, node);
  }

  this.word("export");
  this.space();
  ExportDeclaration.apply(this, arguments);
}

export function ExportDefaultDeclaration(node: any) {
  if (
    this.format.decoratorsBeforeExport &&
    t.isClassDeclaration(node.declaration)
  ) {
    this.printJoin(node.declaration.decorators, node);
  }

  this.word("export");
  this.space();
  this.word("default");
  this.space();
  ExportDeclaration.apply(this, arguments);
}

function ExportDeclaration(node: any) {
  if (node.declaration) {
    const declar = node.declaration;
    this.print(declar, node);
    if (!t.isStatement(declar)) this.semicolon();
  } else {
    if (node.exportKind === "type") {
      this.word("type");
      this.space();
    }

    const specifiers = node.specifiers.slice(0);

    // print "special" specifiers first
    let hasSpecial = false;
    for (;;) {
      const first = specifiers[0];
      if (
        t.isExportDefaultSpecifier(first) ||
        t.isExportNamespaceSpecifier(first)
      ) {
        hasSpecial = true;
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.token(",");
          this.space();
        }
      } else {
        break;
      }
    }

    if (specifiers.length || (!specifiers.length && !hasSpecial)) {
      this.token("{");
      if (specifiers.length) {
        this.space();
        this.printList(specifiers, node);
        this.space();
      }
      this.token("}");
    }

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      this.print(node.source, node);
      this.printAssertions(node);
    }

    this.semicolon();
  }
}

export function ImportDeclaration(node: any) {
  this.word("import");
  this.space();

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.word(node.importKind);
    this.space();
  }

  const specifiers = node.specifiers.slice(0);
  if (specifiers?.length) {
    // print "special" specifiers first
    for (;;) {
      const first = specifiers[0];
      if (
        t.isImportDefaultSpecifier(first) ||
        t.isImportNamespaceSpecifier(first)
      ) {
        this.print(specifiers.shift(), node);
        if (specifiers.length) {
          this.token(",");
          this.space();
        }
      } else {
        break;
      }
    }

    if (specifiers.length) {
      this.token("{");
      this.space();
      this.printList(specifiers, node);
      this.space();
      this.token("}");
    }

    this.space();
    this.word("from");
    this.space();
  }

  this.print(node.source, node);

  this.printAssertions(node);
  // todo(Babel 8): remove this if branch
  // `module-attributes` support is discontinued, use `import-assertions` instead.
  if (node.attributes?.length) {
    this.space();
    this.word("with");
    this.space();
    this.printList(node.attributes, node);
  }

  this.semicolon();
}

export function ImportAttribute(node: any) {
  this.print(node.key);
  this.token(":");
  this.space();
  this.print(node.value);
}

export function ImportNamespaceSpecifier(node: any) {
  this.token("*");
  this.space();
  this.word("as");
  this.space();
  this.print(node.local, node);
}
