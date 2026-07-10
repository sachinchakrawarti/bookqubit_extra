/**
 * Publications Module
 * @module modules/publications
 */

import publicationsController from './controllers/publications.controller.js';
import publicationsService from './services/publications.service.js';
import publicationsRepository from './repositories/publications.repository.js';
import publicationsRoutes from './routes/publications.routes.js';

export {
  publicationsController,
  publicationsService,
  publicationsRepository,
  publicationsRoutes,
};

export default {
  controller: publicationsController,
  service: publicationsService,
  repository: publicationsRepository,
  routes: publicationsRoutes,
};