/**
 * City Admin Routes
 * Routes for admin city operations
 */

import { Router } from 'express';
import { CityAdminController } from '../../controllers/admin/index.js';
import { validateCityId, checkAdminAuth, logRequest } from '../../middleware/index.js';

const router = Router();

// Apply middleware
router.use(logRequest);
router.use(checkAdminAuth);

// GET routes
router.get('/', CityAdminController.getAll.bind(CityAdminController));
router.get('/deleted', CityAdminController.getDeleted.bind(CityAdminController));
router.get('/search', CityAdminController.search.bind(CityAdminController));
router.get('/state/:stateId', CityAdminController.getByState.bind(CityAdminController));
router.get('/capitals', CityAdminController.getCapitals.bind(CityAdminController));
router.get('/coordinates', CityAdminController.getWithCoordinates.bind(CityAdminController));
router.get('/nearby', CityAdminController.findNearby.bind(CityAdminController));
router.get('/:id', validateCityId, CityAdminController.getById.bind(CityAdminController));

// POST routes
router.post('/', CityAdminController.create.bind(CityAdminController));
router.post('/bulk', CityAdminController.bulkCreate.bind(CityAdminController));
router.post('/:id/restore', validateCityId, CityAdminController.restore.bind(CityAdminController));

// PUT routes
router.put('/:id', validateCityId, CityAdminController.update.bind(CityAdminController));

// DELETE routes
router.delete('/:id', validateCityId, CityAdminController.delete.bind(CityAdminController));
router.delete('/bulk', CityAdminController.bulkDelete.bind(CityAdminController));

export default router;