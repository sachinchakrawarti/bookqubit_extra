/**
 * Forbidden Error
 * Thrown when access is forbidden
 */

import { GeographyError } from './GeographyError.js';

export class ForbiddenError extends GeographyError {
  /**
   * Create a ForbiddenError
   * @param {string} message - Error message
   * @param {string} code - Error code (default: 'FORBIDDEN')
   */
  constructor(message = 'Forbidden access', code = 'FORBIDDEN') {
    super(message, 403, code);
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;