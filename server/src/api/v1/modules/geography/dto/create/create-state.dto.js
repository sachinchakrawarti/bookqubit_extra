/**
 * Create State DTO
 * Data Transfer Object for creating a new state
 * Validates and transforms state creation data
 */

import Joi from 'joi';
import { ValidationError } from '../../core/exceptions/index.js';

export class CreateStateDTO {
  /**
   * Create State DTO
   * @param {Object} data - State creation data
   * @param {number} data.country_id - Country ID
   * @param {string} data.code - State code (2-3 uppercase letters)
   * @param {string} data.name - State name
   * @param {string} data.native_name - Native name (optional)
   * @param {string} data.capital - Capital city (optional)
   * @param {number} data.population - Population (optional)
   * @param {number} data.area_km2 - Area in km² (optional)
   * @param {boolean} data.is_active - Active status (default: true)
   */
  constructor(data = {}) {
    this._raw = data;
    
    // Map fields
    this.countryId = data.country_id || data.countryId;
    this.code = data.code;
    this.name = data.name;
    this.nativeName = data.native_name || data.nativeName;
    this.capital = data.capital;
    this.population = data.population;
    this.areaKm2 = data.area_km2 || data.areaKm2;
    this.isActive = data.is_active !== undefined ? data.is_active : data.isActive !== undefined ? data.isActive : true;
    
    // Validate
    this.validate();
  }

  /**
   * Validation rules for creating a state
   */
  static getValidationSchema() {
    return Joi.object({
      country_id: Joi.number().integer().positive().required().messages({
        'number.base': 'Country ID must be a number',
        'number.integer': 'Country ID must be an integer',
        'number.positive': 'Country ID must be a positive number',
        'any.required': 'Country ID is required'
      }),
      code: Joi.string().uppercase().min(2).max(3).pattern(/^[A-Z]{2,3}$/).required().messages({
        'string.base': 'Code must be a string',
        'string.min': 'Code must be at least 2 characters',
        'string.max': 'Code must be at most 3 characters',
        'string.pattern.base': 'Code must be 2-3 uppercase letters',
        'any.required': 'State code is required'
      }),
      name: Joi.string().min(2).max(100).trim().required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be at most 100 characters',
        'string.empty': 'State name is required',
        'any.required': 'State name is required'
      }),
      native_name: Joi.string().max(100).trim().allow('').allow(null).optional(),
      capital: Joi.string().max(100).trim().allow('').allow(null).optional(),
      population: Joi.number().integer().min(0).allow('').allow(null).optional(),
      area_km2: Joi.number().min(0).allow('').allow(null).optional(),
      is_active: Joi.boolean().default(true).optional()
    });
  }

  /**
   * Validate the DTO
   */
  validate() {
    const schema = CreateStateDTO.getValidationSchema();
    const { error, value } = schema.validate(this._raw, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('State validation failed', errors);
    }

    this.countryId = value.country_id;
    this.code = value.code;
    this.name = value.name;
    this.nativeName = value.native_name;
    this.capital = value.capital;
    this.population = value.population;
    this.areaKm2 = value.area_km2;
    this.isActive = value.is_active;
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      country_id: this.countryId,
      code: this.code,
      name: this.name,
      native_name: this.nativeName,
      capital: this.capital,
      population: this.population,
      area_km2: this.areaKm2,
      is_active: this.isActive
    };
  }

  /**
   * Convert to database model format
   */
  toDatabase() {
    return this.toJSON();
  }

  /**
   * Convert to API request format (camelCase)
   */
  toRequest() {
    return {
      countryId: this.countryId,
      code: this.code,
      name: this.name,
      nativeName: this.nativeName,
      capital: this.capital,
      population: this.population,
      areaKm2: this.areaKm2,
      isActive: this.isActive
    };
  }

  /**
   * Validate static method
   */
  static validate(data) {
    const schema = this.getValidationSchema();
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('State validation failed', errors);
    }

    return value;
  }
}

export default CreateStateDTO;