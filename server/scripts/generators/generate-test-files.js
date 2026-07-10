// scripts/generate-test-files.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Helper to write files
const writeFile = (filePath, content) => {
  const fullPath = path.join(rootDir, filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Created: ${filePath}`);
};

// ============ Test Helpers ============

// tests/helpers.js
writeFile('tests/helpers.js', `/**
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
`);

// tests/fixtures/data.js
writeFile('tests/fixtures/data.js', `/**
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
`);

// tests/fixtures/factories.js
writeFile('tests/fixtures/factories.js', `/**
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
      name: \`Test Item \${id}\`,
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
    username: \`user_\${Math.random().toString(36).substring(7)}\`,
    email: \`user_\${Math.random().toString(36).substring(7)}@example.com\`,
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
`);

// tests/mocks/database.js
writeFile('tests/mocks/database.js', `/**
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
`);

// tests/mocks/services.js
writeFile('tests/mocks/services.js', `/**
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
`);

// tests/example.test.js
writeFile('tests/example.test.js', `/**
 * Example Test
 * Sample test to verify Jest setup
 */

import { describe, it, expect } from '@jest/globals';

describe('Example Test Suite', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('test');
    expect(result).toBe('test');
  });

  it('should work with objects', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name', 'test');
    expect(obj.value).toBe(42);
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr).toContain(3);
  });
});
`);

// ============ Test Templates for Generator ============

// generators/templates/test/unit.controller.hbs
writeFile('generators/templates/test/unit.controller.hbs', `/**
 * {{pascalCase moduleName}} Controller Unit Tests
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { {{pascalCase moduleName}}Controller } from '../../../src/api/v1/modules/{{kebabCase moduleName}}/controllers/{{kebabCase moduleName}}.controller.js';
import { {{pascalCase moduleName}}Service } from '../../../src/api/v1/modules/{{kebabCase moduleName}}/services/{{kebabCase moduleName}}.service.js';

// Mock the service
jest.mock('../../../src/api/v1/modules/{{kebabCase moduleName}}/services/{{kebabCase moduleName}}.service.js');

describe('{{pascalCase moduleName}}Controller', () => {
  let controller;
  let service;
  let mockReq;
  let mockRes;
  let mockNext;

  const mockData = {
    id: 1,
    name: 'Test {{pascalCase moduleName}}',
    description: 'Test description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Initialize service mock
    service = new {{pascalCase moduleName}}Service();

    // Initialize controller with mocked service
    controller = new {{pascalCase moduleName}}Controller(service);

    // Mock Express objects
    mockReq = {
      body: {},
      params: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a {{moduleName}} successfully', async () => {
      // Arrange
      const createData = { name: 'New {{moduleName}}', description: 'New description' };
      mockReq.body = createData;
      service.create.mockResolvedValue({ id: 1, ...createData });

      // Act
      await controller.create(mockReq, mockRes, mockNext);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: '{{pascalCase moduleName}} created successfully',
        data: { id: 1, ...createData },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      // Arrange
      const error = new Error('Database error');
      mockReq.body = { name: 'Test' };
      service.create.mockRejectedValue(error);

      // Act
      await controller.create(mockReq, mockRes, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all {{moduleName}}s with pagination', async () => {
      // Arrange
      const mockResult = {
        data: [mockData],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };
      mockReq.query = { page: 1, limit: 10 };
      service.findAll.mockResolvedValue(mockResult);

      // Act
      await controller.findAll(mockReq, mockRes, mockNext);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        filters: {},
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockResult.data,
        pagination: mockResult.pagination,
      });
    });

    it('should handle errors in findAll', async () => {
      // Arrange
      const error = new Error('Database error');
      service.findAll.mockRejectedValue(error);

      // Act
      await controller.findAll(mockReq, mockRes, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('findById', () => {
    it('should return a {{moduleName}} by id', async () => {
      // Arrange
      mockReq.params = { id: 1 };
      service.findById.mockResolvedValue(mockData);

      // Act
      await controller.findById(mockReq, mockRes, mockNext);

      // Assert
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockData,
      });
    });

    it('should handle not found', async () => {
      // Arrange
      mockReq.params = { id: 999 };
      service.findById.mockResolvedValue(null);

      // Act
      await controller.findById(mockReq, mockRes, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: '{{pascalCase moduleName}} not found',
      });
    });
  });

  describe('update', () => {
    it('should update a {{moduleName}} successfully', async () => {
      // Arrange
      const updateData = { name: 'Updated {{moduleName}}' };
      mockReq.params = { id: 1 };
      mockReq.body = updateData;
      service.update.mockResolvedValue({ id: 1, ...updateData });

      // Act
      await controller.update(mockReq, mockRes, mockNext);

      // Assert
      expect(service.update).toHaveBeenCalledWith(1, updateData);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: '{{pascalCase moduleName}} updated successfully',
        data: { id: 1, ...updateData },
      });
    });
  });

  describe('delete', () => {
    it('should delete a {{moduleName}} successfully', async () => {
      // Arrange
      mockReq.params = { id: 1 };
      service.delete.mockResolvedValue(true);

      // Act
      await controller.delete(mockReq, mockRes, mockNext);

      // Assert
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: '{{pascalCase moduleName}} deleted successfully',
      });
    });
  });
});
`);

// generators/templates/test/unit.service.hbs
writeFile('generators/templates/test/unit.service.hbs', `/**
 * {{pascalCase moduleName}} Service Unit Tests
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { {{pascalCase moduleName}}Service } from '../../../src/api/v1/modules/{{kebabCase moduleName}}/services/{{kebabCase moduleName}}.service.js';
import { {{pascalCase moduleName}}Repository } from '../../../src/api/v1/modules/{{kebabCase moduleName}}/repositories/{{kebabCase moduleName}}.repository.js';

// Mock the repository
jest.mock('../../../src/api/v1/modules/{{kebabCase moduleName}}/repositories/{{kebabCase moduleName}}.repository.js');

describe('{{pascalCase moduleName}}Service', () => {
  let service;
  let repository;

  const mockData = {
    id: 1,
    name: 'Test {{pascalCase moduleName}}',
    description: 'Test description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Initialize repository mock
    repository = new {{pascalCase moduleName}}Repository();

    // Initialize service with mocked repository
    service = new {{pascalCase moduleName}}Service(repository);

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new {{moduleName}}', async () => {
      // Arrange
      const createData = { name: 'New {{moduleName}}', description: 'New description' };
      repository.create.mockResolvedValue({ id: 1, ...createData });

      // Act
      const result = await service.create(createData);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(createData);
      expect(result).toEqual({ id: 1, ...createData });
    });

    it('should handle duplicate {{moduleName}} name', async () => {
      // Arrange
      const createData = { name: 'Existing {{moduleName}}' };
      repository.create.mockRejectedValue(new Error('Duplicate entry'));

      // Act & Assert
      await expect(service.create(createData)).rejects.toThrow('Duplicate entry');
    });
  });

  describe('findAll', () => {
    it('should return paginated {{moduleName}}s', async () => {
      // Arrange
      repository.findAll.mockResolvedValue([mockData]);
      repository.count.mockResolvedValue(1);

      // Act
      const result = await service.findAll({ page: 1, limit: 10, filters: {} });

      // Assert
      expect(repository.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 10,
        filters: {},
      });
      expect(repository.count).toHaveBeenCalledWith({ filters: {} });
      expect(result).toEqual({
        data: [mockData],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      });
    });

    it('should handle filters', async () => {
      // Arrange
      const filters = { name: 'Test' };
      repository.findAll.mockResolvedValue([mockData]);
      repository.count.mockResolvedValue(1);

      // Act
      await service.findAll({ page: 1, limit: 10, filters });

      // Assert
      expect(repository.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 10,
        filters,
      });
      expect(repository.count).toHaveBeenCalledWith({ filters });
    });
  });

  describe('findById', () => {
    it('should return a {{moduleName}} by id', async () => {
      // Arrange
      repository.findById.mockResolvedValue(mockData);

      // Act
      const result = await service.findById(1);

      // Assert
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockData);
    });

    it('should throw error when {{moduleName}} not found', async () => {
      // Arrange
      repository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findById(999)).rejects.toThrow('{{pascalCase moduleName}} not found');
    });
  });

  describe('update', () => {
    it('should update a {{moduleName}}', async () => {
      // Arrange
      const updateData = { name: 'Updated {{moduleName}}' };
      repository.exists.mockResolvedValue(true);
      repository.update.mockResolvedValue({ id: 1, ...updateData });

      // Act
      const result = await service.update(1, updateData);

      // Assert
      expect(repository.exists).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    it('should throw error when {{moduleName}} not found for update', async () => {
      // Arrange
      repository.exists.mockResolvedValue(false);

      // Act & Assert
      await expect(service.update(999, { name: 'Test' })).rejects.toThrow('{{pascalCase moduleName}} not found');
    });
  });

  describe('delete', () => {
    it('should delete a {{moduleName}}', async () => {
      // Arrange
      repository.exists.mockResolvedValue(true);
      repository.delete.mockResolvedValue(true);

      // Act
      await service.delete(1);

      // Assert
      expect(repository.exists).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error when {{moduleName}} not found for delete', async () => {
      // Arrange
      repository.exists.mockResolvedValue(false);

      // Act & Assert
      await expect(service.delete(999)).rejects.toThrow('{{pascalCase moduleName}} not found');
    });
  });
});
`);

// generators/templates/test/unit.repository.hbs
writeFile('generators/templates/test/unit.repository.hbs', `/**
 * {{pascalCase moduleName}} Repository Unit Tests
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { {{pascalCase moduleName}}Repository } from '../../../src/api/v1/modules/{{kebabCase moduleName}}/repositories/{{kebabCase moduleName}}.repository.js';
import db from '../../../src/database/connection.js';

// Mock the database connection
jest.mock('../../../src/database/connection.js');

describe('{{pascalCase moduleName}}Repository', () => {
  let repository;

  const mockData = {
    id: 1,
    name: 'Test {{pascalCase moduleName}}',
    description: 'Test description',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(() => {
    repository = new {{pascalCase moduleName}}Repository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new {{moduleName}}', async () => {
      // Arrange
      const createData = { name: 'New {{moduleName}}', description: 'New description' };
      db.query.mockResolvedValue([{ insertId: 1 }]);

      // Act
      const result = await repository.create(createData);

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO {{kebabCase moduleName}} SET ?',
        createData
      );
      expect(result).toEqual({ insertId: 1 });
    });
  });

  describe('findAll', () => {
    it('should return all {{moduleName}}s with pagination', async () => {
      // Arrange
      const offset = 0;
      const limit = 10;
      const filters = {};
      db.query.mockResolvedValue([mockData]);

      // Act
      const result = await repository.findAll({ offset, limit, filters });

      // Assert
      expect(db.query).toHaveBeenCalled();
      expect(result).toEqual([mockData]);
    });

    it('should handle filters', async () => {
      // Arrange
      const filters = { name: 'Test' };
      db.query.mockResolvedValue([mockData]);

      // Act
      await repository.findAll({ offset: 0, limit: 10, filters });

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE 1=1 AND name = ?'),
        expect.arrayContaining(['Test', 10, 0])
      );
    });
  });

  describe('findById', () => {
    it('should return a {{moduleName}} by id', async () => {
      // Arrange
      db.query.mockResolvedValue([mockData]);

      // Act
      const result = await repository.findById(1);

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM {{kebabCase moduleName}} WHERE id = ?',
        [1]
      );
      expect(result).toEqual(mockData);
    });

    it('should return null when {{moduleName}} not found', async () => {
      // Arrange
      db.query.mockResolvedValue([]);

      // Act
      const result = await repository.findById(999);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a {{moduleName}}', async () => {
      // Arrange
      const updateData = { name: 'Updated {{moduleName}}' };
      db.query.mockResolvedValue([{ affectedRows: 1 }]);

      // Act
      const result = await repository.update(1, updateData);

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        'UPDATE {{kebabCase moduleName}} SET ? WHERE id = ?',
        [updateData, 1]
      );
      expect(result).toEqual({ affectedRows: 1 });
    });
  });

  describe('delete', () => {
    it('should delete a {{moduleName}}', async () => {
      // Arrange
      db.query.mockResolvedValue([{ affectedRows: 1 }]);

      // Act
      await repository.delete(1);

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        'DELETE FROM {{kebabCase moduleName}} WHERE id = ?',
        [1]
      );
    });
  });

  describe('exists', () => {
    it('should return true when {{moduleName}} exists', async () => {
      // Arrange
      db.query.mockResolvedValue([{ 1: 1 }]);

      // Act
      const result = await repository.exists(1);

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        'SELECT 1 FROM {{kebabCase moduleName}} WHERE id = ?',
        [1]
      );
      expect(result).toBe(true);
    });

    it('should return false when {{moduleName}} does not exist', async () => {
      // Arrange
      db.query.mockResolvedValue([]);

      // Act
      const result = await repository.exists(999);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('count', () => {
    it('should return total count', async () => {
      // Arrange
      db.query.mockResolvedValue([{ total: 5 }]);

      // Act
      const result = await repository.count({ filters: {} });

      // Assert
      expect(db.query).toHaveBeenCalled();
      expect(result).toBe(5);
    });

    it('should handle filters in count', async () => {
      // Arrange
      const filters = { name: 'Test' };
      db.query.mockResolvedValue([{ total: 1 }]);

      // Act
      await repository.count({ filters });

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE 1=1 AND name = ?'),
        ['Test']
      );
    });
  });
});
`);

// generators/templates/test/integration.api.hbs
writeFile('generators/templates/test/integration.api.hbs', `/**
 * {{pascalCase moduleName}} API Integration Tests
 */

import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import {{kebabCase moduleName}}Routes from '../../../src/api/v1/modules/{{kebabCase moduleName}}/routes/{{kebabCase moduleName}}.routes.js';

// Mock the entire module
jest.mock('../../../src/api/v1/modules/{{kebabCase moduleName}}/controllers/{{kebabCase moduleName}}.controller.js');
jest.mock('../../../src/api/v1/modules/{{kebabCase moduleName}}/services/{{kebabCase moduleName}}.service.js');
jest.mock('../../../src/api/v1/modules/{{kebabCase moduleName}}/repositories/{{kebabCase moduleName}}.repository.js');

describe('{{pascalCase moduleName}} API Integration Tests', () => {
  let app;

  beforeAll(() => {
    // Create Express app for testing
    app = express();
    app.use(express.json());
    app.use('/api/v1/{{kebabCase moduleName}}', {{kebabCase moduleName}}Routes);
  });

  describe('POST /api/v1/{{kebabCase moduleName}}', () => {
    it('should create a new {{moduleName}}', async () => {
      // Arrange
      const newData = {
        name: 'Test {{pascalCase moduleName}}',
        description: 'Test description',
      };

      // Act
      const response = await request(app)
        .post('/api/v1/{{kebabCase moduleName}}')
        .send(newData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('name', newData.name);
    });

    it('should return 400 for invalid data', async () => {
      // Arrange
      const invalidData = {};

      // Act
      const response = await request(app)
        .post('/api/v1/{{kebabCase moduleName}}')
        .send(invalidData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/v1/{{kebabCase moduleName}}', () => {
    it('should return all {{moduleName}}s', async () => {
      // Act
      const response = await request(app)
        .get('/api/v1/{{kebabCase moduleName}}');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty('pagination');
    });

    it('should handle pagination', async () => {
      // Act
      const response = await request(app)
        .get('/api/v1/{{kebabCase moduleName}}?page=2&limit=5');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.pagination).toHaveProperty('page', 2);
      expect(response.body.pagination).toHaveProperty('limit', 5);
    });
  });

  describe('GET /api/v1/{{kebabCase moduleName}}/:id', () => {
    it('should return a {{moduleName}} by id', async () => {
      // Act
      const response = await request(app)
        .get('/api/v1/{{kebabCase moduleName}}/1');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });

    it('should return 404 for non-existent {{moduleName}}', async () => {
      // Act
      const response = await request(app)
        .get('/api/v1/{{kebabCase moduleName}}/999');

      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', '{{pascalCase moduleName}} not found');
    });
  });

  describe('PUT /api/v1/{{kebabCase moduleName}}/:id', () => {
    it('should update a {{moduleName}}', async () => {
      // Arrange
      const updateData = {
        name: 'Updated {{pascalCase moduleName}}',
      };

      // Act
      const response = await request(app)
        .put('/api/v1/{{kebabCase moduleName}}/1')
        .send(updateData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('name', updateData.name);
    });
  });

  describe('DELETE /api/v1/{{kebabCase moduleName}}/:id', () => {
    it('should delete a {{moduleName}}', async () => {
      // Act
      const response = await request(app)
        .delete('/api/v1/{{kebabCase moduleName}}/1');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', '{{pascalCase moduleName}} deleted successfully');
    });
  });
});
`);

console.log('\n✅ All test files created successfully!');
console.log('\n📁 Test structure created:');
console.log('  ✅ tests/helpers.js');
console.log('  ✅ tests/fixtures/data.js');
console.log('  ✅ tests/fixtures/factories.js');
console.log('  ✅ tests/mocks/database.js');
console.log('  ✅ tests/mocks/services.js');
console.log('  ✅ tests/example.test.js');
console.log('  ✅ generators/templates/test/unit.controller.hbs');
console.log('  ✅ generators/templates/test/unit.service.hbs');
console.log('  ✅ generators/templates/test/unit.repository.hbs');
console.log('  ✅ generators/templates/test/integration.api.hbs');
console.log('\n🚀 Next steps:');
console.log('  1. npm install --save-dev jest supertest @jest/globals');
console.log('  2. npm install --save-dev jest-html-reporter jest-junit');
console.log('  3. npm test');