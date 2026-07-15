/**
 * State Public Controller
 * Public controller for state operations (read-only)
 */

import { StatePublicService } from '../../services/public/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('public:state:controller');

class StatePublicController extends BaseController {
  constructor() {
    super(StatePublicService);
    this.service = StatePublicService;
  }

  /**
   * Get all states
   */
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getAll(filters);
      return sendSuccess(res, result, 'States retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getAll', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get state by ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.getById(parseInt(id));
      return sendSuccess(res, result, 'State retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getById', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Get states by country
   */
  async getByCountry(req, res) {
    try {
      const { countryId } = req.params;
      const options = req.query;
      const result = await this.service.getByCountry(parseInt(countryId), options);
      return sendSuccess(res, result, 'States retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getByCountry', countryId: req.params.countryId });
      return sendError(res, error);
    }
  }

  /**
   * Search states
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
   * Get state statistics
   */
  async getStatistics(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.getStatistics(parseInt(id));
      return sendSuccess(res, result, 'State statistics retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id: req.params.id });
      return sendError(res, error);
    }
  }
}

// Export the class and default instance
export { StatePublicController };
export default new StatePublicController();

// Also export as StateController for backward compatibility
export const StateController = new StatePublicController();