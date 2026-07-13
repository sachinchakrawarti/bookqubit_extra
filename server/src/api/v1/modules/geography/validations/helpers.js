/**
 * Validation Helpers
 * Helper functions for validation (normalize, sanitize, middleware)
 */

import Joi from 'joi';

/**
 * Normalize input data - convert snake_case to camelCase
 * @param {Object} data - Input data
 * @returns {Object} Normalized data
 */
export const normalizeData = (data) => {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map(item => normalizeData(item));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    // Convert snake_case to camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = normalizeData(value);
  }
  return result;
};

/**
 * Convert camelCase to snake_case for database
 * @param {Object} data - Data with camelCase keys
 * @returns {Object} Data with snake_case keys
 */
export const toSnakeCase = (data) => {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map(item => toSnakeCase(item));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[snakeKey] = toSnakeCase(value);
  }
  return result;
};

/**
 * Sanitize input data - trim strings, remove unwanted fields
 * @param {Object} data - Input data
 * @param {Array} allowedFields - Allowed fields (optional)
 * @returns {Object} Sanitized data
 */
export const sanitizeData = (data, allowedFields = []) => {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item, allowedFields));
  }
  
  const result = { ...data };
  
  // Trim all string values
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'string') {
      result[key] = value.trim();
    }
  }
  
  // If allowedFields is provided, remove fields not in allowed list
  if (allowedFields.length > 0) {
    const filtered = {};
    for (const field of allowedFields) {
      if (result[field] !== undefined) {
        filtered[field] = result[field];
      }
    }
    return filtered;
  }
  
  return result;
};

/**
 * Validation middleware creator
 * @param {Object} schema - Joi schema
 * @param {string} source - Request source (body, query, params)
 * @param {Object} options - Validation options
 * @returns {Function} Express middleware
 */
export const validate = (schema, source = 'body', options = {}) => {
  const defaultOptions = {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true  // Allow unknown fields to handle both formats
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return (req, res, next) => {
    const data = req[source];
    
    if (!data) {
      return next();
    }
    
    // Normalize data first (convert snake_case to camelCase)
    const normalizedData = normalizeData(data);
    
    // Also keep original data for fields that might be in snake_case
    const combinedData = { ...data, ...normalizedData };
    
    const { error, value } = schema.validate(combinedData, mergedOptions);
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
        timestamp: new Date().toISOString()
      });
    }
    
    // Store validated value back in request (keep both formats)
    req[source] = { ...data, ...value };
    next();
  };
};

/**
 * Validate query parameters
 * @param {Object} schema - Joi schema
 * @param {Object} options - Validation options
 * @returns {Function} Express middleware
 */
export const validateQuery = (schema, options = {}) => {
  return validate(schema, 'query', options);
};

/**
 * Validate request body
 * @param {Object} schema - Joi schema
 * @param {Object} options - Validation options
 * @returns {Function} Express middleware
 */
export const validateBody = (schema, options = {}) => {
  return validate(schema, 'body', options);
};

/**
 * Validate request params
 * @param {Object} schema - Joi schema
 * @param {Object} options - Validation options
 * @returns {Function} Express middleware
 */
export const validateParams = (schema, options = {}) => {
  return validate(schema, 'params', options);
};

/**
 * Combined validator - validates body, query, and params
 * @param {Object} schemas - Object with body, query, params schemas
 * @returns {Function} Express middleware
 */
export const validateAll = (schemas = {}) => {
  return (req, res, next) => {
    const errors = [];
    
    // Validate body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, { abortEarly: false });
      if (error) {
        errors.push(...error.details.map(d => ({
          source: 'body',
          field: d.path.join('.'),
          message: d.message
        })));
      }
    }
    
    // Validate query
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, { abortEarly: false });
      if (error) {
        errors.push(...error.details.map(d => ({
          source: 'query',
          field: d.path.join('.'),
          message: d.message
        })));
      }
    }
    
    // Validate params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, { abortEarly: false });
      if (error) {
        errors.push(...error.details.map(d => ({
          source: 'params',
          field: d.path.join('.'),
          message: d.message
        })));
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
        timestamp: new Date().toISOString()
      });
    }
    
    next();
  };
};

/**
 * Check if a field exists (handles both camelCase and snake_case)
 * @param {Object} data - Data to check
 * @param {string} field - Field name (camelCase)
 * @returns {boolean} True if field exists
 */
export const hasField = (data, field) => {
  if (!data) return false;
  
  if (data[field] !== undefined) return true;
  
  const snakeField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
  if (data[snakeField] !== undefined) return true;
  
  return false;
};

/**
 * Get field value (handles both camelCase and snake_case)
 * @param {Object} data - Data to get from
 * @param {string} field - Field name (camelCase)
 * @param {*} defaultValue - Default value
 * @returns {*} Field value
 */
export const getField = (data, field, defaultValue = undefined) => {
  if (!data) return defaultValue;
  
  if (data[field] !== undefined) return data[field];
  
  const snakeField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
  if (data[snakeField] !== undefined) return data[snakeField];
  
  return defaultValue;
};

/**
 * Create a validation schema that accepts both camelCase and snake_case
 * @param {Object} schema - Joi schema with camelCase keys
 * @returns {Object} Joi schema that accepts both formats
 */
export const createFlexibleSchema = (schema) => {
  // This is a wrapper that allows both formats
  return Joi.object({
    ...schema.describe().keys
  }).unknown(true);
};

// Default export
export default {
  normalizeData,
  toSnakeCase,
  sanitizeData,
  validate,
  validateQuery,
  validateBody,
  validateParams,
  validateAll,
  hasField,
  getField,
  createFlexibleSchema
};