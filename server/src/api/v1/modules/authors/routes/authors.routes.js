/**
 * Authors Routes
 * API routes for authors operations
 */

import express from 'express';
import authorsController from '../controllers/authors.controller.js';
import authorsValidation from '../validations/authors.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new authorsController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  authorsValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  authorsValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;