/**
 * Report Analytics Service
 * Analytics service for reports
 */

import { AnalyticsRepository } from '../../repositories/analytics/index.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('analytics:report:service');

class ReportAnalyticsService {
  constructor() {
    this.repository = AnalyticsRepository;
  }

  /**
   * Generate country report
   * @param {Object} options - Report options
   * @returns {Promise<Object>} Country report
   */
  async generateCountryReport(options = {}) {
    try {
      return await this.repository.generateCountryReport(options);
    } catch (error) {
      logger.logError(error, { method: 'generateCountryReport' });
      throw error;
    }
  }

  /**
   * Generate state report
   * @param {Object} options - Report options
   * @returns {Promise<Object>} State report
   */
  async generateStateReport(options = {}) {
    try {
      return await this.repository.generateStateReport(options);
    } catch (error) {
      logger.logError(error, { method: 'generateStateReport' });
      throw error;
    }
  }

  /**
   * Generate city report
   * @param {Object} options - Report options
   * @returns {Promise<Object>} City report
   */
  async generateCityReport(options = {}) {
    try {
      return await this.repository.generateCityReport(options);
    } catch (error) {
      logger.logError(error, { method: 'generateCityReport' });
      throw error;
    }
  }
}

export default new ReportAnalyticsService();