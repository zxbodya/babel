import type * as t from "@babel/types";

export type Formatter<T> = {
  code: (a: string) => string;
  validate: (a: t.File) => void;
  unwrap: (a: t.File) => T;
};

function makeStatementFormatter<T>(
  fn: (a: Array<t.Statement>) => T,
): Formatter<T> {
  return {
    // We need to prepend a ";" to force statement parsing so that
    // ExpressionStatement strings won't be parsed as directives.
    // Alongside that, we also prepend a comment so that when a syntax error
    // is encountered, the user will be less likely to get confused about
    // where the random semicolon came from.
    code: str => `/* @babel/template */;\n${str}`,
    validate: () => {},
    unwrap: (ast: t.File): T => {
      return fn(ast.program.body.slice(1));
    },
  };
}

export const smart: Formatter<
  Array<t.Statement> | t.Statement
> = makeStatementFormatter(body => {
  if (body.length > 1) {
    return body;
  } else {
    return body[0];
  }
});

export const statements: Formatter<Array<t.Statement>> = makeStatementFormatter(
  body => body,
);

export const statement: Formatter<t.Statement> = makeStatementFormatter(
  body => {
    // We do this validation when unwrapping since the replacement process
    // could have added or removed statements.
    if (body.length === 0) {
      throw new Error("Found nothing to return.");
    }
    if (body.length > 1) {
      throw new Error("Found multiple statements but wanted one");
    }

    return body[0];
  },
);

export const expression: Formatter<t.Expression> = {
  code: str => `(\n${str}\n)`,
  validate: ({ program }) => {
    if (program.body.length > 1) {
      throw new Error("Found multiple statements but wanted one");
    }
    // @ts-expect-error todo(flow->ts): consider adding assertion that body[0] indeed has expression statement
    const expression = program.body[0].expression;
    if (expression.start === 0) {
      throw new Error("Parse result included parens.");
    }
  },
  // @ts-expect-error todo(flow->ts): consider adding assertion that body[0] indeed has expression statement
  unwrap: ast => ast.program.body[0].expression,
};

export const program: Formatter<t.Program> = {
  code: str => str,
  validate: () => {},
  unwrap: ast => ast.program,
};
