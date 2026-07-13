/**
 * State Validation Schemas
 * All state-related validation schemas
 */

import Joi from 'joi';
import { rules } from '../rules.js';

// ==========================================
// Create State Schema
// ==========================================

export const createStateSchema = Joi.object({
  country_id: rules.id.required(),
  code: rules.code3.required(),
  name: rules.name.required(),
  native_name: rules.nativeName,
  capital: rules.capital,
  population: rules.population,
  area_km2: rules.area,
  is_active: rules.boolean.default(true)
});

// ==========================================
// Update State Schema - ALL FIELDS OPTIONAL
// ==========================================

export const updateStateSchema = Joi.object({
  country_id: rules.id.optional(),
  code: rules.code3.optional(),
  name: rules.name.optional(),
  native_name: rules.nativeName.optional(),
  capital: rules.capital.optional(),
  population: rules.population.optional(),
  area_km2: rules.area.optional(),
  is_active: rules.boolean.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// ==========================================
// State Filter Schema
// ==========================================

export const filterStatesSchema = Joi.object({
  page: rules.page,
  limit: rules.limit,
  sortBy: rules.sortBy,
  sortOrder: rules.sortOrder,
  search: rules.search,
  country_id: rules.id,
  country_code: rules.code2,
  is_active: rules.boolean,
  is_capital: rules.boolean,
  min_population: rules.population,
  max_population: rules.population,
  has_cities: rules.boolean
});

// ==========================================
// State Bulk Create Schema
// ==========================================

export const bulkCreateStatesSchema = Joi.array()
  .items(createStateSchema)
  .min(1)
  .max(100)
  .messages({
    'array.base': 'Must be an array of states',
    'array.min': 'At least one state is required',
    'array.max': 'Cannot create more than 100 states at once'
  });

// ==========================================
// Export all state schemas
// ==========================================

export default {
  createStateSchema,
  updateStateSchema,
  filterStatesSchema,
  bulkCreateStatesSchema
};