/**
 * @fileoverview test
 * @author joon
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
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Object property destructuring line break assignment rule",
      recommended: false,
      url: 'https://github.com/Joon1313/eslint-plugin-destructuring-linebreak/',
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [{
      minItems:2
    }], 
  },

  create(context) {
    const sourceCode = context.getSourceCode()
    return {
      ObjectPattern(node) {
        if (node.properties.length <= 1) {
          return
        }
        for (let index = 1; index < node.properties.length; index++) {
            const current = sourceCode.getFirstToken(node.properties[index - 1]);
            const next = sourceCode.getLastToken(node.properties[index]);
            if(current.loc.start.line === next.loc.end.line){
              const currentToken = sourceCode.getTokenAfter(current);
              const output = "\n";
              context.report({
                node,
                loc:current.loc,
                message:"propertiesOnNewline",
                fix(fixer){
                  return fixer.insertTextAfter(currentToken, output)
                }
              })
            }
        }
      }
    };
  },
};
