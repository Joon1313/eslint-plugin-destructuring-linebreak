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
    type: "layout", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Import module destructuring line break assignment rule",
      recommended: false,
      url: "https://github.com/Joon1313/eslint-plugin-destructuring-linebreak/",
    },
    fixable: "code", // Or `code` or `whitespace`
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
    const sourceCode = context.getSourceCode();
    const minItems = context.options[0].minItems;
    return {
      ImportDeclaration(node) {
        if (node.specifiers.length <= 1) return;
        if (node.specifiers.length < minItems) return;
        for (let index = 1; index < node.specifiers.length; index++) {
          const current = sourceCode.getFirstToken(node.specifiers[index - 1]);
          const next = sourceCode.getLastToken(node.specifiers[index]);
          if (current.loc.start.line === next.loc.end.line) {
            const currentAfter = sourceCode.getTokenAfter(current);
            const output = "\n";
            context.report({
              node,
              messageId: 'import-module',
              data:{minItems},
              fix(fixer) {
                return fixer.insertTextAfter(currentAfter, output);
              },
            });
          }
        }
      },
    };
  },
};
