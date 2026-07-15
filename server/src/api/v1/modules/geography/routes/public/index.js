/**
 * Public Routes
 * Routes for public API access
 */

import { Router } from 'express';
import { CountryController, StateController, CityController } from '../../controllers/public/index.js';
import { logRequest, validateCountryId, validateStateId, validateCityId, validateCountryCode } from '../../middleware/index.js';

const router = Router();

// Apply log request middleware to all routes
router.use(logRequest);

// ==========================================
// Country Routes
// ==========================================

router.get('/countries', CountryController.getAll.bind(CountryController));
router.get('/countries/search', CountryController.search.bind(CountryController));
router.get('/countries/:id', validateCountryId, CountryController.getById.bind(CountryController));
router.get('/countries/code/:code', validateCountryCode, CountryController.getByCode.bind(CountryController));
router.get('/countries/:id/states', validateCountryId, CountryController.getWithStates.bind(CountryController));
router.get('/countries/:id/statistics', validateCountryId, CountryController.getStatistics.bind(CountryController));

// ==========================================
// State Routes
// ==========================================

router.get('/states', StateController.getAll.bind(StateController));
router.get('/states/search', StateController.search.bind(StateController));
router.get('/states/:id', validateStateId, StateController.getById.bind(StateController));
router.get('/states/country/:countryId', validateCountryId, StateController.getByCountry.bind(StateController));
router.get('/states/:id/statistics', validateStateId, StateController.getStatistics.bind(StateController));

// ==========================================
// City Routes
// ==========================================

router.get('/cities', CityController.getAll.bind(CityController));
router.get('/cities/search', CityController.search.bind(CityController));
router.get('/cities/:id', validateCityId, CityController.getById.bind(CityController));
router.get('/cities/state/:stateId', validateStateId, CityController.getByState.bind(CityController));
router.get('/cities/capitals', CityController.getCapitals.bind(CityController));
router.get('/cities/nearby', CityController.findNearby.bind(CityController));
router.get('/cities/:id/statistics', validateCityId, CityController.getStatistics.bind(CityController));

export default router;