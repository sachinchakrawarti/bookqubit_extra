/**
 * Geography Main Mapper
 * Combines all mappers and provides unified mapping interface
 * Supports both camelCase and snake_case for all entity types
 */

import BaseMapper from './base.mapper.js';
import CountryMapper from './country.mapper.js';
import StateMapper from './state.mapper.js';
import CityMapper from './city.mapper.js';

class GeographyMapper extends BaseMapper {
  constructor() {
    super();
    this.country = CountryMapper;
    this.state = StateMapper;
    this.city = CityMapper;
    this.mappers = {
      country: this.country,
      state: this.state,
      city: this.city
    };
    this.entityTypes = ['country', 'state', 'city'];
  }

  /**
   * Get mapper for specific entity type
   * @param {string} type - Entity type (country, state, city)
   * @returns {BaseMapper} Mapper instance
   */
  getMapper(type) {
    const mapper = this.mappers[type];
    if (!mapper) {
      throw new Error(`Unknown entity type: ${type}. Available types: ${this.entityTypes.join(', ')}`);
    }
    return mapper;
  }

  /**
   * Check if entity type is valid
   * @param {string} type - Entity type to check
   * @returns {boolean} True if valid
   */
  isValidType(type) {
    return this.entityTypes.includes(type);
  }

  /**
   * Get all available entity types
   * @returns {Array} Array of entity type names
   */
  getEntityTypes() {
    return [...this.entityTypes];
  }

  /**
   * Normalize data for any entity type
   * @param {Object} data - Data to normalize
   * @param {string} type - Entity type
   * @returns {Object} Normalized data
   */
  normalize(data, type = 'country') {
    return this.getMapper(type).normalize(data);
  }

  /**
   * Map any geography entity to DTO
   * @param {Object} entity - Entity to map
   * @param {string} type - Entity type
   * @returns {Object} DTO
   */
  toDTO(entity, type = 'country') {
    return this.getMapper(type).toDTO(entity);
  }

  /**
   * Map any geography DTO to entity
   * @param {Object} dto - DTO to map
   * @param {string} type - Entity type
   * @returns {Object} Entity
   */
  toEntity(dto, type = 'country') {
    return this.getMapper(type).toEntity(dto);
  }

  /**
   * Map any geography DTO to model
   * @param {Object} dto - DTO to map
   * @param {string} type - Entity type
   * @returns {Object} Model data
   */
  toModel(dto, type = 'country') {
    return this.getMapper(type).toModel(dto);
  }

  /**
   * Map any geography entity to response
   * @param {Object} entity - Entity to map
   * @param {string} type - Entity type
   * @returns {Object} API response
   */
  toResponse(entity, type = 'country') {
    return this.getMapper(type).toResponse(entity);
  }

  /**
   * Map any geography entity to summary
   * @param {Object} entity - Entity to map
   * @param {string} type - Entity type
   * @returns {Object} Summary
   */
  toSummary(entity, type = 'country') {
    return this.getMapper(type).toSummary(entity);
  }

  /**
   * Validate data based on type
   * @param {Object} data - Data to validate
   * @param {string} type - Entity type
   * @returns {Object} Validated data
   */
  validate(data, type = 'country') {
    return this.getMapper(type).validate(data);
  }

  /**
   * Validate update data for any entity type
   * @param {Object} data - Update data
   * @param {string} type - Entity type
   * @returns {Object} Validated update data
   */
  validateUpdate(data, type = 'country') {
    const mapper = this.getMapper(type);
    // Check if mapper has validateUpdate method
    if (typeof mapper.validateUpdate === 'function') {
      return mapper.validateUpdate(data);
    }
    // Fallback to regular validate for mappers without update validation
    return mapper.validate(data);
  }

  /**
   * Map multiple entities to responses
   * @param {Array} entities - Array of entities
   * @param {string} type - Entity type
   * @returns {Array} Array of responses
   */
  toResponses(entities, type = 'country') {
    return this.getMapper(type).toResponses(entities);
  }

  /**
   * Map multiple entities to summaries
   * @param {Array} entities - Array of entities
   * @param {string} type - Entity type
   * @returns {Array} Array of summaries
   */
  toSummaries(entities, type = 'country') {
    return this.getMapper(type).toSummaries(entities);
  }

  /**
   * Convert DTO to database format for any entity type
   * @param {Object} dto - DTO with camelCase
   * @param {string} type - Entity type
   * @returns {Object} Database model with snake_case
   */
  toDatabase(dto, type = 'country') {
    return this.getMapper(type).toDatabase(dto);
  }

  /**
   * Convert database model to DTO for any entity type
   * @param {Object} model - Database model with snake_case
   * @param {string} type - Entity type
   * @returns {Object} DTO with camelCase
   */
  fromDatabase(model, type = 'country') {
    return this.getMapper(type).fromDatabase(model);
  }

  /**
   * Convert multiple database models to DTOs
   * @param {Array} models - Array of database models
   * @param {string} type - Entity type
   * @returns {Array} Array of DTOs
   */
  fromDatabaseMany(models, type = 'country') {
    return this.getMapper(type).fromDatabaseMany(models);
  }

  /**
   * Convert multiple DTOs to database models
   * @param {Array} dtos - Array of DTOs
   * @param {string} type - Entity type
   * @returns {Array} Array of database models
   */
  toDatabaseMany(dtos, type = 'country') {
    return this.getMapper(type).toDatabaseMany(dtos);
  }

  /**
   * Sanitize data for any entity type
   * @param {Object} data - Data to sanitize
   * @param {string} type - Entity type
   * @returns {Object} Sanitized data
   */
  sanitize(data, type = 'country') {
    return this.getMapper(type).sanitize(data);
  }

  /**
   * Transform entity for any type
   * @param {Object} entity - Entity to transform
   * @param {string} type - Entity type
   * @returns {Object} Transformed entity
   */
  transform(entity, type = 'country') {
    return this.getMapper(type).transform(entity);
  }

  /**
   * Get field mappings for specific entity type
   * @param {string} type - Entity type
   * @returns {Object} Field mappings
   */
  getFieldMappings(type = 'country') {
    return this.getMapper(type).getFieldMappings();
  }

  /**
   * Get required fields for specific entity type
   * @param {string} type - Entity type
   * @returns {Array} Required field names
   */
  getRequiredFields(type = 'country') {
    const mapper = this.getMapper(type);
    if (typeof mapper.getRequiredFields === 'function') {
      return mapper.getRequiredFields();
    }
    return [];
  }

  /**
   * Batch process multiple entities of different types
   * @param {Array} items - Array of {data, type} objects
   * @param {string} operation - Operation to perform (validate, toDTO, toModel, toResponse, toSummary)
   * @returns {Array} Processed results
   */
  batchProcess(items, operation = 'validate') {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items.map(({ data, type = 'country' }) => {
      const mapper = this.getMapper(type);
      if (typeof mapper[operation] === 'function') {
        return mapper[operation](data);
      }
      throw new Error(`Operation '${operation}' not supported by mapper for type '${type}'`);
    });
  }

  /**
   * Create entity with validation
   * @param {Object} data - Entity data
   * @param {string} type - Entity type
   * @returns {Object} Validated entity ready for creation
   */
  createEntity(data, type = 'country') {
    const validated = this.validate(data, type);
    return this.toModel(validated, type);
  }

  /**
   * Update entity with validation
   * @param {Object} data - Update data
   * @param {string} type - Entity type
   * @returns {Object} Validated update data ready for update
   */
  updateEntity(data, type = 'country') {
    const validated = this.validateUpdate(data, type);
    return this.toModel(validated, type);
  }

  /**
   * Prepare entity for response
   * @param {Object} entity - Entity data
   * @param {string} type - Entity type
   * @param {Object} options - Response options
   * @returns {Object} Formatted response
   */
  prepareResponse(entity, type = 'country', options = {}) {
    const response = this.toResponse(entity, type);
    
    // Add metadata if requested
    if (options.includeMetadata) {
      response._metadata = {
        type,
        mappedAt: new Date().toISOString(),
        version: '1.0.0'
      };
    }
    
    // Add summary if requested
    if (options.includeSummary) {
      response._summary = this.toSummary(entity, type);
    }
    
    return response;
  }
}

export default new GeographyMapper();