// https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_|of|type|returns',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'import/order': 'warn',
  },
}
