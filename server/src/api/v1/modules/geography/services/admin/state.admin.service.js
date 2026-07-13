/**
 * State Admin Service
 * Admin service for state management with business logic
 */

import { StateAdminRepository } from '../../repositories/admin/index.js';
import { BaseService } from '../../core/base/BaseService.js';
import { LoggerService } from '../logger.js';
import { ValidationError, NotFoundError, DuplicateError } from '../../core/exceptions/index.js';
import { Op } from 'sequelize';

const logger = new LoggerService('admin:state:service');

class StateAdminService extends BaseService {
  constructor() {
    super(StateAdminRepository);
    this.repository = StateAdminRepository;
    this.name = 'State';
  }

  /**
   * Get all states with filters (admin)
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
   * Get state by ID (admin)
   */
  async getById(id, includeDeleted = false) {
    try {
      const state = await this.repository.findById(id, includeDeleted);
      if (!state) {
        throw new NotFoundError(`State with ID ${id} not found`);
      }
      return state;
    } catch (error) {
      logger.logError(error, { method: 'getById', id });
      throw error;
    }
  }

  /**
   * Get deleted states (admin)
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
   * Get states by country (admin)
   */
  async getByCountry(countryId) {
    try {
      return await this.repository.getByCountry(countryId);
    } catch (error) {
      logger.logError(error, { method: 'getByCountry', countryId });
      throw error;
    }
  }

  /**
   * Create state (admin)
   */
  async create(data) {
    try {
      this.validateCreateData(data);

      const existing = await this.repository.model.findOne({
        where: {
          name: data.name,
          country_id: data.country_id,
          deleted_at: null
        }
      });

      if (existing) {
        throw new DuplicateError(`State with name "${data.name}" already exists in this country`);
      }

      return await this.repository.create(data);
    } catch (error) {
      logger.logError(error, { method: 'create', data });
      throw error;
    }
  }

  /**
   * Update state (admin)
   */
  async update(id, data) {
    try {
      this.validateUpdateData(data);

      const state = await this.repository.findById(id);
      if (!state) {
        throw new NotFoundError(`State with ID ${id} not found`);
      }

      if (data.name) {
        const existing = await this.repository.model.findOne({
          where: {
            name: data.name,
            country_id: data.country_id || state.country_id,
            id: { [Op.ne]: id },
            deleted_at: null
          }
        });

        if (existing) {
          throw new DuplicateError(`State with name "${data.name}" already exists in this country`);
        }
      }

      return await this.repository.update(id, data);
    } catch (error) {
      logger.logError(error, { method: 'update', id });
      throw error;
    }
  }

  /**
   * Delete state (soft delete)
   */
  async delete(id) {
    try {
      const state = await this.repository.findById(id);
      if (!state) {
        throw new NotFoundError(`State with ID ${id} not found`);
      }

      await this.repository.delete(id);
      return true;
    } catch (error) {
      logger.logError(error, { method: 'delete', id });
      throw error;
    }
  }

  /**
   * Restore state
   */
  async restore(id) {
    try {
      const state = await this.repository.restore(id);
      if (!state) {
        throw new NotFoundError(`State with ID ${id} not found or not deleted`);
      }
      return state;
    } catch (error) {
      logger.logError(error, { method: 'restore', id });
      throw error;
    }
  }

  /**
   * Bulk create states
   */
  async bulkCreate(dataArray) {
    try {
      dataArray.forEach(data => this.validateCreateData(data));

      const names = dataArray.map(d => d.name);
      const existing = await this.repository.model.findAll({
        where: {
          name: names,
          deleted_at: null
        },
        attributes: ['name', 'country_id']
      });

      if (existing.length > 0) {
        const duplicateNames = existing.map(e => e.name).join(', ');
        throw new DuplicateError(`States already exist: ${duplicateNames}`);
      }

      return await this.repository.bulkCreate(dataArray);
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', count: dataArray.length });
      throw error;
    }
  }

  /**
   * Bulk delete states
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
   * Search states
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
   * Get states with city counts
   */
  async getWithCityCounts(countryId = null) {
    try {
      return await this.repository.getWithCityCounts(countryId);
    } catch (error) {
      logger.logError(error, { method: 'getWithCityCounts', countryId });
      throw error;
    }
  }

  validateCreateData(data) {
    if (!data.name) {
      throw new ValidationError('State name is required');
    }
    if (!data.country_id) {
      throw new ValidationError('Country ID is required');
    }
    if (data.name && data.name.length < 2) {
      throw new ValidationError('State name must be at least 2 characters');
    }
    if (data.code && data.code.length > 10) {
      throw new ValidationError('State code cannot exceed 10 characters');
    }
  }

  validateUpdateData(data) {
    if (data.name && data.name.length < 2) {
      throw new ValidationError('State name must be at least 2 characters');
    }
    if (data.code && data.code.length > 10) {
      throw new ValidationError('State code cannot exceed 10 characters');
    }
  }
}

export default new StateAdminService();