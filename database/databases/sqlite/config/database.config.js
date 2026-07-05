/**
 * Database Configuration
 * Centralized database configuration for BookQubit
 * Supports SQLite (development), PostgreSQL (production)
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// ENVIRONMENT VARIABLES
// ============================================
const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDevelopment = env === 'development';
const isTest = env === 'test';

// ============================================
// DATABASE CONFIGURATION
// ============================================
export const databaseConfig = {
    // Database type
    type: process.env.DB_TYPE || 'sqlite',
    
    // SQLite Configuration
    sqlite: {
        filename: process.env.DB_PATH || path.join(__dirname, '../bookqubit_database.db'),
        journal_mode: process.env.DB_JOURNAL_MODE || 'WAL',
        synchronous: process.env.DB_SYNCHRONOUS || 'NORMAL',
        cache_size: parseInt(process.env.DB_CACHE_SIZE) || 10000,
        temp_store: process.env.DB_TEMP_STORE || 'MEMORY',
    },

    // PostgreSQL Configuration (for production)
    postgres: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'bookqubit',
        user: process.env.DB_USER || 'bookqubit_user',
        password: process.env.DB_PASSWORD || '',
        ssl: isProduction ? {
            rejectUnauthorized: false,
            ca: process.env.DB_SSL_CA,
            cert: process.env.DB_SSL_CERT,
            key: process.env.DB_SSL_KEY,
        } : false,
        pool: {
            min: parseInt(process.env.DB_POOL_MIN) || 2,
            max: parseInt(process.env.DB_POOL_MAX) || 10,
            idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
            connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 5000,
        },
    },

    // MySQL Configuration (alternative)
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        database: process.env.DB_NAME || 'bookqubit',
        user: process.env.DB_USER || 'bookqubit_user',
        password: process.env.DB_PASSWORD || '',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        pool: {
            min: parseInt(process.env.DB_POOL_MIN) || 2,
            max: parseInt(process.env.DB_POOL_MAX) || 10,
        },
    },

    // ============================================
    // CONNECTION POOLING
    // ============================================
    pool: {
        min: parseInt(process.env.DB_POOL_MIN) || 2,
        max: parseInt(process.env.DB_POOL_MAX) || 10,
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
        acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
    },

    // ============================================
    // MIGRATION SETTINGS
    // ============================================
    migrations: {
        tableName: 'migrations',
        directory: path.join(__dirname, '../migrations'),
        extension: '.sql',
        runOnStartup: process.env.DB_RUN_MIGRATIONS === 'true',
    },

    // ============================================
    // SEED SETTINGS
    // ============================================
    seeds: {
        directory: path.join(__dirname, '../seeds'),
        runOnStartup: process.env.DB_RUN_SEEDS === 'true',
        environment: env,
    },

    // ============================================
    // BACKUP SETTINGS
    // ============================================
    backup: {
        directory: path.join(__dirname, '../backups'),
        retention: parseInt(process.env.DB_BACKUP_RETENTION) || 7,
        compress: process.env.DB_BACKUP_COMPRESS === 'true',
        autoBackup: process.env.DB_AUTO_BACKUP === 'true',
        interval: process.env.DB_BACKUP_INTERVAL || '0 0 * * *', // Daily at midnight
    },

    // ============================================
    // LOGGING
    // ============================================
    logging: {
        enabled: process.env.DB_LOGGING === 'true' || !isProduction,
        level: process.env.DB_LOG_LEVEL || (isProduction ? 'warn' : 'debug'),
        slowQueryThreshold: parseInt(process.env.DB_SLOW_QUERY_THRESHOLD) || 1000,
        logQueries: process.env.DB_LOG_QUERIES === 'true',
        logErrors: process.env.DB_LOG_ERRORS !== 'false',
    },

    // ============================================
    // PERFORMANCE
    // ============================================
    performance: {
        enableIndexes: process.env.DB_ENABLE_INDEXES !== 'false',
        enableTriggers: process.env.DB_ENABLE_TRIGGERS !== 'false',
        enableViews: process.env.DB_ENABLE_VIEWS !== 'false',
        enableCaching: process.env.DB_ENABLE_CACHING === 'true',
        queryCacheSize: parseInt(process.env.DB_QUERY_CACHE_SIZE) || 100,
        statementCacheSize: parseInt(process.env.DB_STATEMENT_CACHE_SIZE) || 50,
    },

    // ============================================
    // VALIDATION
    // ============================================
    validation: {
        validateOnStart: process.env.DB_VALIDATE_ON_START === 'true',
        validateForeignKeys: process.env.DB_VALIDATE_FOREIGN_KEYS !== 'false',
        validateDataTypes: process.env.DB_VALIDATE_DATA_TYPES !== 'false',
        validateConstraints: process.env.DB_VALIDATE_CONSTRAINTS !== 'false',
        strictMode: process.env.DB_STRICT_MODE === 'true',
    },

    // ============================================
    // RETRY CONFIGURATION
    // ============================================
    retry: {
        maxAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS) || 5,
        delay: parseInt(process.env.DB_RETRY_DELAY) || 1000,
        backoff: process.env.DB_RETRY_BACKOFF || 'exponential', // exponential, linear, fixed
    },

    // ============================================
    // TIMEOUTS
    // ============================================
    timeouts: {
        connection: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 5000,
        query: parseInt(process.env.DB_QUERY_TIMEOUT) || 30000,
        transaction: parseInt(process.env.DB_TRANSACTION_TIMEOUT) || 60000,
        migration: parseInt(process.env.DB_MIGRATION_TIMEOUT) || 120000,
        seed: parseInt(process.env.DB_SEED_TIMEOUT) || 300000,
    },

    // ============================================
    // SCHEMA SETTINGS
    // ============================================
    schema: {
        defaultSchema: process.env.DB_DEFAULT_SCHEMA || 'main',
        searchPath: process.env.DB_SEARCH_PATH ? process.env.DB_SEARCH_PATH.split(',') : ['main'],
        enableForeignKeys: process.env.DB_ENABLE_FOREIGN_KEYS !== 'false',
        enableConstraints: process.env.DB_ENABLE_CONSTRAINTS !== 'false',
    },

    // ============================================
    // ENVIRONMENT-SPECIFIC OVERRIDES
    // ============================================
    env: {
        development: {
            logging: {
                enabled: true,
                level: 'debug',
            },
            validation: {
                validateOnStart: true,
                strictMode: false,
            },
            performance: {
                enableCaching: false,
            },
        },
        test: {
            logging: {
                enabled: false,
                level: 'error',
            },
            validation: {
                validateOnStart: true,
                strictMode: true,
            },
            performance: {
                enableCaching: false,
            },
        },
        production: {
            logging: {
                enabled: true,
                level: 'warn',
            },
            validation: {
                validateOnStart: true,
                strictMode: true,
            },
            performance: {
                enableCaching: true,
            },
        },
    },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get current environment configuration
 */
export const getConfig = () => {
    const baseConfig = { ...databaseConfig };
    const envConfig = baseConfig.env[env] || {};
    
    // Merge env-specific configs
    for (const key in envConfig) {
        if (typeof envConfig[key] === 'object') {
            baseConfig[key] = { ...baseConfig[key], ...envConfig[key] };
        } else {
            baseConfig[key] = envConfig[key];
        }
    }
    
    return baseConfig;
};

/**
 * Get database connection configuration based on type
 */
export const getConnectionConfig = () => {
    const config = getConfig();
    
    switch (config.type) {
        case 'postgres':
            return {
                ...config.postgres,
                ...config.pool,
                ...config.timeouts,
            };
        case 'mysql':
            return {
                ...config.mysql,
                ...config.pool,
                ...config.timeouts,
            };
        case 'sqlite':
        default:
            return {
                ...config.sqlite,
                ...config.timeouts,
            };
    }
};

/**
 * Get migration configuration
 */
export const getMigrationConfig = () => {
    const config = getConfig();
    return {
        ...config.migrations,
        ...config.logging,
    };
};

/**
 * Get seed configuration
 */
export const getSeedConfig = () => {
    const config = getConfig();
    return {
        ...config.seeds,
        ...config.logging,
    };
};

/**
 * Get backup configuration
 */
export const getBackupConfig = () => {
    const config = getConfig();
    return {
        ...config.backup,
        ...config.logging,
    };
};

/**
 * Check if database should run in strict mode
 */
export const isStrictMode = () => {
    const config = getConfig();
    return config.validation.strictMode;
};

/**
 * Get database environment
 */
export const getEnvironment = () => env;

/**
 * Check if in production
 */
export const isProductionEnv = () => isProduction;

/**
 * Check if in development
 */
export const isDevelopmentEnv = () => isDevelopment;

/**
 * Check if in test
 */
export const isTestEnv = () => isTest;

// ============================================
// VALIDATE CONFIGURATION
// ============================================

export const validateConfig = () => {
    const config = getConfig();
    const errors = [];

    // Validate database path for SQLite
    if (config.type === 'sqlite' && !config.sqlite.filename) {
        errors.push('SQLite filename is required');
    }

    // Validate PostgreSQL credentials
    if (config.type === 'postgres') {
        if (!config.postgres.host) errors.push('PostgreSQL host is required');
        if (!config.postgres.database) errors.push('PostgreSQL database is required');
        if (!config.postgres.user) errors.push('PostgreSQL user is required');
        if (!config.postgres.password && isProduction) {
            errors.push('PostgreSQL password is required in production');
        }
    }

    // Validate MySQL credentials
    if (config.type === 'mysql') {
        if (!config.mysql.host) errors.push('MySQL host is required');
        if (!config.mysql.database) errors.push('MySQL database is required');
        if (!config.mysql.user) errors.push('MySQL user is required');
        if (!config.mysql.password && isProduction) {
            errors.push('MySQL password is required in production');
        }
    }

    // Validate backup directory
    if (config.backup.autoBackup && !config.backup.directory) {
        errors.push('Backup directory is required when autoBackup is enabled');
    }

    if (errors.length > 0) {
        console.error('❌ Database configuration validation failed:');
        errors.forEach(err => console.error(`  - ${err}`));
        if (isProduction) {
            process.exit(1);
        }
        return { valid: false, errors };
    }

    return { valid: true, errors: [] };
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
    config: databaseConfig,
    getConfig,
    getConnectionConfig,
    getMigrationConfig,
    getSeedConfig,
    getBackupConfig,
    isStrictMode,
    getEnvironment,
    isProduction: isProductionEnv,
    isDevelopment: isDevelopmentEnv,
    isTest: isTestEnv,
    validateConfig,
};

// ============================================
// CONSOLE LOGGING (Development Only)
// ============================================

if (isDevelopment) {
    console.log('📊 Database Configuration Loaded:');
    console.log(`  Environment: ${env}`);
    console.log(`  Type: ${databaseConfig.type}`);
    console.log(`  Pool: Min ${databaseConfig.pool.min}, Max ${databaseConfig.pool.max}`);
    console.log(`  Logging: ${databaseConfig.logging.enabled}`);
    console.log(`  Migrations: ${databaseConfig.migrations.directory}`);
    console.log(`  Seeds: ${databaseConfig.seeds.directory}`);
    console.log(`  Backups: ${databaseConfig.backup.directory}`);
    console.log('  ✅ Configuration validated successfully');
}