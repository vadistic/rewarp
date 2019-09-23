module.exports = {
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    // Append 'ts' extensions to Airbnb 'import/resolver' setting
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.ts', '.json'],
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    'import/extensions': ['.js', '.ts', '.mjs'],
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    // prefer named
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // allow constructor assigment injection
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    // allow using classes for everythign
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        // alow type-graphql style args
        argsIgnorePattern: '^_|of|type|returns',
      },
    ],
  },
}
