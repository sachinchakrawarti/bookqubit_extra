/**
 * Trends-Dashboard Module
 * @module modules/trends-dashboard
 */

import trends-DashboardController from './controllers/trends-dashboard.controller.js';
import trends-DashboardService from './services/trends-dashboard.service.js';
import trends-DashboardRepository from './repositories/trends-dashboard.repository.js';
import trends-DashboardRoutes from './routes/trends-dashboard.routes.js';

export {
  trends-DashboardController,
  trends-DashboardService,
  trends-DashboardRepository,
  trends-DashboardRoutes,
};

export default {
  controller: trends-DashboardController,
  service: trends-DashboardService,
  repository: trends-DashboardRepository,
  routes: trends-DashboardRoutes,
};