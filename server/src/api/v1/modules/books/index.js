// src/api/v1/modules/books/index.js

import booksRoutes from './routes/books.routes.js';
import BooksController from './controller/books.controller.js';
import BooksService from './services/books.service.js';
import bookRepository from './repository/books.repository.js';

// Create instances
const booksController = new BooksController();
const booksService = new BooksService();

// Export all components
export {
  booksRoutes,
  booksController,
  booksService,
  bookRepository
};

// Default export for convenience (most commonly used)
export default booksRoutes;