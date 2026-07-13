/**
 * Base Service
 * Abstract base class for all services
 * Provides common business logic operations
 */

import { LoggerService } from '../../services/logger.js';
import { NotFoundError, ValidationError } from '../exceptions/index.js';

export class BaseService {
  constructor(repository, name = 'BaseService') {
    this.repository = repository;
    this.name = name;
    this.logger = new LoggerService(`service:${name.toLowerCase()}`);
  }

  /**
   * Get repository instance
   * @returns {Object} Repository instance
   */
  getRepository() {
    return this.repository;
  }

  /**
   * Set repository instance
   * @param {Object} repository - Repository instance
   */
  setRepository(repository) {
    this.repository = repository;
  }

  /**
   * Log info message
   */
  logInfo(message, meta = {}) {
    this.logger.info(message, { service: this.name, ...meta });
  }

  /**
   * Log error message
   */
  logError(message, meta = {}) {
    this.logger.error(message, { service: this.name, ...meta });
  }

  /**
   * Log debug message
   */
  logDebug(message, meta = {}) {
    this.logger.debug(message, { service: this.name, ...meta });
  }

  /**
   * Find by ID
   */
  async findById(id, options = {}) {
    try {
      this.logDebug('Finding by ID', { id });
      const record = await this.repository.findById(id, options);
      if (!record) {
        throw new NotFoundError(this.repository.getName() || 'Record', id);
      }
      return record;
    } catch (error) {
      this.logError('Error finding by ID', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Find one with conditions
   */
  async findOne(conditions = {}, options = {}) {
    try {
      this.logDebug('Finding one', { conditions });
      return await this.repository.findOne(conditions, options);
    } catch (error) {
      this.logError('Error finding one', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Find all with conditions
   */
  async findAll(conditions = {}, options = {}) {
    try {
      this.logDebug('Finding all', { conditions });
      return await this.repository.findAll(conditions, options);
    } catch (error) {
      this.logError('Error finding all', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Find and count all with pagination
   */
  async findAndCountAll(conditions = {}, options = {}) {
    try {
      this.logDebug('Finding and counting all', { conditions });
      return await this.repository.findAndCountAll(conditions, options);
    } catch (error) {
      this.logError('Error finding and counting all', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Create new record
   */
  async create(data, options = {}) {
    try {
      this.logDebug('Creating record', { data });
      const validated = await this.validateCreate(data);
      return await this.repository.create(validated, options);
    } catch (error) {
      this.logError('Error creating record', { data, error: error.message });
      throw error;
    }
  }

  /**
   * Update record
   */
  async update(id, data, options = {}) {
    try {
      this.logDebug('Updating record', { id, data });
      await this.findById(id);
      const validated = await this.validateUpdate(data);
      return await this.repository.update(id, validated, options);
    } catch (error) {
      this.logError('Error updating record', { id, data, error: error.message });
      throw error;
    }
  }

  /**
   * Soft delete record
   */
  async delete(id, options = {}) {
    try {
      this.logDebug('Soft deleting record', { id });
      await this.findById(id);
      return await this.repository.softDelete(id, options);
    } catch (error) {
      this.logError('Error soft deleting record', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Hard delete record
   */
  async hardDelete(id, options = {}) {
    try {
      this.logDebug('Hard deleting record', { id });
      await this.findById(id);
      return await this.repository.hardDelete(id, options);
    } catch (error) {
      this.logError('Error hard deleting record', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Restore record
   */
  async restore(id) {
    try {
      this.logDebug('Restoring record', { id });
      return await this.repository.restore(id);
    } catch (error) {
      this.logError('Error restoring record', { id, error: error.message });
      throw error;
    }
  }

  /**
   * Bulk create records
   */
  async bulkCreate(dataArray, options = {}) {
    try {
      this.logDebug('Bulk creating records', { count: dataArray.length });
      const validated = await Promise.all(dataArray.map(d => this.validateCreate(d)));
      return await this.repository.bulkCreate(validated, options);
    } catch (error) {
      this.logError('Error bulk creating records', { count: dataArray.length, error: error.message });
      throw error;
    }
  }

  /**
   * Bulk update records
   */
  async bulkUpdate(ids, data, options = {}) {
    try {
      this.logDebug('Bulk updating records', { ids });
      const validated = await this.validateUpdate(data);
      return await this.repository.bulkUpdate(ids, validated, options);
    } catch (error) {
      this.logError('Error bulk updating records', { ids, error: error.message });
      throw error;
    }
  }

  /**
   * Bulk delete records
   */
  async bulkDelete(ids, options = {}) {
    try {
      this.logDebug('Bulk deleting records', { ids });
      return await this.repository.bulkDelete(ids, options);
    } catch (error) {
      this.logError('Error bulk deleting records', { ids, error: error.message });
      throw error;
    }
  }

  /**
   * Count records
   */
  async count(conditions = {}, options = {}) {
    try {
      this.logDebug('Counting records', { conditions });
      return await this.repository.count(conditions, options);
    } catch (error) {
      this.logError('Error counting records', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Check if record exists
   */
  async exists(conditions = {}, options = {}) {
    try {
      this.logDebug('Checking existence', { conditions });
      return await this.repository.exists(conditions, options);
    } catch (error) {
      this.logError('Error checking existence', { conditions, error: error.message });
      throw error;
    }
  }

  /**
   * Validate create data (override in subclass)
   */
  async validateCreate(data) {
    return data;
  }

  /**
   * Validate update data (override in subclass)
   */
  async validateUpdate(data) {
    return data;
  }

  /**
   * Get service name
   */
  getName() {
    return this.name;
  }
}

export default BaseService;