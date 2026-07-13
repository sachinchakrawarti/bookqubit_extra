import { jest } from '@jest/globals';

// Mock logger to avoid console noise
jest.mock('../../src/api/v1/modules/geography/services/logger.js', () => ({
  LoggerService: jest.fn().mockImplementation(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    logError: jest.fn(),
    serviceOperation: jest.fn()
  }))
}));

// Global setup for all tests
beforeAll(() => {
  // Setup test environment
});

afterAll(() => {
  // Cleanup after all tests
});