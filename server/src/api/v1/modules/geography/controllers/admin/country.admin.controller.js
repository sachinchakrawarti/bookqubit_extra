/**
 * Country Admin Controller
 * Admin controller for country operations
 */

import { CountryAdminService } from '../../services/admin/index.js';
import { BaseController } from '../../core/base/BaseController.js';
import { sendSuccess, sendError } from '../response.js';
import { LoggerService } from '../../services/logger.js';

const logger = new LoggerService('admin:country:controller');

class CountryAdminController extends BaseController {
  constructor() {
    super(CountryAdminService, 'CountryAdmin');
    this.service = CountryAdminService;
  }

  /**
   * Get all countries (admin)
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
   * Get deleted countries (admin)
   */
  async getDeleted(req, res) {
    try {
      const filters = req.query;
      const result = await this.service.getDeleted(filters);
      return sendSuccess(res, result, 'Deleted countries retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getDeleted', query: req.query });
      return sendError(res, error);
    }
  }

  /**
   * Get country by ID (admin)
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
   * Get country by code (admin)
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
   * Create country (admin)
   */
  async create(req, res) {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      return sendSuccess(res, result, 'Country created successfully', 201);
    } catch (error) {
      logger.logError(error, { method: 'create', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Update country (admin)
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.service.update(parseInt(id), data);
      return sendSuccess(res, result, 'Country updated successfully');
    } catch (error) {
      logger.logError(error, { method: 'update', id: req.params.id, body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Delete country (admin)
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.delete(parseInt(id));
      return sendSuccess(res, { id: parseInt(id) }, 'Country deleted successfully');
    } catch (error) {
      logger.logError(error, { method: 'delete', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Restore country (admin)
   */
  async restore(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.restore(parseInt(id));
      return sendSuccess(res, result, 'Country restored successfully');
    } catch (error) {
      logger.logError(error, { method: 'restore', id: req.params.id });
      return sendError(res, error);
    }
  }

  /**
   * Bulk create countries (admin)
   */
  async bulkCreate(req, res) {
    try {
      const data = req.body;
      const result = await this.service.bulkCreate(data);
      return sendSuccess(res, result, 'Countries created successfully', 201);
    } catch (error) {
      logger.logError(error, { method: 'bulkCreate', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Bulk delete countries (admin)
   */
  async bulkDelete(req, res) {
    try {
      const { ids } = req.body;
      const result = await this.service.bulkDelete(ids);
      return sendSuccess(res, result, 'Countries deleted successfully');
    } catch (error) {
      logger.logError(error, { method: 'bulkDelete', body: req.body });
      return sendError(res, error);
    }
  }

  /**
   * Search countries (admin)
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
   * Get countries with state counts (admin)
   */
  async getWithStateCounts(req, res) {
    try {
      const result = await this.service.getWithStateCounts();
      return sendSuccess(res, result, 'Countries with state counts retrieved successfully');
    } catch (error) {
      logger.logError(error, { method: 'getWithStateCounts' });
      return sendError(res, error);
    }
  }
}

// Export default instance
export default new CountryAdminController();