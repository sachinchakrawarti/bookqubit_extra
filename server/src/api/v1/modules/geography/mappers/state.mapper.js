/**
 * State Mapper
 * Maps between State entity, DTO, Model, and API Response
 * Supports both camelCase and snake_case input formats
 */

import BaseMapper from './base.mapper.js';

class StateMapper extends BaseMapper {
  /**
   * Get required fields for validation
   * @returns {Array} Required field names (in camelCase)
   */
  getRequiredFields() {
    return ['countryId', 'code', 'name'];
  }

  /**
   * Get field mappings from snake_case to camelCase
   * @returns {Object} Field mappings
   */
  getFieldMappings() {
    return {
      id: 'id',
      code: 'code',
      name: 'name',
      native_name: 'nativeName',
      country_id: 'countryId',
      country: 'country',
      capital: 'capital',
      population: 'population',
      area_km2: 'areaKm2',
      is_active: 'isActive',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      deleted_at: 'deletedAt'
    };
  }

  /**
   * Normalize state data - handles both camelCase and snake_case
   * @param {Object} data - Raw input data
   * @returns {Object} Normalized data with camelCase
   */
  normalize(data) {
    if (!data) return data;
    
    // Use BaseMapper's normalize method with field mappings
    const normalized = super.normalize(data, this.getFieldMappings());
    
    // Ensure countryId is set (check both formats)
    if (!normalized.countryId && data.country_id !== undefined) {
      normalized.countryId = data.country_id;
    }
    if (!normalized.countryId && data.countryId !== undefined) {
      normalized.countryId = data.countryId;
    }
    
    return normalized;
  }

  /**
   * Validate state data - handles both formats
   * @param {Object} data - State data
   * @returns {Object} Validated data
   */
  validate(data) {
    if (!data) {
      throw new Error('State data is required');
    }

    // Normalize input first
    const normalized = this.normalize(data);
    
    // Validate code (check both formats)
    const code = normalized.code || data.code;
    if (!code) {
      throw new Error('State code is required');
    }

    const upperCode = code.toUpperCase();
    if (!/^[A-Z]{2,3}$/.test(upperCode)) {
      throw new Error('State code must be 2-3 uppercase letters');
    }
    normalized.code = upperCode;

    // Validate name
    if (!normalized.name) {
      throw new Error('State name is required');
    }

    // Validate countryId (handles both formats)
    const countryId = normalized.countryId || data.country_id || data.countryId;
    if (!countryId) {
      throw new Error('Country ID is required');
    }
    normalized.countryId = countryId;

    // Validate population
    if (normalized.population !== undefined && normalized.population !== null) {
      const population = parseInt(normalized.population);
      if (isNaN(population) || population < 0) {
        throw new Error('Population must be a positive number');
      }
    }

    // Validate area
    if (normalized.areaKm2 !== undefined && normalized.areaKm2 !== null) {
      const area = parseFloat(normalized.areaKm2);
      if (isNaN(area) || area < 0) {
        throw new Error('Area must be a positive number');
      }
    }

    return normalized;
  }

  /**
   * Validate update data (partial update)
   * @param {Object} data - Update data
   * @returns {Object} Validated update data
   */
  validateUpdate(data) {
    if (!data) {
      throw new Error('Update data is required');
    }

    const normalized = this.normalize(data);
    
    // Validate code if provided
    if (normalized.code) {
      const upperCode = normalized.code.toUpperCase();
      if (!/^[A-Z]{2,3}$/.test(upperCode)) {
        throw new Error('State code must be 2-3 uppercase letters');
      }
      normalized.code = upperCode;
    }

    // Validate name if provided
    if (normalized.name && normalized.name.length < 2) {
      throw new Error('State name must be at least 2 characters');
    }

    // Validate population if provided
    if (normalized.population !== undefined && normalized.population !== null) {
      const population = parseInt(normalized.population);
      if (isNaN(population) || population < 0) {
        throw new Error('Population must be a positive number');
      }
    }

    return normalized;
  }

  /**
   * Map State model to DTO
   * @param {Object} model - State model (snake_case)
   * @returns {Object} State DTO (camelCase)
   */
  toDTO(model) {
    if (!model) return null;

    return {
      id: model.id,
      code: model.code,
      name: model.name,
      nativeName: model.native_name,
      countryId: model.country_id,
      country: model.country ? {
        id: model.country.id,
        code: model.country.code,
        name: model.country.name
      } : null,
      capital: model.capital,
      population: model.population,
      areaKm2: model.area_km2,
      isActive: model.is_active === 1 || model.is_active === true,
      createdAt: model.created_at,
      updatedAt: model.updated_at
    };
  }

  /**
   * Map State DTO to Entity
   * @param {Object} dto - State DTO (camelCase)
   * @returns {Object} State entity
   */
  toEntity(dto) {
    if (!dto) return null;

    // Validate and normalize
    const validated = this.validate(dto);

    return {
      id: validated.id,
      code: validated.code,
      name: validated.name,
      nativeName: validated.nativeName,
      countryId: validated.countryId,
      capital: validated.capital,
      population: validated.population,
      areaKm2: validated.areaKm2,
      isActive: validated.isActive !== undefined ? validated.isActive : true
    };
  }

  /**
   * Map DTO to Model (for database)
   * @param {Object} dto - State DTO
   * @returns {Object} State model data (snake_case)
   */
  toModel(dto) {
    const entity = this.toEntity(dto);
    if (!entity) return null;

    return {
      code: entity.code,
      name: entity.name,
      native_name: entity.nativeName,
      country_id: entity.countryId,
      capital: entity.capital,
      population: entity.population,
      area_km2: entity.areaKm2,
      is_active: entity.isActive ? 1 : 0
    };
  }

  /**
   * Map entity to API Response
   * @param {Object} entity - State entity
   * @returns {Object} API response
   */
  toResponse(entity) {
    if (!entity) return null;

    const data = entity.toJSON ? entity.toJSON() : entity;

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      country: data.country ? {
        id: data.country.id,
        code: data.country.code,
        name: data.country.name
      } : null,
      capital: data.capital,
      population: data.population,
      populationFormatted: data.population ? data.population.toLocaleString() : 'N/A',
      areaKm2: data.area_km2 || data.areaKm2,
      areaFormatted: data.area_km2 || data.areaKm2 ? 
        `${(data.area_km2 || data.areaKm2).toLocaleString()} km²` : 'N/A',
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      createdAt: data.created_at || data.createdAt,
      updatedAt: data.updated_at || data.updatedAt
    };
  }

  /**
   * Map to summary (for list views)
   * @param {Object} entity - State entity
   * @returns {Object} Summary
   */
  toSummary(entity) {
    if (!entity) return null;

    const data = entity.toJSON ? entity.toJSON() : entity;

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      countryName: data.country ? data.country.name : null,
      countryCode: data.country ? data.country.code : null,
      capital: data.capital,
      population: data.population,
      populationFormatted: data.population ? data.population.toLocaleString() : 'N/A',
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true
    };
  }

  /**
   * Convert DTO to database format
   * @param {Object} dto - DTO with camelCase
   * @returns {Object} Database model with snake_case
   */
  toDatabase(dto) {
    return this.toModel(dto);
  }

  /**
   * Convert database model to DTO
   * @param {Object} model - Database model with snake_case
   * @returns {Object} DTO with camelCase
   */
  fromDatabase(model) {
    return this.toDTO(model);
  }

  /**
   * Convert multiple database models to DTOs
   * @param {Array} models - Array of database models
   * @returns {Array} Array of DTOs
   */
  fromDatabaseMany(models) {
    if (!models || !Array.isArray(models)) {
      return [];
    }
    return models.map(model => this.fromDatabase(model));
  }

  /**
   * Convert multiple DTOs to database models
   * @param {Array} dtos - Array of DTOs
   * @returns {Array} Array of database models
   */
  toDatabaseMany(dtos) {
    if (!dtos || !Array.isArray(dtos)) {
      return [];
    }
    return dtos.map(dto => this.toDatabase(dto));
  }
}

export default new StateMapper();