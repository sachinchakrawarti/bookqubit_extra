/**
 * State Admin Repository
 * Admin operations for states with full CRUD
 */

import { State, Country } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { BaseRepository } from '../../core/base/BaseRepository.js';
import { StateQueries } from '../../queries/state.queries.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('admin:state:repository');

class StateAdminRepository extends BaseRepository {
  constructor() {
    // Fix: Use State model directly, not StateAdminRepository
    super(State);
    this.model = State;
    this.name = 'State';
  }

  /**
   * Get all states with filters (admin)
   */
  async getAll(filters = {}, includeDeleted = false) {
    try {
      const { page = 1, limit = 10, ...filterOptions } = filters;
      const pagination = { page, limit };
      
      const query = StateQueries.buildGetAllQuery(filterOptions, pagination, includeDeleted);
      const { count, rows } = await this.model.findAndCountAll(query);
      
      return {
        data: rows,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      };
    } catch (error) {
      logger.logError(error, { method: 'getAll', filters });
      throw error;
    }
  }

  /**
   * Get deleted states (admin)
   */
  async getDeleted(filters = {}) {
    try {
      const { page = 1, limit = 10, ...filterOptions } = filters;
      const pagination = { page, limit };
      
      const query = StateQueries.buildDeletedQuery(pagination);
      const { count, rows } = await this.model.findAndCountAll(query);
      
      return {
        data: rows,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      };
    } catch (error) {
      logger.logError(error, { method: 'getDeleted', filters });
      throw error;
    }
  }

  /**
   * Get states by country
   */
  async getByCountry(countryId) {
    try {
      const query = StateQueries.buildGetByCountryQuery(countryId);
      return await this.model.findAll(query);
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
      const state = await this.model.create({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      });
      return state;
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
      const state = await this.findById(id);
      if (!state) {
        return null;
      }
      
      const updateData = { ...data, updated_at: new Date() };
      await state.update(updateData);
      await state.reload();
      return state;
    } catch (error) {
      logger.logError(error, { method: 'update', id });
      throw error;
    }
  }

  /**
   * Bulk create states (admin)
   */
  async bulkCreate(dataArray) {
    try {
      const states = await this.model.bulkCreate(dataArray, {
        ignoreDuplicates: true,
        returning: true
      });
      return states;
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', count: dataArray.length });
      throw error;
    }
  }

  /**
   * Bulk delete states (admin)
   */
  async bulkDelete(ids) {
    try {
      const [affectedCount] = await this.model.update(
        { deleted_at: new Date() },
        { where: { id: ids } }
      );
      return affectedCount;
    } catch (error) {
      logger.logError(error, { method: 'bulkDelete', ids });
      throw error;
    }
  }

  /**
   * Restore state (admin)
   */
  async restore(id) {
    try {
      const state = await this.model.findByPk(id, { paranoid: false });
      if (!state) {
        return null;
      }
      await state.restore();
      return state;
    } catch (error) {
      logger.logError(error, { method: 'restore', id });
      throw error;
    }
  }

  /**
   * Search states (admin)
   */
  async search(query, options = {}) {
    try {
      const searchQuery = StateQueries.buildSearchQuery(query, options);
      return await this.model.findAll(searchQuery);
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
      const query = StateQueries.buildWithCityCountsQuery(countryId);
      return await this.model.findAll(query);
    } catch (error) {
      logger.logError(error, { method: 'getWithCityCounts', countryId });
      throw error;
    }
  }

  /**
   * Hard delete state (admin)
   */
  async hardDelete(id) {
    try {
      const state = await this.model.findByPk(id);
      if (!state) {
        return null;
      }
      await state.destroy({ force: true });
      return { message: 'State permanently deleted', id };
    } catch (error) {
      logger.logError(error, { method: 'hardDelete', id });
      throw error;
    }
  }
}

// Export a new instance
export default new StateAdminRepository();