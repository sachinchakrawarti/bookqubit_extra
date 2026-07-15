/**
 * Country Public Service
 * Public service for country operations (read-only)
 */

import { CountryRepository } from '../../repositories/public/index.js';
import { BaseService } from '../../core/base/BaseService.js';
import { LoggerService } from '../logger.js';
import { NotFoundError } from '../../core/exceptions/index.js';

const logger = new LoggerService('public:country:service');

export class CountryPublicService extends BaseService {
  constructor() {
    super(CountryRepository);
    this.repository = CountryRepository;
    this.name = 'Country';
  }

  /**
   * Get all countries (public)
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
   * Get country by ID (public)
   */
  async getById(id) {
    try {
      const country = await this.repository.findById(id);
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
   * Get country by code (public)
   */
  async getByCode(code) {
    try {
      const country = await this.repository.getByCode(code);
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
   * Get countries with states (public)
   */
  async getWithStates(options = {}) {
    try {
      return await this.repository.getWithStates(options);
    } catch (error) {
      logger.logError(error, { method: 'getWithStates' });
      throw error;
    }
  }

  /**
   * Search countries (public)
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
   * Get country statistics (public)
   */
  async getStatistics(id) {
    try {
      const stats = await this.repository.getStatistics(id);
      if (!stats) {
        throw new NotFoundError(`Country with ID ${id} not found`);
      }
      return stats;
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id });
      throw error;
    }
  }
}

export default new CountryPublicService();