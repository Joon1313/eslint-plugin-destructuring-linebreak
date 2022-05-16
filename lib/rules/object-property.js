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
      description: "Object property destructuring line break assignment rule",
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
      'object-property': 'A line break is required when there are more than {{minItems}} properties.',
    },
  },
  create(context) {
    const minItems = context.options[0].minItems ? context.options[0].minItems : 2;
    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) return;
        if (node.properties.length < minItems) return;

        const firstPropertyLine = node.properties[0].loc.start.line;
        const secondPropertyLine = node.properties[1].loc.start.line;

        if(firstPropertyLine === secondPropertyLine){
          context.report({
            node,
            loc:node.loc,
            messageId: 'object-property',
            data:{minItems},
            fix(fixer){
              const replaceProperties = node.properties.map((property) => `${property.value.name},\n`).join("");
              const output = `{\n${replaceProperties}}`;
              return fixer.replaceText(node, output);
            }
          })

        }
      },
    };
  },
};
