/**
 * Analytics Repository Index
 * Exports analytics repository
 */

import AnalyticsRepository from './analytics.repository.js';

// Export individual repository
export {
  AnalyticsRepository
};

// Export as a combined object
export const analyticsRepositories = {
  analytics: AnalyticsRepository
};

// Default export
export default {
  AnalyticsRepository,
  analyticsRepositories
};