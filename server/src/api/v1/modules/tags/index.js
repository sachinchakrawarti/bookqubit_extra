/**
 * Tags Module
 * @module modules/tags
 */

import tagsController from './controllers/tags.controller.js';
import tagsService from './services/tags.service.js';
import tagsRepository from './repositories/tags.repository.js';
import tagsRoutes from './routes/tags.routes.js';

export {
  tagsController,
  tagsService,
  tagsRepository,
  tagsRoutes,
};

export default {
  controller: tagsController,
  service: tagsService,
  repository: tagsRepository,
  routes: tagsRoutes,
};