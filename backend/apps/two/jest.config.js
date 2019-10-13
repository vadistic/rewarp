module.exports = {
  name: '@apps/two',
  displayName: '@apps/two',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '.(test|spec).(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',

  coverageDirectory: './coverage',
}
