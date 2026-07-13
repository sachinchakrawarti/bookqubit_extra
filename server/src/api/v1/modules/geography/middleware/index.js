/**
 * Middleware Index
 * Exports all middleware for the geography module
 */

// Import all middleware functions from geography.middleware.js
import {
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
} from './geography.middleware.js';

// Import default as geographyMiddleware
import geographyMiddleware from './geography.middleware.js';

// Export individual middleware functions
export {
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

// Export as a combined object
export const middleware = {
  geography: geographyMiddleware,
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

// Default export
export default {
  geographyMiddleware,
  middleware,
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