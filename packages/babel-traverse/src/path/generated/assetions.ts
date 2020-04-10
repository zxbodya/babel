import * as t from "@babel/types";
import NodePath from "../index";

//todo: script to generate this
export interface NodePathAssetions {
  // ------------------------- assertXXX -------------------------
  assertArrayExpression(
    opts?: object
  ): asserts this is NodePath<t.ArrayExpression>;
  assertAssignmentExpression(
    opts?: object
  ): asserts this is NodePath<t.AssignmentExpression>;
  assertBinaryExpression(
    opts?: object
  ): asserts this is NodePath<t.BinaryExpression>;
  assertDirective(opts?: object): asserts this is NodePath<t.Directive>;
  assertDirectiveLiteral(
    opts?: object
  ): asserts this is NodePath<t.DirectiveLiteral>;
  assertBlockStatement(
    opts?: object
  ): asserts this is NodePath<t.BlockStatement>;
  assertBreakStatement(
    opts?: object
  ): asserts this is NodePath<t.BreakStatement>;
  assertCallExpression(
    opts?: object
  ): asserts this is NodePath<t.CallExpression>;
  assertCatchClause(opts?: object): asserts this is NodePath<t.CatchClause>;
  assertConditionalExpression(
    opts?: object
  ): asserts this is NodePath<t.ConditionalExpression>;
  assertContinueStatement(
    opts?: object
  ): asserts this is NodePath<t.ContinueStatement>;
  assertDebuggerStatement(
    opts?: object
  ): asserts this is NodePath<t.DebuggerStatement>;
  assertDoWhileStatement(
    opts?: object
  ): asserts this is NodePath<t.DoWhileStatement>;
  assertEmptyStatement(
    opts?: object
  ): asserts this is NodePath<t.EmptyStatement>;
  assertExpressionStatement(
    opts?: object
  ): asserts this is NodePath<t.ExpressionStatement>;
  assertFile(opts?: object): asserts this is NodePath<t.File>;
  assertForInStatement(
    opts?: object
  ): asserts this is NodePath<t.ForInStatement>;
  assertForStatement(opts?: object): asserts this is NodePath<t.ForStatement>;
  assertFunctionDeclaration(
    opts?: object
  ): asserts this is NodePath<t.FunctionDeclaration>;
  assertFunctionExpression(
    opts?: object
  ): asserts this is NodePath<t.FunctionExpression>;
  assertIdentifier(opts?: object): asserts this is NodePath<t.Identifier>;
  assertIfStatement(opts?: object): asserts this is NodePath<t.IfStatement>;
  assertLabeledStatement(
    opts?: object
  ): asserts this is NodePath<t.LabeledStatement>;
  assertStringLiteral(opts?: object): asserts this is NodePath<t.StringLiteral>;
  assertNumericLiteral(
    opts?: object
  ): asserts this is NodePath<t.NumericLiteral>;
  assertNullLiteral(opts?: object): asserts this is NodePath<t.NullLiteral>;
  assertBooleanLiteral(
    opts?: object
  ): asserts this is NodePath<t.BooleanLiteral>;
  assertRegExpLiteral(opts?: object): asserts this is NodePath<t.RegExpLiteral>;
  assertLogicalExpression(
    opts?: object
  ): asserts this is NodePath<t.LogicalExpression>;
  assertMemberExpression(
    opts?: object
  ): asserts this is NodePath<t.MemberExpression>;
  assertNewExpression(opts?: object): asserts this is NodePath<t.NewExpression>;
  assertProgram(opts?: object): asserts this is NodePath<t.Program>;
  assertObjectExpression(
    opts?: object
  ): asserts this is NodePath<t.ObjectExpression>;
  assertObjectMethod(opts?: object): asserts this is NodePath<t.ObjectMethod>;
  assertObjectProperty(
    opts?: object
  ): asserts this is NodePath<t.ObjectProperty>;
  assertRestElement(opts?: object): asserts this is NodePath<t.RestElement>;
  assertReturnStatement(
    opts?: object
  ): asserts this is NodePath<t.ReturnStatement>;
  assertSequenceExpression(
    opts?: object
  ): asserts this is NodePath<t.SequenceExpression>;
  assertSwitchCase(opts?: object): asserts this is NodePath<t.SwitchCase>;
  assertSwitchStatement(
    opts?: object
  ): asserts this is NodePath<t.SwitchStatement>;
  assertThisExpression(
    opts?: object
  ): asserts this is NodePath<t.ThisExpression>;
  assertThrowStatement(
    opts?: object
  ): asserts this is NodePath<t.ThrowStatement>;
  assertTryStatement(opts?: object): asserts this is NodePath<t.TryStatement>;
  assertUnaryExpression(
    opts?: object
  ): asserts this is NodePath<t.UnaryExpression>;
  assertUpdateExpression(
    opts?: object
  ): asserts this is NodePath<t.UpdateExpression>;
  assertVariableDeclaration(
    opts?: object
  ): asserts this is NodePath<t.VariableDeclaration>;
  assertVariableDeclarator(
    opts?: object
  ): asserts this is NodePath<t.VariableDeclarator>;
  assertWhileStatement(
    opts?: object
  ): asserts this is NodePath<t.WhileStatement>;
  assertWithStatement(opts?: object): asserts this is NodePath<t.WithStatement>;
  assertAssignmentPattern(
    opts?: object
  ): asserts this is NodePath<t.AssignmentPattern>;
  assertArrayPattern(opts?: object): asserts this is NodePath<t.ArrayPattern>;
  assertArrowFunctionExpression(
    opts?: object
  ): asserts this is NodePath<t.ArrowFunctionExpression>;
  assertClassBody(opts?: object): asserts this is NodePath<t.ClassBody>;
  assertClassDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ClassDeclaration>;
  assertClassExpression(
    opts?: object
  ): asserts this is NodePath<t.ClassExpression>;
  assertExportAllDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ExportAllDeclaration>;
  assertExportDefaultDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ExportDefaultDeclaration>;
  assertExportNamedDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ExportNamedDeclaration>;
  assertExportSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ExportSpecifier>;
  assertForOfStatement(
    opts?: object
  ): asserts this is NodePath<t.ForOfStatement>;
  assertImportDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ImportDeclaration>;
  assertImportDefaultSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ImportDefaultSpecifier>;
  assertImportNamespaceSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ImportNamespaceSpecifier>;
  assertImportSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ImportSpecifier>;
  assertMetaProperty(opts?: object): asserts this is NodePath<t.MetaProperty>;
  assertClassMethod(opts?: object): asserts this is NodePath<t.ClassMethod>;
  assertObjectPattern(opts?: object): asserts this is NodePath<t.ObjectPattern>;
  assertSpreadElement(opts?: object): asserts this is NodePath<t.SpreadElement>;
  assertSuper(opts?: object): asserts this is NodePath<t.Super>;
  assertTaggedTemplateExpression(
    opts?: object
  ): asserts this is NodePath<t.TaggedTemplateExpression>;
  assertTemplateElement(
    opts?: object
  ): asserts this is NodePath<t.TemplateElement>;
  assertTemplateLiteral(
    opts?: object
  ): asserts this is NodePath<t.TemplateLiteral>;
  assertYieldExpression(
    opts?: object
  ): asserts this is NodePath<t.YieldExpression>;
  assertAnyTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.AnyTypeAnnotation>;
  assertArrayTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.ArrayTypeAnnotation>;
  assertBooleanTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.BooleanTypeAnnotation>;
  assertBooleanLiteralTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.BooleanLiteralTypeAnnotation>;
  assertNullLiteralTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.NullLiteralTypeAnnotation>;
  assertClassImplements(
    opts?: object
  ): asserts this is NodePath<t.ClassImplements>;
  assertClassProperty(opts?: object): asserts this is NodePath<t.ClassProperty>;
  assertDeclareClass(opts?: object): asserts this is NodePath<t.DeclareClass>;
  assertDeclareFunction(
    opts?: object
  ): asserts this is NodePath<t.DeclareFunction>;
  assertDeclareInterface(
    opts?: object
  ): asserts this is NodePath<t.DeclareInterface>;
  assertDeclareModule(opts?: object): asserts this is NodePath<t.DeclareModule>;
  assertDeclareTypeAlias(
    opts?: object
  ): asserts this is NodePath<t.DeclareTypeAlias>;
  assertDeclareVariable(
    opts?: object
  ): asserts this is NodePath<t.DeclareVariable>;
  // assertExistentialTypeParam(
  //   opts?: object
  // ): asserts this is NodePath<t.ExistentialTypeParam>;
  assertFunctionTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.FunctionTypeAnnotation>;
  assertFunctionTypeParam(
    opts?: object
  ): asserts this is NodePath<t.FunctionTypeParam>;
  assertGenericTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.GenericTypeAnnotation>;
  assertInterfaceExtends(
    opts?: object
  ): asserts this is NodePath<t.InterfaceExtends>;
  assertInterfaceDeclaration(
    opts?: object
  ): asserts this is NodePath<t.InterfaceDeclaration>;
  assertIntersectionTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.IntersectionTypeAnnotation>;
  assertMixedTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.MixedTypeAnnotation>;
  assertNullableTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.NullableTypeAnnotation>;
  // assertNumericLiteralTypeAnnotation(
  //   opts?: object
  // ): asserts this is NodePath<t.NumericLiteralTypeAnnotation>;
  assertNumberTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.NumberTypeAnnotation>;
  assertStringLiteralTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.StringLiteralTypeAnnotation>;
  assertStringTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.StringTypeAnnotation>;
  assertThisTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.ThisTypeAnnotation>;
  assertTupleTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.TupleTypeAnnotation>;
  assertTypeofTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.TypeofTypeAnnotation>;
  assertTypeAlias(opts?: object): asserts this is NodePath<t.TypeAlias>;
  assertTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.TypeAnnotation>;
  assertTypeCastExpression(
    opts?: object
  ): asserts this is NodePath<t.TypeCastExpression>;
  assertTypeParameterDeclaration(
    opts?: object
  ): asserts this is NodePath<t.TypeParameterDeclaration>;
  assertTypeParameterInstantiation(
    opts?: object
  ): asserts this is NodePath<t.TypeParameterInstantiation>;
  assertObjectTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.ObjectTypeAnnotation>;
  assertObjectTypeCallProperty(
    opts?: object
  ): asserts this is NodePath<t.ObjectTypeCallProperty>;
  assertObjectTypeIndexer(
    opts?: object
  ): asserts this is NodePath<t.ObjectTypeIndexer>;
  assertObjectTypeProperty(
    opts?: object
  ): asserts this is NodePath<t.ObjectTypeProperty>;
  assertQualifiedTypeIdentifier(
    opts?: object
  ): asserts this is NodePath<t.QualifiedTypeIdentifier>;
  assertUnionTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.UnionTypeAnnotation>;
  assertVoidTypeAnnotation(
    opts?: object
  ): asserts this is NodePath<t.VoidTypeAnnotation>;
  assertJSXAttribute(opts?: object): asserts this is NodePath<t.JSXAttribute>;
  assertJSXClosingElement(
    opts?: object
  ): asserts this is NodePath<t.JSXClosingElement>;
  assertJSXElement(opts?: object): asserts this is NodePath<t.JSXElement>;
  assertJSXEmptyExpression(
    opts?: object
  ): asserts this is NodePath<t.JSXEmptyExpression>;
  assertJSXExpressionContainer(
    opts?: object
  ): asserts this is NodePath<t.JSXExpressionContainer>;
  assertJSXIdentifier(opts?: object): asserts this is NodePath<t.JSXIdentifier>;
  assertJSXMemberExpression(
    opts?: object
  ): asserts this is NodePath<t.JSXMemberExpression>;
  assertJSXNamespacedName(
    opts?: object
  ): asserts this is NodePath<t.JSXNamespacedName>;
  assertJSXOpeningElement(
    opts?: object
  ): asserts this is NodePath<t.JSXOpeningElement>;
  assertJSXSpreadAttribute(
    opts?: object
  ): asserts this is NodePath<t.JSXSpreadAttribute>;
  assertJSXText(opts?: object): asserts this is NodePath<t.JSXText>;
  assertNoop(opts?: object): asserts this is NodePath<t.Noop>;
  assertParenthesizedExpression(
    opts?: object
  ): asserts this is NodePath<t.ParenthesizedExpression>;
  assertAwaitExpression(
    opts?: object
  ): asserts this is NodePath<t.AwaitExpression>;
  assertBindExpression(
    opts?: object
  ): asserts this is NodePath<t.BindExpression>;
  assertDecorator(opts?: object): asserts this is NodePath<t.Decorator>;
  assertDoExpression(opts?: object): asserts this is NodePath<t.DoExpression>;
  assertExportDefaultSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ExportDefaultSpecifier>;
  assertExportNamespaceSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ExportNamespaceSpecifier>;
  assertRestProperty(opts?: object): asserts this is NodePath<t.RestProperty>;
  assertSpreadProperty(
    opts?: object
  ): asserts this is NodePath<t.SpreadProperty>;
  assertExpression(opts?: object): asserts this is NodePath<t.Expression>;
  assertBinary(opts?: object): asserts this is NodePath<t.Binary>;
  assertScopable(opts?: object): asserts this is NodePath<t.Scopable>;
  assertBlockParent(opts?: object): asserts this is NodePath<t.BlockParent>;
  assertBlock(opts?: object): asserts this is NodePath<t.Block>;
  assertStatement(opts?: object): asserts this is NodePath<t.Statement>;
  assertTerminatorless(
    opts?: object
  ): asserts this is NodePath<t.Terminatorless>;
  assertCompletionStatement(
    opts?: object
  ): asserts this is NodePath<t.CompletionStatement>;
  assertConditional(opts?: object): asserts this is NodePath<t.Conditional>;
  assertLoop(opts?: object): asserts this is NodePath<t.Loop>;
  assertWhile(opts?: object): asserts this is NodePath<t.While>;
  assertExpressionWrapper(
    opts?: object
  ): asserts this is NodePath<t.ExpressionWrapper>;
  assertFor(opts?: object): asserts this is NodePath<t.For>;
  assertForXStatement(opts?: object): asserts this is NodePath<t.ForXStatement>;
  assertFunction(opts?: object): asserts this is NodePath<t.Function>;
  assertFunctionParent(
    opts?: object
  ): asserts this is NodePath<t.FunctionParent>;
  assertPureish(opts?: object): asserts this is NodePath<t.Pureish>;
  assertDeclaration(opts?: object): asserts this is NodePath<t.Declaration>;
  assertLVal(opts?: object): asserts this is NodePath<t.LVal>;
  assertLiteral(opts?: object): asserts this is NodePath<t.Literal>;
  assertImmutable(opts?: object): asserts this is NodePath<t.Immutable>;
  assertUserWhitespacable(
    opts?: object
  ): asserts this is NodePath<t.UserWhitespacable>;
  assertMethod(opts?: object): asserts this is NodePath<t.Method>;
  assertObjectMember(opts?: object): asserts this is NodePath<t.ObjectMember>;
  assertProperty(opts?: object): asserts this is NodePath<t.Property>;
  assertUnaryLike(opts?: object): asserts this is NodePath<t.UnaryLike>;
  assertPattern(opts?: object): asserts this is NodePath<t.Pattern>;
  assertClass(opts?: object): asserts this is NodePath<t.Class>;
  assertModuleDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ModuleDeclaration>;
  assertExportDeclaration(
    opts?: object
  ): asserts this is NodePath<t.ExportDeclaration>;
  assertModuleSpecifier(
    opts?: object
  ): asserts this is NodePath<t.ModuleSpecifier>;
  assertFlow(opts?: object): asserts this is NodePath<t.Flow>;
  assertFlowBaseAnnotation(
    opts?: object
  ): asserts this is NodePath<t.FlowBaseAnnotation>;
  assertFlowDeclaration(
    opts?: object
  ): asserts this is NodePath<t.FlowDeclaration>;
  assertJSX(opts?: object): asserts this is NodePath<t.JSX>;
  assertNumberLiteral(opts?: object): asserts this is NodePath<t.NumberLiteral>;
  assertRegexLiteral(opts?: object): asserts this is NodePath<t.RegexLiteral>;
}
