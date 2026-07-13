/**
 * Constants Index
 * Main entry point for all constants
 */

// Export all constants
export * from './geography.constants.js';
export * from './admin.constants.js';
export * from './error.constants.js';
export * from './permission.constants.js';

// Default export
import geographyConstants from './geography.constants.js';
import adminConstants from './admin.constants.js';
import errorConstants from './error.constants.js';
import permissionConstants from './permission.constants.js';

export default {
  ...geographyConstants,
  ...adminConstants,
  ...errorConstants,
  ...permissionConstants
};