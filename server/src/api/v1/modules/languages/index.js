// src/api/v1/modules/languages/index.js

import routes from './routes/languages.routes.js';
import controller from './controllers/languages.controller.js';
import service from './services/languages.service.js';
import repository from './repositories/languages.repository.js';

export {
  routes,
  controller,
  service,
  repository,
};

export default routes;