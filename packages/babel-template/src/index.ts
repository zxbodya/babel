import * as formatters from "./formatters";
import createTemplateBuilder from "./builder";

export const smart = createTemplateBuilder<any>(formatters.smart);
export const statement = createTemplateBuilder<any>(formatters.statement);
export const statements = createTemplateBuilder<any>(formatters.statements);
export const expression = createTemplateBuilder<any>(formatters.expression);
export const program = createTemplateBuilder<any>(formatters.program);

type DefaultTemplateBuilder = typeof smart & {
  smart: typeof smart;
  statement: typeof statement;
  statements: typeof statements;
  expression: typeof expression;
  program: typeof program;
  ast: typeof smart.ast;
};

export default Object.assign(
  (smart.bind(undefined) as any) as DefaultTemplateBuilder,
  {
    smart,
    statement,
    statements,
    expression,
    program,
    ast: smart.ast,
  },
);
