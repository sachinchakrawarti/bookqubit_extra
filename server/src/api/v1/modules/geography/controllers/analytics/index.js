/**
 * Analytics Controllers Index
 * Exports all analytics controllers
 */

import CountryAnalyticsController, {
  getCountryAnalytics,
  getCountryGrowthTrends,
  getCountryComparison,
  generateCountryReport
} from './country.analytics.controller.js';

import DashboardAnalyticsController, {
  getOverview,
  getQuickStats,
  getRecentActivity
} from './dashboard.analytics.controller.js';

// Export individual controllers
export {
  CountryAnalyticsController,
  DashboardAnalyticsController,
  // Named exports for methods
  getCountryAnalytics,
  getCountryGrowthTrends,
  getCountryComparison,
  generateCountryReport,
  getOverview,
  getQuickStats,
  getRecentActivity
};

// Export as a combined object
export const analyticsControllers = {
  country: CountryAnalyticsController,
  dashboard: DashboardAnalyticsController
};

// Default export
export default {
  CountryAnalyticsController,
  DashboardAnalyticsController,
  analyticsControllers
};