/**
 * Country Admin Routes
 * Routes for admin country operations
 */

import { Router } from 'express';
import { CountryAdminController } from '../../controllers/admin/index.js';
import { 
  validateCountryId, 
  validateCountryCode, 
  checkAdminAuth, 
  logRequest 
} from '../../middleware/index.js';

const router = Router();

// Apply middleware to all routes
router.use(logRequest);
router.use(checkAdminAuth);

// GET routes
router.get('/', CountryAdminController.getAll.bind(CountryAdminController));
router.get('/deleted', CountryAdminController.getDeleted.bind(CountryAdminController));
router.get('/search', CountryAdminController.search.bind(CountryAdminController));
router.get('/stats/counts', CountryAdminController.getWithStateCounts.bind(CountryAdminController));
router.get('/:id', validateCountryId, CountryAdminController.getById.bind(CountryAdminController));
router.get('/code/:code', validateCountryCode, CountryAdminController.getByCode.bind(CountryAdminController));

// POST routes
router.post('/', CountryAdminController.create.bind(CountryAdminController));
router.post('/bulk', CountryAdminController.bulkCreate.bind(CountryAdminController));
router.post('/:id/restore', validateCountryId, CountryAdminController.restore.bind(CountryAdminController));

// PUT routes
router.put('/:id', validateCountryId, CountryAdminController.update.bind(CountryAdminController));

// DELETE routes
router.delete('/:id', validateCountryId, CountryAdminController.delete.bind(CountryAdminController));
router.delete('/bulk', CountryAdminController.bulkDelete.bind(CountryAdminController));

export default router;