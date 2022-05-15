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
    code:"const {hi,\nhello} = obj;",
    options:[2],
    },
    {
    code:"const {hi,\nhello,\nworld} = obj;",
    options:[3],
    },
],
  invalid: [
    {
      code: "const {hi,hello} = obj;",
      output: "const {hi,\nhello} = obj;",
      options:[{minItems: 2}],
      errors: [{ messageId:'object-property'}],
    },
    {
      code: "const {hi,hello,world} = obj;",
      output: "const {hi,\nhello,\nworld} = obj;",
      options:[{minItems: 3}],
      errors: [
        { messageId:'object-property'},
        { messageId:'object-property'},
      ],
    },
    // {
    //   code: "const {hi,hello,world,toto} = obj;",
    //   output: "const {hi,\nhello,\nworld,\ntoto} = obj;",
    //   options:[{minItems: 4}],
    //   errors: [{ message: "A line break is required when there are more than 4 properties", type: "ObjectPattern" }],
    // },
  ],
});
