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
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'whitespace', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    const sourceCode = context.getSourceCode()
    // console.log(sourceCode)
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
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
