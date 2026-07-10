/**
 * Trends-Dashboard Routes
 * API routes for trends-dashboard operations
 */

import express from 'express';
import trends-DashboardController from '../controllers/trends-dashboard.controller.js';
import trends-DashboardValidation from '../validations/trends-dashboard.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new trends-DashboardController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  trends-DashboardValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  trends-DashboardValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;