/**
 * Seed Configuration
 * Centralized seed data configuration for BookQubit database
 * Defines all seed data sources, order, and settings
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// SEED CONFIGURATION
// ============================================

export const seedConfig = {
    // ============================================
    // GENERAL SETTINGS
    // ============================================
    general: {
        batchSize: 100,
        timeout: 300000, // 5 minutes
        skipOnError: false,
        verbose: true,
        dryRun: false,
        environment: process.env.NODE_ENV || 'development',
    },

    // ============================================
    // SEED SOURCES
    // ============================================
    sources: {
        // JSON files
        json: {
            enabled: true,
            directory: path.join(__dirname, '../data/json'),
            extensions: ['.json'],
        },
        // CSV files
        csv: {
            enabled: true,
            directory: path.join(__dirname, '../data/csv'),
            extensions: ['.csv'],
        },
        // SQL files
        sql: {
            enabled: true,
            directory: path.join(__dirname, '../seeds'),
            extensions: ['.sql'],
        },
        // API sources (external)
        api: {
            enabled: false,
            endpoints: {
                openLibrary: 'https://openlibrary.org/api/books',
                googleBooks: 'https://www.googleapis.com/books/v1',
                wikidata: 'https://www.wikidata.org/wiki/Special:EntityData',
            },
        },
    },

    // ============================================
    // SEED ORDER BY SCHEMA
    // ============================================
    schemaOrder: [
        'languageschema',
        'geographyschema',
        'authschema',
        'authorschema',
        'bookschema',
        'comicschema',
        'userinteractionschema',
        'tradingschema',
        'notificationschema',
        'academicschema',
        'analyticschema',
    ],

    // ============================================
    // SEED DEFINITIONS
    // ============================================
    seeds: {
        // ============================================
        // LANGUAGE SEEDS
        // ============================================
        languages: {
            schema: 'languageschema',
            table: 'languages',
            priority: 1,
            source: 'json',
            file: 'languages.seed.json',
            count: 20,
            description: 'All supported languages with native names and flags',
            required: true,
        },
        language_translations: {
            schema: 'languageschema',
            table: 'language_translations',
            priority: 2,
            source: 'json',
            file: 'language_translations.seed.json',
            count: 100,
            description: 'Language translations in multiple languages',
            required: false,
        },

        // ============================================
        // GEOGRAPHY SEEDS
        // ============================================
        continents: {
            schema: 'geographyschema',
            table: 'continents',
            priority: 3,
            source: 'json',
            file: 'continents.seed.json',
            count: 7,
            description: '7 continents with codes and regions',
            required: true,
        },
        countries: {
            schema: 'geographyschema',
            table: 'countries',
            priority: 4,
            source: 'json',
            file: 'countries.seed.json',
            count: 195,
            description: 'All UN recognized countries with ISO codes',
            required: true,
        },
        country_codes: {
            schema: 'geographyschema',
            table: 'country_codes',
            priority: 5,
            source: 'json',
            file: 'country_codes.seed.json',
            count: 195,
            description: 'ISO, FIPS, and other country codes',
            required: false,
        },
        country_flags: {
            schema: 'geographyschema',
            table: 'country_flags',
            priority: 6,
            source: 'json',
            file: 'country_flags.seed.json',
            count: 195,
            description: 'Flag emojis and SVG URLs',
            required: false,
        },
        states: {
            schema: 'geographyschema',
            table: 'states',
            priority: 7,
            source: 'json',
            file: 'states.seed.json',
            count: 2000,
            description: 'States and provinces for all countries',
            required: false,
        },
        cities: {
            schema: 'geographyschema',
            table: 'cities',
            priority: 8,
            source: 'json',
            file: 'cities.seed.json',
            count: 10000,
            description: 'Major cities with coordinates and population',
            required: false,
        },
        timezones: {
            schema: 'geographyschema',
            table: 'timezones',
            priority: 9,
            source: 'json',
            file: 'timezones.seed.json',
            count: 40,
            description: 'All timezones with UTC offsets',
            required: false,
        },
        currencies: {
            schema: 'geographyschema',
            table: 'currencies',
            priority: 10,
            source: 'json',
            file: 'currencies.seed.json',
            count: 180,
            description: 'World currencies with symbols and codes',
            required: false,
        },

        // ============================================
        // AUTH SEEDS
        // ============================================
        roles: {
            schema: 'authschema',
            table: 'roles',
            priority: 11,
            source: 'sql',
            file: 'roles.seed.sql',
            count: 6,
            description: 'Default roles: admin, editor, user, guest, etc.',
            required: true,
        },
        permissions: {
            schema: 'authschema',
            table: 'permissions',
            priority: 12,
            source: 'sql',
            file: 'permissions.seed.sql',
            count: 30,
            description: 'Default CRUD permissions for all resources',
            required: true,
        },
        role_permissions: {
            schema: 'authschema',
            table: 'role_permissions',
            priority: 13,
            source: 'sql',
            file: 'role_permissions.seed.sql',
            count: 50,
            description: 'Role-permission mappings',
            required: true,
        },
        users: {
            schema: 'authschema',
            table: 'users',
            priority: 14,
            source: 'json',
            file: 'users.seed.json',
            count: 50,
            description: 'Default users including admin',
            required: true,
        },
        oauth_providers: {
            schema: 'authschema',
            table: 'oauth_providers',
            priority: 15,
            source: 'sql',
            file: 'oauth_providers.seed.sql',
            count: 5,
            description: 'OAuth providers (Google, Facebook, GitHub, etc.)',
            required: false,
        },
        otp_templates: {
            schema: 'authschema',
            table: 'otp_templates',
            priority: 16,
            source: 'sql',
            file: 'otp_templates.seed.sql',
            count: 10,
            description: 'OTP message templates for email and SMS',
            required: false,
        },

        // ============================================
        // AUTHOR SEEDS
        // ============================================
        authors: {
            schema: 'authorschema',
            table: 'authors',
            priority: 17,
            source: 'json',
            file: 'authors.seed.json',
            count: 100,
            description: 'Famous authors with bios and metadata',
            required: true,
        },
        author_translations: {
            schema: 'authorschema',
            table: 'author_translations',
            priority: 18,
            source: 'json',
            file: 'author_translations.seed.json',
            count: 500,
            description: 'Author names in multiple languages',
            required: false,
        },

        // ============================================
        // BOOK SEEDS
        // ============================================
        categories: {
            schema: 'bookschema',
            table: 'categories',
            priority: 19,
            source: 'json',
            file: 'categories.seed.json',
            count: 30,
            description: 'Book categories with icons and colors',
            required: true,
        },
        publications: {
            schema: 'bookschema',
            table: 'publications',
            priority: 20,
            source: 'json',
            file: 'publications.seed.json',
            count: 20,
            description: 'Publishing houses',
            required: false,
        },
        books: {
            schema: 'bookschema',
            table: 'books',
            priority: 21,
            source: 'json',
            file: 'books.seed.json',
            count: 500,
            description: 'Books with metadata across all languages',
            required: true,
        },
        book_translations: {
            schema: 'bookschema',
            table: 'book_translations',
            priority: 22,
            source: 'json',
            file: 'book_translations.seed.json',
            count: 2000,
            description: 'Book titles and descriptions in multiple languages',
            required: false,
        },
        book_authors: {
            schema: 'bookschema',
            table: 'book_authors',
            priority: 23,
            source: 'json',
            file: 'book_authors.seed.json',
            count: 600,
            description: 'Book-author relationships',
            required: false,
        },
        book_genres: {
            schema: 'bookschema',
            table: 'book_genres',
            priority: 24,
            source: 'json',
            file: 'book_genres.seed.json',
            count: 1000,
            description: 'Book-genre relationships',
            required: false,
        },
        book_tags: {
            schema: 'bookschema',
            table: 'book_tags',
            priority: 25,
            source: 'json',
            file: 'book_tags.seed.json',
            count: 1500,
            description: 'Book-tag relationships',
            required: false,
        },

        // ============================================
        // COMIC SEEDS
        // ============================================
        comics: {
            schema: 'comicschema',
            table: 'comics',
            priority: 26,
            source: 'json',
            file: 'comics.seed.json',
            count: 100,
            description: 'Comic books with series and issues',
            required: false,
        },
        comic_characters: {
            schema: 'comicschema',
            table: 'comic_characters',
            priority: 27,
            source: 'json',
            file: 'comic_characters.seed.json',
            count: 500,
            description: 'Comic characters and their descriptions',
            required: false,
        },
        comic_panels: {
            schema: 'comicschema',
            table: 'comic_panels',
            priority: 28,
            source: 'json',
            file: 'comic_panels.seed.json',
            count: 5000,
            description: 'Comic panels with images and dialogues',
            required: false,
        },

        // ============================================
        // USER INTERACTION SEEDS
        // ============================================
        reviews: {
            schema: 'userinteractionschema',
            table: 'reviews',
            priority: 29,
            source: 'json',
            file: 'reviews.seed.json',
            count: 1000,
            description: 'User reviews and ratings for books',
            required: false,
        },
        reading_list: {
            schema: 'userinteractionschema',
            table: 'reading_list',
            priority: 30,
            source: 'json',
            file: 'reading_list.seed.json',
            count: 2000,
            description: 'User reading lists with status',
            required: false,
        },
        user_activities: {
            schema: 'userinteractionschema',
            table: 'user_activities',
            priority: 31,
            source: 'json',
            file: 'user_activities.seed.json',
            count: 5000,
            description: 'User activity logs',
            required: false,
        },

        // ============================================
        // TRADING SEEDS
        // ============================================
        orders: {
            schema: 'tradingschema',
            table: 'orders',
            priority: 32,
            source: 'json',
            file: 'orders.seed.json',
            count: 500,
            description: 'Sample orders',
            required: false,
        },
        payments: {
            schema: 'tradingschema',
            table: 'payments',
            priority: 33,
            source: 'json',
            file: 'payments.seed.json',
            count: 500,
            description: 'Sample payments',
            required: false,
        },

        // ============================================
        // NOTIFICATION SEEDS
        // ============================================
        notification_templates: {
            schema: 'notificationschema',
            table: 'notification_templates',
            priority: 34,
            source: 'sql',
            file: 'notification_templates.seed.sql',
            count: 20,
            description: 'Email and push notification templates',
            required: false,
        },

        // ============================================
        // ACADEMIC SEEDS
        // ============================================
        courses: {
            schema: 'academicschema',
            table: 'courses',
            priority: 35,
            source: 'json',
            file: 'courses.seed.json',
            count: 50,
            description: 'Academic courses',
            required: false,
        },
        lessons: {
            schema: 'academicschema',
            table: 'lessons',
            priority: 36,
            source: 'json',
            file: 'lessons.seed.json',
            count: 200,
            description: 'Course lessons',
            required: false,
        },

        // ============================================
        // ANALYTICS SEEDS
        // ============================================
        analytics_events: {
            schema: 'analyticschema',
            table: 'analytics_events',
            priority: 37,
            source: 'json',
            file: 'analytics_events.seed.json',
            count: 10000,
            description: 'Sample analytics events',
            required: false,
        },
    },

    // ============================================
    // ENVIRONMENT-SPECIFIC SEEDS
    // ============================================
    environmentSeeds: {
        development: {
            enabled: true,
            sampleData: true,
            batchSize: 100,
            seeds: [
                'languages',
                'continents',
                'countries',
                'roles',
                'permissions',
                'users',
                'authors',
                'categories',
                'books',
                'reviews',
            ],
        },
        test: {
            enabled: true,
            sampleData: true,
            batchSize: 50,
            seeds: [
                'languages',
                'countries',
                'roles',
                'users',
                'books',
            ],
        },
        production: {
            enabled: false,
            sampleData: false,
            batchSize: 1000,
            seeds: [
                'languages',
                'continents',
                'countries',
                'roles',
                'permissions',
            ],
        },
        staging: {
            enabled: true,
            sampleData: true,
            batchSize: 200,
            seeds: [
                'languages',
                'continents',
                'countries',
                'roles',
                'permissions',
                'users',
                'authors',
                'categories',
                'books',
                'reviews',
                'orders',
            ],
        },
    },

    // ============================================
    // DATA VALIDATION
    // ============================================
    validation: {
        enabled: true,
        strict: false,
        validateForeignKeys: true,
        validateDataTypes: true,
        validateUniqueConstraints: true,
        validateRequiredFields: true,
        skipInvalid: true,
    },

    // ============================================
    // PERFORMANCE SETTINGS
    // ============================================
    performance: {
        useTransactions: true,
        disableTriggers: false,
        disableIndexes: false,
        batchInsert: true,
        parallelInsert: false,
        maxParallel: 4,
    },

    // ============================================
    // LOGGING
    // ============================================
    logging: {
        enabled: true,
        level: 'info',
        logProgress: true,
        logErrors: true,
        logWarnings: true,
        logSummary: true,
        logFile: path.join(__dirname, '../logs/seed.log'),
    },

    // ============================================
    // BACKUP BEFORE SEED
    // ============================================
    backup: {
        enabled: true,
        autoBackup: true,
        directory: path.join(__dirname, '../backups'),
        retention: 5,
    },

    // ============================================
    // ROLLBACK CONFIGURATION
    // ============================================
    rollback: {
        enabled: true,
        onError: 'rollback', // rollback, continue, stop
        createCheckpoint: true,
    },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all seed definitions
 */
export const getSeeds = () => {
    return Object.keys(seedConfig.seeds);
};

/**
 * Get seed by name
 */
export const getSeed = (name) => {
    return seedConfig.seeds[name] || null;
};

/**
 * Get seeds by schema
 */
export const getSeedsBySchema = (schemaName) => {
    const seeds = [];
    for (const [name, seed] of Object.entries(seedConfig.seeds)) {
        if (seed.schema === schemaName) {
            seeds.push({ name, ...seed });
        }
    }
    return seeds.sort((a, b) => a.priority - b.priority);
};

/**
 * Get seed order for a specific schema
 */
export const getSeedOrder = (schemaName) => {
    const seeds = getSeedsBySchema(schemaName);
    return seeds.map(seed => seed.name);
};

/**
 * Get environment-specific seeds
 */
export const getEnvironmentSeeds = (environment) => {
    const envConfig = seedConfig.environmentSeeds[environment];
    if (!envConfig) return [];

    const seedNames = envConfig.seeds || [];
    const seeds = [];
    for (const name of seedNames) {
        const seed = getSeed(name);
        if (seed) {
            seeds.push({ name, ...seed });
        }
    }
    return seeds;
};

/**
 * Check if seed is required
 */
export const isSeedRequired = (name) => {
    const seed = getSeed(name);
    return seed ? seed.required : false;
};

/**
 * Get seed priority
 */
export const getSeedPriority = (name) => {
    const seed = getSeed(name);
    return seed ? seed.priority : 999;
};

/**
 * Validate seed configuration
 */
export const validateSeedConfig = () => {
    const errors = [];
    const seeds = getSeeds();

    // Check each seed
    for (const name of seeds) {
        const seed = getSeed(name);
        
        // Check required fields
        if (!seed.schema) {
            errors.push(`Seed '${name}' missing schema`);
        }
        if (!seed.table) {
            errors.push(`Seed '${name}' missing table`);
        }
        if (!seed.source) {
            errors.push(`Seed '${name}' missing source`);
        }
        if (!seed.file) {
            errors.push(`Seed '${name}' missing file`);
        }
        if (!seed.priority) {
            errors.push(`Seed '${name}' missing priority`);
        }

        // Check source type
        if (!['json', 'csv', 'sql', 'api'].includes(seed.source)) {
            errors.push(`Seed '${name}' has invalid source type: ${seed.source}`);
        }

        // Check file exists (if source is json, csv, sql)
        if (['json', 'csv', 'sql'].includes(seed.source)) {
            const filePath = path.join(
                seedConfig.sources[seed.source].directory,
                seed.file
            );
            // Note: File existence check would be done at runtime
        }
    }

    // Check environment configurations
    for (const [env, config] of Object.entries(seedConfig.environmentSeeds)) {
        if (!config.seeds || !Array.isArray(config.seeds)) {
            errors.push(`Environment '${env}' missing seeds array`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Get seed statistics
 */
export const getSeedStats = () => {
    const stats = {
        total: 0,
        bySchema: {},
        bySource: {},
        required: 0,
        optional: 0,
    };

    for (const [name, seed] of Object.entries(seedConfig.seeds)) {
        stats.total++;
        
        // By schema
        if (!stats.bySchema[seed.schema]) {
            stats.bySchema[seed.schema] = 0;
        }
        stats.bySchema[seed.schema]++;

        // By source
        if (!stats.bySource[seed.source]) {
            stats.bySource[seed.source] = 0;
        }
        stats.bySource[seed.source]++;

        // Required/Optional
        if (seed.required) {
            stats.required++;
        } else {
            stats.optional++;
        }
    }

    return stats;
};

// ============================================
// VALIDATE ON IMPORT
// ============================================

const validation = validateSeedConfig();
if (!validation.valid) {
    console.error('❌ Seed configuration validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
} else {
    console.log('✅ Seed configuration validated successfully');
    const stats = getSeedStats();
    console.log(`  🌱 ${stats.total} seeds across ${Object.keys(stats.bySchema).length} schemas`);
    console.log(`  📋 ${stats.required} required, ${stats.optional} optional`);
    console.log(`  📦 ${Object.keys(stats.bySource).length} source types`);
}

// ============================================
// EXPORTS
// ============================================

export default {
    config: seedConfig,
    getSeeds,
    getSeed,
    getSeedsBySchema,
    getSeedOrder,
    getEnvironmentSeeds,
    isSeedRequired,
    getSeedPriority,
    validateSeedConfig,
    getSeedStats,
};