/**
 * Not Found Error
 * Thrown when a resource is not found
 */

import { GeographyError } from './GeographyError.js';

export class NotFoundError extends GeographyError {
  /**
   * Create a NotFoundError
   * @param {string} entity - Entity name (e.g., 'Country', 'State')
   * @param {*} identifier - Entity identifier (ID, code, etc.)
   * @param {string} message - Custom error message (optional)
   */
  constructor(entity, identifier, message = null) {
    const defaultMessage = `${entity} with identifier '${identifier}' not found`;
    super(message || defaultMessage, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
    this.entity = entity;
    this.identifier = identifier;
  }

  /**
   * Get entity name
   * @returns {string} Entity name
   */
  getEntity() {
    return this.entity;
  }

  /**
   * Get identifier
   * @returns {*} Identifier
   */
  getIdentifier() {
    return this.identifier;
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      ...super.toJSON(),
      entity: this.entity,
      identifier: this.identifier
    };
  }
}

export default NotFoundError;