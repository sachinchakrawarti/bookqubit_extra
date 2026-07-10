/**
 * Languages Module
 * @module modules/languages
 */

import languagesController from './controllers/languages.controller.js';
import languagesService from './services/languages.service.js';
import languagesRepository from './repositories/languages.repository.js';
import languagesRoutes from './routes/languages.routes.js';

export {
  languagesController,
  languagesService,
  languagesRepository,
  languagesRoutes,
};

export default {
  controller: languagesController,
  service: languagesService,
  repository: languagesRepository,
  routes: languagesRoutes,
};