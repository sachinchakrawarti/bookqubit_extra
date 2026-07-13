/**
 * Geography Middleware
 * Middleware functions for geography module
 */

import { LoggerService } from '../services/logger.js';
import { ValidationError, UnauthorizedError } from '../core/exceptions/index.js';

const logger = new LoggerService('geography:middleware');

/**
 * Validate geography request
 */
export const validateGeographyRequest = (req, res, next) => {
  try {
    const contentType = req.headers['content-type'];
    if (req.method !== 'GET' && !contentType) {
      throw new ValidationError('Content-Type header is required for non-GET requests');
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      if (Object.keys(req.body).length === 0) {
        throw new ValidationError('Request body cannot be empty');
      }
    }

    next();
  } catch (error) {
    logger.logError(error, { method: 'validateGeographyRequest' });
    next(error);
  }
};

/**
 * Check admin authentication
 */
export const checkAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication required');
    }

    // TODO: Verify JWT token and check admin role
    next();
  } catch (error) {
    logger.logError(error, { method: 'checkAdminAuth' });
    next(error);
  }
};

/**
 * Check analytics authentication
 */
export const checkAnalyticsAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication required');
    }

    // TODO: Implement analytics authentication
    next();
  } catch (error) {
    logger.logError(error, { method: 'checkAnalyticsAuth' });
    next(error);
  }
};

/**
 * Log request middleware
 */
export const logRequest = (req, res, next) => {
  const start = Date.now();
  logger.info(`Incoming ${req.method} ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Completed ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

/**
 * Rate limiter middleware
 */
export const rateLimiter = (req, res, next) => {
  // TODO: Implement rate limiting
  next();
};

/**
 * Validate country ID parameter
 */
export const validateCountryId = (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || parseInt(req.params.countryId);
    if (!id || isNaN(id) || id < 1) {
      throw new ValidationError('Invalid country ID. Must be a positive integer.');
    }
    req.validatedId = id;
    next();
  } catch (error) {
    logger.logError(error, { method: 'validateCountryId', params: req.params });
    next(error);
  }
};

/**
 * Validate state ID parameter
 */
export const validateStateId = (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || parseInt(req.params.stateId);
    if (!id || isNaN(id) || id < 1) {
      throw new ValidationError('Invalid state ID. Must be a positive integer.');
    }
    req.validatedId = id;
    next();
  } catch (error) {
    logger.logError(error, { method: 'validateStateId', params: req.params });
    next(error);
  }
};

/**
 * Validate city ID parameter
 */
export const validateCityId = (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || parseInt(req.params.cityId);
    if (!id || isNaN(id) || id < 1) {
      throw new ValidationError('Invalid city ID. Must be a positive integer.');
    }
    req.validatedId = id;
    next();
  } catch (error) {
    logger.logError(error, { method: 'validateCityId', params: req.params });
    next(error);
  }
};

/**
 * Validate country code parameter
 */
export const validateCountryCode = (req, res, next) => {
  try {
    const code = req.params.code;
    if (!code || code.length < 2 || code.length > 3) {
      throw new ValidationError('Country code must be 2 or 3 characters');
    }
    req.validatedCode = code.toUpperCase();
    next();
  } catch (error) {
    logger.logError(error, { method: 'validateCountryCode', params: req.params });
    next(error);
  }
};

/**
 * Validate pagination parameters
 */
export const validatePagination = (req, res, next) => {
  try {
    const { page, limit } = req.query;
    
    if (page) {
      const pageNum = parseInt(page);
      if (isNaN(pageNum) || pageNum < 1) {
        throw new ValidationError('Page must be a positive integer');
      }
      req.validatedPage = pageNum;
    }
    
    if (limit) {
      const limitNum = parseInt(limit);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        throw new ValidationError('Limit must be between 1 and 100');
      }
      req.validatedLimit = limitNum;
    }
    
    next();
  } catch (error) {
    logger.logError(error, { method: 'validatePagination', query: req.query });
    next(error);
  }
};

/**
 * Validate filter parameters
 */
export const validateFilters = (req, res, next) => {
  try {
    const { search, sortBy, sortOrder, ...otherFilters } = req.query;
    
    if (sortOrder && !['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
      throw new ValidationError('Sort order must be ASC or DESC');
    }
    
    if (search) {
      req.sanitizedSearch = search.trim();
    }
    
    req.validatedFilters = {
      search: req.sanitizedSearch,
      sortBy: sortBy || 'created_at',
      sortOrder: sortOrder ? sortOrder.toUpperCase() : 'DESC',
      ...otherFilters
    };
    
    next();
  } catch (error) {
    logger.logError(error, { method: 'validateFilters', query: req.query });
    next(error);
  }
};

/**
 * Validate bulk operation data
 */
export const validateBulkOperation = (req, res, next) => {
  try {
    const { data, ids } = req.body;
    
    if (!data && !ids) {
      throw new ValidationError('Data or IDs array is required');
    }
    
    if (ids && (!Array.isArray(ids) || ids.length === 0)) {
      throw new ValidationError('IDs must be a non-empty array');
    }
    
    if (data && (!Array.isArray(data) || data.length === 0)) {
      throw new ValidationError('Data must be a non-empty array');
    }
    
    next();
  } catch (error) {
    logger.logError(error, { method: 'validateBulkOperation', body: req.body });
    next(error);
  }
};

/**
 * Sanitize request body
 */
export const sanitizeBody = (req, res, next) => {
  try {
    const forbiddenFields = ['id', 'created_at', 'updated_at', 'deleted_at'];
    const body = req.body;
    
    if (body && typeof body === 'object') {
      forbiddenFields.forEach(field => {
        if (body.hasOwnProperty(field)) {
          delete body[field];
        }
      });
    }
    
    next();
  } catch (error) {
    logger.logError(error, { method: 'sanitizeBody', body: req.body });
    next(error);
  }
};

// Export all middleware as default
export default {
  validateGeographyRequest,
  checkAdminAuth,
  checkAnalyticsAuth,
  logRequest,
  rateLimiter,
  validateCountryId,
  validateStateId,
  validateCityId,
  validateCountryCode,
  validatePagination,
  validateFilters,
  validateBulkOperation,
  sanitizeBody
};