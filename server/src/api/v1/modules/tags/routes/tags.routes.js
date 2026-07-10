/**
 * Tags Routes
 * API routes for tags operations
 */

import express from 'express';
import tagsController from '../controllers/tags.controller.js';
import tagsValidation from '../validations/tags.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new tagsController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  tagsValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  tagsValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;