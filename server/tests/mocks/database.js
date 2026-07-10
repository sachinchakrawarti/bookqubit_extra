/**
 * Database Mock
 * Mock database operations for testing
 */

export const mockDb = {
  query: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
  all: jest.fn(),
  exec: jest.fn(),

  /**
   * Reset all mocks
   */
  reset: () => {
    Object.values(mockDb).forEach(mock => {
      if (typeof mock === 'function') {
        mock.mockReset();
      }
    });
  },

  /**
   * Mock successful query
   */
  mockSuccess: (data) => {
    mockDb.query.mockResolvedValue(data);
    mockDb.get.mockResolvedValue(data);
    mockDb.all.mockResolvedValue(data);
  },

  /**
   * Mock error
   */
  mockError: (error) => {
    mockDb.query.mockRejectedValue(error);
    mockDb.get.mockRejectedValue(error);
    mockDb.all.mockRejectedValue(error);
  },

  /**
   * Mock specific query response
   */
  mockQuery: (response) => {
    mockDb.query.mockResolvedValue(response);
  },

  /**
   * Mock specific get response
   */
  mockGet: (response) => {
    mockDb.get.mockResolvedValue(response);
  },
};

export default mockDb;
