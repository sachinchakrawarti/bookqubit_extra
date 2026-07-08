// src/api/v1/modules/languages/routes/languages.routes.js
import express from 'express';
import languagesController from '../controllers/languages.controller.js';

const router = express.Router();

// Get all languages
router.get('/', languagesController.getAll);

// Get active languages
router.get('/active', languagesController.getActive);

// Get RTL languages
router.get('/rtl', languagesController.getRTL);

// Get LTR languages
router.get('/ltr', languagesController.getLTR);

// Get default language
router.get('/default', languagesController.getDefault);

// Get language statistics
router.get('/statistics', languagesController.getStatistics);

// Get dropdown languages
router.get('/dropdown', languagesController.getDropdown);

// Search languages
router.get('/search/:query', languagesController.search);

// Get language by ISO code
router.get('/iso/:iso', languagesController.getByISO);

// Get language by ID
router.get('/id/:id', languagesController.getById);

// Get language by code
router.get('/:code', languagesController.getByCode);

export default router;