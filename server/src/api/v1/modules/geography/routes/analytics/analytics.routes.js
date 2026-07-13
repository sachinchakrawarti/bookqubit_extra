/**
 * Analytics Routes
 * Routes for analytics API access
 */

import { Router } from 'express';
import {
  getCountryAnalytics,
  getCountryGrowthTrends,
  getCountryComparison,
  generateCountryReport
} from '../../controllers/analytics/country.analytics.controller.js';

import {
  getOverview,
  getQuickStats,
  getRecentActivity
} from '../../controllers/analytics/dashboard.analytics.controller.js';

import { logRequest, validatePagination } from '../../middleware/index.js';

const router = Router();

// Apply only log request middleware (skip authentication for testing)
router.use(logRequest);
// router.use(checkAnalyticsAuth); // Commented out for testing

// ==========================================
// Dashboard Analytics
// ==========================================

router.get('/dashboard/overview', validatePagination, getOverview);
router.get('/dashboard/stats', getQuickStats);
router.get('/dashboard/activity', validatePagination, getRecentActivity);

// ==========================================
// Country Analytics
// ==========================================

router.get('/countries/:id', getCountryAnalytics);
router.get('/countries/:id/trends', getCountryGrowthTrends);
router.get('/countries/:id/report', generateCountryReport);
router.post('/countries/compare', getCountryComparison);

export default router;