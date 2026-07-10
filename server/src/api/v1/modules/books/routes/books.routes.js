/**
 * Books Routes
 * API routes for books operations
 */

import express from 'express';
import booksController from '../controllers/books.controller.js';
import booksValidation from '../validations/books.validation.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();
const controller = new booksController();

// Public routes
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

// Protected routes
router.post(
  '/',
  authMiddleware,
  booksValidation.create,
  controller.create.bind(controller)
);

router.put(
  '/:id',
  authMiddleware,
  booksValidation.update,
  controller.update.bind(controller)
);

router.delete(
  '/:id',
  authMiddleware,
  controller.delete.bind(controller)
);

export default router;