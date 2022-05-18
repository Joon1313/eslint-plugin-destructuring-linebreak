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
        tab: 2,
      },
    ],
    messages: {
      'object-property': 'A line break is required when there are more than {{minItems}} properties.',
    },
  },
  create(context) {

    function fixer(node) {
      context.report({
        node,
        loc:node.loc,
        messageId: 'object-property',
        data:{minItems},
        fix(fixer){
          const replaceProperties = node.properties.map((property) => `${tab}${property.value.name},\n`).join("");
          const output = `{\n${replaceProperties}}`;
          return fixer.replaceText(node, output);
        }
      })
    }
    
    const sourceCode = context.getSourceCode();
    const options = context.options[0] ? context.options[0] : {};
    const minItems = typeof options.minItems === 'number'  ? options.minItems : 2;
    const tab = typeof options.tab === 'number' ? ' '.repeat(options.tab) : '  ';
    
    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) return;
        if (node.properties.length < minItems) return;

        for (let index = 1; index < node.properties.length; index++) {
          const current = sourceCode.getFirstToken(node.properties[index - 1]);
          const next = sourceCode.getLastToken(node.properties[index]);
          if (current.loc.start.line === next.loc.end.line) {
            return fixer(node)
          }
        }

      },
    };
  },
};
