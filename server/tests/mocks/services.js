/**
 * Service Mocks
 * Mock service operations for testing
 */

export const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  count: jest.fn(),

  /**
   * Reset all mocks
   */
  reset: () => {
    Object.values(mockService).forEach(mock => {
      if (typeof mock === 'function') {
        mock.mockReset();
      }
    });
  },

  /**
   * Setup successful responses
   */
  mockSuccess: (data) => {
    mockService.create.mockResolvedValue(data);
    mockService.findAll.mockResolvedValue({ 
      data: [data], 
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 } 
    });
    mockService.findById.mockResolvedValue(data);
    mockService.update.mockResolvedValue(data);
    mockService.delete.mockResolvedValue(true);
    mockService.exists.mockResolvedValue(true);
    mockService.count.mockResolvedValue(1);
  },

  /**
   * Setup error responses
   */
  mockError: (error) => {
    mockService.create.mockRejectedValue(error);
    mockService.findAll.mockRejectedValue(error);
    mockService.findById.mockRejectedValue(error);
    mockService.update.mockRejectedValue(error);
    mockService.delete.mockRejectedValue(error);
    mockService.exists.mockRejectedValue(error);
    mockService.count.mockRejectedValue(error);
  },
};

export default mockService;
