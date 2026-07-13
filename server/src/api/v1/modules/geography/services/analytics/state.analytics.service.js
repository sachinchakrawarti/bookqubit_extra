/**
 * State Analytics Service
 * Analytics service for state data
 */

import { AnalyticsRepository } from '../../repositories/analytics/index.js';
import { LoggerService } from '../../services/logger.js';
import { NotFoundError } from '../../core/exceptions/index.js';

const logger = new LoggerService('analytics:state:service');

class StateAnalyticsService {
  constructor() {
    this.repository = AnalyticsRepository;
  }

  /**
   * Get state analytics
   * @param {number} stateId - State ID
   * @param {Object} options - Analytics options
   * @returns {Promise<Object>} State analytics data
   */
  async getStateAnalytics(stateId, options = {}) {
    try {
      const analytics = await this.repository.getStateAnalytics(stateId, options);
      if (!analytics) {
        throw new NotFoundError(`State with ID ${stateId} not found`);
      }
      return analytics;
    } catch (error) {
      logger.logError(error, { method: 'getStateAnalytics', stateId });
      throw error;
    }
  }

  /**
   * Get state distribution
   * @param {number} countryId - Country ID
   * @param {Object} options - Options
   * @returns {Promise<Object>} State distribution data
   */
  async getStateDistribution(countryId, options = {}) {
    try {
      return await this.repository.getStateDistribution(countryId, options);
    } catch (error) {
      logger.logError(error, { method: 'getStateDistribution', countryId });
      throw error;
    }
  }
}

export default new StateAnalyticsService();