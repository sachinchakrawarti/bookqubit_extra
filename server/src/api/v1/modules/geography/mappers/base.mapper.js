/**
 * Base Mapper
 * Provides common mapping functionality for all mappers
 * Includes normalization for handling multiple data formats (camelCase/snake_case)
 */

class BaseMapper {
  /**
   * Normalize data - converts snake_case to camelCase for internal use
   * Override in child classes with specific field mappings
   * @param {Object} data - Data to normalize
   * @param {Object} fieldMap - Field mapping from snake_case to camelCase
   * @returns {Object} Normalized data
   */
  normalize(data, fieldMap = {}) {
    if (!data || typeof data !== 'object') return data;
    
    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => this.normalize(item, fieldMap));
    }
    
    const normalized = { ...data };
    
    // Convert snake_case to camelCase
    for (const [snakeKey, camelKey] of Object.entries(fieldMap)) {
      if (normalized[snakeKey] !== undefined) {
        normalized[camelKey] = normalized[snakeKey];
        // Keep snake_case for backward compatibility
        // Don't delete snakeKey to maintain both formats
      }
    }
    
    return normalized;
  }

  /**
   * Convert snake_case keys to camelCase for entire object (deep)
   * @param {Object} obj - Object to convert
   * @returns {Object} Object with camelCase keys
   */
  snakeToCamel(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.snakeToCamel(item));
    }
    
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = this.snakeToCamel(value);
    }
    return result;
  }

  /**
   * Convert camelCase keys to snake_case for entire object (deep)
   * @param {Object} obj - Object to convert
   * @returns {Object} Object with snake_case keys
   */
  camelToSnake(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.camelToSnake(item));
    }
    
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      result[snakeKey] = this.camelToSnake(value);
    }
    return result;
  }

  /**
   * Normalize input - handles both camelCase and snake_case
   * @param {Object} data - Input data
   * @param {Array} requiredFields - Array of required field names (in camelCase)
   * @param {Object} fieldMap - Field mapping from snake_case to camelCase
   * @returns {Object} Normalized data
   */
  normalizeInput(data, requiredFields = [], fieldMap = {}) {
    if (!data) return data;
    
    // First normalize using fieldMap
    let normalized = this.normalize(data, fieldMap);
    
    // Convert any remaining snake_case to camelCase
    normalized = this.snakeToCamel(normalized);
    
    // Check required fields (in camelCase)
    for (const field of requiredFields) {
      if (normalized[field] === undefined) {
        // Try to find it in original data (maybe it was in a different format)
        const snakeField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
        if (data[snakeField] !== undefined) {
          normalized[field] = data[snakeField];
        }
      }
    }
    
    return normalized;
  }

  /**
   * Get required fields for validation
   * Override in child classes
   * @returns {Array} Array of required field names (in camelCase)
   */
  getRequiredFields() {
    return [];
  }

  /**
   * Get field mappings from snake_case to camelCase
   * Override in child classes
   * @returns {Object} Field mappings
   */
  getFieldMappings() {
    return {};
  }

  /**
   * Validate data before mapping - handles both formats
   * @param {Object} data - Data to validate
   * @param {Object} options - Validation options
   * @returns {Object} Validated and normalized data
   */
  validate(data, options = {}) {
    // Get required fields and mappings from child class
    const requiredFields = this.getRequiredFields();
    const fieldMappings = this.getFieldMappings();
    
    // Normalize input
    const normalized = this.normalizeInput(data, requiredFields, fieldMappings);
    
    // Check required fields (override in child if needed)
    for (const field of requiredFields) {
      if (normalized[field] === undefined) {
        // Try snake_case version
        const snakeField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
        if (data[snakeField] !== undefined) {
          normalized[field] = data[snakeField];
        } else {
          throw new Error(`${field} is required`);
        }
      }
    }
    
    return normalized;
  }

  /**
   * Map a single entity to DTO
   * @param {Object} entity - The entity to map
   * @returns {Object} DTO
   */
  toDTO(entity) {
    throw new Error('toDTO method must be implemented by subclass');
  }

  /**
   * Map multiple entities to DTOs
   * @param {Array} entities - Array of entities
   * @returns {Array} Array of DTOs
   */
  toDTOs(entities) {
    if (!entities || !Array.isArray(entities)) {
      return [];
    }
    return entities.map(entity => this.toDTO(entity));
  }

  /**
   * Map DTO to entity
   * @param {Object} dto - The DTO to map
   * @returns {Object} Entity
   */
  toEntity(dto) {
    throw new Error('toEntity method must be implemented by subclass');
  }

  /**
   * Map DTOs to entities
   * @param {Array} dtos - Array of DTOs
   * @returns {Array} Array of entities
   */
  toEntities(dtos) {
    if (!dtos || !Array.isArray(dtos)) {
      return [];
    }
    return dtos.map(dto => this.toEntity(dto));
  }

  /**
   * Map DTO to model (for database operations)
   * @param {Object} dto - The DTO to map
   * @returns {Object} Model data
   */
  toModel(dto) {
    return this.toEntity(dto);
  }

  /**
   * Map entity to response (API response)
   * @param {Object} entity - The entity to map
   * @returns {Object} API response
   */
  toResponse(entity) {
    return this.toDTO(entity);
  }

  /**
   * Map multiple entities to responses
   * @param {Array} entities - Array of entities
   * @returns {Array} Array of API responses
   */
  toResponses(entities) {
    return this.toDTOs(entities);
  }

  /**
   * Map entity to summary (for list views)
   * @param {Object} entity - The entity to map
   * @returns {Object} Summary
   */
  toSummary(entity) {
    return this.toDTO(entity);
  }

  /**
   * Map multiple entities to summaries
   * @param {Array} entities - Array of entities
   * @returns {Array} Array of summaries
   */
  toSummaries(entities) {
    if (!entities || !Array.isArray(entities)) {
      return [];
    }
    return entities.map(entity => this.toSummary(entity));
  }

  /**
   * Sanitize data (remove sensitive or unnecessary fields)
   * @param {Object} data - Data to sanitize
   * @returns {Object} Sanitized data
   */
  sanitize(data) {
    if (!data) return null;
    const sanitized = { ...data };
    // Remove common sensitive fields
    delete sanitized._id;
    delete sanitized.__v;
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.secret;
    return sanitized;
  }

  /**
   * Transform entity before mapping
   * @param {Object} entity - Entity to transform
   * @returns {Object} Transformed entity
   */
  transform(entity) {
    return entity;
  }

  /**
   * Map field names from one format to another
   * @param {Object} data - Data with original field names
   * @param {Object} mappings - Field name mappings
   * @returns {Object} Data with mapped field names
   */
  mapFields(data, mappings = {}) {
    if (!data) return null;
    const result = {};
    const allMappings = { ...this.getFieldMappings(), ...mappings };
    
    for (const [from, to] of Object.entries(allMappings)) {
      if (data[from] !== undefined) {
        result[to] = data[from];
      }
    }
    
    // Copy unmapped fields
    for (const [key, value] of Object.entries(data)) {
      if (!allMappings[key]) {
        result[key] = value;
      }
    }
    
    return result;
  }

  /**
   * Convert DTO to database format (snake_case)
   * @param {Object} dto - DTO with camelCase fields
   * @returns {Object} Database model with snake_case fields
   */
  toDatabase(dto) {
    if (!dto) return null;
    return this.camelToSnake(dto);
  }

  /**
   * Convert database model to DTO (camelCase)
   * @param {Object} model - Database model with snake_case fields
   * @returns {Object} DTO with camelCase fields
   */
  fromDatabase(model) {
    if (!model) return null;
    return this.snakeToCamel(model);
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

  /**
   * Check if data has a specific field (handles both formats)
   * @param {Object} data - Data to check
   * @param {string} field - Field name in camelCase
   * @returns {boolean} True if field exists
   */
  hasField(data, field) {
    if (!data) return false;
    
    // Check camelCase
    if (data[field] !== undefined) return true;
    
    // Check snake_case
    const snakeField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (data[snakeField] !== undefined) return true;
    
    return false;
  }

  /**
   * Get field value from data (handles both formats)
   * @param {Object} data - Data to get from
   * @param {string} field - Field name in camelCase
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Field value
   */
  getField(data, field, defaultValue = undefined) {
    if (!data) return defaultValue;
    
    // Check camelCase
    if (data[field] !== undefined) return data[field];
    
    // Check snake_case
    const snakeField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (data[snakeField] !== undefined) return data[snakeField];
    
    return defaultValue;
  }
}

export default BaseMapper;