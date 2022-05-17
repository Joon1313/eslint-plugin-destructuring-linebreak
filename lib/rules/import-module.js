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
        tab: 2,
      },
    ],
    messages: {
      'import-module': 'A line break is required when there are more than {{minItems}} modules.',
    },
  },
  create(context) {

    function fixer(node) {
      context.report({
        node,
        loc:node.loc,
        messageId: 'import-module',
        data:{minItems},
        fix(fixer){
          const replaceSpecifiers = node.specifiers.map((specifier) => `${tab}${specifier.imported.name},\n`).join("");
          const moduleName = node.source.value;
          const output = `import {\n${replaceSpecifiers}} from '${moduleName}'`;
          return fixer.replaceText(node, output);
        }
      })
    }

    const sourceCode = context.getSourceCode();
    const options = context.options[0] ? context.options[0] : {};
    const minItems = typeof options.minItems === 'number'  ? options.minItems : 2;
    const tab = typeof options.tab === 'number' ? ' '.repeat(options.tab) : '  ';

    return {
      ImportDeclaration(node) {
        if (node.specifiers.length <= 1) return;
        if (node.specifiers.length < minItems) return;

        // const firstSpecifierLine = node.specifiers[0].loc.start.line;
        // const secondSpecifierLine = node.specifiers[1].loc.start.line;

        for (let index = 1; index < node.specifiers.length; index++) {
          const current = sourceCode.getFirstToken(node.specifiers[index - 1]);
          const next = sourceCode.getLastToken(node.specifiers[index]);
          if (current.loc.start.line === next.loc.end.line) {
            return fixer(node)
          }
        }

      },
    };
  },
};
