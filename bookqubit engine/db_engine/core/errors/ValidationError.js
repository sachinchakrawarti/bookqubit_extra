/**
 * Validation Error
 */

const EngineError = require('./EngineError');

class ValidationError extends EngineError {
  constructor(message, metadata = {}) {
    super(message, 'VALIDATION_ERROR', metadata);
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;