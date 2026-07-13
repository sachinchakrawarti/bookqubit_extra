/**
 * Base Repository
 * Abstract base class for all repositories
 * Provides common CRUD operations
 */

import { LoggerService } from '../../services/logger.js';

export class BaseRepository {
  constructor(model, name = 'BaseRepository') {
    this.model = model;
    this.name = name;
    this.logger = new LoggerService(`repository:${name.toLowerCase()}`);
  }

  /**
   * Get model instance
   * @returns {Object} Model instance
   */
  getModel() {
    return this.model;
  }

  /**
   * Find by primary key
   * @param {*} id - Primary key value
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Model instance
   */
  async findById(id, options = {}) {
    try {
      return await this.model.findByPk(id, options);
    } catch (error) {
      this.logger.error('Error finding by ID', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Find one with conditions
   * @param {Object} conditions - Where conditions
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Model instance
   */
  async findOne(conditions = {}, options = {}) {
    try {
      return await this.model.findOne({ where: conditions, ...options });
    } catch (error) {
      this.logger.error('Error finding one', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Find all with conditions
   * @param {Object} conditions - Where conditions
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of model instances
   */
  async findAll(conditions = {}, options = {}) {
    try {
      return await this.model.findAll({ where: conditions, ...options });
    } catch (error) {
      this.logger.error('Error finding all', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Find and count all with pagination
   * @param {Object} conditions - Where conditions
   * @param {Object} options - Query options
   * @returns {Promise<Object>} { count, rows }
   */
  async findAndCountAll(conditions = {}, options = {}) {
    try {
      return await this.model.findAndCountAll({ where: conditions, ...options });
    } catch (error) {
      this.logger.error('Error finding and counting all', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Create new record
   * @param {Object} data - Data to create
   * @param {Object} options - Create options
   * @returns {Promise<Object>} Created model instance
   */
  async create(data, options = {}) {
    try {
      return await this.model.create(data, options);
    } catch (error) {
      this.logger.error('Error creating record', { data, error: error.message });
      throw error;
    }
  }

  /**
   * Update record
   * @param {*} id - Primary key value
   * @param {Object} data - Data to update
   * @param {Object} options - Update options
   * @returns {Promise<Object>} Updated model instance
   */
  async update(id, data, options = {}) {
    try {
      const record = await this.findById(id);
      if (!record) {
        return null;
      }
      return await record.update(data, options);
    } catch (error) {
      this.logger.error('Error updating record', { id, data, error: error.message });
      throw error;
    }
  }

  /**
   * Soft delete record
   * @param {*} id - Primary key value
   * @param {Object} options - Delete options
   * @returns {Promise<Object>} Deleted model instance
   */
  async softDelete(id, options = {}) {
    try {
      const record = await this.findById(id);
      if (!record) {
        return null;
      }
      return await record.destroy(options);
    } catch (error) {
      this.logger.error('Error soft deleting record', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Hard delete record
   * @param {*} id - Primary key value
   * @param {Object} options - Delete options
   * @returns {Promise<Object>} Deleted model instance
   */
  async hardDelete(id, options = {}) {
    try {
      const record = await this.model.findByPk(id, { paranoid: false });
      if (!record) {
        return null;
      }
      return await record.destroy({ ...options, force: true });
    } catch (error) {
      this.logger.error('Error hard deleting record', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Restore soft-deleted record
   * @param {*} id - Primary key value
   * @returns {Promise<Object>} Restored model instance
   */
  async restore(id) {
    try {
      const record = await this.model.findByPk(id, { paranoid: false });
      if (!record) {
        return null;
      }
      return await record.restore();
    } catch (error) {
      this.logger.error('Error restoring record', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Bulk create records
   * @param {Array} dataArray - Array of data to create
   * @param {Object} options - Create options
   * @returns {Promise<Array>} Array of created model instances
   */
  async bulkCreate(dataArray, options = {}) {
    try {
      return await this.model.bulkCreate(dataArray, {
        ignoreDuplicates: true,
        returning: true,
        ...options
      });
    } catch (error) {
      this.logger.error('Error bulk creating records', { count: dataArray.length, error: error.message });
      throw error;
    }
  }

  /**
   * Bulk update records
   * @param {Array} ids - Array of primary key values
   * @param {Object} data - Data to update
   * @param {Object} options - Update options
   * @returns {Promise<number>} Number of affected records
   */
  async bulkUpdate(ids, data, options = {}) {
    try {
      const [affectedCount] = await this.model.update(data, {
        where: { id: ids },
        ...options
      });
      return affectedCount;
    } catch (error) {
      this.logger.error('Error bulk updating records', { ids, data, error: error.message });
      throw error;
    }
  }

  /**
   * Bulk delete records
   * @param {Array} ids - Array of primary key values
   * @param {Object} options - Delete options
   * @returns {Promise<number>} Number of deleted records
   */
  async bulkDelete(ids, options = {}) {
    try {
      const affectedCount = await this.model.destroy({
        where: { id: ids },
        ...options
      });
      return affectedCount;
    } catch (error) {
      this.logger.error('Error bulk deleting records', { ids, error: error.message });
      throw error;
    }
  }

  /**
   * Count records
   * @param {Object} conditions - Where conditions
   * @param {Object} options - Count options
   * @returns {Promise<number>} Number of records
   */
  async count(conditions = {}, options = {}) {
    try {
      return await this.model.count({ where: conditions, ...options });
    } catch (error) {
      this.logger.error('Error counting records', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Check if record exists
   * @param {Object} conditions - Where conditions
   * @param {Object} options - Options
   * @returns {Promise<boolean>} True if exists
   */
  async exists(conditions = {}, options = {}) {
    try {
      const count = await this.count(conditions, options);
      return count > 0;
    } catch (error) {
      this.logger.error('Error checking existence', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Get repository name
   * @returns {string} Repository name
   */
  getName() {
    return this.name;
  }
}

export default BaseRepository;