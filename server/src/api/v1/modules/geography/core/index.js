/**
 * Core Index
 * Main entry point for all core functionality
 * Exports exceptions, base classes, and utilities
 */

// ==========================================
// Exceptions
// ==========================================

export {
  GeographyError,
  NotFoundError,
  ValidationError,
  DuplicateError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError
} from './exceptions/index.js';

// ==========================================
// Base Classes
// ==========================================

export {
  BaseController,
  BaseRepository,
  BaseService
} from './base/index.js';

// ==========================================
// Default Export
// ==========================================

import * as exceptions from './exceptions/index.js';
import * as base from './base/index.js';

export default {
  ...exceptions,
  ...base
};