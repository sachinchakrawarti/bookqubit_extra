/**
 * Bulk Validation Schemas
 * All bulk operation validation schemas
 */

import Joi from 'joi';
import { rules } from '../rules.js';

// ==========================================
// Bulk IDs Schema
// ==========================================

export const bulkIdsSchema = Joi.object({
  ids: Joi.array()
    .items(rules.id.required())
    .min(1)
    .max(100)
    .required()
    .messages({
      'array.base': 'IDs must be an array',
      'array.min': 'At least one ID is required',
      'array.max': 'Cannot process more than 100 IDs at once',
      'any.required': 'IDs are required'
    })
});

// ==========================================
// Bulk Country Delete Schema
// ==========================================

export const bulkDeleteCountriesSchema = Joi.object({
  ids: Joi.array()
    .items(rules.id.required())
    .min(1)
    .max(100)
    .required()
    .messages({
      'array.base': 'IDs must be an array',
      'array.min': 'At least one ID is required',
      'array.max': 'Cannot delete more than 100 countries at once',
      'any.required': 'IDs are required'
    })
});

// ==========================================
// Bulk State Delete Schema
// ==========================================

export const bulkDeleteStatesSchema = Joi.object({
  ids: Joi.array()
    .items(rules.id.required())
    .min(1)
    .max(100)
    .required()
    .messages({
      'array.base': 'IDs must be an array',
      'array.min': 'At least one ID is required',
      'array.max': 'Cannot delete more than 100 states at once',
      'any.required': 'IDs are required'
    })
});

// ==========================================
// Bulk City Delete Schema
// ==========================================

export const bulkDeleteCitiesSchema = Joi.object({
  ids: Joi.array()
    .items(rules.id.required())
    .min(1)
    .max(100)
    .required()
    .messages({
      'array.base': 'IDs must be an array',
      'array.min': 'At least one ID is required',
      'array.max': 'Cannot delete more than 100 cities at once',
      'any.required': 'IDs are required'
    })
});

// ==========================================
// Export all bulk schemas
// ==========================================

export default {
  bulkIdsSchema,
  bulkDeleteCountriesSchema,
  bulkDeleteStatesSchema,
  bulkDeleteCitiesSchema
};