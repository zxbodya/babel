import * as charCodes from "charcodes";

import { types as tt, TokenType } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";
import { ExpressionErrors } from "../parser/util";
import { Expression } from "../types";
import { BIND_NONE, BindingTypes } from "../util/scopeflags";

tt.placeholder = new TokenType("%%", { startsExpr: true });

type PossiblePlaceholedrs = {
  Identifier: N.Identifier;
  StringLiteral: N.StringLiteral;
  Expression: N.Expression;
  Statement: N.Statement;
  Declaration: N.Declaration;
  BlockStatement: N.BlockStatement;
  ClassBody: N.ClassBody;
  Pattern: N.Pattern;
};

export type PlaceholderTypes = keyof PossiblePlaceholedrs;
// todo:
// export type PlaceholderTypes =
//   | "Identifier"
//   | "StringLiteral"
//   | "Expression"
//   | "Statement"
//   | "Declaration"
//   | "BlockStatement"
//   | "ClassBody"
//   | "Pattern";

type NodeOf<T extends keyof PossiblePlaceholedrs> = PossiblePlaceholedrs[T];
// todo: when there  is proper union type for Node
// type NodeOf<T extends PlaceholderTypes> = Extract<N.Node, { type: T }>;

// todo: Placeholder<T> breaks everything, because its type is incompatible with
// the substituted nodes.
type MaybePlaceholder<T extends PlaceholderTypes> = NodeOf<T>; // | N.Placeholder<T>;

export default (superClass: typeof Parser) =>
  class PlaceholdersParserMixin extends superClass implements Parser {
    parsePlaceholder<T extends PlaceholderTypes>(
      expectedNode: T,
    ): /*?N.Placeholder<T>*/ MaybePlaceholder<T> | undefined | null {
      if (this.match(tt.placeholder)) {
        const node = this.startNode();
        this.next();
        this.assertNoSpace("Unexpected space in placeholder.");

        // We can't use this.parseIdentifier because
        // we don't want nested placeholders.
        node.name = super.parseIdentifier(/* liberal */ true);

        this.assertNoSpace("Unexpected space in placeholder.");
        this.expect(tt.placeholder);
        return this.finishPlaceholder(node, expectedNode);
      }
    }

    finishPlaceholder<T extends PlaceholderTypes>(
      node: N.Node,
      expectedNode: T,
    ): /*N.Placeholder<T>*/ MaybePlaceholder<T> {
      const isFinished = !!(node.expectedNode && node.type === "Placeholder");
      node.expectedNode = expectedNode;

      return isFinished ? node : this.finishNode(node, "Placeholder");
    }

    /* ============================================================ *
     * tokenizer/index.js                                           *
     * ============================================================ */

    getTokenFromCode(code: number) {
      if (
        code === charCodes.percentSign &&
        this.input.charCodeAt(this.state.pos + 1) === charCodes.percentSign
      ) {
        return this.finishOp(tt.placeholder, 2);
      }

      return super.getTokenFromCode(code);
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    parseExprAtom(
      refExpressionErrors?: ExpressionErrors | null,
    ): MaybePlaceholder<"Expression"> {
      return (
        this.parsePlaceholder("Expression") ||
        super.parseExprAtom(refExpressionErrors)
      );
    }

    parseIdentifier(liberal?: boolean): MaybePlaceholder<"Identifier"> {
      // NOTE: This function only handles identifiers outside of
      // expressions and binding patterns, since they are already
      // handled by the parseExprAtom and parseBindingAtom functions.
      // This is needed, for example, to parse "class %%NAME%% {}".
      return (
        this.parsePlaceholder("Identifier") || super.parseIdentifier(liberal)
      );
    }

    checkReservedWord(
      word: string,
      startLoc: number,
      checkKeywords: boolean,
      isBinding: boolean,
    ) {
      // Sometimes we call #checkReservedWord(node.name), expecting
      // that node is an Identifier. If it is a Placeholder, name
      // will be undefined.
      if (word !== undefined) {
        super.checkReservedWord(word, startLoc, checkKeywords, isBinding);
      }
    }

    /* ============================================================ *
     * parser/lval.js                                               *
     * ============================================================ */

    parseBindingAtom(): MaybePlaceholder<"Pattern"> {
      return this.parsePlaceholder("Pattern") || super.parseBindingAtom();
    }

    checkLVal(
      expr: Expression,
      bindingType: BindingTypes = BIND_NONE,
      checkClashes:
        | {
            [key: string]: boolean;
          }
        | undefined
        | null,
      contextDescription: string,
      disallowLetBinding?: boolean,
      strictModeChanged?: boolean,
    ): void {
      if (expr.type !== "Placeholder") {
        super.checkLVal(
          expr,
          bindingType,
          checkClashes,
          contextDescription,
          disallowLetBinding,
          strictModeChanged,
        );
      }
    }

    toAssignable(node: N.Node): N.Node {
      if (
        node &&
        node.type === "Placeholder" &&
        node.expectedNode === "Expression"
      ) {
        node.expectedNode = "Pattern";
        return node;
      }
      return super.toAssignable(node);
    }

    /* ============================================================ *
     * parser/statement.js                                          *
     * ============================================================ */

    verifyBreakContinue(
      node: N.BreakStatement | N.ContinueStatement,
      keyword: string,
    ) {
      // @ts-ignore todo: Placeholder should be base in parser method signature
      if (node.label && node.label.type === "Placeholder") return;
      super.verifyBreakContinue(node, keyword);
    }

    parseExpressionStatement(
      node: MaybePlaceholder<"Statement">,
      expr: N.Expression,
    ): MaybePlaceholder<"Statement"> {
      if (
        expr.type !== "Placeholder" ||
        (expr.extra && expr.extra.parenthesized)
      ) {
        return super.parseExpressionStatement(node, expr);
      }

      if (this.match(tt.colon)) {
        const stmt = node as N.LabeledStatement;
        stmt.label = this.finishPlaceholder(expr, "Identifier");
        this.next();
        stmt.body = this.parseStatement("label");
        return this.finishNode(stmt, "LabeledStatement");
      }

      this.semicolon();

      node.name = expr.name;
      return this.finishPlaceholder(node, "Statement");
    }

    parseBlock(
      allowDirectives?: boolean,
      createNewLexicalScope?: boolean,
      afterBlockParse?: (hasStrictModeDirective: boolean) => void,
    ): MaybePlaceholder<"BlockStatement"> {
      return (
        this.parsePlaceholder("BlockStatement") ||
        super.parseBlock(
          allowDirectives,
          createNewLexicalScope,
          afterBlockParse,
        )
      );
    }

    parseFunctionId(
      requireId?: boolean,
    ): MaybePlaceholder<"Identifier"> | undefined | null {
      return (
        this.parsePlaceholder("Identifier") || super.parseFunctionId(requireId)
      );
    }

    parseClass<T extends N.Class>(
      node: T,
      isStatement: /* T === ClassDeclaration */ boolean,
      optionalId?: boolean,
    ): T {
      const type = isStatement ? "ClassDeclaration" : "ClassExpression";

      this.next();
      this.takeDecorators(node);
      const oldStrict = this.state.strict;

      const placeholder = this.parsePlaceholder("Identifier");
      if (placeholder) {
        if (
          this.match(tt._extends) ||
          this.match(tt.placeholder) ||
          this.match(tt.braceL)
        ) {
          node.id = placeholder;
        } else if (optionalId || !isStatement) {
          node.id = null;
          node.body = this.finishPlaceholder(placeholder, "ClassBody");
          return this.finishNode(node, type);
        } else {
          this.unexpected(null, "A class name is required");
        }
      } else {
        this.parseClassId(node, isStatement, optionalId);
      }

      this.parseClassSuper(node);
      node.body =
        this.parsePlaceholder("ClassBody") ||
        this.parseClassBody(!!node.superClass, oldStrict);
      return this.finishNode(node, type);
    }

    parseExport(node: N.Node): N.AnyExport {
      const placeholder = this.parsePlaceholder("Identifier");
      if (!placeholder) return super.parseExport(node);

      if (!this.isContextual("from") && !this.match(tt.comma)) {
        // export %%DECL%%;
        node.specifiers = [];
        node.source = null;
        node.declaration = this.finishPlaceholder(placeholder, "Declaration");
        return this.finishNode(node, "ExportNamedDeclaration");
      }

      // export %%NAME%% from "foo";
      this.expectPlugin("exportDefaultFrom");
      const specifier = this.startNode();
      specifier.exported = placeholder;
      node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];

      return super.parseExport(node);
    }

    isExportDefaultSpecifier(): boolean {
      if (this.match(tt._default)) {
        const next = this.nextTokenStart();
        if (this.isUnparsedContextual(next, "from")) {
          if (
            this.input.startsWith(
              tt.placeholder.label,
              this.nextTokenStartSince(next + 4),
            )
          ) {
            return true;
          }
        }
      }
      return super.isExportDefaultSpecifier();
    }

    maybeParseExportDefaultSpecifier(node: N.Node): boolean {
      if (node.specifiers && node.specifiers.length > 0) {
        // "export %%NAME%%" has already been parsed by #parseExport.
        return true;
      }
      return super.maybeParseExportDefaultSpecifier(node);
    }

    checkExport(
      node: N.Node, // N.ExportNamedDeclaration
    ): void {
      const { specifiers } = node;
      if (specifiers?.length) {
        node.specifiers = specifiers.filter(
          node => node.exported.type === "Placeholder",
        );
      }
      super.checkExport(node);
      node.specifiers = specifiers;
    }

    parseImport(
      node: N.Node,
    ): N.ImportDeclaration | N.TsImportEqualsDeclaration {
      const placeholder = this.parsePlaceholder("Identifier");
      if (!placeholder) return super.parseImport(node);

      node.specifiers = [];

      if (!this.isContextual("from") && !this.match(tt.comma)) {
        // import %%STRING%%;
        node.source = this.finishPlaceholder(placeholder, "StringLiteral");
        this.semicolon();
        return this.finishNode(node, "ImportDeclaration");
      }

      // import %%DEFAULT%% ...
      const specifier = this.startNodeAtNode(placeholder);
      specifier.local = placeholder;
      this.finishNode(specifier, "ImportDefaultSpecifier");
      node.specifiers.push(specifier);

      if (this.eat(tt.comma)) {
        // import %%DEFAULT%%, * as ...
        const hasStarImport = this.maybeParseStarImportSpecifier(node);

        // import %%DEFAULT%%, { ...
        if (!hasStarImport) this.parseNamedImportSpecifiers(node);
      }

      this.expectContextual("from");
      node.source = this.parseImportSource();
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    }

    parseImportSource(): MaybePlaceholder<"StringLiteral"> {
      // import ... from %%STRING%%;

      return (
        this.parsePlaceholder("StringLiteral") || super.parseImportSource()
      );
    }
  };
