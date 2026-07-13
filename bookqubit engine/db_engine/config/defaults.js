/**
 * Default Configuration Values
 */

module.exports = {
  // Build defaults
  build: {
    overwrite: false,
    validate: true,
    seedAfterBuild: false
  },
  
  // Backup defaults
  backup: {
    maxRetention: 30, // days
    compression: true,
    format: 'sqlite'
  },
  
  // Seed defaults
  seed: {
    batchSize: 1000,
    truncateBeforeSeed: false
  },
  
  // Logging defaults
  logging: {
    level: 'info',
    format: 'json',
    maxSize: '100m',
    maxFiles: 5
  },
  
  // Validation defaults
  validation: {
    strict: true,
    checkForeignKeys: true,
    checkConstraints: true
  }
};