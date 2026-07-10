/**
 * Category Module
 * @module modules/category
 */

import categoryController from './controllers/category.controller.js';
import categoryService from './services/category.service.js';
import categoryRepository from './repositories/category.repository.js';
import categoryRoutes from './routes/category.routes.js';

export {
  categoryController,
  categoryService,
  categoryRepository,
  categoryRoutes,
};

export default {
  controller: categoryController,
  service: categoryService,
  repository: categoryRepository,
  routes: categoryRoutes,
};