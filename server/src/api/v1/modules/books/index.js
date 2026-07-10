/**
 * Books Module
 * @module modules/books
 */

import booksController from './controllers/books.controller.js';
import booksService from './services/books.service.js';
import booksRepository from './repositories/books.repository.js';
import booksRoutes from './routes/books.routes.js';

export {
  booksController,
  booksService,
  booksRepository,
  booksRoutes,
};

export default {
  controller: booksController,
  service: booksService,
  repository: booksRepository,
  routes: booksRoutes,
};