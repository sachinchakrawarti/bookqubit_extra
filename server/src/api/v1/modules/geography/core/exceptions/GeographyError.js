/**
 * Geography Error
 * Base error class for all geography module errors
 */

export class GeographyError extends Error {
  /**
   * Create a GeographyError
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {string} code - Error code (default: 'GEOGRAPHY_ERROR')
   * @param {*} details - Additional error details
   */
  constructor(message, statusCode = 500, code = 'GEOGRAPHY_ERROR', details = null) {
    super(message);
    this.name = 'GeographyError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeographyError);
    }
  }

  /**
   * Convert to JSON for API response
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      success: false,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      details: this.details
    };
  }

  /**
   * Get status code for HTTP response
   * @returns {number} HTTP status code
   */
  getStatusCode() {
    return this.statusCode;
  }

  /**
   * Get error code
   * @returns {string} Error code
   */
  getCode() {
    return this.code;
  }

  /**
   * Get error message
   * @returns {string} Error message
   */
  getMessage() {
    return this.message;
  }
}

export default GeographyError;