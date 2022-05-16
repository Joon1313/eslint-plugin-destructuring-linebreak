/**
 * @fileoverview test
 * @author joon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/object-property"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType:'module'
  },
});
ruleTester.run("object-property", rule, {
  valid:[
    {
    code:"const {hi} = obj;",
    options:[2],
    },
    {
    code:"const {hi ,\nhello\n} = obj;",
    options:[2],
    },
],
  invalid: [
    {
      code: "const {hi,hello} = obj;",
      output: "const {\nhi,\nhello,\n} = obj;",
      options:[{minItems: 2}],
      errors: [{ messageId:'object-property'}],
    },
    {
      code: "const {hi,hello,world} = obj;",
      output: "const {\nhi,\nhello,\nworld,\n} = obj;",
      options:[{minItems: 3}],
      errors: [{ messageId:'object-property'}],
    },
    {
      code: "const {hi,hello,world,joon} = obj;",
      output: "const {\nhi,\nhello,\nworld,\njoon,\n} = obj;",
      options:[{minItems: 4}],
      errors: [{ messageId:'object-property'}],
    },
  ],
});
