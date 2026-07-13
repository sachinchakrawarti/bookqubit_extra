/**
 * Admin Routes Index
 * Combines all admin routes
 */

import { Router } from 'express';
import countryRoutes from './country.admin.routes.js';
import stateRoutes from './state.admin.routes.js';
import cityRoutes from './city.admin.routes.js';

const router = Router();

// Mount admin routes
router.use('/countries', countryRoutes);
router.use('/states', stateRoutes);
router.use('/cities', cityRoutes);

export default router;