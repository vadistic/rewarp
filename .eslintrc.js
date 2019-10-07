// https://codesandbox.io/s/github/lxe/fusion-typescript-example/tree/master/

module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',

    // Use canned import rules
    'plugin:import/warnings',
    // With typescript compatibility (hopefully)
    'plugin:import/typescript',

    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',

    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],

  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-prettier',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },

  rules: {
    // This option will merge and override any config set with .prettierrc files
    // https://github.com/prettier/eslint-plugin-prettier#options
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        printWidth: 100,
        semi: false,
      },
    ],

    // REACT

    // Use TS/Flow instead of prop-types
    'react/prop-types': 'off',

    // https://reactjs.org/docs/hooks-faq.html#what-exactly-do-the-lint-rules-enforce
    'react-hooks/rules-of-hooks': 'error',

    // https://github.com/facebook/react/issues/14920
    'react-hooks/exhaustive-deps': 'warn',

    // TYPESCRIPT
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, variables: true, classes: true },
    ],

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^(_|type|root|args|ctx|info)',
      },
    ],

    // IMPORTS
    'import/order': 'warn',
  },

  overrides: [
    {
      files: ['.*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
