/**
 * City Mapper
 * Maps between City entity, DTO, Model, and API Response
 * Supports both camelCase and snake_case input formats
 */

import BaseMapper from './base.mapper.js';

class CityMapper extends BaseMapper {
  /**
   * Get required fields for validation
   * @returns {Array} Required field names (in camelCase)
   */
  getRequiredFields() {
    return ['stateId', 'name'];
  }

  /**
   * Get field mappings from snake_case to camelCase
   * @returns {Object} Field mappings
   */
  getFieldMappings() {
    return {
      id: 'id',
      name: 'name',
      native_name: 'nativeName',
      state_id: 'stateId',
      state: 'state',
      population: 'population',
      latitude: 'latitude',
      longitude: 'longitude',
      timezone_id: 'timezoneId',
      timezone: 'timezone',
      postal_code: 'postalCode',
      is_capital: 'isCapital',
      is_active: 'isActive',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      deleted_at: 'deletedAt'
    };
  }

  /**
   * Normalize city data - handles both camelCase and snake_case
   * @param {Object} data - Raw input data
   * @returns {Object} Normalized data with camelCase
   */
  normalize(data) {
    if (!data) return data;
    
    // Use BaseMapper's normalize method with field mappings
    const normalized = super.normalize(data, this.getFieldMappings());
    
    // Ensure stateId is set (check both formats)
    if (!normalized.stateId && data.state_id !== undefined) {
      normalized.stateId = data.state_id;
    }
    if (!normalized.stateId && data.stateId !== undefined) {
      normalized.stateId = data.stateId;
    }
    
    return normalized;
  }

  /**
   * Validate city data - handles both formats
   * @param {Object} data - City data
   * @returns {Object} Validated data
   */
  validate(data) {
    if (!data) {
      throw new Error('City data is required');
    }

    // Normalize input first
    const normalized = this.normalize(data);
    
    // Check required fields
    if (!normalized.name) {
      throw new Error('City name is required');
    }

    // Check stateId (handles both formats)
    const stateId = normalized.stateId || data.state_id || data.stateId;
    if (!stateId) {
      throw new Error('State ID is required');
    }
    normalized.stateId = stateId;

    // Validate coordinates
    if (normalized.latitude !== undefined && normalized.latitude !== null) {
      const lat = parseFloat(normalized.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error('Latitude must be between -90 and 90');
      }
    }

    if (normalized.longitude !== undefined && normalized.longitude !== null) {
      const lng = parseFloat(normalized.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error('Longitude must be between -180 and 180');
      }
    }

    // Validate population
    if (normalized.population !== undefined && normalized.population !== null) {
      const population = parseInt(normalized.population);
      if (isNaN(population) || population < 0) {
        throw new Error('Population must be a positive number');
      }
    }

    return normalized;
  }

  /**
   * Map City model to DTO
   * @param {Object} model - City model (snake_case)
   * @returns {Object} City DTO (camelCase)
   */
  toDTO(model) {
    if (!model) return null;

    return {
      id: model.id,
      name: model.name,
      nativeName: model.native_name,
      stateId: model.state_id,
      state: model.state ? {
        id: model.state.id,
        code: model.state.code,
        name: model.state.name,
        country: model.state.country ? {
          id: model.state.country.id,
          code: model.state.country.code,
          name: model.state.country.name
        } : null
      } : null,
      population: model.population,
      latitude: model.latitude,
      longitude: model.longitude,
      timezoneId: model.timezone_id,
      timezone: model.timezone ? {
        id: model.timezone.id,
        name: model.timezone.name,
        offset: model.timezone.offset,
        code: model.timezone.code
      } : null,
      postalCode: model.postal_code,
      isCapital: model.is_capital === 1 || model.is_capital === true,
      isActive: model.is_active === 1 || model.is_active === true,
      createdAt: model.created_at,
      updatedAt: model.updated_at
    };
  }

  /**
   * Map City DTO to Entity
   * @param {Object} dto - City DTO (camelCase)
   * @returns {Object} City entity
   */
  toEntity(dto) {
    if (!dto) return null;

    // Validate and normalize
    const validated = this.validate(dto);

    return {
      id: validated.id,
      name: validated.name,
      nativeName: validated.nativeName,
      stateId: validated.stateId,
      population: validated.population,
      latitude: validated.latitude,
      longitude: validated.longitude,
      timezoneId: validated.timezoneId,
      postalCode: validated.postalCode,
      isCapital: validated.isCapital !== undefined ? validated.isCapital : false,
      isActive: validated.isActive !== undefined ? validated.isActive : true
    };
  }

  /**
   * Map DTO to Model (for database)
   * @param {Object} dto - City DTO
   * @returns {Object} City model data (snake_case)
   */
  toModel(dto) {
    const entity = this.toEntity(dto);
    if (!entity) return null;

    return {
      name: entity.name,
      native_name: entity.nativeName,
      state_id: entity.stateId,
      population: entity.population,
      latitude: entity.latitude,
      longitude: entity.longitude,
      timezone_id: entity.timezoneId,
      postal_code: entity.postalCode,
      is_capital: entity.isCapital ? 1 : 0,
      is_active: entity.isActive ? 1 : 0
    };
  }

  /**
   * Map entity to API Response
   * @param {Object} entity - City entity
   * @returns {Object} API response
   */
  toResponse(entity) {
    if (!entity) return null;

    const data = entity.toJSON ? entity.toJSON() : entity;

    return {
      id: data.id,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      state: data.state ? {
        id: data.state.id,
        code: data.state.code,
        name: data.state.name,
        country: data.state.country ? {
          id: data.state.country.id,
          code: data.state.country.code,
          name: data.state.country.name
        } : null
      } : null,
      population: data.population,
      populationFormatted: data.population ? data.population.toLocaleString() : 'N/A',
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone ? {
        id: data.timezone.id,
        name: data.timezone.name,
        offset: data.timezone.offset,
        code: data.timezone.code
      } : null,
      postalCode: data.postal_code || data.postalCode,
      isCapital: data.is_capital === 1 || data.is_capital === true || data.isCapital === true,
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      hasCoordinates: data.latitude !== null && data.longitude !== null && 
                     data.latitude !== undefined && data.longitude !== undefined,
      createdAt: data.created_at || data.createdAt,
      updatedAt: data.updated_at || data.updatedAt
    };
  }

  /**
   * Map to summary (for list views)
   * @param {Object} entity - City entity
   * @returns {Object} Summary
   */
  toSummary(entity) {
    if (!entity) return null;

    const data = entity.toJSON ? entity.toJSON() : entity;

    return {
      id: data.id,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      stateName: data.state ? data.state.name : null,
      countryName: data.state && data.state.country ? data.state.country.name : null,
      population: data.population,
      populationFormatted: data.population ? data.population.toLocaleString() : 'N/A',
      isCapital: data.is_capital === 1 || data.is_capital === true || data.isCapital === true,
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

export default new CityMapper();