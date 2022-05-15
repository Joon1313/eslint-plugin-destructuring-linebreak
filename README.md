# eslint-plugin-eslint-destructuring

Destructuring linebreak rules for eslint

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint -D
```

Next, install `eslint-plugin-destructuring-linebreak`:

```sh
npm i eslint-plugin-destructuring-linebreak -D
```

## Demo
### :thumbsdown: Before use
```javascript
const {a, b, c, d, e, f,} = obj;
const {
    a, b, c, d, e, f,
} = obj;

import {example1, example2, example3, example4} from "example";
import {
  example1, example2, example3, example4
  } from "example";
```
### :thumbsup:  After use
```javascript
const {
  name,
  age,
  options,
  example,
} = obj;

import {
  example1,
  example2,
  example3,
  example4,
} from 'example';
```

## Usage

Add `destructuring-linebreak` to the `plugins` section of your `.eslintrc` configuration file.
Then configure the rules you want to use under the `rules` section.

```json
{
    "plugins": [
        "destructuring-linebreak"
    ],
    "rules": {
        "destructuring-linebreak/object-property": ["error",{
            "minItems": 2
        }],
        "destructuring-linebreak/import-module": ["error",{
            "minItems": 2
        }]
    }
}
```

## Options
The rule accepts an option object with the following properties:
* `minItems` [number] (default:2) - SSpecifies the minimum number of attributes required for line breaks.


