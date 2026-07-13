/**
 * State Admin Routes
 * Routes for admin state operations
 */

import { Router } from 'express';
import { StateAdminController } from '../../controllers/admin/index.js';
import { validateStateId, checkAdminAuth, logRequest } from '../../middleware/index.js';

const router = Router();

// Apply middleware
router.use(logRequest);
router.use(checkAdminAuth);

// GET routes
router.get('/', StateAdminController.getAll.bind(StateAdminController));
router.get('/deleted', StateAdminController.getDeleted.bind(StateAdminController));
router.get('/search', StateAdminController.search.bind(StateAdminController));
router.get('/country/:countryId', StateAdminController.getByCountry.bind(StateAdminController));
router.get('/stats/city-counts', StateAdminController.getWithCityCounts.bind(StateAdminController));
router.get('/:id', validateStateId, StateAdminController.getById.bind(StateAdminController));

// POST routes
router.post('/', StateAdminController.create.bind(StateAdminController));
router.post('/bulk', StateAdminController.bulkCreate.bind(StateAdminController));
router.post('/:id/restore', validateStateId, StateAdminController.restore.bind(StateAdminController));

// PUT routes
router.put('/:id', validateStateId, StateAdminController.update.bind(StateAdminController));

// DELETE routes
router.delete('/:id', validateStateId, StateAdminController.delete.bind(StateAdminController));
router.delete('/bulk', StateAdminController.bulkDelete.bind(StateAdminController));

export default router;