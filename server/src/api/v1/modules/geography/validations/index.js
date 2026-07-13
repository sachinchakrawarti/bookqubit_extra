/**
 * Validations Index
 * Main entry point for all validations
 */

// Export schemas
export * from './schemas/index.js';

// Export helpers
export * from './helpers.js';

// Export rules
export * from './rules.js';

// Export main validation
export * from './geography.validation.js';

// Export admin validations
export * from './geography.admin.validation.js';

// Export analytics validations
export * from './geography.analytics.validation.js';

// Default export - all validations
import schemas from './schemas/index.js';
import helpers from './helpers.js';
import rules from './rules.js';
import adminValidations from './geography.admin.validation.js';
import analyticsValidations from './geography.analytics.validation.js';

export default {
  ...schemas,
  ...helpers,
  ...rules,
  ...adminValidations,
  ...analyticsValidations
};