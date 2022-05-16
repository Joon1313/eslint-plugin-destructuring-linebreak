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
   valid:[
     {
     code:"import {hi ,\nhello,\n} from 'module'",
     options:[2],
     },
     {
     code:"import {hi,\nhello,\nworld,\n} from 'module'",
     options:[3],
     },
 ],
   invalid: [
     {
       code: "import {hi,hello} from 'module'",
       output: "import {\nhi,\nhello,\n} from 'module'",
       options:[{minItems: 2}],
       errors: [{ messageId:'import-module'}],
     },
     {
       code: "import {hi,hello,world} from 'module'",
       output: "import {\nhi,\nhello,\nworld,\n} from 'module'",
       options:[{minItems: 3}],
       errors: [{ messageId:'import-module'}],
     },
     {
       code: "import {hi,hello,world,joon} from 'module'",
       output: "import {\nhi,\nhello,\nworld,\njoon,\n} from 'module'",
       options:[{minItems: 4}],
       errors: [{ messageId:'import-module'}],
     },
   ],
 });
 