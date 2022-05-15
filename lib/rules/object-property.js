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
      description: "Object property destructuring line break assignment rule",
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
      'object-property': 'A line break is required when there are more than {{minItems}} properties.',
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    const minItems = context.options[0].minItems;
    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) return;
        if (node.properties.length < minItems) return;

        for (let index = 1; index < node.properties.length; index++) {
          const current = sourceCode.getFirstToken(node.properties[index - 1]);
          const next = sourceCode.getLastToken(node.properties[index]);
          if (current.loc.start.line === next.loc.end.line) {
            const currentAfter = sourceCode.getTokenAfter(current);
            const output = "\n";
            context.report({
              node,
              loc:node.loc,
              messageId: 'object-property',
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
