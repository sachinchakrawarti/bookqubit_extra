/**
 * State Admin Controller
 * Admin controller for state operations
 */

import { StateAdminService } from '../../services/admin/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('admin:state:controller');

class StateAdminController extends BaseController {
  constructor() {
    super(StateAdminService, 'StateAdmin');
    this.service = StateAdminService;
  }

  /**
   * Get all states (admin)
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
   * Get deleted states (admin)
   */
  async getDeleted(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getDeleted(filters);
      return sendSuccess(res, result, 'Deleted states retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getDeleted', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get state by ID (admin)
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
   * Get states by country (admin)
   */
  async getByCountry(req, res) {
    try {
      const { countryId } = req.params;
      const result = await this.service.getByCountry(parseInt(countryId));
      return sendSuccess(res, result, 'States retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getByCountry', countryId: req.params.countryId });
      return sendError(res, error);
    }
  }

  /**
   * Create state (admin)
   */
  async create(req, res) {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      return sendSuccess(res, result, 'State created successfully', 201);
    } catch (error) {
      logger.logError(error, { method: 'create', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Update state (admin)
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.service.update(parseInt(id), data);
      return sendSuccess(res, result, 'State updated successfully');
    } catch (error) {
      logger.logError(error, { method: 'update', id: req.params.id, body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Delete state (admin)
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.delete(parseInt(id));
      return sendSuccess(res, { id: parseInt(id) }, 'State deleted successfully');
    } catch (error) {
      logger.logError(error, { method: 'delete', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Restore state (admin)
   */
  async restore(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.restore(parseInt(id));
      return sendSuccess(res, result, 'State restored successfully');
    } catch (error) {
      logger.logError(error, { method: 'restore', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Bulk create states (admin)
   */
  async bulkCreate(req, res) {
    try {
      const data = req.body;
      const result = await this.service.bulkCreate(data);
      return sendSuccess(res, result, 'States created successfully', 201);
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Bulk delete states (admin)
   */
  async bulkDelete(req, res) {
    try {
      const { ids } = req.body;
      const result = await this.service.bulkDelete(ids);
      return sendSuccess(res, result, 'States deleted successfully');
    } catch (error) {
      logger.logError(error, { method: 'bulkDelete', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Search states (admin)
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
   * Get states with city counts (admin)
   */
  async getWithCityCounts(req, res) {
    try {
      const { countryId } = req.query;
      const result = await this.service.getWithCityCounts(countryId ? parseInt(countryId) : null);
      return sendSuccess(res, result, 'States with city counts retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getWithCityCounts', query: req.query });
      return sendError(res, error);
    }
  }
}

// Export default instance
export default new StateAdminController();