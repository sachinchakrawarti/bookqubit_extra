/**
 * City Admin Repository
 * Admin operations for cities with full CRUD
 */

import { City, State, Country } from '../../models/sequelize/index.js';
import { Op } from 'sequelize';
import { BaseRepository } from '../../core/base/BaseRepository.js';
import { CityQueries } from '../../queries/city.queries.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('admin:city:repository');

class CityAdminRepository extends BaseRepository {
  constructor() {
    // Fix: Use City model directly
    super(City);
    this.model = City;
    this.name = 'City';
  }

  /**
   * Get all cities with filters (admin)
   */
  async getAll(filters = {}, includeDeleted = false) {
    try {
      const { page = 1, limit = 10, ...filterOptions } = filters;
      const pagination = { page, limit };
      
      const query = CityQueries.buildGetAllQuery(filterOptions, pagination, includeDeleted);
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
   * Get deleted cities (admin)
   */
  async getDeleted(filters = {}) {
    try {
      const { page = 1, limit = 10, ...filterOptions } = filters;
      const pagination = { page, limit };
      
      const query = CityQueries.buildDeletedQuery(pagination);
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
   * Get cities by state
   */
  async getByState(stateId) {
    try {
      const query = CityQueries.buildGetByStateQuery(stateId);
      return await this.model.findAll(query);
    } catch (error) {
      logger.logError(error, { method: 'getByState', stateId });
      throw error;
    }
  }

  /**
   * Get capital cities
   */
  async getCapitals(filters = {}, pagination = {}) {
    try {
      const query = CityQueries.buildCapitalsQuery(filters, pagination);
      const { count, rows } = await this.model.findAndCountAll(query);
      
      return {
        data: rows,
        total: count,
        page: parseInt(pagination.page) || 1,
        limit: parseInt(pagination.limit) || 10,
        totalPages: Math.ceil(count / (parseInt(pagination.limit) || 10))
      };
    } catch (error) {
      logger.logError(error, { method: 'getCapitals', filters });
      throw error;
    }
  }

  /**
   * Create city (admin)
   */
  async create(data) {
    try {
      const city = await this.model.create({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      });
      return city;
    } catch (error) {
      logger.logError(error, { method: 'create', data });
      throw error;
    }
  }

  /**
   * Update city (admin)
   */
  async update(id, data) {
    try {
      const city = await this.findById(id);
      if (!city) {
        return null;
      }
      
      const updateData = { ...data, updated_at: new Date() };
      await city.update(updateData);
      await city.reload();
      return city;
    } catch (error) {
      logger.logError(error, { method: 'update', id });
      throw error;
    }
  }

  /**
   * Bulk create cities (admin)
   */
  async bulkCreate(dataArray) {
    try {
      const cities = await this.model.bulkCreate(dataArray, {
        ignoreDuplicates: true,
        returning: true
      });
      return cities;
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', count: dataArray.length });
      throw error;
    }
  }

  /**
   * Bulk delete cities (admin)
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
   * Restore city (admin)
   */
  async restore(id) {
    try {
      const city = await this.model.findByPk(id, { paranoid: false });
      if (!city) {
        return null;
      }
      await city.restore();
      return city;
    } catch (error) {
      logger.logError(error, { method: 'restore', id });
      throw error;
    }
  }

  /**
   * Search cities (admin)
   */
  async search(query, options = {}) {
    try {
      const searchQuery = CityQueries.buildSearchQuery(query, options);
      return await this.model.findAll(searchQuery);
    } catch (error) {
      logger.logError(error, { method: 'search', query });
      throw error;
    }
  }

  /**
   * Get cities with coordinates
   */
  async getWithCoordinates(filters = {}, pagination = {}) {
    try {
      const query = CityQueries.buildWithCoordinatesQuery(filters, pagination);
      const { count, rows } = await this.model.findAndCountAll(query);
      
      return {
        data: rows,
        total: count,
        page: parseInt(pagination.page) || 1,
        limit: parseInt(pagination.limit) || 10,
        totalPages: Math.ceil(count / (parseInt(pagination.limit) || 10))
      };
    } catch (error) {
      logger.logError(error, { method: 'getWithCoordinates', filters });
      throw error;
    }
  }

  /**
   * Find cities by coordinates (nearby)
   */
  async findNearby(latitude, longitude, radius = 10) {
    try {
      const query = CityQueries.buildNearbyQuery(latitude, longitude, radius);
      return await this.model.findAll(query);
    } catch (error) {
      logger.logError(error, { method: 'findNearby', latitude, longitude });
      throw error;
    }
  }
}

export default new CityAdminRepository();