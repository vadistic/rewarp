module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testRegex: '.(test|spec).(ts|tsx)$',
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': 'ts-jest',
  },
  testEnvironment: 'node',

  coverageDirectory: './coverage',
}
