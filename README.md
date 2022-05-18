# eslint-plugin-newline
ESLint plugin to enforce newlines in ES6 object `destructuring` or `import`

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
// Npm
npm i eslint -D
// Yarn
yarn add eslint -D
```

Next, install `eslint-plugin-newline`:

```sh
// NPM
npm i eslint-plugin-newline -D
// YARN
yarn add eslint-plugin-newline -D
```

## Demo
### :thumbsdown: Before use
```javascript
// import modules
import {example1, example2, example3, example4} from "example";
import {
  example1, example2, example3, example4
  } from "example";

// obejct destructuring
const {a, b, c, d, e, f,} = obj;
const {
    a, b, c, d, e, f,
} = obj;
```
### :thumbsup:  After use
```javascript
// import modules
import {
  example1,
  example2,
  example3,
  example4,
} from 'example';

// obejct destructuring
const {
  name,
  age,
  options,
  example,
} = obj;
```

## Usage

Add `newline` to the `plugins` section of your `.eslintrc` configuration file.
Then configure the rules you want to use under the `rules` section.

```json
{
    "plugins": [
        "newline"
    ],
    
    "rules": {
        "newline/object-property": ["error",{
            "minItems": 2,
            "tab": 2,
        }],
        "newline/import-module": ["error",{
            "minItems": 2,
            "tab": 2,
        }]
    }
}
```

## Options
The rule accepts an option object with the following properties:
* `minItems` [number] (`minimum`: `2`) (`default`: `2`) - Specifies the minimum number of attributes required for line breaks.
* `tab` [number] (`minimum`: `1`) (`default`: `2`) - Specifies the number of spaces in front of the property after newline.

