/**
 * Services Index
 * Main entry point for all services
 */

// ==========================================
// Admin Services
// ==========================================

export {
  CountryAdminService,
  StateAdminService,
  CityAdminService,
  StatsAdminService,
  adminServices
} from './admin/index.js';

// ==========================================
// Public Services
// ==========================================

export {
  CountryPublicService,
  StatePublicService,
  CityPublicService,
  publicServices
} from './public/index.js';

// ==========================================
// Analytics Services
// ==========================================

export {
  CountryAnalyticsService,
  StateAnalyticsService,
  CityAnalyticsService,
  DashboardAnalyticsService,
  ReportAnalyticsService,
  analyticsServices
} from './analytics/index.js';

// ==========================================
// Default Export
// ==========================================

import admin from './admin/index.js';
import publicServices from './public/index.js';
import analytics from './analytics/index.js';

export default {
  admin,
  public: publicServices,
  analytics,
  
  // Backward compatibility
  adminServices: admin.adminServices || admin,
  publicServices: publicServices.publicServices || publicServices,
  analyticsServices: analytics.analyticsServices || analytics,
  
  // Individual service exports
  CountryAdminService: admin.CountryAdminService,
  StateAdminService: admin.StateAdminService,
  CityAdminService: admin.CityAdminService,
  StatsAdminService: admin.StatsAdminService,
  
  CountryPublicService: publicServices.CountryPublicService,
  StatePublicService: publicServices.StatePublicService,
  CityPublicService: publicServices.CityPublicService,
  
  CountryAnalyticsService: analytics.CountryAnalyticsService,
  StateAnalyticsService: analytics.StateAnalyticsService,
  CityAnalyticsService: analytics.CityAnalyticsService,
  DashboardAnalyticsService: analytics.DashboardAnalyticsService,
  ReportAnalyticsService: analytics.ReportAnalyticsService
};