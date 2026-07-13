/**
 * Base Engine Error
 */

class EngineError extends Error {
  constructor(message, code = 'ENGINE_ERROR', metadata = {}) {
    super(message);
    this.name = 'EngineError';
    this.code = code;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
    
    // Maintains proper stack trace
    Error.captureStackTrace(this, EngineError);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      timestamp: this.timestamp,
      metadata: this.metadata,
      stack: this.stack
    };
  }
}

module.exports = EngineError;