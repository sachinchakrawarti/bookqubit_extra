/**
 * City Admin Controller
 * Admin controller for city operations
 */

import { CityAdminService } from '../../services/admin/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError, sendPaginated } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('admin:city:controller');

class CityAdminController extends BaseController {
  constructor() {
    super(CityAdminService, 'CityAdmin');
    this.service = CityAdminService;
  }

  /**
   * Get all cities (admin)
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
   * Get deleted cities (admin)
   */
  async getDeleted(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getDeleted(filters);
      return sendSuccess(res, result, 'Deleted cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getDeleted', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get city by ID (admin)
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
   * Get cities by state (admin)
   */
  async getByState(req, res) {
    try {
      const { stateId } = req.params;
      const result = await this.service.getByState(parseInt(stateId));
      return sendSuccess(res, result, 'Cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getByState', stateId: req.params.stateId });
      return sendError(res, error);
    }
  }

  /**
   * Get capital cities (admin)
   */
  async getCapitals(req, res) {
    try {
      const filters = req.query;
      const pagination = req.query;
      const result = await this.service.getCapitals(filters, pagination);
      return sendSuccess(res, result, 'Capital cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getCapitals', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Create city (admin)
   */
  async create(req, res) {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      return sendSuccess(res, result, 'City created successfully', 201);
    } catch (error) {
      logger.logError(error, { method: 'create', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Update city (admin)
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.service.update(parseInt(id), data);
      return sendSuccess(res, result, 'City updated successfully');
    } catch (error) {
      logger.logError(error, { method: 'update', id: req.params.id, body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Delete city (admin)
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.delete(parseInt(id));
      return sendSuccess(res, { id: parseInt(id) }, 'City deleted successfully');
    } catch (error) {
      logger.logError(error, { method: 'delete', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Restore city (admin)
   */
  async restore(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.restore(parseInt(id));
      return sendSuccess(res, result, 'City restored successfully');
    } catch (error) {
      logger.logError(error, { method: 'restore', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Bulk create cities (admin)
   */
  async bulkCreate(req, res) {
    try {
      const data = req.body;
      const result = await this.service.bulkCreate(data);
      return sendSuccess(res, result, 'Cities created successfully', 201);
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Bulk delete cities (admin)
   */
  async bulkDelete(req, res) {
    try {
      const { ids } = req.body;
      const result = await this.service.bulkDelete(ids);
      return sendSuccess(res, result, 'Cities deleted successfully');
    } catch (error) {
      logger.logError(error, { method: 'bulkDelete', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Search cities (admin)
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
   * Get cities with coordinates (admin)
   */
  async getWithCoordinates(req, res) {
    try {
      const filters = req.query;
      const pagination = req.query;
      const result = await this.service.getWithCoordinates(filters, pagination);
      return sendSuccess(res, result, 'Cities with coordinates retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getWithCoordinates', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Find nearby cities (admin)
   */
  async findNearby(req, res) {
    try {
      const { latitude, longitude, radius = 10 } = req.query;
      if (!latitude || !longitude) {
        return sendError(res, new Error('Latitude and longitude are required'), 400);
      }
      const result = await this.service.findNearby(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(radius)
      );
      return sendSuccess(res, result, 'Nearby cities retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'findNearby', query: req.query });
      return sendError(res, error);
    }
  }
}

// Export default instance
export default new CityAdminController();