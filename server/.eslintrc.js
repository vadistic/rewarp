module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:@typescript-eslint/recommended'],
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
    // 'prettier/prettier': 'error',
    // prefer named
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // allow constructor assigment injection
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    // allow simple class methods
    'class-methods-use-this': 'off',
    // allow type-graphql style unused args
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_|of|type|returns',
      },
    ],
    // allow tiny classes
    'max-classes-per-file': 'off',
    // allow sanity
    '@typescript-eslint/no-explicit-any': 'off',
    // allow testing
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] },
    ],
  },
}
