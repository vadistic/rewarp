module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '.(test|spec).(ts|tsx)$',
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': 'ts-jest',
  },
  testEnvironment: 'node',

  coverageDirectory: './coverage',
}
