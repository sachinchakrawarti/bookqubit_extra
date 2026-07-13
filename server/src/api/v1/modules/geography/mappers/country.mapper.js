/**
 * Country Mapper
 * Maps between Country entity, DTO, Model, and API Response
 * Supports both camelCase and snake_case input formats
 */

import BaseMapper from './base.mapper.js';

class CountryMapper extends BaseMapper {
  /**
   * Get required fields for validation
   * @returns {Array} Required field names (in camelCase)
   */
  getRequiredFields() {
    return ['code', 'name', 'continentId'];
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
      capital: 'capital',
      continent_id: 'continentId',
      continent: 'continent',
      region_id: 'regionId',
      region: 'region',
      subregion_id: 'subregionId',
      subregion: 'subregion',
      population: 'population',
      area_km2: 'areaKm2',
      currency_code: 'currencyCode',
      phone_code: 'phoneCode',
      tld: 'tld',
      is_active: 'isActive',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      deleted_at: 'deletedAt'
    };
  }

  /**
   * Normalize country data - handles both camelCase and snake_case
   * @param {Object} data - Raw input data
   * @returns {Object} Normalized data with camelCase
   */
  normalize(data) {
    if (!data) return data;
    
    const normalized = super.normalize(data, this.getFieldMappings());
    
    if (!normalized.continentId && data.continent_id !== undefined) {
      normalized.continentId = data.continent_id;
    }
    if (!normalized.continentId && data.continentId !== undefined) {
      normalized.continentId = data.continentId;
    }
    
    return normalized;
  }

  /**
   * Validate country data - FOR CREATE (all fields required)
   * @param {Object} data - Country data
   * @returns {Object} Validated data
   */
  validate(data) {
    if (!data) {
      throw new Error('Country data is required');
    }

    const normalized = this.normalize(data);
    
    // Code is required for create
    const code = normalized.code || data.code;
    if (!code) {
      throw new Error('Country code is required');
    }

    const upperCode = code.toUpperCase();
    if (!/^[A-Z]{2}$/.test(upperCode)) {
      throw new Error('Country code must be 2 uppercase letters');
    }
    normalized.code = upperCode;

    // Name is required for create
    if (!normalized.name) {
      throw new Error('Country name is required');
    }

    if (normalized.name.length < 2 || normalized.name.length > 100) {
      throw new Error('Country name must be between 2 and 100 characters');
    }

    // Continent ID is required for create
    const continentId = normalized.continentId || data.continent_id || data.continentId;
    if (!continentId) {
      throw new Error('Continent ID is required');
    }
    normalized.continentId = continentId;

    return normalized;
  }

  /**
   * ✅ NEW: Validate country data - FOR UPDATE (all fields optional)
   * @param {Object} data - Country update data
   * @returns {Object} Validated data
   */
  validateUpdate(data) {
    if (!data) {
      throw new Error('Update data is required');
    }

    const normalized = this.normalize(data);
    
    // Code is optional for update
    if (normalized.code) {
      const upperCode = normalized.code.toUpperCase();
      if (!/^[A-Z]{2}$/.test(upperCode)) {
        throw new Error('Country code must be 2 uppercase letters');
      }
      normalized.code = upperCode;
    }

    // Name is optional for update
    if (normalized.name) {
      if (normalized.name.length < 2 || normalized.name.length > 100) {
        throw new Error('Country name must be between 2 and 100 characters');
      }
    }

    // Continent ID is optional for update
    if (normalized.continentId) {
      // Just validate it's a number
      if (isNaN(parseInt(normalized.continentId))) {
        throw new Error('Continent ID must be a number');
      }
    }

    // Population is optional for update
    if (normalized.population !== undefined && normalized.population !== null) {
      const population = parseInt(normalized.population);
      if (isNaN(population) || population < 0) {
        throw new Error('Population must be a positive number');
      }
    }

    // Area is optional for update
    if (normalized.areaKm2 !== undefined && normalized.areaKm2 !== null) {
      const area = parseFloat(normalized.areaKm2);
      if (isNaN(area) || area < 0) {
        throw new Error('Area must be a positive number');
      }
    }

    return normalized;
  }

  /**
   * Map Country model to DTO
   */
  toDTO(model) {
    if (!model) return null;

    return {
      id: model.id,
      code: model.code,
      name: model.name,
      nativeName: model.native_name,
      capital: model.capital,
      continentId: model.continent_id,
      continent: model.continent ? {
        id: model.continent.id,
        code: model.continent.code,
        name: model.continent.name
      } : null,
      regionId: model.region_id,
      region: model.region ? {
        id: model.region.id,
        name: model.region.name
      } : null,
      subregionId: model.subregion_id,
      subregion: model.subregion ? {
        id: model.subregion.id,
        name: model.subregion.name
      } : null,
      population: model.population,
      areaKm2: model.area_km2,
      currencyCode: model.currency_code,
      phoneCode: model.phone_code,
      tld: model.tld,
      isActive: model.is_active === 1 || model.is_active === true,
      createdAt: model.created_at,
      updatedAt: model.updated_at
    };
  }

  /**
   * Map Country DTO to Entity
   */
  toEntity(dto) {
    if (!dto) return null;

    // Use validate for create, validateUpdate for update
    // Check if this is a full entity or partial update
    const hasId = dto.id !== undefined && dto.id !== null;
    const validated = hasId ? this.validateUpdate(dto) : this.validate(dto);

    return {
      id: validated.id,
      code: validated.code,
      name: validated.name,
      nativeName: validated.nativeName,
      capital: validated.capital,
      continentId: validated.continentId,
      regionId: validated.regionId,
      subregionId: validated.subregionId,
      population: validated.population,
      areaKm2: validated.areaKm2,
      currencyCode: validated.currencyCode,
      phoneCode: validated.phoneCode,
      tld: validated.tld,
      isActive: validated.isActive !== undefined ? validated.isActive : true
    };
  }

  /**
   * Map DTO to Model (for database)
   */
  toModel(dto) {
    const entity = this.toEntity(dto);
    if (!entity) return null;

    return {
      code: entity.code,
      name: entity.name,
      native_name: entity.nativeName,
      capital: entity.capital,
      continent_id: entity.continentId,
      region_id: entity.regionId,
      subregion_id: entity.subregionId,
      population: entity.population,
      area_km2: entity.areaKm2,
      currency_code: entity.currencyCode,
      phone_code: entity.phoneCode,
      tld: entity.tld,
      is_active: entity.isActive ? 1 : 0
    };
  }

  /**
   * Map entity to API Response
   */
  toResponse(entity) {
    if (!entity) return null;

    const data = entity.toJSON ? entity.toJSON() : entity;

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      capital: data.capital,
      continent: data.continent ? {
        id: data.continent.id,
        code: data.continent.code,
        name: data.continent.name
      } : null,
      region: data.region ? {
        id: data.region.id,
        name: data.region.name
      } : null,
      subregion: data.subregion ? {
        id: data.subregion.id,
        name: data.subregion.name
      } : null,
      population: data.population,
      populationFormatted: data.population ? data.population.toLocaleString() : 'N/A',
      areaKm2: data.area_km2 || data.areaKm2,
      areaFormatted: data.area_km2 || data.areaKm2 ? 
        `${(data.area_km2 || data.areaKm2).toLocaleString()} km²` : 'N/A',
      populationDensity: data.population && (data.area_km2 || data.areaKm2) ? 
        Math.round(data.population / (data.area_km2 || data.areaKm2)) : null,
      currencyCode: data.currency_code || data.currencyCode,
      phoneCode: data.phone_code || data.phoneCode,
      tld: data.tld,
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true,
      createdAt: data.created_at || data.createdAt,
      updatedAt: data.updated_at || data.updatedAt
    };
  }

  /**
   * Map to summary (for list views)
   */
  toSummary(entity) {
    if (!entity) return null;

    const data = entity.toJSON ? entity.toJSON() : entity;

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      nativeName: data.native_name || data.nativeName,
      capital: data.capital,
      continentName: data.continent ? data.continent.name : null,
      population: data.population,
      populationFormatted: data.population ? data.population.toLocaleString() : 'N/A',
      isActive: data.is_active === 1 || data.is_active === true || data.isActive === true
    };
  }

  /**
   * Convert DTO to database format
   */
  toDatabase(dto) {
    return this.toModel(dto);
  }

  /**
   * Convert database model to DTO
   */
  fromDatabase(model) {
    return this.toDTO(model);
  }

  /**
   * Convert multiple database models to DTOs
   */
  fromDatabaseMany(models) {
    if (!models || !Array.isArray(models)) {
      return [];
    }
    return models.map(model => this.fromDatabase(model));
  }

  /**
   * Convert multiple DTOs to database models
   */
  toDatabaseMany(dtos) {
    if (!dtos || !Array.isArray(dtos)) {
      return [];
    }
    return dtos.map(dto => this.toDatabase(dto));
  }
}

export default new CountryMapper();