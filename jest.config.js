module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testRegex: '.test.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  coverageDirectory: './coverage',

  projects: [
    '<rootDir>/shared/jest.config.js',
    '<rootDir>/database/jest.config.js',
    '<rootDir>/server2/jest.config.js',
  ],
}
