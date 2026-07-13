/**
 * Analytics Services Index
 * Exports all analytics services
 */

import CountryAnalyticsService from './country.analytics.service.js';
import StateAnalyticsService from './state.analytics.service.js';
import CityAnalyticsService from './city.analytics.service.js';
import DashboardAnalyticsService from './dashboard.analytics.service.js';
import ReportAnalyticsService from './report.analytics.service.js';

// Export individual services
export {
  CountryAnalyticsService,
  StateAnalyticsService,
  CityAnalyticsService,
  DashboardAnalyticsService,
  ReportAnalyticsService
};

// Export as a combined object
export const analyticsServices = {
  country: CountryAnalyticsService,
  state: StateAnalyticsService,
  city: CityAnalyticsService,
  dashboard: DashboardAnalyticsService,
  report: ReportAnalyticsService
};

// Default export
export default {
  CountryAnalyticsService,
  StateAnalyticsService,
  CityAnalyticsService,
  DashboardAnalyticsService,
  ReportAnalyticsService,
  analyticsServices
};