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

    function fixer(node, defaultSpecifiers, specifiers) {
      context.report({
        node,
        loc:node.loc,
        messageId: 'import-module',
        data:{minItems},
        fix(fixer){
          const replaceSpecifiers = specifiers.map((specifier) => `${tab}${specifier.imported.name},\n`).join("");
          const defaultSpecifier = defaultSpecifiers?.local?.name ? `${defaultSpecifiers?.local?.name},\n` : ''
          const moduleName = node.source.value;
          const output = `import ${defaultSpecifier}{\n${replaceSpecifiers}} from '${moduleName}'`;
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
        const defaultSpecifiers = node.specifiers.filter((specifier)=> specifier.type === "ImportDefaultSpecifier");
        const specifiers = node.specifiers.filter((specifier)=> specifier.type === "ImportSpecifier");
        // tmp
        // if (defaultSpecifiers.length >= 1) return;
        if (specifiers.length <= 1) return;
        if (specifiers.length < minItems) return;

        for (let index = 1; index < specifiers.length; index++) {
          const current = sourceCode.getFirstToken(specifiers[index - 1]);
          const next = sourceCode.getLastToken(specifiers[index]);
          if (current.loc.start.line === next.loc.end.line) {
            return fixer(node, defaultSpecifiers[0], specifiers)
          }
        }

      },
    };
  },
};
