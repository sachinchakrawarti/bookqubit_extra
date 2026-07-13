/**
 * Filter State DTO
 * Data Transfer Object for filtering states
 * Validates and transforms state filter parameters
 */

import Joi from 'joi';
import { ValidationError } from '../../core/exceptions/index.js';

export class FilterStateDTO {
  /**
   * Filter State DTO
   * @param {Object} query - Query parameters
   * @param {number} query.page - Page number (default: 1)
   * @param {number} query.limit - Items per page (default: 10, max: 100)
   * @param {string} query.search - Search query
   * @param {string} query.sortBy - Sort field (default: name)
   * @param {string} query.sortOrder - Sort order (ASC/DESC, default: ASC)
   * @param {number} query.countryId - Filter by country ID
   * @param {boolean} query.isActive - Filter by active status
   * @param {number} query.minPopulation - Minimum population
   * @param {number} query.maxPopulation - Maximum population
   * @param {boolean} query.hasCities - Filter by cities presence
   */
  constructor(query = {}) {
    this._raw = query;
    
    // Map fields
    this.page = query.page ? parseInt(query.page) : 1;
    this.limit = query.limit ? parseInt(query.limit) : 10;
    this.search = query.search || query.q || '';
    this.sortBy = query.sortBy || 'name';
    this.sortOrder = query.sortOrder || 'ASC';
    this.countryId = query.countryId || query.country_id ? parseInt(query.countryId || query.country_id) : undefined;
    this.isActive = query.isActive !== undefined ? query.isActive === 'true' || query.isActive === true : undefined;
    this.minPopulation = query.minPopulation || query.min_population ? parseInt(query.minPopulation || query.min_population) : undefined;
    this.maxPopulation = query.maxPopulation || query.max_population ? parseInt(query.maxPopulation || query.max_population) : undefined;
    this.hasCities = query.hasCities !== undefined ? query.hasCities === 'true' || query.hasCities === true : undefined;
    
    // Validate
    this.validate();
  }

  /**
   * Validation rules for filtering states
   */
  static getValidationSchema() {
    return Joi.object({
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      search: Joi.string().min(1).max(100).trim().allow('').optional(),
      q: Joi.string().min(1).max(100).trim().allow('').optional(),
      sortBy: Joi.string().valid('id', 'code', 'name', 'population', 'area_km2', 'created_at', 'updated_at').default('name'),
      sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC'),
      countryId: Joi.number().integer().positive().optional(),
      country_id: Joi.number().integer().positive().optional(),
      isActive: Joi.boolean().optional(),
      is_active: Joi.boolean().optional(),
      minPopulation: Joi.number().integer().min(0).optional(),
      min_population: Joi.number().integer().min(0).optional(),
      maxPopulation: Joi.number().integer().min(0).optional(),
      max_population: Joi.number().integer().min(0).optional(),
      hasCities: Joi.boolean().optional(),
      has_cities: Joi.boolean().optional()
    });
  }

  /**
   * Validate the DTO
   */
  validate() {
    const schema = FilterStateDTO.getValidationSchema();
    const { error, value } = schema.validate(this._raw, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('State filter validation failed', errors);
    }

    this.page = value.page || 1;
    this.limit = value.limit || 10;
    this.search = value.search || value.q || '';
    this.sortBy = value.sortBy || 'name';
    this.sortOrder = value.sortOrder || 'ASC';
    this.countryId = value.countryId || value.country_id;
    this.isActive = value.isActive !== undefined ? value.isActive : value.is_active;
    this.minPopulation = value.minPopulation || value.min_population;
    this.maxPopulation = value.maxPopulation || value.max_population;
    this.hasCities = value.hasCities !== undefined ? value.hasCities : value.has_cities;
  }

  /**
   * Get pagination options
   */
  getPagination() {
    return {
      page: this.page,
      limit: this.limit,
      offset: (this.page - 1) * this.limit
    };
  }

  /**
   * Get sorting options
   */
  getSort() {
    return {
      field: this.sortBy,
      order: this.sortOrder
    };
  }

  /**
   * Get filter options (snake_case for database)
   */
  getFilters() {
    const filters = {};
    
    if (this.search) filters.search = this.search;
    if (this.countryId) filters.country_id = this.countryId;
    if (this.isActive !== undefined) filters.is_active = this.isActive;
    if (this.minPopulation !== undefined) filters.min_population = this.minPopulation;
    if (this.maxPopulation !== undefined) filters.max_population = this.maxPopulation;
    if (this.hasCities !== undefined) filters.has_cities = this.hasCities;
    
    return filters;
  }

  /**
   * Get all query options combined
   */
  getOptions() {
    return {
      ...this.getFilters(),
      ...this.getPagination(),
      ...this.getSort()
    };
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      page: this.page,
      limit: this.limit,
      search: this.search,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      countryId: this.countryId,
      isActive: this.isActive,
      minPopulation: this.minPopulation,
      maxPopulation: this.maxPopulation,
      hasCities: this.hasCities
    };
  }

  /**
   * Static validation method
   */
  static validate(query) {
    const schema = this.getValidationSchema();
    const { error, value } = schema.validate(query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('State filter validation failed', errors);
    }

    return value;
  }
}

export default FilterStateDTO;