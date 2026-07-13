/**
 * Repositories Index
 * Main entry point for all repositories
 * Exports all repositories with proper organization
 */

// ==========================================
// Admin Repositories
// ==========================================

export {
  CountryAdminRepository,
  StateAdminRepository,
  CityAdminRepository,
  adminRepositories
} from './admin/index.js';

// ==========================================
// Public Repositories
// ==========================================

export {
  CountryRepository,
  StateRepository,
  CityRepository,
  publicRepositories
} from './public/index.js';

// ==========================================
// Analytics Repositories
// ==========================================

export { AnalyticsRepository, analyticsRepositories } from './analytics/index.js';

// ==========================================
// Default Export - All Repositories
// ==========================================

import admin from './admin/index.js';
import publicRepo from './public/index.js';
import analytics from './analytics/index.js';

export default {
  admin,
  public: publicRepo,
  analytics,
  
  // Backward compatibility
  adminRepositories: admin.adminRepositories || admin,
  publicRepositories: publicRepo.publicRepositories || publicRepo,
  analyticsRepositories: analytics.analyticsRepositories || analytics,
  
  // Individual repository exports
  CountryAdminRepository: admin.CountryAdminRepository,
  StateAdminRepository: admin.StateAdminRepository,
  CityAdminRepository: admin.CityAdminRepository,
  CountryRepository: publicRepo.CountryRepository,
  StateRepository: publicRepo.StateRepository,
  CityRepository: publicRepo.CityRepository,
  AnalyticsRepository: analytics.AnalyticsRepository
};