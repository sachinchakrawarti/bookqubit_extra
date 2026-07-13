/**
 * Unauthorized Error
 * Thrown when authentication fails
 */

import { GeographyError } from './GeographyError.js';

export class UnauthorizedError extends GeographyError {
  /**
   * Create an UnauthorizedError
   * @param {string} message - Error message
   * @param {string} code - Error code (default: 'UNAUTHORIZED')
   */
  constructor(message = 'Unauthorized access', code = 'UNAUTHORIZED') {
    super(message, 401, code);
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;