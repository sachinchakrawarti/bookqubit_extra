/**
 * Schema Error
 */

const EngineError = require('./EngineError');

class SchemaError extends EngineError {
  constructor(message, metadata = {}) {
    super(message, 'SCHEMA_ERROR', metadata);
    this.name = 'SchemaError';
  }
}

module.exports = SchemaError;