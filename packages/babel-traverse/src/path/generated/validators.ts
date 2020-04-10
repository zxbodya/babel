import * as t from "@babel/types";
import NodePath from "../index";

//todo: script to generate this
export interface NodePathValidators {
  // ------------------------- isXXX -------------------------
  isArrayExpression(opts?: object): this is NodePath<t.ArrayExpression>;
  isAssignmentExpression(
    opts?: object
  ): this is NodePath<t.AssignmentExpression>;
  isBinaryExpression(opts?: object): this is NodePath<t.BinaryExpression>;
  isDirective(opts?: object): this is NodePath<t.Directive>;
  isDirectiveLiteral(opts?: object): this is NodePath<t.DirectiveLiteral>;
  isBlockStatement(opts?: object): this is NodePath<t.BlockStatement>;
  isBreakStatement(opts?: object): this is NodePath<t.BreakStatement>;
  isCallExpression(opts?: object): this is NodePath<t.CallExpression>;
  isCatchClause(opts?: object): this is NodePath<t.CatchClause>;
  isConditionalExpression(
    opts?: object
  ): this is NodePath<t.ConditionalExpression>;
  isContinueStatement(opts?: object): this is NodePath<t.ContinueStatement>;
  isDebuggerStatement(opts?: object): this is NodePath<t.DebuggerStatement>;
  isDoWhileStatement(opts?: object): this is NodePath<t.DoWhileStatement>;
  isEmptyStatement(opts?: object): this is NodePath<t.EmptyStatement>;
  isExpressionStatement(opts?: object): this is NodePath<t.ExpressionStatement>;
  isFile(opts?: object): this is NodePath<t.File>;
  isForInStatement(opts?: object): this is NodePath<t.ForInStatement>;
  isForStatement(opts?: object): this is NodePath<t.ForStatement>;
  isFunctionDeclaration(opts?: object): this is NodePath<t.FunctionDeclaration>;
  isFunctionExpression(opts?: object): this is NodePath<t.FunctionExpression>;
  isIdentifier(opts?: object): this is NodePath<t.Identifier>;
  isIfStatement(opts?: object): this is NodePath<t.IfStatement>;
  isLabeledStatement(opts?: object): this is NodePath<t.LabeledStatement>;
  isStringLiteral(opts?: object): this is NodePath<t.StringLiteral>;
  isNumericLiteral(opts?: object): this is NodePath<t.NumericLiteral>;
  isNullLiteral(opts?: object): this is NodePath<t.NullLiteral>;
  isBooleanLiteral(opts?: object): this is NodePath<t.BooleanLiteral>;
  isRegExpLiteral(opts?: object): this is NodePath<t.RegExpLiteral>;
  isLogicalExpression(opts?: object): this is NodePath<t.LogicalExpression>;
  isMemberExpression(opts?: object): this is NodePath<t.MemberExpression>;
  isNewExpression(opts?: object): this is NodePath<t.NewExpression>;
  isProgram(opts?: object): this is NodePath<t.Program>;
  isObjectExpression(opts?: object): this is NodePath<t.ObjectExpression>;
  isObjectMethod(opts?: object): this is NodePath<t.ObjectMethod>;
  isObjectProperty(opts?: object): this is NodePath<t.ObjectProperty>;
  isRestElement(opts?: object): this is NodePath<t.RestElement>;
  isReturnStatement(opts?: object): this is NodePath<t.ReturnStatement>;
  isSequenceExpression(opts?: object): this is NodePath<t.SequenceExpression>;
  isSwitchCase(opts?: object): this is NodePath<t.SwitchCase>;
  isSwitchStatement(opts?: object): this is NodePath<t.SwitchStatement>;
  isThisExpression(opts?: object): this is NodePath<t.ThisExpression>;
  isThrowStatement(opts?: object): this is NodePath<t.ThrowStatement>;
  isTryStatement(opts?: object): this is NodePath<t.TryStatement>;
  isUnaryExpression(opts?: object): this is NodePath<t.UnaryExpression>;
  isUpdateExpression(opts?: object): this is NodePath<t.UpdateExpression>;
  isVariableDeclaration(opts?: object): this is NodePath<t.VariableDeclaration>;
  isVariableDeclarator(opts?: object): this is NodePath<t.VariableDeclarator>;
  isWhileStatement(opts?: object): this is NodePath<t.WhileStatement>;
  isWithStatement(opts?: object): this is NodePath<t.WithStatement>;
  isAssignmentPattern(opts?: object): this is NodePath<t.AssignmentPattern>;
  isArrayPattern(opts?: object): this is NodePath<t.ArrayPattern>;
  isArrowFunctionExpression(
    opts?: object
  ): this is NodePath<t.ArrowFunctionExpression>;
  isClassBody(opts?: object): this is NodePath<t.ClassBody>;
  isClassDeclaration(opts?: object): this is NodePath<t.ClassDeclaration>;
  isClassExpression(opts?: object): this is NodePath<t.ClassExpression>;
  isExportAllDeclaration(
    opts?: object
  ): this is NodePath<t.ExportAllDeclaration>;
  isExportDefaultDeclaration(
    opts?: object
  ): this is NodePath<t.ExportDefaultDeclaration>;
  isExportNamedDeclaration(
    opts?: object
  ): this is NodePath<t.ExportNamedDeclaration>;
  isExportSpecifier(opts?: object): this is NodePath<t.ExportSpecifier>;
  isForOfStatement(opts?: object): this is NodePath<t.ForOfStatement>;
  isImportDeclaration(opts?: object): this is NodePath<t.ImportDeclaration>;
  isImportDefaultSpecifier(
    opts?: object
  ): this is NodePath<t.ImportDefaultSpecifier>;
  isImportNamespaceSpecifier(
    opts?: object
  ): this is NodePath<t.ImportNamespaceSpecifier>;
  isImportSpecifier(opts?: object): this is NodePath<t.ImportSpecifier>;
  isMetaProperty(opts?: object): this is NodePath<t.MetaProperty>;
  isClassMethod(opts?: object): this is NodePath<t.ClassMethod>;
  isObjectPattern(opts?: object): this is NodePath<t.ObjectPattern>;
  isSpreadElement(opts?: object): this is NodePath<t.SpreadElement>;
  isSuper(opts?: object): this is NodePath<t.Super>;
  isTaggedTemplateExpression(
    opts?: object
  ): this is NodePath<t.TaggedTemplateExpression>;
  isTemplateElement(opts?: object): this is NodePath<t.TemplateElement>;
  isTemplateLiteral(opts?: object): this is NodePath<t.TemplateLiteral>;
  isYieldExpression(opts?: object): this is NodePath<t.YieldExpression>;
  isAnyTypeAnnotation(opts?: object): this is NodePath<t.AnyTypeAnnotation>;
  isArrayTypeAnnotation(opts?: object): this is NodePath<t.ArrayTypeAnnotation>;
  isBooleanTypeAnnotation(
    opts?: object
  ): this is NodePath<t.BooleanTypeAnnotation>;
  isBooleanLiteralTypeAnnotation(
    opts?: object
  ): this is NodePath<t.BooleanLiteralTypeAnnotation>;
  isNullLiteralTypeAnnotation(
    opts?: object
  ): this is NodePath<t.NullLiteralTypeAnnotation>;
  isClassImplements(opts?: object): this is NodePath<t.ClassImplements>;
  isClassProperty(opts?: object): this is NodePath<t.ClassProperty>;
  isDeclareClass(opts?: object): this is NodePath<t.DeclareClass>;
  isDeclareFunction(opts?: object): this is NodePath<t.DeclareFunction>;
  isDeclareInterface(opts?: object): this is NodePath<t.DeclareInterface>;
  isDeclareModule(opts?: object): this is NodePath<t.DeclareModule>;
  isDeclareTypeAlias(opts?: object): this is NodePath<t.DeclareTypeAlias>;
  isDeclareVariable(opts?: object): this is NodePath<t.DeclareVariable>;
  isFunctionTypeAnnotation(
    opts?: object
  ): this is NodePath<t.FunctionTypeAnnotation>;
  isFunctionTypeParam(opts?: object): this is NodePath<t.FunctionTypeParam>;
  isGenericTypeAnnotation(
    opts?: object
  ): this is NodePath<t.GenericTypeAnnotation>;
  isInterfaceExtends(opts?: object): this is NodePath<t.InterfaceExtends>;
  isInterfaceDeclaration(
    opts?: object
  ): this is NodePath<t.InterfaceDeclaration>;
  isIntersectionTypeAnnotation(
    opts?: object
  ): this is NodePath<t.IntersectionTypeAnnotation>;
  isMixedTypeAnnotation(opts?: object): this is NodePath<t.MixedTypeAnnotation>;
  isNullableTypeAnnotation(
    opts?: object
  ): this is NodePath<t.NullableTypeAnnotation>;
  isNumberTypeAnnotation(
    opts?: object
  ): this is NodePath<t.NumberTypeAnnotation>;
  isStringLiteralTypeAnnotation(
    opts?: object
  ): this is NodePath<t.StringLiteralTypeAnnotation>;
  isStringTypeAnnotation(
    opts?: object
  ): this is NodePath<t.StringTypeAnnotation>;
  isThisTypeAnnotation(opts?: object): this is NodePath<t.ThisTypeAnnotation>;
  isTupleTypeAnnotation(opts?: object): this is NodePath<t.TupleTypeAnnotation>;
  isTypeofTypeAnnotation(
    opts?: object
  ): this is NodePath<t.TypeofTypeAnnotation>;
  isTypeAlias(opts?: object): this is NodePath<t.TypeAlias>;
  isTypeAnnotation(opts?: object): this is NodePath<t.TypeAnnotation>;
  isTypeCastExpression(opts?: object): this is NodePath<t.TypeCastExpression>;
  isTypeParameterDeclaration(
    opts?: object
  ): this is NodePath<t.TypeParameterDeclaration>;
  isTypeParameterInstantiation(
    opts?: object
  ): this is NodePath<t.TypeParameterInstantiation>;
  isObjectTypeAnnotation(
    opts?: object
  ): this is NodePath<t.ObjectTypeAnnotation>;
  isObjectTypeCallProperty(
    opts?: object
  ): this is NodePath<t.ObjectTypeCallProperty>;
  isObjectTypeIndexer(opts?: object): this is NodePath<t.ObjectTypeIndexer>;
  isObjectTypeProperty(opts?: object): this is NodePath<t.ObjectTypeProperty>;
  isQualifiedTypeIdentifier(
    opts?: object
  ): this is NodePath<t.QualifiedTypeIdentifier>;
  isUnionTypeAnnotation(opts?: object): this is NodePath<t.UnionTypeAnnotation>;
  isVoidTypeAnnotation(opts?: object): this is NodePath<t.VoidTypeAnnotation>;
  isJSXAttribute(opts?: object): this is NodePath<t.JSXAttribute>;
  isJSXClosingElement(opts?: object): this is NodePath<t.JSXClosingElement>;
  isJSXElement(opts?: object): this is NodePath<t.JSXElement>;
  isJSXEmptyExpression(opts?: object): this is NodePath<t.JSXEmptyExpression>;
  isJSXExpressionContainer(
    opts?: object
  ): this is NodePath<t.JSXExpressionContainer>;
  isJSXIdentifier(opts?: object): this is NodePath<t.JSXIdentifier>;
  isJSXMemberExpression(opts?: object): this is NodePath<t.JSXMemberExpression>;
  isJSXNamespacedName(opts?: object): this is NodePath<t.JSXNamespacedName>;
  isJSXOpeningElement(opts?: object): this is NodePath<t.JSXOpeningElement>;
  isJSXSpreadAttribute(opts?: object): this is NodePath<t.JSXSpreadAttribute>;
  isJSXText(opts?: object): this is NodePath<t.JSXText>;
  isNoop(opts?: object): this is NodePath<t.Noop>;
  isParenthesizedExpression(
    opts?: object
  ): this is NodePath<t.ParenthesizedExpression>;
  isAwaitExpression(opts?: object): this is NodePath<t.AwaitExpression>;
  isBindExpression(opts?: object): this is NodePath<t.BindExpression>;
  isDecorator(opts?: object): this is NodePath<t.Decorator>;
  isDoExpression(opts?: object): this is NodePath<t.DoExpression>;
  isExportDefaultSpecifier(
    opts?: object
  ): this is NodePath<t.ExportDefaultSpecifier>;
  isExportNamespaceSpecifier(
    opts?: object
  ): this is NodePath<t.ExportNamespaceSpecifier>;
  isRestProperty(opts?: object): this is NodePath<t.RestProperty>;
  isSpreadProperty(opts?: object): this is NodePath<t.SpreadProperty>;
  isExpression(opts?: object): this is NodePath<t.Expression>;
  isBinary(opts?: object): this is NodePath<t.Binary>;
  isScopable(opts?: object): this is NodePath<t.Scopable>;
  isBlockParent(opts?: object): this is NodePath<t.BlockParent>;
  isBlock(opts?: object): this is NodePath<t.Block>;
  isStatement(opts?: object): this is NodePath<t.Statement>;
  isTerminatorless(opts?: object): this is NodePath<t.Terminatorless>;
  isCompletionStatement(opts?: object): this is NodePath<t.CompletionStatement>;
  isConditional(opts?: object): this is NodePath<t.Conditional>;
  isLoop(opts?: object): this is NodePath<t.Loop>;
  isWhile(opts?: object): this is NodePath<t.While>;
  isExpressionWrapper(opts?: object): this is NodePath<t.ExpressionWrapper>;
  isFor(opts?: object): this is NodePath<t.For>;
  isForXStatement(opts?: object): this is NodePath<t.ForXStatement>;
  isFunction(opts?: object): this is NodePath<t.Function>;
  isFunctionParent(opts?: object): this is NodePath<t.FunctionParent>;
  isPureish(opts?: object): this is NodePath<t.Pureish>;
  isDeclaration(opts?: object): this is NodePath<t.Declaration>;
  isLVal(opts?: object): this is NodePath<t.LVal>;
  isLiteral(opts?: object): this is NodePath<t.Literal>;
  isImmutable(opts?: object): this is NodePath<t.Immutable>;
  isUserWhitespacable(opts?: object): this is NodePath<t.UserWhitespacable>;
  isMethod(opts?: object): this is NodePath<t.Method>;
  isObjectMember(opts?: object): this is NodePath<t.ObjectMember>;
  isProperty(opts?: object): this is NodePath<t.Property>;
  isUnaryLike(opts?: object): this is NodePath<t.UnaryLike>;
  isPattern(opts?: object): this is NodePath<t.Pattern>;
  isClass(opts?: object): this is NodePath<t.Class>;
  isModuleDeclaration(opts?: object): this is NodePath<t.ModuleDeclaration>;
  isExportDeclaration(opts?: object): this is NodePath<t.ExportDeclaration>;
  isModuleSpecifier(opts?: object): this is NodePath<t.ModuleSpecifier>;
  isFlow(opts?: object): this is NodePath<t.Flow>;
  isFlowBaseAnnotation(opts?: object): this is NodePath<t.FlowBaseAnnotation>;
  isFlowDeclaration(opts?: object): this is NodePath<t.FlowDeclaration>;
  isJSX(opts?: object): this is NodePath<t.JSX>;
  isNumberLiteral(opts?: object): this is NodePath<t.NumericLiteral>;
  isRegexLiteral(opts?: object): this is NodePath<t.RegExpLiteral>;
  isReferencedIdentifier(
    opts?: object
  ): this is NodePath<t.Identifier | t.JSXIdentifier>;
  isReferencedMemberExpression(
    opts?: object
  ): this is NodePath<t.MemberExpression>;
  isBindingIdentifier(opts?: object): this is NodePath<t.Identifier>;
  isScope(opts?: object): this is NodePath<t.Scopable>;
  isReferenced(opts?: object): boolean;
  isBlockScoped(
    opts?: object
  ): this is NodePath<
    t.FunctionDeclaration | t.ClassDeclaration | t.VariableDeclaration
  >;
  isVar(opts?: object): this is NodePath<t.VariableDeclaration>;
  isUser(opts?: object): boolean;
  isGenerated(opts?: object): boolean;
  isPure(opts?: object): boolean;
}
