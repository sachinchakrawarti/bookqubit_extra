/**
 * Test Factories
 * Generate test data programmatically
 */

export const factory = {
  /**
   * Generate a test item
   */
  generateItem: (overrides = {}) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    return {
      id,
      name: `Test Item ${id}`,
      description: 'Test description',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  },

  /**
   * Generate multiple test items
   */
  generateItems: (count = 5, overrides = {}) => {
    return Array.from({ length: count }, () =>
      factory.generateItem(overrides)
    );
  },

  /**
   * Generate user data
   */
  generateUser: (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000) + 1,
    username: `user_${Math.random().toString(36).substring(7)}`,
    email: `user_${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  /**
   * Generate random date
   */
  randomDate: (start = new Date(2020, 0, 1), end = new Date()) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },
};

export default factory;
