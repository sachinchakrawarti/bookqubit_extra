/**
 * Controllers Index
 * Main entry point for all controllers
 */

// ==========================================
// Admin Controllers
// ==========================================

export {
  CountryAdminController,
  StateAdminController,
  CityAdminController,
  adminControllers
} from './admin/index.js';

// ==========================================
// Public Controllers
// ==========================================

export {
  CountryPublicController,
  StatePublicController,
  CityPublicController,
  CountryController,
  StateController,
  CityController,
  publicControllers
} from './public/index.js';

// ==========================================
// Analytics Controllers
// ==========================================

export {
  CountryAnalyticsController,
  DashboardAnalyticsController,
  analyticsControllers
} from './analytics/index.js';

// ==========================================
// Response Helpers
// ==========================================

export { sendSuccess, sendError, sendPaginated } from './response.js';

// ==========================================
// Default Export
// ==========================================

import admin from './admin/index.js';
import publicControllers from './public/index.js';
import analytics from './analytics/index.js';

export default {
  admin,
  public: publicControllers,
  analytics,
  
  // Backward compatibility
  adminControllers: admin.adminControllers || admin,
  publicControllers: publicControllers.publicControllers || publicControllers,
  analyticsControllers: analytics.analyticsControllers || analytics,
  
  // Individual controller exports
  CountryAdminController: admin.CountryAdminController,
  StateAdminController: admin.StateAdminController,
  CityAdminController: admin.CityAdminController,
  
  CountryPublicController: publicControllers.CountryPublicController,
  StatePublicController: publicControllers.StatePublicController,
  CityPublicController: publicControllers.CityPublicController,
  
  CountryController: publicControllers.CountryController,
  StateController: publicControllers.StateController,
  CityController: publicControllers.CityController,
  
  CountryAnalyticsController: analytics.CountryAnalyticsController,
  DashboardAnalyticsController: analytics.DashboardAnalyticsController
};