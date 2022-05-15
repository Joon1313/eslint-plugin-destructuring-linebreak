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

## Usage

Add `destructuring-linebreak` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "destructuring-linebreak"
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


