/**
 * Authors Module
 * @module modules/authors
 */

import authorsController from './controllers/authors.controller.js';
import authorsService from './services/authors.service.js';
import authorsRepository from './repositories/authors.repository.js';
import authorsRoutes from './routes/authors.routes.js';

export {
  authorsController,
  authorsService,
  authorsRepository,
  authorsRoutes,
};

export default {
  controller: authorsController,
  service: authorsService,
  repository: authorsRepository,
  routes: authorsRoutes,
};