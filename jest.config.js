module.exports = {
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx', 'json'],
  rootDir: '.',
  testRegex: '.(test|spec).(ts|tsx)$',
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',

  projects: [
    '<rootDir>/shared/jest.config.js',
    '<rootDir>/database/jest.config.js',
    '<rootDir>/server2/jest.config.js',
  ],
}
