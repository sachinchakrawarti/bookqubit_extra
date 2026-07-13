/**
 * Jest Configuration - ES6
 * For ES module project
 */

export default {
  // Test environment
  testEnvironment: 'node',

  // No transformations needed for ES modules
  transform: {},

  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/src/**/*.test.js'
  ],

  // Module name mapping for ES modules
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/db/**/*.js',
    '!src/api/v1/modules/geography/tests/**/*.js'
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

  // Module resolution
  moduleDirectories: ['node_modules', 'src'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(sequelize|sqlite3)/)'
  ],

  // Setup files
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Verbose output
  verbose: true,

  // Detect open handles
  detectOpenHandles: true,

  // Force exit after tests
  forceExit: true,

  // Test timeout
  testTimeout: 30000
};