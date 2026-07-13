/**
 * Geography Module Configuration
 * Centralized configuration for the geography module
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Geography module configuration
 */
const geographyConfig = {
  // ==========================================
  // Module Information
  // ==========================================
  module: {
    name: 'geography',
    version: '1.0.0',
    description: 'Geography management module for countries, states, cities, and continents'
  },

  // ==========================================
  // Database Configuration
  // ==========================================
  database: {
    // Table names
    tables: {
      continents: 'continents',
      countries: 'countries',
      states: 'states',
      cities: 'cities',
      regions: 'regions',
      subregions: 'subregions',
      timezones: 'timezones',
      currencies: 'currencies',
      countryCodes: 'country_codes'
    },
    
    // Default pagination
    pagination: {
      defaultLimit: 10,
      maxLimit: 100,
      defaultPage: 1
    },
    
    // Soft delete
    softDelete: {
      enabled: true,
      column: 'deleted_at'
    },
    
    // Timestamps
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  },

  // ==========================================
  // API Configuration
  // ==========================================
  api: {
    // Base routes
    routes: {
      public: '/geography',
      admin: '/admin/geography',
      analytics: '/geography/analytics'
    },
    
    // Response fields to include/exclude
    response: {
      excludeFields: ['deleted_at'],
      dateFormat: 'ISO'
    },
    
    // Pagination defaults for API
    pagination: {
      defaultLimit: 10,
      maxLimit: 100,
      defaultPage: 1
    }
  },

  // ==========================================
  // Validation Configuration
  // ==========================================
  validation: {
    // Country validation rules
    country: {
      codeLength: 2,
      codePattern: /^[A-Z]{2}$/,
      nameMaxLength: 100,
      capitalMaxLength: 100,
      phoneCodePattern: /^\+\d{1,4}$/,
      currencyCodeLength: 3,
      currencyCodePattern: /^[A-Z]{3}$/,
      tldPattern: /^\.[a-z]{2,}$/,
      populationMin: 0,
      areaMin: 0
    },
    
    // State validation rules
    state: {
      codeLength: 2,
      codePattern: /^[A-Z]{2,3}$/,
      nameMaxLength: 100,
      capitalMaxLength: 100
    },
    
    // City validation rules
    city: {
      nameMaxLength: 100,
      populationMin: 0,
      latitudeMin: -90,
      latitudeMax: 90,
      longitudeMin: -180,
      longitudeMax: 180,
      postalCodeMaxLength: 20
    },
    
    // Continent validation rules
    continent: {
      codeLength: 2,
      codePattern: /^[A-Z]{2}$/,
      nameMaxLength: 50
    }
  },

  // ==========================================
  // Cache Configuration
  // ==========================================
  cache: {
    enabled: true,
    ttl: {
      countries: 3600,      // 1 hour
      states: 3600,         // 1 hour
      cities: 3600,         // 1 hour
      continents: 7200,     // 2 hours
      analytics: 1800,      // 30 minutes
      search: 600           // 10 minutes
    },
    keys: {
      prefix: 'geography:',
      countries: 'countries',
      states: 'states',
      cities: 'cities',
      continents: 'continents',
      analytics: 'analytics'
    }
  },

  // ==========================================
  // Logging Configuration
  // ==========================================
  logging: {
    enabled: true,
    level: process.env.LOG_LEVEL || 'info',
    // Log levels: error, warn, info, debug, trace
    categories: {
      database: true,
      api: true,
      cache: true,
      validation: true,
      analytics: true
    }
  },

  // ==========================================
  // Analytics Configuration
  // ==========================================
  analytics: {
    enabled: true,
    defaultLimit: 10,
    maxLimit: 100,
    // Aggregation periods: daily, weekly, monthly, yearly
    defaultPeriod: 'monthly',
    periods: ['daily', 'weekly', 'monthly', 'yearly']
  },

  // ==========================================
  // Export Configuration
  // ==========================================
  export: {
    maxRows: 10000,
    formats: ['csv', 'excel', 'pdf'],
    defaultFormat: 'csv',
    csv: {
      delimiter: ',',
      encoding: 'utf-8'
    },
    excel: {
      sheetName: 'Geography Data'
    }
  },

  // ==========================================
  // Security Configuration
  // ==========================================
  security: {
    rateLimit: {
      public: {
        windowMs: 60000,      // 1 minute
        max: 100              // 100 requests per minute
      },
      admin: {
        windowMs: 60000,      // 1 minute
        max: 50               // 50 requests per minute
      },
      analytics: {
        windowMs: 60000,      // 1 minute
        max: 60               // 60 requests per minute
      }
    },
    // Allowed fields for sorting
    allowedSortFields: [
      'id', 'code', 'name', 'population', 
      'area_km2', 'created_at', 'updated_at'
    ],
    // Allowed filter fields
    allowedFilterFields: [
      'isActive', 'continentId', 'countryId', 
      'stateId', 'isCapital'
    ]
  },

  // ==========================================
  // Entity Relationships
  // ==========================================
  relationships: {
    country: {
      belongsTo: ['continent', 'region', 'subregion'],
      hasMany: ['states', 'countryCodes']
    },
    state: {
      belongsTo: ['country'],
      hasMany: ['cities']
    },
    city: {
      belongsTo: ['state', 'timezone']
    }
  },

  // ==========================================
  // Default Values
  // ==========================================
  defaults: {
    country: {
      isActive: true
    },
    state: {
      isActive: true
    },
    city: {
      isActive: true,
      isCapital: false
    },
    sorting: {
      field: 'name',
      order: 'ASC'
    }
  },

  // ==========================================
  // Paths
  // ==========================================
  paths: {
    root: path.resolve(__dirname, '..'),
    models: path.resolve(__dirname, '../models/sequelize'),
    repositories: path.resolve(__dirname, '../repositories'),
    services: path.resolve(__dirname, '../services'),
    controllers: path.resolve(__dirname, '../controllers'),
    routes: path.resolve(__dirname, '../routes'),
    validations: path.resolve(__dirname, '../validations'),
    queries: path.resolve(__dirname, '../queries'),
    dto: path.resolve(__dirname, '../dto'),
    entities: path.resolve(__dirname, '../entities'),
    mappers: path.resolve(__dirname, '../mappers'),
    middleware: path.resolve(__dirname, '../middleware'),
    transformers: path.resolve(__dirname, '../transformers'),
    constants: path.resolve(__dirname, '../constants'),
    types: path.resolve(__dirname, '../types'),
    db: path.resolve(__dirname, '../db')
  }
};

// ==========================================
// Helper Functions
// ==========================================

/**
 * Get configuration for a specific module part
 * @param {string} section - Configuration section (e.g., 'database', 'api')
 * @returns {Object} Configuration object
 */
export const getConfig = (section) => {
  if (section && geographyConfig[section]) {
    return geographyConfig[section];
  }
  return geographyConfig;
};

/**
 * Get pagination defaults
 * @param {Object} options - Pagination options
 * @returns {Object} Merged pagination options
 */
export const getPagination = (options = {}) => {
  const defaults = geographyConfig.database.pagination;
  return {
    limit: options.limit || defaults.defaultLimit,
    page: options.page || defaults.defaultPage,
    offset: (options.page || defaults.defaultPage - 1) * (options.limit || defaults.defaultLimit)
  };
};

/**
 * Check if a field is allowed for sorting
 * @param {string} field - Field name
 * @returns {boolean} True if allowed
 */
export const isAllowedSortField = (field) => {
  return geographyConfig.security.allowedSortFields.includes(field);
};

/**
 * Get validation rules for an entity
 * @param {string} entity - Entity name (country, state, city, continent)
 * @returns {Object} Validation rules
 */
export const getValidationRules = (entity) => {
  return geographyConfig.validation[entity] || null;
};

/**
 * Get cache TTL for an entity
 * @param {string} entity - Entity name
 * @returns {number} TTL in seconds
 */
export const getCacheTTL = (entity) => {
  return geographyConfig.cache.ttl[entity] || 3600;
};

/**
 * Get rate limit configuration
 * @param {string} type - API type (public, admin, analytics)
 * @returns {Object} Rate limit configuration
 */
export const getRateLimit = (type) => {
  return geographyConfig.security.rateLimit[type] || geographyConfig.security.rateLimit.public;
};

// ==========================================
// Export
// ==========================================

export default geographyConfig;

// Named exports for common configurations
export const {
  database,
  api,
  validation,
  cache,
  logging,
  analytics,
  export: exportConfig,
  security,
  relationships,
  defaults,
  paths
} = geographyConfig;