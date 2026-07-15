/**
 * City Public Controller
 * Public controller for city operations (read-only)
 */

import { CityPublicService } from '../../services/public/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('public:city:controller');

class CityPublicController extends BaseController {
  constructor() {
    super(CityPublicService);
    this.service = CityPublicService;
  }

  /**
   * Get all cities
   */
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getAll(filters);
      return sendSuccess(res, result, 'Cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getAll', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get city by ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.getById(parseInt(id));
      return sendSuccess(res, result, 'City retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getById', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Get cities by state
   */
  async getByState(req, res) {
    try {
      const { stateId } = req.params;
      const options = req.query;
      const result = await this.service.getByState(parseInt(stateId), options);
      return sendSuccess(res, result, 'Cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getByState', stateId: req.params.stateId });
      return sendError(res, error);
    }
  }

  /**
   * Get capital cities
   */
  async getCapitals(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getCapitals(filters);
      return sendSuccess(res, result, 'Capital cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getCapitals', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Search cities
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
   * Find nearby cities
   */
  async findNearby(req, res) {
    try {
      const { latitude, longitude, radius = 10 } = req.query;
      if (!latitude || !longitude) {
        return sendError(res, new Error('Latitude and longitude are required'), 400);
      }
      const options = req.query;
      const result = await this.service.findNearby(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(radius),
        options
      );
      return sendSuccess(res, result, 'Nearby cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'findNearby', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get city statistics
   */
  async getStatistics(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.getStatistics(parseInt(id));
      return sendSuccess(res, result, 'City statistics retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getStatistics', id: req.params.id });
      return sendError(res, error);
    }
  }
}

// Export the class and default instance
export { CityPublicController };
export default new CityPublicController();

// Also export as CityController for backward compatibility
export const CityController = new CityPublicController();