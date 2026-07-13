/**
 * Common Validation Rules
 * Reusable Joi validation rules extracted from geography.validation.js
 */

import Joi from 'joi';

export const rules = {
  // ID validation
  id: Joi.number().integer().positive().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number'
  }),

  // Code validation (2 uppercase letters)
  code2: Joi.string().uppercase().length(2).pattern(/^[A-Z]{2}$/).messages({
    'string.base': 'Code must be a string',
    'string.length': 'Code must be exactly 2 characters',
    'string.pattern.base': 'Code must be 2 uppercase letters'
  }),

  // Code validation (2-3 uppercase letters)
  code3: Joi.string().uppercase().min(2).max(3).pattern(/^[A-Z]{2,3}$/).messages({
    'string.base': 'Code must be a string',
    'string.min': 'Code must be at least 2 characters',
    'string.max': 'Code must be at most 3 characters',
    'string.pattern.base': 'Code must be 2-3 uppercase letters'
  }),

  // Name validation
  name: Joi.string().min(2).max(100).trim().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be at most 100 characters',
    'string.empty': 'Name is required'
  }),

  // Native name validation (optional)
  nativeName: Joi.string().max(100).trim().allow('').allow(null).messages({
    'string.base': 'Native name must be a string',
    'string.max': 'Native name must be at most 100 characters'
  }),

  // Capital validation
  capital: Joi.string().max(100).trim().allow('').allow(null).messages({
    'string.base': 'Capital must be a string',
    'string.max': 'Capital must be at most 100 characters'
  }),

  // Population validation
  population: Joi.number().integer().min(0).allow('').allow(null).messages({
    'number.base': 'Population must be a number',
    'number.integer': 'Population must be an integer',
    'number.min': 'Population cannot be negative'
  }),

  // Area validation
  area: Joi.number().min(0).allow('').allow(null).messages({
    'number.base': 'Area must be a number',
    'number.min': 'Area cannot be negative'
  }),

  // Currency code validation (3 uppercase letters)
  currencyCode: Joi.string().uppercase().length(3).pattern(/^[A-Z]{3}$/).allow('').allow(null).messages({
    'string.base': 'Currency code must be a string',
    'string.length': 'Currency code must be exactly 3 characters',
    'string.pattern.base': 'Currency code must be 3 uppercase letters'
  }),

  // Phone code validation
  phoneCode: Joi.string().pattern(/^\+\d{1,4}$/).allow('').allow(null).messages({
    'string.base': 'Phone code must be a string',
    'string.pattern.base': 'Phone code must start with + followed by 1-4 digits'
  }),

  // TLD validation
  tld: Joi.string().pattern(/^\.[a-z]{2,}$/).allow('').allow(null).messages({
    'string.base': 'TLD must be a string',
    'string.pattern.base': 'TLD must start with a dot followed by letters'
  }),

  // Boolean validation
  boolean: Joi.boolean().messages({
    'boolean.base': 'Must be a boolean value'
  }),

  // Coordinates validation
  latitude: Joi.number().min(-90).max(90).allow('').allow(null).messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be between -90 and 90',
    'number.max': 'Latitude must be between -90 and 90'
  }),

  longitude: Joi.number().min(-180).max(180).allow('').allow(null).messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be between -180 and 180',
    'number.max': 'Longitude must be between -180 and 180'
  }),

  // Pagination validation
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1'
  }),

  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 100'
  }),

  sortBy: Joi.string().valid('id', 'code', 'name', 'population', 'area_km2', 'created_at', 'updated_at').default('name').messages({
    'string.base': 'Sort field must be a string',
    'any.only': 'Invalid sort field'
  }),

  sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC').messages({
    'string.base': 'Sort order must be a string',
    'any.only': 'Sort order must be ASC or DESC'
  }),

  search: Joi.string().min(2).max(100).trim().allow('').messages({
    'string.base': 'Search query must be a string',
    'string.min': 'Search query must be at least 2 characters',
    'string.max': 'Search query must be at most 100 characters'
  }),

  // Timezone validation
  timezoneId: Joi.number().integer().positive().allow('').allow(null).messages({
    'number.base': 'Timezone ID must be a number',
    'number.integer': 'Timezone ID must be an integer',
    'number.positive': 'Timezone ID must be a positive number'
  }),

  // Postal code validation
  postalCode: Joi.string().max(20).trim().allow('').allow(null).messages({
    'string.base': 'Postal code must be a string',
    'string.max': 'Postal code must be at most 20 characters'
  })
};

export default rules;