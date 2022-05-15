/**
 * @fileoverview test
 * @author joon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/import-module"),
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
ruleTester.run("import-module", rule, {
  valid: [
    {code:"import {hi,hello} from 'vue';"}
  ],

  invalid: [
    // {
    //   code: "const {hi,hello} = obj;",
    //   output: "const {hi,\nhello} = obj;",
    //   errors: [{ message: "propertiesOnNewline", type: "ObjectPattern" }],
    // },
    // {
    //   code: "const {a,b,c} = obj;",
    //   output: "const {a,\nb,\nc} = obj;",
    //   errors: [{ message: "propertiesOnNewline", type: "ObjectPattern" }],
    // },
  ],
});
