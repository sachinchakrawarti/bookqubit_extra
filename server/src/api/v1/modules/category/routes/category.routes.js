/**
 * Category Routes
 * API routes for category operations
 */

import express from 'express';
import categoryController from '../controllers/category.controller.js';
import categoryValidation from '../validations/category.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new categoryController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  categoryValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  categoryValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;