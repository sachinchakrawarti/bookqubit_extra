/**
 * Auth Module
 * @module modules/auth
 */

import authController from './controllers/auth.controller.js';
import authService from './services/auth.service.js';
import authRepository from './repositories/auth.repository.js';
import authRoutes from './routes/auth.routes.js';

export {
  authController,
  authService,
  authRepository,
  authRoutes,
};

export default {
  controller: authController,
  service: authService,
  repository: authRepository,
  routes: authRoutes,
};