# eslint-plugin-eslint-destructuring

test

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-eslint-destructuring`:

```sh
npm install eslint-plugin-eslint-destructuring --save-dev
```

## Usage

Add `eslint-destructuring` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-destructuring"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "destructuring-linebreak/object-property": ["error",{
            minItems:2 // default 2
        }]
    }
}
```

## Supported Rules

* Fill in provided rules here


