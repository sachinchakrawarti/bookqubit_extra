/**
 * Dashboard Analytics Controller
 * Analytics controller for dashboard data
 */

import { DashboardAnalyticsService } from '../../services/analytics/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('analytics:dashboard:controller');

class DashboardAnalyticsController extends BaseController {
  constructor() {
    super(DashboardAnalyticsService, 'DashboardAnalytics');
    this.service = DashboardAnalyticsService;
  }

  /**
   * Get dashboard overview
   */
  async getOverview(req, res) {
    try {
      const options = req.query;
      const result = await this.service.getDashboardOverview(options);
      return sendSuccess(res, result, 'Dashboard overview retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getOverview', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get quick stats
   */
  async getQuickStats(req, res) {
    try {
      const options = req.query;
      const result = await this.service.getQuickStats(options);
      return sendSuccess(res, result, 'Quick stats retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getQuickStats', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get recent activity
   */
  async getRecentActivity(req, res) {
    try {
      const options = req.query;
      const result = await this.service.getRecentActivity(options);
      return sendSuccess(res, result, 'Recent activity retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getRecentActivity', query: req.query });
      return sendError(res, error);
    }
  }
}

// Create instance and export
const dashboardAnalyticsController = new DashboardAnalyticsController();

// Export the instance as default
export default dashboardAnalyticsController;

// Also export named exports for the methods
export const getOverview = dashboardAnalyticsController.getOverview.bind(dashboardAnalyticsController);
export const getQuickStats = dashboardAnalyticsController.getQuickStats.bind(dashboardAnalyticsController);
export const getRecentActivity = dashboardAnalyticsController.getRecentActivity.bind(dashboardAnalyticsController);