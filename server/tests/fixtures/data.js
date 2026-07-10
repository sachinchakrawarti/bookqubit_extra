/**
 * Test Fixtures
 * Reusable test data
 */

export const testData = {
  sampleItem: {
    id: 1,
    name: 'Test Item',
    description: 'Test description',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  scenarios: {
    valid: {
      name: 'Valid Item',
      description: 'Valid description',
    },
    invalid: {
      name: '',
      description: '',
    },
    duplicate: {
      name: 'Duplicate Item',
      description: 'Duplicate description',
    },
  },
};

export default testData;
