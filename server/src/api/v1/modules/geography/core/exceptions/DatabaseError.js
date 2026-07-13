/**
 * Database Error
 * Thrown when database operations fail
 */

import { GeographyError } from './GeographyError.js';

export class DatabaseError extends GeographyError {
  /**
   * Create a DatabaseError
   * @param {string} message - Error message
   * @param {Error} originalError - Original database error
   * @param {string} operation - Database operation (e.g., 'find', 'create')
   * @param {string} entity - Entity name
   */
  constructor(message, originalError = null, operation = null, entity = null) {
    super(message, 500, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
    this.originalError = originalError;
    this.operation = operation;
    this.entity = entity;
  }

  /**
   * Get original error
   * @returns {Error|null} Original error
   */
  getOriginalError() {
    return this.originalError;
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      ...super.toJSON(),
      operation: this.operation,
      entity: this.entity
    };
  }
}

export default DatabaseError;