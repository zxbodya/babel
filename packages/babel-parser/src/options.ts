import type { PluginList } from "./plugin-utils";

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

export type SourceType = "script" | "module" | "unambiguous";

export type Options = {
  /**
   * Indicate the mode the code should be parsed in.
   * Can be one of "script", "module", or "unambiguous". Defaults to "script".
   * "unambiguous" will make @babel/parser attempt to guess, based on the presence
   * of ES6 import or export statements.
   * Files with ES6 imports and exports are considered "module" and are otherwise "script".
   */
  sourceType?: SourceType;
  /**
   * Correlate output AST nodes with their source filename.
   * Useful when generating code and source maps from the ASTs of multiple input files.
   */
  sourceFilename?: string;
  /**
   * By default, the first line of code parsed is treated as line 1.
   * You can provide a line number to alternatively start with.
   * Useful for integration with other source tools.
   */
  startLine?: number;
  /**
   * By default, await use is not allowed outside of an async function.
   * Set this to true to accept such code.
   */
  allowAwaitOutsideFunction?: boolean;
  /**
   * By default, a return statement at the top level raises an error.
   * Set this to true to accept such code.
   */
  allowReturnOutsideFunction?: boolean;
  /**
   * By default, import and export declarations can only appear at a program's top level.
   * Setting this option to true allows them anywhere where a statement is allowed.
   */
  allowImportExportEverywhere?: boolean;
  allowSuperOutsideMethod?: boolean;
  /**
   * By default, exported identifiers must refer to a declared variable.
   * Set this to true to allow export statements to reference undeclared variables.
   */
  allowUndeclaredExports?: boolean;
  /**
   * Array containing the plugins that you want to enable.
   */
  plugins?: PluginList;
  /**
   * Should the parser work in strict mode.
   * Defaults to true if sourceType === 'module'. Otherwise, false.
   */
  strictMode?: boolean;
  /**
   * Adds a ranges property to each node: [node.start, node.end]
   */
  ranges?: boolean;
  /**
   * Adds all parsed tokens to a tokens property on the File node.
   */
  tokens?: boolean;
  /**
   * By default, the parser adds information about parentheses by setting
   * `extra.parenthesized` to `true` as needed.
   * When this option is `true` the parser creates `ParenthesizedExpression`
   * AST nodes instead of using the `extra` property.
   */
  createParenthesizedExpressions?: boolean;
  errorRecovery?: boolean;
};

export const defaultOptions: Options = {
  // Source type ("script" or "module") for different semantics
  sourceType: "script",
  // Source filename.
  sourceFilename: undefined,
  // Line from which to start counting source. Useful for
  // integration with other tools.
  startLine: 1,
  // When enabled, await at the top level is not considered an
  // error.
  allowAwaitOutsideFunction: false,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // TODO
  allowSuperOutsideMethod: false,
  // When enabled, export statements can reference undeclared variables.
  allowUndeclaredExports: false,
  // An array of plugins to enable
  plugins: [],
  // TODO
  strictMode: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // Adds all parsed tokens to a `tokens` property on the `File` node
  tokens: false,
  // Whether to create ParenthesizedExpression AST nodes (if false
  // the parser sets extra.parenthesized on the expression nodes instead).
  createParenthesizedExpressions: false,
  // When enabled, errors are attached to the AST instead of being directly thrown.
  // Some errors will still throw, because @babel/parser can't always recover.
  errorRecovery: false,
};

// Interpret and default an options object

export function getOptions(opts?: Options | null): Options {
  const options: any = {};
  for (const key of Object.keys(defaultOptions)) {
    options[key] = opts && opts[key] != null ? opts[key] : defaultOptions[key];
  }
  return options;
}
