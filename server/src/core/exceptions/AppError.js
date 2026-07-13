/**
 * AppError - Custom Error Class
 * Extends native Error with status code and metadata
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, metadata = {}) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      metadata: this.metadata,
      timestamp: this.timestamp,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
    };
  }
}

export default AppError;