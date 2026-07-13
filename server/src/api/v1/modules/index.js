/**
 * Geography Module Index
 * Main entry point for the geography module
 * Exports all components with proper organization
 */

// ==========================================
// Module Information
// ==========================================

export const MODULE = {
  name: 'geography',
  version: '1.0.0',
  description: 'Geography management module for countries, states, cities, and continents',
  author: 'BookQbit Team',
  license: 'ISC'
};

// ==========================================
// Config
// ==========================================

import config from './config/geography.config.js';
export { config };

// ==========================================
// Constants
// ==========================================

export * from './constants/index.js';

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

// Import routes
import routes from './routes/index.js';
import adminRoutes from './routes/admin/index.js';
import publicRoutes from './routes/public/index.js';
import analyticsRoutes from './routes/analytics/index.js';

// Export routes
export { routes };
export { default as geographyRoutes } from './routes/index.js';
export { adminRoutes, publicRoutes, analyticsRoutes };

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
// Utils (if any)
// ==========================================

// export * from './utils/index.js';

// ==========================================
// Package.json
// ==========================================

export { default as packageJson } from './package.json' with { type: 'json' };

// ==========================================
// Module Health Check
// ==========================================

/**
 * Get module health status
 * @param {Object} options - Health check options
 * @returns {Promise<Object>} Health status
 */
export const getModuleHealth = async (options = {}) => {
  try {
    const { sequelize } = await import('./db/sequelize.js');
    await sequelize.authenticate();
    
    return {
      module: MODULE.name,
      version: MODULE.version,
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
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
// Module Initialization
// ==========================================

/**
 * Initialize the geography module
 * @param {Object} app - Express app instance
 * @param {Object} options - Module options
 * @returns {Object} Module instance
 */
export const initModule = (app, options = {}) => {
  const {
    prefix = '/api/v1/geography',
    adminPrefix = '/api/v1/admin/geography',
    analyticsPrefix = '/api/v1/geography/analytics'
  } = options;

  // Import routes dynamically
  import('./routes/index.js').then(({ default: routes }) => {
    app.use(prefix, routes);
  });

  console.log(`✅ Geography module initialized`);
  console.log(`   📍 Public API: ${prefix}`);
  console.log(`   🔐 Admin API: ${adminPrefix}`);
  console.log(`   📊 Analytics API: ${analyticsPrefix}`);

  return {
    name: MODULE.name,
    version: MODULE.version,
    description: MODULE.description,
    routes: {
      public: prefix,
      admin: adminPrefix,
      analytics: analyticsPrefix
    }
  };
};

// ==========================================
// Module Dependencies
// ==========================================

/**
 * Get module dependencies
 * @returns {Array} List of dependencies
 */
export const getDependencies = () => {
  return [
    'express',
    'sequelize',
    'joi',
    'winston',
    'lodash'
  ];
};

// ==========================================
// Module Routes Registration
// ==========================================

/**
 * Register all module routes
 * @param {Object} app - Express app instance
 * @param {Object} options - Route options
 */
export const registerRoutes = (app, options = {}) => {
  const {
    publicPath = '/api/v1/geography',
    adminPath = '/api/v1/admin/geography',
    analyticsPath = '/api/v1/geography/analytics'
  } = options;

  import('./routes/index.js').then(({ default: routes }) => {
    app.use(publicPath, routes);
  });

  console.log(`✅ Routes registered for ${MODULE.name}`);
};

// ==========================================
// Module Shutdown
// ==========================================

/**
 * Shutdown the geography module
 * @returns {Promise<void>}
 */
export const shutdownModule = async () => {
  try {
    const { sequelize } = await import('./db/sequelize.js');
    await sequelize.close();
    console.log(`✅ ${MODULE.name} module shut down successfully`);
  } catch (error) {
    console.error(`❌ Error shutting down ${MODULE.name} module:`, error.message);
    throw error;
  }
};

// ==========================================
// Default Export
// ==========================================

// Import all the things we need for default export
import * as core from './core/index.js';
import * as models from './models/index.js';
import * as repositories from './repositories/index.js';
import * as services from './services/index.js';
import * as controllers from './controllers/index.js';
import * as middleware from './middleware/index.js';
import * as validations from './validations/index.js';
import * as dto from './dto/index.js';
import * as entities from './entities/index.js';
import * as mappers from './mappers/index.js';
import * as transformers from './transformers/index.js';
import * as queries from './queries/index.js';
import * as constants from './constants/index.js';
import * as types from './types/geography.types.js';

export default {
  // Module info
  MODULE,
  
  // Configuration
  config,
  
  // Core
  ...core,
  
  // Models
  ...models,
  
  // Repositories
  ...repositories,
  
  // Services
  ...services,
  
  // Controllers
  ...controllers,
  
  // Routes
  routes,
  geographyRoutes: routes,
  adminRoutes,
  publicRoutes,
  analyticsRoutes,
  
  // Middleware
  ...middleware,
  
  // Validations
  ...validations,
  
  // DTOs
  ...dto,
  
  // Entities
  ...entities,
  
  // Mappers
  ...mappers,
  
  // Transformers
  ...transformers,
  
  // Queries
  ...queries,
  
  // Constants
  ...constants,
  
  // Types
  ...types,
  
  // Functions
  getModuleHealth,
  initModule,
  registerRoutes,
  shutdownModule,
  getDependencies,
  
  // Package
  packageJson
};