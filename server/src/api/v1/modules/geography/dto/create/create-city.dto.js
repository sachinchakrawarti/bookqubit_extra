/**
 * Create City DTO
 * Data Transfer Object for creating a new city
 * Validates and transforms city creation data
 */

import Joi from 'joi';
import { ValidationError } from '../../core/exceptions/index.js';

export class CreateCityDTO {
  /**
   * Create City DTO
   * @param {Object} data - City creation data
   * @param {number} data.state_id - State ID
   * @param {string} data.name - City name
   * @param {string} data.native_name - Native name (optional)
   * @param {number} data.population - Population (optional)
   * @param {number} data.latitude - Latitude (optional)
   * @param {number} data.longitude - Longitude (optional)
   * @param {number} data.timezone_id - Timezone ID (optional)
   * @param {string} data.postal_code - Postal code (optional)
   * @param {boolean} data.is_capital - Is capital (default: false)
   * @param {boolean} data.is_active - Active status (default: true)
   */
  constructor(data = {}) {
    this._raw = data;
    
    // Map fields
    this.stateId = data.state_id || data.stateId;
    this.name = data.name;
    this.nativeName = data.native_name || data.nativeName;
    this.population = data.population;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.timezoneId = data.timezone_id || data.timezoneId;
    this.postalCode = data.postal_code || data.postalCode;
    this.isCapital = data.is_capital !== undefined ? data.is_capital : data.isCapital !== undefined ? data.isCapital : false;
    this.isActive = data.is_active !== undefined ? data.is_active : data.isActive !== undefined ? data.isActive : true;
    
    // Validate
    this.validate();
  }

  /**
   * Validation rules for creating a city
   */
  static getValidationSchema() {
    return Joi.object({
      state_id: Joi.number().integer().positive().required().messages({
        'number.base': 'State ID must be a number',
        'number.integer': 'State ID must be an integer',
        'number.positive': 'State ID must be a positive number',
        'any.required': 'State ID is required'
      }),
      name: Joi.string().min(2).max(100).trim().required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be at most 100 characters',
        'string.empty': 'City name is required',
        'any.required': 'City name is required'
      }),
      native_name: Joi.string().max(100).trim().allow('').allow(null).optional(),
      population: Joi.number().integer().min(0).allow('').allow(null).optional(),
      latitude: Joi.number().min(-90).max(90).allow('').allow(null).optional().messages({
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90'
      }),
      longitude: Joi.number().min(-180).max(180).allow('').allow(null).optional().messages({
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180'
      }),
      timezone_id: Joi.number().integer().positive().allow('').allow(null).optional(),
      postal_code: Joi.string().max(20).trim().allow('').allow(null).optional(),
      is_capital: Joi.boolean().default(false).optional(),
      is_active: Joi.boolean().default(true).optional()
    });
  }

  /**
   * Validate the DTO
   */
  validate() {
    const schema = CreateCityDTO.getValidationSchema();
    const { error, value } = schema.validate(this._raw, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('City validation failed', errors);
    }

    this.stateId = value.state_id;
    this.name = value.name;
    this.nativeName = value.native_name;
    this.population = value.population;
    this.latitude = value.latitude;
    this.longitude = value.longitude;
    this.timezoneId = value.timezone_id;
    this.postalCode = value.postal_code;
    this.isCapital = value.is_capital;
    this.isActive = value.is_active;
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      state_id: this.stateId,
      name: this.name,
      native_name: this.nativeName,
      population: this.population,
      latitude: this.latitude,
      longitude: this.longitude,
      timezone_id: this.timezoneId,
      postal_code: this.postalCode,
      is_capital: this.isCapital,
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
      stateId: this.stateId,
      name: this.name,
      nativeName: this.nativeName,
      population: this.population,
      latitude: this.latitude,
      longitude: this.longitude,
      timezoneId: this.timezoneId,
      postalCode: this.postalCode,
      isCapital: this.isCapital,
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
      throw new ValidationError('City validation failed', errors);
    }

    return value;
  }
}

export default CreateCityDTO;