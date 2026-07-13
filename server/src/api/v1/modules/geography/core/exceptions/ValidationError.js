/**
 * Validation Error
 * Thrown when validation fails
 */

import { GeographyError } from './GeographyError.js';

export class ValidationError extends GeographyError {
  /**
   * Create a ValidationError
   * @param {string} message - Error message
   * @param {Array} errors - Array of validation errors
   * @param {string} code - Error code (default: 'VALIDATION_ERROR')
   */
  constructor(message, errors = [], code = 'VALIDATION_ERROR') {
    super(message, 400, code);
    this.name = 'ValidationError';
    this.errors = Array.isArray(errors) ? errors : [errors];
  }

  /**
   * Add validation error
   * @param {string} field - Field name
   * @param {string} message - Error message
   * @param {*} value - Invalid value
   * @returns {ValidationError} This instance
   */
  addError(field, message, value = null) {
    this.errors.push({
      field,
      message,
      value
    });
    return this;
  }

  /**
   * Get all validation errors
   * @returns {Array} Validation errors
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Get errors for a specific field
   * @param {string} field - Field name
   * @returns {Array} Errors for the field
   */
  getFieldErrors(field) {
    return this.errors.filter(e => e.field === field);
  }

  /**
   * Check if there are errors
   * @returns {boolean} True if there are errors
   */
  hasErrors() {
    return this.errors.length > 0;
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors
    };
  }
}

export default ValidationError;