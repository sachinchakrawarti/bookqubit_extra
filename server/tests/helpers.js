/**
 * Test Helpers
 * Reusable utilities for testing
 */

import { jest } from '@jest/globals';

export const helpers = {
  /**
   * Create mock Express request
   */
  mockRequest: (overrides = {}) => ({
    body: {},
    params: {},
    query: {},
    headers: {},
    user: null,
    ...overrides,
  }),

  /**
   * Create mock Express response
   */
  mockResponse: () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  }),

  /**
   * Create mock Express next function
   */
  mockNext: () => jest.fn(),

  /**
   * Create mock service with default methods
   */
  mockService: () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    count: jest.fn(),
  }),

  /**
   * Create mock repository with default methods
   */
  mockRepository: () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    count: jest.fn(),
  }),

  /**
   * Wait for async operations
   */
  wait: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Assert error response
   */
  assertErrorResponse: (response, expectedStatus = 400) => {
    expect(response.status).toHaveBeenCalledWith(expectedStatus);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.any(String),
      })
    );
  },

  /**
   * Assert success response
   */
  assertSuccessResponse: (response, expectedStatus = 200) => {
    expect(response.status).toHaveBeenCalledWith(expectedStatus);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
  },
};

export default helpers;
