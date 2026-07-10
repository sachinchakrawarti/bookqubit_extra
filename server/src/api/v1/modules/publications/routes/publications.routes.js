/**
 * Publications Routes
 * API routes for publications operations
 */

import express from 'express';
import publicationsController from '../controllers/publications.controller.js';
import publicationsValidation from '../validations/publications.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new publicationsController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  publicationsValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  publicationsValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;