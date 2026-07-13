/**
 * Error Constants
 * Defines error-related constants for the geography module
 */

// ==========================================
// Error Codes
// ==========================================

export const ERROR_CODES = {
  DUPLICATE_ERROR: 'DUPLICATE_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  DATABASE_ERROR: 'DATABASE_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  FOREIGN_KEY_ERROR: 'FOREIGN_KEY_ERROR',
  CONFLICT: 'CONFLICT'
};

// ==========================================
// Error Messages
// ==========================================

export const ERROR_MESSAGES = {
  [ERROR_CODES.DUPLICATE_ERROR]: 'Resource already exists',
  [ERROR_CODES.NOT_FOUND]: 'Resource not found',
  [ERROR_CODES.VALIDATION_ERROR]: 'Validation failed',
  [ERROR_CODES.UNAUTHORIZED]: 'Unauthorized access',
  [ERROR_CODES.FORBIDDEN]: 'Forbidden access',
  [ERROR_CODES.DATABASE_ERROR]: 'Database operation failed',
  [ERROR_CODES.BAD_REQUEST]: 'Bad request',
  [ERROR_CODES.INTERNAL_ERROR]: 'Internal server error',
  [ERROR_CODES.FOREIGN_KEY_ERROR]: 'Foreign key constraint violated',
  [ERROR_CODES.CONFLICT]: 'Resource conflict'
};

// ==========================================
// HTTP Status Codes
// ==========================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};

// ==========================================
// Export all
// ==========================================

export default {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS
};