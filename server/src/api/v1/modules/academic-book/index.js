/**
 * Academic-Book Module
 * @module modules/academic-book
 */

import academic-BookController from './controllers/academic-book.controller.js';
import academic-BookService from './services/academic-book.service.js';
import academic-BookRepository from './repositories/academic-book.repository.js';
import academic-BookRoutes from './routes/academic-book.routes.js';

export {
  academic-BookController,
  academic-BookService,
  academic-BookRepository,
  academic-BookRoutes,
};

export default {
  controller: academic-BookController,
  service: academic-BookService,
  repository: academic-BookRepository,
  routes: academic-BookRoutes,
};