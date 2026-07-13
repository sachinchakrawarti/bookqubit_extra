/**
 * City Analytics Service
 * Analytics service for city data
 */

import { AnalyticsRepository } from '../../repositories/analytics/index.js';
import { LoggerService } from '../../services/logger.js';
import { NotFoundError } from '../../core/exceptions/index.js';

const logger = new LoggerService('analytics:city:service');

class CityAnalyticsService {
  constructor() {
    this.repository = AnalyticsRepository;
  }

  /**
   * Get city analytics
   * @param {number} cityId - City ID
   * @param {Object} options - Analytics options
   * @returns {Promise<Object>} City analytics data
   */
  async getCityAnalytics(cityId, options = {}) {
    try {
      const analytics = await this.repository.getCityAnalytics(cityId, options);
      if (!analytics) {
        throw new NotFoundError(`City with ID ${cityId} not found`);
      }
      return analytics;
    } catch (error) {
      logger.logError(error, { method: 'getCityAnalytics', cityId });
      throw error;
    }
  }

  /**
   * Get city density data
   * @param {Object} filters - Filter options
   * @param {Object} options - Options
   * @returns {Promise<Object>} City density data
   */
  async getCityDensity(filters = {}, options = {}) {
    try {
      return await this.repository.getCityDensity(filters, options);
    } catch (error) {
      logger.logError(error, { method: 'getCityDensity', filters });
      throw error;
    }
  }
}

export default new CityAnalyticsService();