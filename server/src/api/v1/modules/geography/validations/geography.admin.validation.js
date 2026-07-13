/**
 * Geography Admin Validations
 * Validation schemas for admin operations
 */

import Joi from 'joi';
import { ValidationError } from '../core/exceptions/index.js';

// ==========================================
// Country Validation Schemas
// ==========================================

export const countryValidationSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.empty': 'Country name is required',
      'string.min': 'Country name must be at least 2 characters',
      'string.max': 'Country name cannot exceed 100 characters',
      'any.required': 'Country name is required'
    }),
    code: Joi.string().length(2).uppercase().required().messages({
      'string.empty': 'Country code is required',
      'string.length': 'Country code must be exactly 2 characters',
      'any.required': 'Country code is required'
    }),
    native_name: Joi.string().max(100).optional().allow(''),
    phone_code: Joi.string().max(10).optional().allow(''),
    currency: Joi.string().max(50).optional().allow(''),
    currency_symbol: Joi.string().max(10).optional().allow(''),
    continent_id: Joi.number().integer().positive().optional().allow(null),
    capital: Joi.string().max(100).optional().allow(''),
    region: Joi.string().max(100).optional().allow(''),
    subregion: Joi.string().max(100).optional().allow(''),
    population: Joi.number().integer().min(0).optional().allow(null),
    area: Joi.number().min(0).optional().allow(null),
    timezone: Joi.string().max(50).optional().allow(''),
    flag_emoji: Joi.string().max(10).optional().allow(''),
    calling_code: Joi.string().max(10).optional().allow('')
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    code: Joi.string().length(2).uppercase().optional(),
    native_name: Joi.string().max(100).optional().allow(''),
    phone_code: Joi.string().max(10).optional().allow(''),
    currency: Joi.string().max(50).optional().allow(''),
    currency_symbol: Joi.string().max(10).optional().allow(''),
    continent_id: Joi.number().integer().positive().optional().allow(null),
    capital: Joi.string().max(100).optional().allow(''),
    region: Joi.string().max(100).optional().allow(''),
    subregion: Joi.string().max(100).optional().allow(''),
    population: Joi.number().integer().min(0).optional().allow(null),
    area: Joi.number().min(0).optional().allow(null),
    timezone: Joi.string().max(50).optional().allow(''),
    flag_emoji: Joi.string().max(10).optional().allow(''),
    calling_code: Joi.string().max(10).optional().allow('')
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),

  bulkCreate: Joi.array().items(
    Joi.object({
      name: Joi.string().min(2).max(100).required(),
      code: Joi.string().length(2).uppercase().required(),
      native_name: Joi.string().max(100).optional().allow(''),
      continent_id: Joi.number().integer().positive().optional().allow(null)
    })
  ).min(1).messages({
    'array.min': 'At least one country must be provided for bulk create'
  }),

  bulkDelete: Joi.array().items(
    Joi.number().integer().positive()
  ).min(1).messages({
    'array.min': 'At least one ID must be provided for bulk delete'
  })
};

// ==========================================
// State Validation Schemas
// ==========================================

export const stateValidationSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.empty': 'State name is required',
      'string.min': 'State name must be at least 2 characters',
      'string.max': 'State name cannot exceed 100 characters',
      'any.required': 'State name is required'
    }),
    code: Joi.string().max(10).uppercase().required().messages({
      'string.empty': 'State code is required',
      'string.max': 'State code cannot exceed 10 characters',
      'any.required': 'State code is required'
    }),
    country_id: Joi.number().integer().positive().required().messages({
      'number.base': 'Country ID must be a number',
      'any.required': 'Country ID is required'
    }),
    native_name: Joi.string().max(100).optional().allow(''),
    is_capital_state: Joi.boolean().default(false),
    population: Joi.number().integer().min(0).optional().allow(null),
    area: Joi.number().min(0).optional().allow(null),
    region: Joi.string().max(100).optional().allow('')
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    code: Joi.string().max(10).uppercase().optional(),
    country_id: Joi.number().integer().positive().optional(),
    native_name: Joi.string().max(100).optional().allow(''),
    is_capital_state: Joi.boolean().optional(),
    population: Joi.number().integer().min(0).optional().allow(null),
    area: Joi.number().min(0).optional().allow(null),
    region: Joi.string().max(100).optional().allow('')
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),

  bulkCreate: Joi.array().items(
    Joi.object({
      name: Joi.string().min(2).max(100).required(),
      code: Joi.string().max(10).uppercase().required(),
      country_id: Joi.number().integer().positive().required()
    })
  ).min(1),

  bulkDelete: Joi.array().items(
    Joi.number().integer().positive()
  ).min(1)
};

// ==========================================
// City Validation Schemas
// ==========================================

export const cityValidationSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.empty': 'City name is required',
      'string.min': 'City name must be at least 2 characters',
      'string.max': 'City name cannot exceed 100 characters',
      'any.required': 'City name is required'
    }),
    state_id: Joi.number().integer().positive().required().messages({
      'number.base': 'State ID must be a number',
      'any.required': 'State ID is required'
    }),
    native_name: Joi.string().max(100).optional().allow(''),
    is_capital: Joi.boolean().default(false),
    population: Joi.number().integer().min(0).optional().allow(null),
    area: Joi.number().min(0).optional().allow(null),
    latitude: Joi.number().min(-90).max(90).optional().allow(null),
    longitude: Joi.number().min(-180).max(180).optional().allow(null),
    postal_code: Joi.string().max(20).optional().allow(''),
    timezone: Joi.string().max(50).optional().allow('')
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    state_id: Joi.number().integer().positive().optional(),
    native_name: Joi.string().max(100).optional().allow(''),
    is_capital: Joi.boolean().optional(),
    population: Joi.number().integer().min(0).optional().allow(null),
    area: Joi.number().min(0).optional().allow(null),
    latitude: Joi.number().min(-90).max(90).optional().allow(null),
    longitude: Joi.number().min(-180).max(180).optional().allow(null),
    postal_code: Joi.string().max(20).optional().allow(''),
    timezone: Joi.string().max(50).optional().allow('')
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),

  bulkCreate: Joi.array().items(
    Joi.object({
      name: Joi.string().min(2).max(100).required(),
      state_id: Joi.number().integer().positive().required(),
      is_capital: Joi.boolean().default(false)
    })
  ).min(1),

  bulkDelete: Joi.array().items(
    Joi.number().integer().positive()
  ).min(1)
};

// ==========================================
// Validation Helpers
// ==========================================

export const validate = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map(detail => detail.message);
    throw new ValidationError(messages.join(', '));
  }
  return value;
};

export const validateCountryCreate = (data) => validate(countryValidationSchemas.create, data);
export const validateCountryUpdate = (data) => validate(countryValidationSchemas.update, data);
export const validateCountryBulkCreate = (data) => validate(countryValidationSchemas.bulkCreate, data);
export const validateCountryBulkDelete = (data) => validate(countryValidationSchemas.bulkDelete, data);

export const validateStateCreate = (data) => validate(stateValidationSchemas.create, data);
export const validateStateUpdate = (data) => validate(stateValidationSchemas.update, data);
export const validateStateBulkCreate = (data) => validate(stateValidationSchemas.bulkCreate, data);
export const validateStateBulkDelete = (data) => validate(stateValidationSchemas.bulkDelete, data);

export const validateCityCreate = (data) => validate(cityValidationSchemas.create, data);
export const validateCityUpdate = (data) => validate(cityValidationSchemas.update, data);
export const validateCityBulkCreate = (data) => validate(cityValidationSchemas.bulkCreate, data);
export const validateCityBulkDelete = (data) => validate(cityValidationSchemas.bulkDelete, data);

// Continent validation
export const continentValidationSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    code: Joi.string().length(2).uppercase().required(),
    description: Joi.string().max(500).optional().allow('')
  }),
  update: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    code: Joi.string().length(2).uppercase().optional(),
    description: Joi.string().max(500).optional().allow('')
  }).min(1)
};

export const validateContinentCreate = (data) => validate(continentValidationSchemas.create, data);
export const validateContinentUpdate = (data) => validate(continentValidationSchemas.update, data);

export default {
  countryValidationSchemas,
  stateValidationSchemas,
  cityValidationSchemas,
  continentValidationSchemas,
  validate,
  validateCountryCreate,
  validateCountryUpdate,
  validateCountryBulkCreate,
  validateCountryBulkDelete,
  validateStateCreate,
  validateStateUpdate,
  validateStateBulkCreate,
  validateStateBulkDelete,
  validateCityCreate,
  validateCityUpdate,
  validateCityBulkCreate,
  validateCityBulkDelete,
  validateContinentCreate,
  validateContinentUpdate
};