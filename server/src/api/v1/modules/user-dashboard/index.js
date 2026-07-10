/**
 * User-Dashboard Module
 * @module modules/user-dashboard
 */

import user-DashboardController from './controllers/user-dashboard.controller.js';
import user-DashboardService from './services/user-dashboard.service.js';
import user-DashboardRepository from './repositories/user-dashboard.repository.js';
import user-DashboardRoutes from './routes/user-dashboard.routes.js';

export {
  user-DashboardController,
  user-DashboardService,
  user-DashboardRepository,
  user-DashboardRoutes,
};

export default {
  controller: user-DashboardController,
  service: user-DashboardService,
  repository: user-DashboardRepository,
  routes: user-DashboardRoutes,
};