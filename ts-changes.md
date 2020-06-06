## ideas to try:

 - babel-types:
    - packages/babel-types/src/builders/builder.ts - try replacing it with generated builder for each node

## to discuss

- using re-exports from `babel-core` instead of `babel-types` and/or `babel-traverse` - what should be guideline on this

- node versions support - I think, there are not many reasons for having support for unsupported old nodejs versions… 
- can it be changes to, only supported versions:
	- active lts+ for users
	- latest lts+ for developers(eslint, prettier, a)

- outdated dependencies - is there a process to keep dependencies of individual packages updated?




----------
traverse

 - packages/babel-traverse/src/path/evaluation.ts - would like someone familiar with usages of it to take closer look - it looks there are some edge cases not correctly handled(see todos addeed)

 
 dependencies, for example `source-map` in babel core
 
 
todo: revisit node interface, avoid passing parser as argument to node constructor - this looks wrong

packages/babel-parser/src/parser/node.ts



think about options to improve type refinements


isReferencedIdentifier - chcecks two thinks if type is Identifier
or JSXIdentifier and it is referenced…

