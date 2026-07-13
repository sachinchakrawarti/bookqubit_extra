/**
 * Routes Index
 * Main entry point for all routes
 */

import { Router } from 'express';
import adminRoutes from './admin/index.js';
import analyticsRoutes from './analytics/index.js';
import publicRoutes from './public/index.js';

// Create combined router
const router = Router();

// Mount route collections
router.use('/admin', adminRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/', publicRoutes);

// Export individual route collections
export {
  adminRoutes,
  analyticsRoutes,
  publicRoutes
};

// Export the combined router as default
export default router;

// Also export as named exports for compatibility
export const routes = router;
export const geographyRoutes = router;
export const admin = adminRoutes;
export const analytics = analyticsRoutes;
// Use a different name instead of 'public'
export const publicRoutesExport = publicRoutes;