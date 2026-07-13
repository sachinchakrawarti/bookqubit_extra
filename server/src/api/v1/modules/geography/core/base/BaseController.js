/**
 * Base Controller
 * Abstract base class for all controllers
 * Provides common functionality and utilities
 */

import responseHandler from '../../controllers/response.js';
import { LoggerService } from '../../services/logger.js';

export class BaseController {
  constructor(service, name = 'BaseController') {
    this.service = service;
    this.name = name;
    this.logger = new LoggerService(`controller:${name.toLowerCase()}`);
  }

  /**
   * Get service instance
   * @returns {Object} Service instance
   */
  getService() {
    return this.service;
  }

  /**
   * Set service instance
   * @param {Object} service - Service instance
   */
  setService(service) {
    this.service = service;
  }

  /**
   * Log info message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  logInfo(message, meta = {}) {
    this.logger.info(message, { controller: this.name, ...meta });
  }

  /**
   * Log error message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  logError(message, meta = {}) {
    this.logger.error(message, { controller: this.name, ...meta });
  }

  /**
   * Log debug message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  logDebug(message, meta = {}) {
    this.logger.debug(message, { controller: this.name, ...meta });
  }

  /**
   * Send success response
   */
  sendSuccess(res, data, message = 'Success', pagination = null) {
    if (pagination) {
      return responseHandler.sendPaginated(res, data, pagination, message);
    }
    return responseHandler.sendSuccess(res, data, message);
  }

  /**
   * Send created response
   */
  sendCreated(res, data, message = 'Resource created successfully') {
    return responseHandler.sendCreated(res, data, message);
  }

  /**
   * Send updated response
   */
  sendUpdated(res, data, message = 'Resource updated successfully') {
    return responseHandler.sendUpdated(res, data, message);
  }

  /**
   * Send deleted response
   */
  sendDeleted(res, data, message = 'Resource deleted successfully') {
    return responseHandler.sendDeleted(res, data, message);
  }

  /**
   * Send paginated response
   */
  sendPaginated(res, data, pagination, message = 'Success') {
    return responseHandler.sendPaginated(res, data, pagination, message);
  }

  /**
   * Send error response
   */
  sendError(res, error) {
    if (error.statusCode) {
      return responseHandler.sendError(res, error, error.statusCode);
    }
    return responseHandler.sendInternalError(res, error.message, error);
  }

  /**
   * Send not found response
   */
  sendNotFound(res, message = 'Resource not found') {
    return responseHandler.sendNotFound(res, message);
  }

  /**
   * Send validation error
   */
  sendValidationError(res, errors, message = 'Validation error') {
    return responseHandler.sendValidationError(res, errors, message);
  }

  /**
   * Handle error and send response
   */
  handleError(res, error) {
    this.logError(error.message, { stack: error.stack });
    return this.sendError(res, error);
  }

  /**
   * Wrap async function with error handling
   */
  wrapAsync(fn) {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        this.handleError(res, error);
      }
    };
  }
}

export default BaseController;