/**
 * User-Dashboard Routes
 * API routes for user-dashboard operations
 */

import express from 'express';
import user-DashboardController from '../controllers/user-dashboard.controller.js';
import user-DashboardValidation from '../validations/user-dashboard.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new user-DashboardController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  user-DashboardValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  user-DashboardValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;