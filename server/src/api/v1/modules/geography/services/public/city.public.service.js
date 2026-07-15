/**
 * City Public Service
 * Public service for city operations (read-only)
 */

import { CityRepository } from '../../repositories/public/index.js';
import { BaseService } from '../../core/base/BaseService.js';
import { LoggerService } from '../logger.js';
import { NotFoundError } from '../../core/exceptions/index.js';

const logger = new LoggerService('public:city:service');

export class CityPublicService extends BaseService {
  constructor() {
    super(CityRepository);
    this.repository = CityRepository;
    this.name = 'City';
  }

  /**
   * Get all cities (public)
   */
  async getAll(filters = {}) {
    try {
      return await this.repository.getAll(filters);
    } catch (error) {
      logger.logError(error, { method: 'getAll', filters });
      throw error;
    }
  }

  /**
   * Get city by ID (public)
   */
  async getById(id) {
    try {
      const city = await this.repository.findById(id);
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
   * Get cities by state (public)
   */
  async getByState(stateId, options = {}) {
    try {
      return await this.repository.getByState(stateId, options);
    } catch (error) {
      logger.logError(error, { method: 'getByState', stateId });
      throw error;
    }
  }

  /**
   * Get capital cities (public)
   */
  async getCapitals(filters = {}) {
    try {
      return await this.repository.getCapitals(filters);
    } catch (error) {
      logger.logError(error, { method: 'getCapitals', filters });
      throw error;
    }
  }

  /**
   * Search cities (public)
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
   * Find nearby cities (public)
   */
  async findNearby(latitude, longitude, radius = 10, options = {}) {
    try {
      return await this.repository.findNearby(latitude, longitude, radius, options);
    } catch (error) {
      logger.logError(error, { method: 'findNearby', latitude, longitude });
      throw error;
    }
  }

  /**
   * Get city statistics (public)
   */
  async getStatistics(id) {
    try {
      const stats = await this.repository.getStatistics(id);
      if (!stats) {
        throw new NotFoundError(`City with ID ${id} not found`);
      }
      return stats;
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id });
      throw error;
    }
  }
}

export default new CityPublicService();