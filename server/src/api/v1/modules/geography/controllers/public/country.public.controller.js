/**
 * Country Public Controller
 * Public controller for country operations (read-only)
 */

import { CountryPublicService } from '../../services/public/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('public:country:controller');

class CountryPublicController extends BaseController {
  constructor() {
    super(CountryPublicService);
    this.service = CountryPublicService;
  }

  /**
   * Get all countries
   */
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getAll(filters);
      return sendSuccess(res, result, 'Countries retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getAll', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get country by ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.getById(parseInt(id));
      return sendSuccess(res, result, 'Country retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getById', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Get country by code
   */
  async getByCode(req, res) {
    try {
      const { code } = req.params;
      const result = await this.service.getByCode(code.toUpperCase());
      return sendSuccess(res, result, 'Country retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getByCode', code: req.params.code });
      return sendError(res, error);
    }
  }

  /**
   * Get countries with states
   */
  async getWithStates(req, res) {
    try {
      const options = req.query;
      const result = await this.service.getWithStates(options);
      return sendSuccess(res, result, 'Countries with states retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getWithStates', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Search countries
   */
  async search(req, res) {
    try {
      const { q, ...options } = req.query;
      if (!q) {
        return sendError(res, new Error('Search query is required'), 400);
      }
      const result = await this.service.search(q, options);
      return sendSuccess(res, result, 'Search results retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'search', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get country statistics
   */
  async getStatistics(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.getStatistics(parseInt(id));
      return sendSuccess(res, result, 'Country statistics retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id: req.params.id });
      return sendError(res, error);
    }
  }
}

// Export the class and default instance
export { CountryPublicController };
export default new CountryPublicController();

// Also export as CountryController for backward compatibility
export const CountryController = new CountryPublicController();