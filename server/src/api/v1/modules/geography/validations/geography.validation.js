/**
 * Geography Validations
 * Main validation exports - refactored to use schemas
 */

import Joi from 'joi';

// Import schemas
import {
  createCountrySchema,
  updateCountrySchema,
  filterCountriesSchema,
  bulkCreateCountriesSchema
} from './schemas/country.schema.js';

import {
  createStateSchema,
  updateStateSchema,
  filterStatesSchema,
  bulkCreateStatesSchema
} from './schemas/state.schema.js';

import {
  createCitySchema,
  updateCitySchema,
  filterCitiesSchema,
  bulkCreateCitiesSchema
} from './schemas/city.schema.js';

import {
  createContinentSchema,
  updateContinentSchema
} from './schemas/continent.schema.js';

import { bulkIdsSchema } from './schemas/bulk.schema.js';

// Import helpers
import {
  validate,
  validateQuery,
  validateParams,
  normalizeData,
  sanitizeData,
  toSnakeCase
} from './helpers.js';

// Import rules
import { rules } from './rules.js';

// ==========================================
// Re-export schemas
// ==========================================

export {
  // Country schemas
  createCountrySchema,
  updateCountrySchema,
  filterCountriesSchema,
  bulkCreateCountriesSchema,
  
  // State schemas
  createStateSchema,
  updateStateSchema,
  filterStatesSchema,
  bulkCreateStatesSchema,
  
  // City schemas
  createCitySchema,
  updateCitySchema,
  filterCitiesSchema,
  bulkCreateCitiesSchema,
  
  // Continent schemas
  createContinentSchema,
  updateContinentSchema,
  
  // Bulk schemas
  bulkIdsSchema,
  
  // Helpers
  validate,
  validateQuery,
  validateParams,
  normalizeData,
  sanitizeData,
  toSnakeCase,
  
  // Rules
  rules
};

// ==========================================
// Param Validators
// ==========================================

export const validateId = validateParams(Joi.object({
  id: rules.id.required()
}));

export const validateCode = validateParams(Joi.object({
  code: rules.code2.required()
}));

export const validateCountryCode = validateParams(Joi.object({
  code: rules.code2.required()
}));

export const validateStateCode = validateParams(Joi.object({
  code: rules.code3.required()
}));

// ==========================================
// Query Validators
// ==========================================

export const validatePagination = validateQuery(Joi.object({
  page: rules.page,
  limit: rules.limit,
  sortBy: rules.sortBy,
  sortOrder: rules.sortOrder
}));

export const validateSearchQuery = validateQuery(Joi.object({
  q: rules.search.required(),
  type: Joi.string().valid('country', 'state', 'city', 'all').default('all'),
  limit: rules.limit
}));

export const validateFilters = (req, res, next) => {
  next();
};

// ==========================================
// Default Export
// ==========================================

export default {
  // Country
  createCountrySchema,
  updateCountrySchema,
  filterCountriesSchema,
  bulkCreateCountriesSchema,
  
  // State
  createStateSchema,
  updateStateSchema,
  filterStatesSchema,
  bulkCreateStatesSchema,
  
  // City
  createCitySchema,
  updateCitySchema,
  filterCitiesSchema,
  bulkCreateCitiesSchema,
  
  // Continent
  createContinentSchema,
  updateContinentSchema,
  
  // Bulk
  bulkIdsSchema,
  
  // Helpers
  validate,
  validateQuery,
  validateParams,
  normalizeData,
  sanitizeData,
  toSnakeCase,
  
  // Rules
  rules,
  
  // Param validators
  validateId,
  validateCode,
  validateCountryCode,
  validateStateCode,
  
  // Query validators
  validatePagination,
  validateSearchQuery,
  validateFilters
};