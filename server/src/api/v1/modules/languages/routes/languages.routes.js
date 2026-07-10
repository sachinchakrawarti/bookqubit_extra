/**
 * Languages Routes
 * API routes for languages operations
 */

import express from 'express';
import languagesController from '../controllers/languages.controller.js';
import languagesValidation from '../validations/languages.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new languagesController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  languagesValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  languagesValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;