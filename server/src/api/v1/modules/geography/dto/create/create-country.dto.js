/**
 * Create Country DTO
 * Data Transfer Object for creating a new country
 * Validates and transforms country creation data
 */

import Joi from 'joi';
import { ValidationError } from '../../core/exceptions/index.js';

export class CreateCountryDTO {
  /**
   * Create Country DTO
   * @param {Object} data - Country creation data
   * @param {string} data.code - Country code (2 uppercase letters)
   * @param {string} data.name - Country name
   * @param {string} data.native_name - Native name (optional)
   * @param {string} data.capital - Capital city (optional)
   * @param {number} data.continent_id - Continent ID
   * @param {number} data.region_id - Region ID (optional)
   * @param {number} data.subregion_id - Subregion ID (optional)
   * @param {number} data.population - Population (optional)
   * @param {number} data.area_km2 - Area in km² (optional)
   * @param {string} data.currency_code - Currency code (optional)
   * @param {string} data.phone_code - Phone code (optional)
   * @param {string} data.tld - Top-level domain (optional)
   * @param {boolean} data.is_active - Active status (default: true)
   */
  constructor(data = {}) {
    // Store raw data
    this._raw = data;
    
    // Map fields
    this.code = data.code;
    this.name = data.name;
    this.nativeName = data.native_name || data.nativeName;
    this.capital = data.capital;
    this.continentId = data.continent_id || data.continentId;
    this.regionId = data.region_id || data.regionId;
    this.subregionId = data.subregion_id || data.subregionId;
    this.population = data.population;
    this.areaKm2 = data.area_km2 || data.areaKm2;
    this.currencyCode = data.currency_code || data.currencyCode;
    this.phoneCode = data.phone_code || data.phoneCode;
    this.tld = data.tld;
    this.isActive = data.is_active !== undefined ? data.is_active : data.isActive !== undefined ? data.isActive : true;
    
    // Validate
    this.validate();
  }

  /**
   * Validation rules for creating a country
   */
  static getValidationSchema() {
    return Joi.object({
      code: Joi.string().uppercase().length(2).pattern(/^[A-Z]{2}$/).required().messages({
        'string.base': 'Code must be a string',
        'string.length': 'Code must be exactly 2 characters',
        'string.pattern.base': 'Code must be 2 uppercase letters',
        'any.required': 'Country code is required'
      }),
      name: Joi.string().min(2).max(100).trim().required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be at most 100 characters',
        'string.empty': 'Country name is required',
        'any.required': 'Country name is required'
      }),
      native_name: Joi.string().max(100).trim().allow('').allow(null).optional(),
      capital: Joi.string().max(100).trim().allow('').allow(null).optional(),
      continent_id: Joi.number().integer().positive().required().messages({
        'number.base': 'Continent ID must be a number',
        'number.integer': 'Continent ID must be an integer',
        'number.positive': 'Continent ID must be a positive number',
        'any.required': 'Continent ID is required'
      }),
      region_id: Joi.number().integer().positive().allow('').allow(null).optional(),
      subregion_id: Joi.number().integer().positive().allow('').allow(null).optional(),
      population: Joi.number().integer().min(0).allow('').allow(null).optional(),
      area_km2: Joi.number().min(0).allow('').allow(null).optional(),
      currency_code: Joi.string().uppercase().length(3).pattern(/^[A-Z]{3}$/).allow('').allow(null).optional(),
      phone_code: Joi.string().pattern(/^\+\d{1,4}$/).allow('').allow(null).optional(),
      tld: Joi.string().pattern(/^\.[a-z]{2,}$/).allow('').allow(null).optional(),
      is_active: Joi.boolean().default(true).optional()
    });
  }

  /**
   * Validate the DTO
   * @throws {ValidationError} If validation fails
   */
  validate() {
    const schema = CreateCountryDTO.getValidationSchema();
    const { error, value } = schema.validate(this._raw, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('Country validation failed', errors);
    }

    // Update properties with validated values
    this.code = value.code;
    this.name = value.name;
    this.nativeName = value.native_name;
    this.capital = value.capital;
    this.continentId = value.continent_id;
    this.regionId = value.region_id;
    this.subregionId = value.subregion_id;
    this.population = value.population;
    this.areaKm2 = value.area_km2;
    this.currencyCode = value.currency_code;
    this.phoneCode = value.phone_code;
    this.tld = value.tld;
    this.isActive = value.is_active;
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      code: this.code,
      name: this.name,
      native_name: this.nativeName,
      capital: this.capital,
      continent_id: this.continentId,
      region_id: this.regionId,
      subregion_id: this.subregionId,
      population: this.population,
      area_km2: this.areaKm2,
      currency_code: this.currencyCode,
      phone_code: this.phoneCode,
      tld: this.tld,
      is_active: this.isActive
    };
  }

  /**
   * Convert to database model format (snake_case)
   */
  toDatabase() {
    return this.toJSON();
  }

  /**
   * Convert to API request format (camelCase)
   */
  toRequest() {
    return {
      code: this.code,
      name: this.name,
      nativeName: this.nativeName,
      capital: this.capital,
      continentId: this.continentId,
      regionId: this.regionId,
      subregionId: this.subregionId,
      population: this.population,
      areaKm2: this.areaKm2,
      currencyCode: this.currencyCode,
      phoneCode: this.phoneCode,
      tld: this.tld,
      isActive: this.isActive
    };
  }

  /**
   * Validate static method (use without creating instance)
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
      throw new ValidationError('Country validation failed', errors);
    }

    return value;
  }
}

export default CreateCountryDTO;