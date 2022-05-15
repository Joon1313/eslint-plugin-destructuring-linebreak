/**
 * @fileoverview test
 * @author joon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/my-plugin"),
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
ruleTester.run("my-plugin", rule, {
  valid: [
    {code:"const {hi,hello} = obj;"}
  ],

  invalid: [
    {
      code: "const {hi,hello} = obj;",
      output: "const {hi,\nhello} = obj;",
      errors: [{ message: "propertiesOnNewline", type: "ObjectPattern" }],
    },
    {
      code: "const {a,b,c} = obj;",
      output: "const {a,\nb,\nc} = obj;",
      errors: [{ message: "propertiesOnNewline", type: "ObjectPattern" }],
    },
  ],
});
