/**
 * City Validation Schemas
 * All city-related validation schemas
 */

import Joi from 'joi';
import { rules } from '../rules.js';

// ==========================================
// Create City Schema
// ==========================================

export const createCitySchema = Joi.object({
  state_id: rules.id.required(),
  name: rules.name.required(),
  native_name: rules.nativeName,
  population: rules.population,
  latitude: rules.latitude,
  longitude: rules.longitude,
  timezone_id: rules.timezoneId,
  postal_code: rules.postalCode,
  is_capital: rules.boolean.default(false),
  is_active: rules.boolean.default(true)
});

// ==========================================
// Update City Schema - ALL FIELDS OPTIONAL
// ==========================================

export const updateCitySchema = Joi.object({
  state_id: rules.id.optional(),
  name: rules.name.optional(),
  native_name: rules.nativeName.optional(),
  population: rules.population.optional(),
  latitude: rules.latitude.optional(),
  longitude: rules.longitude.optional(),
  timezone_id: rules.timezoneId.optional(),
  postal_code: rules.postalCode.optional(),
  is_capital: rules.boolean.optional(),
  is_active: rules.boolean.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// ==========================================
// City Filter Schema
// ==========================================

export const filterCitiesSchema = Joi.object({
  page: rules.page,
  limit: rules.limit,
  sortBy: Joi.string()
    .valid('id', 'name', 'population', 'latitude', 'longitude', 'created_at', 'updated_at')
    .default('name'),
  sortOrder: rules.sortOrder,
  search: rules.search,
  state_id: rules.id,
  state_code: rules.code3,
  country_id: rules.id,
  country_code: rules.code2,
  is_active: rules.boolean,
  is_capital: rules.boolean,
  has_coordinates: rules.boolean,
  min_population: rules.population,
  max_population: rules.population,
  timezone_id: rules.timezoneId
});

// ==========================================
// City Bulk Create Schema
// ==========================================

export const bulkCreateCitiesSchema = Joi.array()
  .items(createCitySchema)
  .min(1)
  .max(100)
  .messages({
    'array.base': 'Must be an array of cities',
    'array.min': 'At least one city is required',
    'array.max': 'Cannot create more than 100 cities at once'
  });

// ==========================================
// Export all city schemas
// ==========================================

export default {
  createCitySchema,
  updateCitySchema,
  filterCitiesSchema,
  bulkCreateCitiesSchema
};