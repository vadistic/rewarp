module.exports = {
  name: '@libs/database',
  displayName: '@libs/database',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '.(test|spec).(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',

  coverageDirectory: './coverage',
}
