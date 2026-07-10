// jest.config.js
export default {
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {},
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/__tests__/**/*.js',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
    '!src/**/index.js',
    '!src/**/*.dto.js',
    '!src/**/*.model.js',
    '!src/**/*.config.js',
    '!src/**/*.constants.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: './test-reports/index.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
    }],
    ['jest-junit', {
      outputDirectory: './test-reports',
      outputName: 'junit.xml',
    }],
  ],
  verbose: true,
  testTimeout: 10000,
  globals: {
    __TEST__: true,
  },
};