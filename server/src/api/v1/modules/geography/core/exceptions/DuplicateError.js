/**
 * Duplicate Error
 * Thrown when a duplicate entry is detected
 */

import { GeographyError } from './GeographyError.js';

export class DuplicateError extends GeographyError {
  /**
   * Create a DuplicateError
   * @param {string} entity - Entity name
   * @param {string} field - Field name that caused the duplication
   * @param {*} value - Duplicate value
   * @param {string} message - Custom error message (optional)
   */
  constructor(entity, field, value, message = null) {
    const defaultMessage = `${entity} with ${field} '${value}' already exists`;
    super(message || defaultMessage, 409, 'DUPLICATE_ERROR');
    this.name = 'DuplicateError';
    this.entity = entity;
    this.field = field;
    this.value = value;
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      ...super.toJSON(),
      entity: this.entity,
      field: this.field,
      value: this.value
    };
  }
}

export default DuplicateError;