/**
 * Country Admin Repository
 * Admin operations for countries with full CRUD
 */

import { Country, Continent } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { BaseRepository } from '../../core/base/BaseRepository.js';
import { CountryQueries } from '../../queries/country.queries.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('admin:country:repository');

class CountryAdminRepository extends BaseRepository {
  constructor() {
    // Fix: Use Country model directly
    super(Country);
    this.model = Country;
    this.name = 'Country';
  }

  /**
   * Get country by code (admin)
   */
  async getByCode(code, includeDeleted = false) {
    try {
      const query = CountryQueries.buildGetByCodeQuery(code, includeDeleted);
      return await this.model.findOne(query);
    } catch (error) {
      logger.logError(error, { method: 'getByCode', code });
      throw error;
    }
  }

  /**
   * Get all countries with filters (admin)
   */
  async getAll(filters = {}, includeDeleted = false) {
    try {
      const { page = 1, limit = 10, ...filterOptions } = filters;
      const pagination = { page, limit };
      
      const query = CountryQueries.buildGetAllQuery(filterOptions, pagination, includeDeleted);
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
   * Get deleted countries (admin)
   */
  async getDeleted(filters = {}) {
    try {
      const { page = 1, limit = 10, ...filterOptions } = filters;
      const pagination = { page, limit };
      
      const query = CountryQueries.buildDeletedQuery(pagination);
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
   * Create country (admin)
   */
  async create(data) {
    try {
      const country = await this.model.create({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      });
      return country;
    } catch (error) {
      logger.logError(error, { method: 'create', data });
      throw error;
    }
  }

  /**
   * Update country (admin)
   */
  async update(id, data) {
    try {
      const country = await this.findById(id);
      if (!country) {
        return null;
      }
      
      const updateData = { ...data, updated_at: new Date() };
      await country.update(updateData);
      await country.reload();
      return country;
    } catch (error) {
      logger.logError(error, { method: 'update', id });
      throw error;
    }
  }

  /**
   * Bulk create countries (admin)
   */
  async bulkCreate(dataArray) {
    try {
      const countries = await this.model.bulkCreate(dataArray, {
        ignoreDuplicates: true,
        returning: true
      });
      return countries;
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', count: dataArray.length });
      throw error;
    }
  }

  /**
   * Bulk delete countries (admin)
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
   * Bulk hard delete countries (admin)
   */
  async bulkHardDelete(ids) {
    try {
      const affectedCount = await this.model.destroy({
        where: { id: ids },
        force: true
      });
      return affectedCount;
    } catch (error) {
      logger.logError(error, { method: 'bulkHardDelete', ids });
      throw error;
    }
  }

  /**
   * Restore country (admin)
   */
  async restore(id) {
    try {
      const country = await this.model.findByPk(id, { paranoid: false });
      if (!country) {
        return null;
      }
      await country.restore();
      return country;
    } catch (error) {
      logger.logError(error, { method: 'restore', id });
      throw error;
    }
  }

  /**
   * Search countries (admin)
   */
  async search(query, options = {}) {
    try {
      const searchQuery = CountryQueries.buildSearchQuery(query, options);
      return await this.model.findAll(searchQuery);
    } catch (error) {
      logger.logError(error, { method: 'search', query });
      throw error;
    }
  }

  /**
   * Get countries with state counts
   */
  async getWithStateCounts() {
    try {
      const query = CountryQueries.buildWithStateCountsQuery();
      return await this.model.findAll(query);
    } catch (error) {
      logger.logError(error, { method: 'getWithStateCounts' });
      throw error;
    }
  }
}

export default new CountryAdminRepository();