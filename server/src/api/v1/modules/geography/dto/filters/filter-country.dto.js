/**
 * Filter Country DTO
 * Data Transfer Object for filtering countries
 * Validates and transforms country filter parameters
 */

import Joi from 'joi';
import { ValidationError } from '../../core/exceptions/index.js';

export class FilterCountryDTO {
  /**
   * Filter Country DTO
   * @param {Object} query - Query parameters
   * @param {number} query.page - Page number (default: 1)
   * @param {number} query.limit - Items per page (default: 10, max: 100)
   * @param {string} query.search - Search query
   * @param {string} query.sortBy - Sort field (default: name)
   * @param {string} query.sortOrder - Sort order (ASC/DESC, default: ASC)
   * @param {number} query.continentId - Filter by continent ID
   * @param {number} query.regionId - Filter by region ID
   * @param {number} query.subregionId - Filter by subregion ID
   * @param {string} query.currencyCode - Filter by currency code
   * @param {boolean} query.isActive - Filter by active status
   * @param {number} query.minPopulation - Minimum population
   * @param {number} query.maxPopulation - Maximum population
   * @param {number} query.minArea - Minimum area
   * @param {number} query.maxArea - Maximum area
   * @param {boolean} query.hasStates - Filter by states presence
   */
  constructor(query = {}) {
    this._raw = query;
    
    // Map fields
    this.page = query.page ? parseInt(query.page) : 1;
    this.limit = query.limit ? parseInt(query.limit) : 10;
    this.search = query.search || query.q || '';
    this.sortBy = query.sortBy || 'name';
    this.sortOrder = query.sortOrder || 'ASC';
    this.continentId = query.continentId || query.continent_id ? parseInt(query.continentId || query.continent_id) : undefined;
    this.regionId = query.regionId || query.region_id ? parseInt(query.regionId || query.region_id) : undefined;
    this.subregionId = query.subregionId || query.subregion_id ? parseInt(query.subregionId || query.subregion_id) : undefined;
    this.currencyCode = query.currencyCode || query.currency_code;
    this.isActive = query.isActive !== undefined ? query.isActive === 'true' || query.isActive === true : undefined;
    this.minPopulation = query.minPopulation || query.min_population ? parseInt(query.minPopulation || query.min_population) : undefined;
    this.maxPopulation = query.maxPopulation || query.max_population ? parseInt(query.maxPopulation || query.max_population) : undefined;
    this.minArea = query.minArea || query.min_area ? parseFloat(query.minArea || query.min_area) : undefined;
    this.maxArea = query.maxArea || query.max_area ? parseFloat(query.maxArea || query.max_area) : undefined;
    this.hasStates = query.hasStates !== undefined ? query.hasStates === 'true' || query.hasStates === true : undefined;
    
    // Validate
    this.validate();
  }

  /**
   * Validation rules for filtering countries
   */
  static getValidationSchema() {
    return Joi.object({
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      search: Joi.string().min(1).max(100).trim().allow('').optional(),
      q: Joi.string().min(1).max(100).trim().allow('').optional(),
      sortBy: Joi.string().valid('id', 'code', 'name', 'population', 'area_km2', 'created_at', 'updated_at').default('name'),
      sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC'),
      continentId: Joi.number().integer().positive().optional(),
      continent_id: Joi.number().integer().positive().optional(),
      regionId: Joi.number().integer().positive().optional(),
      region_id: Joi.number().integer().positive().optional(),
      subregionId: Joi.number().integer().positive().optional(),
      subregion_id: Joi.number().integer().positive().optional(),
      currencyCode: Joi.string().uppercase().length(3).optional(),
      currency_code: Joi.string().uppercase().length(3).optional(),
      isActive: Joi.boolean().optional(),
      is_active: Joi.boolean().optional(),
      minPopulation: Joi.number().integer().min(0).optional(),
      min_population: Joi.number().integer().min(0).optional(),
      maxPopulation: Joi.number().integer().min(0).optional(),
      max_population: Joi.number().integer().min(0).optional(),
      minArea: Joi.number().min(0).optional(),
      min_area: Joi.number().min(0).optional(),
      maxArea: Joi.number().min(0).optional(),
      max_area: Joi.number().min(0).optional(),
      hasStates: Joi.boolean().optional(),
      has_states: Joi.boolean().optional()
    });
  }

  /**
   * Validate the DTO
   */
  validate() {
    const schema = FilterCountryDTO.getValidationSchema();
    const { error, value } = schema.validate(this._raw, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      throw new ValidationError('Country filter validation failed', errors);
    }

    // Update with validated values
    this.page = value.page || 1;
    this.limit = value.limit || 10;
    this.search = value.search || value.q || '';
    this.sortBy = value.sortBy || 'name';
    this.sortOrder = value.sortOrder || 'ASC';
    this.continentId = value.continentId || value.continent_id;
    this.regionId = value.regionId || value.region_id;
    this.subregionId = value.subregionId || value.subregion_id;
    this.currencyCode = value.currencyCode || value.currency_code;
    this.isActive = value.isActive !== undefined ? value.isActive : value.is_active;
    this.minPopulation = value.minPopulation || value.min_population;
    this.maxPopulation = value.maxPopulation || value.max_population;
    this.minArea = value.minArea || value.min_area;
    this.maxArea = value.maxArea || value.max_area;
    this.hasStates = value.hasStates !== undefined ? value.hasStates : value.has_states;
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
    if (this.continentId) filters.continent_id = this.continentId;
    if (this.regionId) filters.region_id = this.regionId;
    if (this.subregionId) filters.subregion_id = this.subregionId;
    if (this.currencyCode) filters.currency_code = this.currencyCode;
    if (this.isActive !== undefined) filters.is_active = this.isActive;
    if (this.minPopulation !== undefined) filters.min_population = this.minPopulation;
    if (this.maxPopulation !== undefined) filters.max_population = this.maxPopulation;
    if (this.minArea !== undefined) filters.min_area = this.minArea;
    if (this.maxArea !== undefined) filters.max_area = this.maxArea;
    if (this.hasStates !== undefined) filters.has_states = this.hasStates;
    
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
      continentId: this.continentId,
      regionId: this.regionId,
      subregionId: this.subregionId,
      currencyCode: this.currencyCode,
      isActive: this.isActive,
      minPopulation: this.minPopulation,
      maxPopulation: this.maxPopulation,
      minArea: this.minArea,
      maxArea: this.maxArea,
      hasStates: this.hasStates
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
      throw new ValidationError('Country filter validation failed', errors);
    }

    return value;
  }
}

export default FilterCountryDTO;