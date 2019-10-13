module.exports = {
  name: '@libs/shared',
  displayName: '@libs/shared',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '.(test|spec).(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',

  coverageDirectory: './coverage',
}
