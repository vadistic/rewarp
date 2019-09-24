// one true order of plugins !
// https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // required for typechecking rules
  // parserOptions: {
  //   project: './tsconfig.json',
  // },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    // // 'prettier/prettier': 'error',
    // // prefer named
    // 'import/prefer-default-export': 'off',
    // 'import/no-default-export': 'error',
    // // allow constructor assigment injection
    // 'no-useless-constructor': 'off',
    // '@typescript-eslint/no-useless-constructor': 'error',
    // // allow simple class methods
    // 'class-methods-use-this': 'off',
    // // allow type-graphql style unused args
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_|of|type|returns',
      },
    ],
    // // allow tiny classes
    // 'max-classes-per-file': 'off',
    // allow sanity
    '@typescript-eslint/no-explicit-any': 'off',
    // // allow testing
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] },
    // ],
  },
}
