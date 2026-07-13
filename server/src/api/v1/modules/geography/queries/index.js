/**
 * Queries Index
 * Main entry point for all query builders
 */

// Export builders
export * from './builders/index.js';

// Export filters
export * from './filters/index.js';

// Export entity queries
export { CountryQueries } from './country.queries.js';
export { StateQueries } from './state.queries.js';
export { CityQueries } from './city.queries.js';
export { AnalyticsQueries } from './analytics.queries.js';

// Combined exports for backward compatibility
import { CountryQueries } from './country.queries.js';
import { StateQueries } from './state.queries.js';
import { CityQueries } from './city.queries.js';
import { AnalyticsQueries } from './analytics.queries.js';

export default {
  CountryQueries,
  StateQueries,
  CityQueries,
  AnalyticsQueries
};