/**
 * Geography Module Index
 * Main entry point for the geography module
 */

// ==========================================
// Module Info
// ==========================================

export const MODULE = {
  name: 'geography',
  version: '1.0.0',
  description: 'Geography management module',
  author: 'BookQbit Team'
};

// ==========================================
// Config
// ==========================================

export { default as config } from './config/geography.config.js';

// ==========================================
// Core
// ==========================================

export * from './core/index.js';

// ==========================================
// Database
// ==========================================

export { default as sequelize } from './db/sequelize.js';

// ==========================================
// Models
// ==========================================

export * from './models/index.js';

// ==========================================
// Repositories
// ==========================================

export * from './repositories/index.js';

// ==========================================
// Services
// ==========================================

export * from './services/index.js';

// ==========================================
// Controllers
// ==========================================

export * from './controllers/index.js';

// ==========================================
// Routes
// ==========================================

export { default as routes } from './routes/index.js';
export { default as geographyRoutes } from './routes/index.js';
export { adminRoutes, publicRoutes, analyticsRoutes } from './routes/index.js';

// ==========================================
// Middleware
// ==========================================

export * from './middleware/index.js';

// ==========================================
// Validations
// ==========================================

export * from './validations/index.js';

// ==========================================
// DTOs
// ==========================================

export * from './dto/index.js';

// ==========================================
// Entities
// ==========================================

export * from './entities/index.js';

// ==========================================
// Mappers
// ==========================================

export * from './mappers/index.js';

// ==========================================
// Transformers
// ==========================================

export * from './transformers/index.js';

// ==========================================
// Queries
// ==========================================

export * from './queries/index.js';

// ==========================================
// Types
// ==========================================

export * from './types/geography.types.js';

// ==========================================
// Constants
// ==========================================

export * from './constants/index.js';

// ==========================================
// Package.json
// ==========================================

export { default as packageJson } from './package.json' with { type: 'json' };

// ==========================================
// Health Check
// ==========================================

export const getModuleHealth = async (options = {}) => {
  try {
    const { sequelize } = await import('./db/sequelize.js');
    await sequelize.authenticate();
    return {
      module: MODULE.name,
      version: MODULE.version,
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      module: MODULE.name,
      version: MODULE.version,
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// ==========================================
// Init Module
// ==========================================

export const initModule = (app, options = {}) => {
  const { prefix = '/api/v1/geography' } = options;
  import('./routes/index.js').then(({ default: routes }) => {
    app.use(prefix, routes);
  });
  console.log(`✅ Geography module initialized at ${prefix}`);
  return { name: MODULE.name, version: MODULE.version };
};

// ==========================================
// Shutdown
// ==========================================

export const shutdownModule = async () => {
  try {
    const { sequelize } = await import('./db/sequelize.js');
    await sequelize.close();
    console.log(`✅ ${MODULE.name} module shut down`);
  } catch (error) {
    console.error(`❌ Error shutting down:`, error.message);
  }
};

// ==========================================
// Default Export
// ==========================================

import routes from './routes/index.js';

export default {
  MODULE,
  routes,
  geographyRoutes: routes,
  initModule,
  shutdownModule,
  getModuleHealth
};