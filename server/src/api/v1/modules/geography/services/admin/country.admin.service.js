/**
 * Country Admin Service
 * Admin service for country management with business logic
 */

import { CountryAdminRepository } from '../../repositories/admin/index.js';
import { BaseService } from '../../core/base/BaseService.js';
import { LoggerService } from '../../services/logger.js';
import { ValidationError, NotFoundError, DuplicateError } from '../../core/exceptions/index.js';
import { Op } from 'sequelize';

const logger = new LoggerService('admin:country:service');

class CountryAdminService extends BaseService {
  constructor() {
    super(CountryAdminRepository);
    this.repository = CountryAdminRepository;
    this.name = 'Country';
  }

  /**
   * Get all countries with filters (admin)
   * @param {Object} filters - Filter options
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Promise<Object>} Paginated countries
   */
  async getAll(filters = {}, includeDeleted = false) {
    try {
      return await this.repository.getAll(filters, includeDeleted);
    } catch (error) {
      logger.logError(error, { method: 'getAll', filters });
      throw error;
    }
  }

  /**
   * Get country by ID (admin)
   * @param {number} id - Country ID
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Promise<Object>} Country data
   */
  async getById(id, includeDeleted = false) {
    try {
      const country = await this.repository.findById(id, includeDeleted);
      if (!country) {
        throw new NotFoundError(`Country with ID ${id} not found`);
      }
      return country;
    } catch (error) {
      logger.logError(error, { method: 'getById', id });
      throw error;
    }
  }

  /**
   * Get country by code (admin)
   * @param {string} code - Country code
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Promise<Object>} Country data
   */
  async getByCode(code, includeDeleted = false) {
    try {
      const country = await this.repository.getByCode(code, includeDeleted);
      if (!country) {
        throw new NotFoundError(`Country with code ${code} not found`);
      }
      return country;
    } catch (error) {
      logger.logError(error, { method: 'getByCode', code });
      throw error;
    }
  }

  /**
   * Get deleted countries (admin)
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Paginated deleted countries
   */
  async getDeleted(filters = {}) {
    try {
      return await this.repository.getDeleted(filters);
    } catch (error) {
      logger.logError(error, { method: 'getDeleted', filters });
      throw error;
    }
  }

  /**
   * Create country (admin)
   * @param {Object} data - Country data
   * @returns {Promise<Object>} Created country
   */
  async create(data) {
    try {
      // Validate data
      this.validateCreateData(data);

      // Check for duplicate code
      const existing = await this.repository.model.findOne({
        where: {
          code: data.code.toUpperCase(),
          deleted_at: null
        }
      });

      if (existing) {
        throw new DuplicateError(`Country with code "${data.code}" already exists`);
      }

      // Check for duplicate name
      const existingName = await this.repository.model.findOne({
        where: {
          name: data.name,
          deleted_at: null
        }
      });

      if (existingName) {
        throw new DuplicateError(`Country with name "${data.name}" already exists`);
      }

      return await this.repository.create(data);
    } catch (error) {
      logger.logError(error, { method: 'create', data });
      throw error;
    }
  }

  /**
   * Update country (admin)
   * @param {number} id - Country ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated country
   */
  async update(id, data) {
    try {
      // Validate data
      this.validateUpdateData(data);

      // Check if country exists
      const country = await this.repository.findById(id);
      if (!country) {
        throw new NotFoundError(`Country with ID ${id} not found`);
      }

      // Check for duplicate code
      if (data.code) {
        const existing = await this.repository.model.findOne({
          where: {
            code: data.code.toUpperCase(),
            id: { [Op.ne]: id },
            deleted_at: null
          }
        });

        if (existing) {
          throw new DuplicateError(`Country with code "${data.code}" already exists`);
        }
      }

      // Check for duplicate name
      if (data.name) {
        const existingName = await this.repository.model.findOne({
          where: {
            name: data.name,
            id: { [Op.ne]: id },
            deleted_at: null
          }
        });

        if (existingName) {
          throw new DuplicateError(`Country with name "${data.name}" already exists`);
        }
      }

      return await this.repository.update(id, data);
    } catch (error) {
      logger.logError(error, { method: 'update', id });
      throw error;
    }
  }

  /**
   * Delete country (soft delete) (admin)
   * @param {number} id - Country ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    try {
      const country = await this.repository.findById(id);
      if (!country) {
        throw new NotFoundError(`Country with ID ${id} not found`);
      }

      // Check if country has states
      const stateCount = await country.countStates();
      if (stateCount > 0) {
        throw new ValidationError(`Cannot delete country with ${stateCount} associated states. Delete or reassign states first.`);
      }

      await this.repository.delete(id);
      return true;
    } catch (error) {
      logger.logError(error, { method: 'delete', id });
      throw error;
    }
  }

  /**
   * Hard delete country (admin)
   * @param {number} id - Country ID
   * @returns {Promise<boolean>} Deletion status
   */
  async hardDelete(id) {
    try {
      const country = await this.repository.findById(id, true);
      if (!country) {
        throw new NotFoundError(`Country with ID ${id} not found`);
      }

      await this.repository.bulkHardDelete([id]);
      return true;
    } catch (error) {
      logger.logError(error, { method: 'hardDelete', id });
      throw error;
    }
  }

  /**
   * Restore country (admin)
   * @param {number} id - Country ID
   * @returns {Promise<Object>} Restored country
   */
  async restore(id) {
    try {
      const country = await this.repository.restore(id);
      if (!country) {
        throw new NotFoundError(`Country with ID ${id} not found or not deleted`);
      }
      return country;
    } catch (error) {
      logger.logError(error, { method: 'restore', id });
      throw error;
    }
  }

  /**
   * Bulk create countries (admin)
   * @param {Array} dataArray - Array of country data
   * @returns {Promise<Array>} Created countries
   */
  async bulkCreate(dataArray) {
    try {
      // Validate all items
      dataArray.forEach(data => this.validateCreateData(data));

      // Check for duplicate codes
      const codes = dataArray.map(d => d.code.toUpperCase());
      const existing = await this.repository.model.findAll({
        where: {
          code: codes,
          deleted_at: null
        },
        attributes: ['code']
      });

      if (existing.length > 0) {
        const duplicateCodes = existing.map(e => e.code).join(', ');
        throw new DuplicateError(`Countries already exist with codes: ${duplicateCodes}`);
      }

      return await this.repository.bulkCreate(dataArray);
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', count: dataArray.length });
      throw error;
    }
  }

  /**
   * Bulk delete countries (admin)
   * @param {Array} ids - Array of country IDs
   * @returns {Promise<number>} Number of deleted countries
   */
  async bulkDelete(ids) {
    try {
      // Check if any countries have states
      const countries = await this.repository.model.findAll({
        where: { id: ids },
        include: ['states']
      });

      const countriesWithStates = countries.filter(c => c.states && c.states.length > 0);
      if (countriesWithStates.length > 0) {
        const names = countriesWithStates.map(c => c.name).join(', ');
        throw new ValidationError(`Cannot delete countries with states: ${names}`);
      }

      return await this.repository.bulkDelete(ids);
    } catch (error) {
      logger.logError(error, { method: 'bulkDelete', ids });
      throw error;
    }
  }

  /**
   * Search countries (admin)
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  async search(query, options = {}) {
    try {
      return await this.repository.search(query, options);
    } catch (error) {
      logger.logError(error, { method: 'search', query });
      throw error;
    }
  }

  /**
   * Get countries with state counts (admin)
   * @returns {Promise<Array>} Countries with state counts
   */
  async getWithStateCounts() {
    try {
      return await this.repository.getWithStateCounts();
    } catch (error) {
      logger.logError(error, { method: 'getWithStateCounts' });
      throw error;
    }
  }

  /**
   * Validate create data
   * @param {Object} data - Data to validate
   * @throws {ValidationError} If validation fails
   */
  validateCreateData(data) {
    if (!data.name) {
      throw new ValidationError('Country name is required');
    }
    if (!data.code) {
      throw new ValidationError('Country code is required');
    }
    if (data.name && data.name.length < 2) {
      throw new ValidationError('Country name must be at least 2 characters');
    }
    if (data.code && data.code.length !== 2 && data.code.length !== 3) {
      throw new ValidationError('Country code must be 2 or 3 characters');
    }
  }

  /**
   * Validate update data
   * @param {Object} data - Data to validate
   * @throws {ValidationError} If validation fails
   */
  validateUpdateData(data) {
    if (data.name && data.name.length < 2) {
      throw new ValidationError('Country name must be at least 2 characters');
    }
    if (data.code && data.code.length !== 2 && data.code.length !== 3) {
      throw new ValidationError('Country code must be 2 or 3 characters');
    }
  }
}

export default new CountryAdminService();