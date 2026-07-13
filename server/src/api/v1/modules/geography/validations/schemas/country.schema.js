/**
 * Country Validation Schemas
 * All country-related validation schemas
 */

import Joi from 'joi';
import { rules } from '../rules.js';

// ==========================================
// Create Country Schema
// ==========================================

export const createCountrySchema = Joi.object({
  code: rules.code2.required(),
  name: rules.name.required(),
  native_name: rules.nativeName,
  capital: rules.capital,
  continent_id: rules.id.required(),
  region_id: rules.id.allow('').allow(null),
  subregion_id: rules.id.allow('').allow(null),
  population: rules.population,
  area_km2: rules.area,
  currency_code: rules.currencyCode,
  phone_code: rules.phoneCode,
  tld: rules.tld,
  is_active: rules.boolean.default(true)
});

// ==========================================
// Update Country Schema - ALL FIELDS OPTIONAL
// ==========================================

export const updateCountrySchema = Joi.object({
  code: rules.code2.optional(),
  name: rules.name.optional(),
  native_name: rules.nativeName.optional(),
  capital: rules.capital.optional(),
  continent_id: rules.id.optional(),
  region_id: rules.id.allow('').allow(null).optional(),
  subregion_id: rules.id.allow('').allow(null).optional(),
  population: rules.population.optional(),
  area_km2: rules.area.optional(),
  currency_code: rules.currencyCode.optional(),
  phone_code: rules.phoneCode.optional(),
  tld: rules.tld.optional(),
  is_active: rules.boolean.optional()
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// ==========================================
// Country Filter Schema
// ==========================================

export const filterCountriesSchema = Joi.object({
  page: rules.page,
  limit: rules.limit,
  sortBy: rules.sortBy,
  sortOrder: rules.sortOrder,
  search: rules.search,
  continent_id: rules.id,
  region_id: rules.id,
  subregion_id: rules.id,
  currency_code: rules.currencyCode,
  is_active: rules.boolean,
  min_population: rules.population,
  max_population: rules.population,
  min_area: rules.area,
  max_area: rules.area,
  has_states: rules.boolean
});

// ==========================================
// Country Bulk Create Schema
// ==========================================

export const bulkCreateCountriesSchema = Joi.array()
  .items(createCountrySchema)
  .min(1)
  .max(100)
  .messages({
    'array.base': 'Must be an array of countries',
    'array.min': 'At least one country is required',
    'array.max': 'Cannot create more than 100 countries at once'
  });

// ==========================================
// Export all country schemas
// ==========================================

export default {
  createCountrySchema,
  updateCountrySchema,
  filterCountriesSchema,
  bulkCreateCountriesSchema
};