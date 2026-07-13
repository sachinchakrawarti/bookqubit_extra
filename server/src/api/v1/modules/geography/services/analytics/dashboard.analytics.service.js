/**
 * Dashboard Analytics Service
 * Analytics service for dashboard data
 */

import { AnalyticsRepository } from '../../repositories/analytics/index.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('analytics:dashboard:service');

class DashboardAnalyticsService {
  constructor() {
    this.repository = AnalyticsRepository;
  }

  /**
   * Get dashboard overview data
   * @param {Object} options - Options
   * @returns {Promise<Object>} Dashboard overview
   */
  async getDashboardOverview(options = {}) {
    try {
      return await this.repository.getDashboardOverview(options);
    } catch (error) {
      logger.logError(error, { method: 'getDashboardOverview' });
      throw error;
    }
  }

  /**
   * Get recent activity
   * @param {Object} options - Options
   * @returns {Promise<Array>} Recent activity
   */
  async getRecentActivity(options = {}) {
    try {
      return await this.repository.getRecentActivity(options);
    } catch (error) {
      logger.logError(error, { method: 'getRecentActivity' });
      throw error;
    }
  }

  /**
   * Get quick stats
   * @param {Object} options - Options
   * @returns {Promise<Object>} Quick stats
   */
  async getQuickStats(options = {}) {
    try {
      return await this.repository.getQuickStats(options);
    } catch (error) {
      logger.logError(error, { method: 'getQuickStats' });
      throw error;
    }
  }
}

export default new DashboardAnalyticsService();