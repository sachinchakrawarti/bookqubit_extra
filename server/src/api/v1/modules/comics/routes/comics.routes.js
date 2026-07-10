/**
 * Comics Routes
 * API routes for comics operations
 */

import express from 'express';
import comicsController from '../controllers/comics.controller.js';
import comicsValidation from '../validations/comics.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new comicsController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  comicsValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  comicsValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;