/**
 * Comics Module
 * @module modules/comics
 */

import comicsController from './controllers/comics.controller.js';
import comicsService from './services/comics.service.js';
import comicsRepository from './repositories/comics.repository.js';
import comicsRoutes from './routes/comics.routes.js';

export {
  comicsController,
  comicsService,
  comicsRepository,
  comicsRoutes,
};

export default {
  controller: comicsController,
  service: comicsService,
  repository: comicsRepository,
  routes: comicsRoutes,
};