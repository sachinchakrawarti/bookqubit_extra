/**
 * Database Error
 */

const EngineError = require('./EngineError');

class DatabaseError extends EngineError {
  constructor(message, metadata = {}) {
    super(message, 'DATABASE_ERROR', metadata);
    this.name = 'DatabaseError';
  }
}

module.exports = DatabaseError;