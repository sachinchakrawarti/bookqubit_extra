/**
 * Academic-Book Routes
 * API routes for academic-book operations
 */

import express from 'express';
import academic-BookController from '../controllers/academic-book.controller.js';
import academic-BookValidation from '../validations/academic-book.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new academic-BookController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  academic-BookValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  academic-BookValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;