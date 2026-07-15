/**
 * State Public Service
 * Public service for state operations (read-only)
 */

import { StateRepository } from '../../repositories/public/index.js';
import { BaseService } from '../../core/base/BaseService.js';
import { LoggerService } from '../logger.js';
import { NotFoundError } from '../../core/exceptions/index.js';

const logger = new LoggerService('public:state:service');

export class StatePublicService extends BaseService {
  constructor() {
    super(StateRepository);
    this.repository = StateRepository;
    this.name = 'State';
  }

  /**
   * Get all states (public)
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
   * Get state by ID (public)
   */
  async getById(id) {
    try {
      const state = await this.repository.findById(id);
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
   * Get states by country (public)
   */
  async getByCountry(countryId, options = {}) {
    try {
      return await this.repository.getByCountry(countryId, options);
    } catch (error) {
      logger.logError(error, { method: 'getByCountry', countryId });
      throw error;
    }
  }

  /**
   * Search states (public)
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
   * Get state statistics (public)
   */
  async getStatistics(id) {
    try {
      const stats = await this.repository.getStatistics(id);
      if (!stats) {
        throw new NotFoundError(`State with ID ${id} not found`);
      }
      return stats;
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id });
      throw error;
    }
  }
}

export default new StatePublicService();