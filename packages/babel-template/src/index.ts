import * as formatters from "./formatters";
import createTemplateBuilder from "./builder";
import type * as t from "@babel/types";

export const smart = createTemplateBuilder<t.Statement | t.Statement[]>(
  formatters.smart,
);
export const statement = createTemplateBuilder<t.Statement>(
  formatters.statement,
);
export const statements = createTemplateBuilder<t.Statement[]>(
  formatters.statements,
);
export const expression = createTemplateBuilder<t.Expression>(
  formatters.expression,
);
export const program = createTemplateBuilder<t.Program>(formatters.program);

type DefaultTemplateBuilder = typeof smart & {
  smart: typeof smart;
  statement: typeof statement;
  statements: typeof statements;
  expression: typeof expression;
  program: typeof program;
  ast: typeof smart.ast;
};

export default Object.assign(smart.bind(undefined), {
  smart,
  statement,
  statements,
  expression,
  program,
  ast: smart.ast,
}) as DefaultTemplateBuilder;
