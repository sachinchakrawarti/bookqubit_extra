/**
 * Exceptions Index
 * Export all custom exceptions
 */

export { GeographyError } from './GeographyError.js';
export { NotFoundError } from './NotFoundError.js';
export { ValidationError } from './ValidationError.js';
export { DuplicateError } from './DuplicateError.js';
export { UnauthorizedError } from './UnauthorizedError.js';
export { ForbiddenError } from './ForbiddenError.js';
export { DatabaseError } from './DatabaseError.js';

// Combined exceptions for backward compatibility
import { GeographyError } from './GeographyError.js';
import { NotFoundError } from './NotFoundError.js';
import { ValidationError } from './ValidationError.js';
import { DuplicateError } from './DuplicateError.js';
import { UnauthorizedError } from './UnauthorizedError.js';
import { ForbiddenError } from './ForbiddenError.js';
import { DatabaseError } from './DatabaseError.js';

export default {
  GeographyError,
  NotFoundError,
  ValidationError,
  DuplicateError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError
};