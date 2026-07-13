/**
 * Country Analytics Controller
 * Analytics controller for country data
 */

import { CountryAnalyticsService } from '../../services/analytics/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('analytics:country:controller');

class CountryAnalyticsController extends BaseController {
  constructor() {
    super(CountryAnalyticsService, 'CountryAnalytics');
    this.service = CountryAnalyticsService;
  }

  /**
   * Get country analytics
   */
  async getCountryAnalytics(req, res) {
    try {
      const { id } = req.params;
      const options = req.query;
      const result = await this.service.getCountryAnalytics(parseInt(id), options);
      return sendSuccess(res, result, 'Country analytics retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getCountryAnalytics', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Get country growth trends
   */
  async getCountryGrowthTrends(req, res) {
    try {
      const { id } = req.params;
      const options = req.query;
      const result = await this.service.getCountryGrowthTrends(parseInt(id), options);
      return sendSuccess(res, result, 'Country growth trends retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getCountryGrowthTrends', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Get country comparison
   */
  async getCountryComparison(req, res) {
    try {
      const { ids } = req.body;
      const options = req.query;
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return sendError(res, new Error('Please provide an array of country IDs'), 400);
      }
      const result = await this.service.getCountryComparison(ids, options);
      return sendSuccess(res, result, 'Country comparison retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getCountryComparison', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Generate country report
   */
  async generateCountryReport(req, res) {
    try {
      const { id } = req.params;
      const options = req.query;
      const result = await this.service.generateCountryReport({ countryId: parseInt(id), ...options });
      return sendSuccess(res, result, 'Country report generated successfully');
    } catch (error) {
      logger.logError(error, { method: 'generateCountryReport', id: req.params.id });
      return sendError(res, error);
    }
  }
}

// Create instance and export
const countryAnalyticsController = new CountryAnalyticsController();

// Export the instance as default
export default countryAnalyticsController;

// Also export named exports for the methods
export const getCountryAnalytics = countryAnalyticsController.getCountryAnalytics.bind(countryAnalyticsController);
export const getCountryGrowthTrends = countryAnalyticsController.getCountryGrowthTrends.bind(countryAnalyticsController);
export const getCountryComparison = countryAnalyticsController.getCountryComparison.bind(countryAnalyticsController);
export const generateCountryReport = countryAnalyticsController.generateCountryReport.bind(countryAnalyticsController);