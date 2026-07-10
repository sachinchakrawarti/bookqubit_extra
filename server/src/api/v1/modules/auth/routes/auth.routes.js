/**
 * Auth Routes
 * API routes for auth operations
 */

import express from 'express';
import authController from '../controllers/auth.controller.js';
import authValidation from '../validations/auth.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new authController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  authValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  authValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;