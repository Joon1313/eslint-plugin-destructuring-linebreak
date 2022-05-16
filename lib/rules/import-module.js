/**
 * @fileoverview test
 * @author joon1313
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Import module destructuring line break assignment rule",
      recommended: false,
      url: "https://github.com/Joon1313/eslint-plugin-destructuring-linebreak/",
    },
    fixable: "whitespace", 
    schema: [
      {
        minItems: 2,
      },
    ],
    messages: {
      'import-module': 'A line break is required when there are more than {{minItems}} modules.',
    },
  },
  create(context) {
    const minItems = context.options[0].minItems ? context.options[0].minItems : 2;
    return {
      ImportDeclaration(node) {
        if (node.specifiers.length <= 1) return;
        if (node.specifiers.length < minItems) return;

        const firstSpecifierLine = node.specifiers[0].loc.start.line;
        const secondSpecifierLine = node.specifiers[1].loc.start.line;

        if(firstSpecifierLine === secondSpecifierLine){
          context.report({
            node,
            loc:node.loc,
            messageId: 'import-module',
            data:{minItems},
            fix(fixer){
              const replaceProperties = node.specifiers.map((specifier) => `${specifier.imported.name},\n`).join("");
              const moduleName = node.source.value;
              const output = `import {\n${replaceProperties}} from '${moduleName}'`;
              return fixer.replaceText(node, output);
            }
          })
        }

      },
    };
  },
};
