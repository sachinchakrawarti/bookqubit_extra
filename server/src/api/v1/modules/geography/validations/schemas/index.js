/**
 * Schemas Index
 * Export all schema files
 */

// Export all schemas
export * from './country.schema.js';
export * from './state.schema.js';
export * from './city.schema.js';
export * from './continent.schema.js';
export * from './filter.schema.js';
export * from './bulk.schema.js';

// Default export with all schemas
import countrySchemas from './country.schema.js';
import stateSchemas from './state.schema.js';
import citySchemas from './city.schema.js';
import continentSchemas from './continent.schema.js';
import bulkSchemas from './bulk.schema.js';

export default {
  ...countrySchemas,
  ...stateSchemas,
  ...citySchemas,
  ...continentSchemas,
  ...bulkSchemas
};