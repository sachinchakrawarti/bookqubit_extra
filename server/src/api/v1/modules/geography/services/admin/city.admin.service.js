/**
 * City Admin Service
 * Admin service for city management with business logic
 */

import { CityAdminRepository } from '../../repositories/admin/index.js';
import { BaseService } from '../../core/base/BaseService.js';
import { LoggerService } from '../../services/logger.js';
import { ValidationError, NotFoundError, DuplicateError } from '../../core/exceptions/index.js';
import { Op } from 'sequelize';

const logger = new LoggerService('admin:city:service');

class CityAdminService extends BaseService {
  constructor() {
    super(CityAdminRepository);
    this.repository = CityAdminRepository;
    this.name = 'City';
  }

  /**
   * Get all cities with filters (admin)
   * @param {Object} filters - Filter options
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Promise<Object>} Paginated cities
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
   * Get city by ID (admin)
   * @param {number} id - City ID
   * @param {boolean} includeDeleted - Include deleted records
   * @returns {Promise<Object>} City data
   */
  async getById(id, includeDeleted = false) {
    try {
      const city = await this.repository.findById(id, includeDeleted);
      if (!city) {
        throw new NotFoundError(`City with ID ${id} not found`);
      }
      return city;
    } catch (error) {
      logger.logError(error, { method: 'getById', id });
      throw error;
    }
  }

  /**
   * Get deleted cities (admin)
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Paginated deleted cities
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
   * Get cities by state (admin)
   * @param {number} stateId - State ID
   * @returns {Promise<Array>} List of cities
   */
  async getByState(stateId) {
    try {
      return await this.repository.getByState(stateId);
    } catch (error) {
      logger.logError(error, { method: 'getByState', stateId });
      throw error;
    }
  }

  /**
   * Get capital cities (admin)
   * @param {Object} filters - Filter options
   * @param {Object} pagination - Pagination options
   * @returns {Promise<Object>} Paginated capital cities
   */
  async getCapitals(filters = {}, pagination = {}) {
    try {
      return await this.repository.getCapitals(filters, pagination);
    } catch (error) {
      logger.logError(error, { method: 'getCapitals', filters });
      throw error;
    }
  }

  /**
   * Create city (admin)
   * @param {Object} data - City data
   * @returns {Promise<Object>} Created city
   */
  async create(data) {
    try {
      // Validate data
      this.validateCreateData(data);

      // Check for duplicate name in state
      const existing = await this.repository.model.findOne({
        where: {
          name: data.name,
          state_id: data.state_id,
          deleted_at: null
        }
      });

      if (existing) {
        throw new DuplicateError(`City with name "${data.name}" already exists in this state`);
      }

      return await this.repository.create(data);
    } catch (error) {
      logger.logError(error, { method: 'create', data });
      throw error;
    }
  }

  /**
   * Update city (admin)
   * @param {number} id - City ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated city
   */
  async update(id, data) {
    try {
      // Validate data
      this.validateUpdateData(data);

      // Check if city exists
      const city = await this.repository.findById(id);
      if (!city) {
        throw new NotFoundError(`City with ID ${id} not found`);
      }

      // Check for duplicate name if name is being changed
      if (data.name) {
        const existing = await this.repository.model.findOne({
          where: {
            name: data.name,
            state_id: data.state_id || city.state_id,
            id: { [Op.ne]: id },
            deleted_at: null
          }
        });

        if (existing) {
          throw new DuplicateError(`City with name "${data.name}" already exists in this state`);
        }
      }

      return await this.repository.update(id, data);
    } catch (error) {
      logger.logError(error, { method: 'update', id });
      throw error;
    }
  }

  /**
   * Delete city (soft delete) (admin)
   * @param {number} id - City ID
   * @returns {Promise<boolean>} Deletion status
   */
  async delete(id) {
    try {
      const city = await this.repository.findById(id);
      if (!city) {
        throw new NotFoundError(`City with ID ${id} not found`);
      }

      await this.repository.delete(id);
      return true;
    } catch (error) {
      logger.logError(error, { method: 'delete', id });
      throw error;
    }
  }

  /**
   * Restore city (admin)
   * @param {number} id - City ID
   * @returns {Promise<Object>} Restored city
   */
  async restore(id) {
    try {
      const city = await this.repository.restore(id);
      if (!city) {
        throw new NotFoundError(`City with ID ${id} not found or not deleted`);
      }
      return city;
    } catch (error) {
      logger.logError(error, { method: 'restore', id });
      throw error;
    }
  }

  /**
   * Bulk create cities (admin)
   * @param {Array} dataArray - Array of city data
   * @returns {Promise<Array>} Created cities
   */
  async bulkCreate(dataArray) {
    try {
      // Validate all items
      dataArray.forEach(data => this.validateCreateData(data));

      // Check for duplicates
      const names = dataArray.map(d => d.name);
      const existing = await this.repository.model.findAll({
        where: {
          name: names,
          deleted_at: null
        },
        attributes: ['name', 'state_id']
      });

      if (existing.length > 0) {
        const duplicateNames = existing.map(e => e.name).join(', ');
        throw new DuplicateError(`Cities already exist: ${duplicateNames}`);
      }

      return await this.repository.bulkCreate(dataArray);
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', count: dataArray.length });
      throw error;
    }
  }

  /**
   * Bulk delete cities (admin)
   * @param {Array} ids - Array of city IDs
   * @returns {Promise<number>} Number of deleted cities
   */
  async bulkDelete(ids) {
    try {
      return await this.repository.bulkDelete(ids);
    } catch (error) {
      logger.logError(error, { method: 'bulkDelete', ids });
      throw error;
    }
  }

  /**
   * Search cities (admin)
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
   * Get cities with coordinates (admin)
   * @param {Object} filters - Filter options
   * @param {Object} pagination - Pagination options
   * @returns {Promise<Object>} Paginated cities with coordinates
   */
  async getWithCoordinates(filters = {}, pagination = {}) {
    try {
      return await this.repository.getWithCoordinates(filters, pagination);
    } catch (error) {
      logger.logError(error, { method: 'getWithCoordinates', filters });
      throw error;
    }
  }

  /**
   * Find cities by coordinates (nearby) (admin)
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @param {number} radius - Radius in km
   * @returns {Promise<Array>} Nearby cities
   */
  async findNearby(latitude, longitude, radius = 10) {
    try {
      return await this.repository.findNearby(latitude, longitude, radius);
    } catch (error) {
      logger.logError(error, { method: 'findNearby', latitude, longitude });
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
      throw new ValidationError('City name is required');
    }
    if (!data.state_id) {
      throw new ValidationError('State ID is required');
    }
    if (data.name && data.name.length < 2) {
      throw new ValidationError('City name must be at least 2 characters');
    }
  }

  /**
   * Validate update data
   * @param {Object} data - Data to validate
   * @throws {ValidationError} If validation fails
   */
  validateUpdateData(data) {
    if (data.name && data.name.length < 2) {
      throw new ValidationError('City name must be at least 2 characters');
    }
  }
}

export default new CityAdminService();