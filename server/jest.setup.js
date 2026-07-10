// jest.setup.js
import { jest } from '@jest/globals';

process.env.NODE_ENV = 'test';
process.env.PORT = 9999;

jest.setTimeout(10000);

// Mock database connection
jest.mock('./src/database/connection.js', () => ({
  query: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
  all: jest.fn(),
  exec: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

afterAll(async () => {
  jest.clearAllMocks();
});