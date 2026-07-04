/**
 * Schema Configuration
 * Defines all database schemas, tables, relationships, and dependencies
 * Centralized schema registry for BookQubit database
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// SCHEMA DEFINITIONS
// ============================================

export const schemaConfig = {
    // ============================================
    // SCHEMA REGISTRY
    // ============================================
    schemas: {
        // Core Schemas (Foundation)
        languageschema: {
            name: 'languageschema',
            description: 'Language management for multi-language support',
            priority: 1,
            tables: ['languages', 'language_translations', 'language_scripts', 'language_families'],
            dependencies: [],
            directory: '../schema/languageschema',
            initFile: 'language.init.sql',
            dropFile: 'language.drop.sql',
            rollbackFile: 'language.rollback.sql',
            version: '1.0.0',
        },

        geographyschema: {
            name: 'geographyschema',
            description: 'Geographic data including continents, countries, states, cities',
            priority: 2,
            tables: [
                'continents', 'regions', 'subregions',
                'countries', 'country_codes', 'country_flags',
                'country_neighbors', 'country_translations',
                'states', 'state_translations',
                'cities', 'city_translations',
                'timezones', 'country_timezones',
                'currencies', 'country_currencies'
            ],
            dependencies: ['languageschema'],
            directory: '../schema/geographyschema',
            initFile: 'geography.init.sql',
            dropFile: 'geography.drop.sql',
            rollbackFile: 'geography.rollback.sql',
            version: '1.0.0',
        },

        authschema: {
            name: 'authschema',
            description: 'Authentication and user management',
            priority: 3,
            tables: [
                'users', 'user_profiles', 'user_settings', 'user_preferences',
                'auth_tokens', 'refresh_tokens', 'sessions', 'login_history',
                'password_resets', 'email_verifications',
                'google_accounts', 'google_tokens', 'google_verifications',
                'otp_requests', 'otp_verifications', 'otp_attempts', 'otp_templates',
                'oauth_accounts', 'oauth_providers',
                'roles', 'permissions', 'role_permissions', 'user_roles',
                'login_attempts', 'ip_blacklist', 'user_blocks',
                'security_logs', 'audit_logs'
            ],
            dependencies: ['languageschema', 'geographyschema'],
            directory: '../schema/authschema',
            initFile: 'auth.init.sql',
            dropFile: 'auth.drop.sql',
            rollbackFile: 'auth.rollback.sql',
            version: '2.0.0',
        },

        authorschema: {
            name: 'authorschema',
            description: 'Author management with aliases, translations, and publications',
            priority: 4,
            tables: [
                'authors', 'author_aliases', 'author_languages',
                'author_translations', 'author_awards', 'author_stats',
                'author_social', 'author_publications'
            ],
            dependencies: ['languageschema', 'geographyschema'],
            directory: '../schema/authorschema',
            initFile: 'author.init.sql',
            dropFile: 'author.drop.sql',
            rollbackFile: 'author.rollback.sql',
            version: '1.0.0',
        },

        bookschema: {
            name: 'bookschema',
            description: 'Books, categories, publications, and related tables',
            priority: 5,
            tables: [
                'books', 'book_translations', 'book_metadata',
                'book_authors', 'book_categories', 'book_genres',
                'book_tags', 'book_subjects', 'book_series',
                'book_collections', 'book_editions', 'book_formats',
                'book_prices', 'book_inventory', 'book_media',
                'book_covers', 'book_audio', 'book_videos',
                'book_links', 'book_external_ids',
                'book_statistics', 'book_views', 'book_downloads',
                'book_favorites', 'book_shares', 'book_history',
                'book_change_log', 'book_search_index'
            ],
            dependencies: ['languageschema', 'geographyschema', 'authorschema'],
            directory: '../schema/bookschema',
            initFile: 'books.init.sql',
            dropFile: 'books.drop.sql',
            rollbackFile: 'books.rollback.sql',
            version: '2.0.0',
        },

        comicschema: {
            name: 'comicschema',
            description: 'Comics, panels, characters, and series',
            priority: 6,
            tables: [
                'comics', 'comic_translations', 'comic_series',
                'comic_volumes', 'comic_panels', 'comic_characters',
                'comic_artists', 'comic_publishers', 'comic_media',
                'comic_reviews', 'comic_ratings', 'comic_stats'
            ],
            dependencies: ['languageschema', 'authorschema', 'bookschema'],
            directory: '../schema/comicschema',
            initFile: 'comics.init.sql',
            dropFile: 'comics.drop.sql',
            rollbackFile: 'comics.rollback.sql',
            version: '1.0.0',
        },

        userinteractionschema: {
            name: 'userinteractionschema',
            description: 'User interactions: reviews, ratings, reading lists, bookmarks',
            priority: 7,
            tables: [
                'reviews', 'review_reactions', 'review_reports',
                'ratings', 'reading_list', 'reading_progress',
                'bookmarks', 'highlights', 'notes',
                'user_activities', 'user_stats', 'user_badges',
                'user_achievements', 'user_favorites'
            ],
            dependencies: ['authschema', 'bookschema', 'comicschema'],
            directory: '../schema/userinteractionschema',
            initFile: 'userinteraction.init.sql',
            dropFile: 'userinteraction.drop.sql',
            rollbackFile: 'userinteraction.rollback.sql',
            version: '1.0.0',
        },

        tradingschema: {
            name: 'tradingschema',
            description: 'Trading and payment: orders, payments, invoices, transactions',
            priority: 8,
            tables: [
                'orders', 'order_items', 'order_status',
                'payments', 'payment_methods', 'payment_logs',
                'invoices', 'invoice_items', 'transactions',
                'carts', 'cart_items', 'coupons',
                'user_coupons', 'shipping_addresses', 'shipping_methods'
            ],
            dependencies: ['authschema', 'bookschema', 'comicschema'],
            directory: '../schema/tradingschema',
            initFile: 'trading.init.sql',
            dropFile: 'trading.drop.sql',
            rollbackFile: 'trading.rollback.sql',
            version: '1.0.0',
        },

        notificationschema: {
            name: 'notificationschema',
            description: 'Notification system: emails, pushes, in-app notifications',
            priority: 9,
            tables: [
                'notifications', 'notification_templates',
                'notification_settings', 'notification_types',
                'email_logs', 'push_notifications',
                'sms_logs', 'webhook_logs'
            ],
            dependencies: ['authschema'],
            directory: '../schema/notificationschema',
            initFile: 'notification.init.sql',
            dropFile: 'notification.drop.sql',
            rollbackFile: 'notification.rollback.sql',
            version: '1.0.0',
        },

        academicschema: {
            name: 'academicschema',
            description: 'Academic content: courses, lessons, subjects, chapters',
            priority: 10,
            tables: [
                'courses', 'course_translations', 'course_categories',
                'lessons', 'lesson_translations', 'lesson_content',
                'subjects', 'subject_translations',
                'chapters', 'chapter_translations', 'chapter_content',
                'quizzes', 'quiz_questions', 'quiz_answers',
                'user_courses', 'user_lessons', 'user_progress'
            ],
            dependencies: ['languageschema', 'authschema', 'bookschema'],
            directory: '../schema/academicschema',
            initFile: 'academic.init.sql',
            dropFile: 'academic.drop.sql',
            rollbackFile: 'academic.rollback.sql',
            version: '1.0.0',
        },

        analyticschema: {
            name: 'analyticschema',
            description: 'Analytics and reporting: metrics, dashboards, reports',
            priority: 11,
            tables: [
                'analytics_events', 'analytics_metrics',
                'analytics_sessions', 'analytics_page_views',
                'analytics_user_events', 'analytics_book_events',
                'analytics_daily', 'analytics_weekly', 'analytics_monthly',
                'analytics_reports', 'analytics_dashboards'
            ],
            dependencies: ['authschema', 'bookschema', 'comicschema'],
            directory: '../schema/analyticschema',
            initFile: 'analytics.init.sql',
            dropFile: 'analytics.drop.sql',
            rollbackFile: 'analytics.rollback.sql',
            version: '1.0.0',
        },
    },

    // ============================================
    // TABLE METADATA
    // ============================================
    tables: {
        // Languages
        languages: {
            schema: 'languageschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        language_translations: {
            schema: 'languageschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Geography
        continents: {
            schema: 'geographyschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        countries: {
            schema: 'geographyschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        states: {
            schema: 'geographyschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        cities: {
            schema: 'geographyschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Auth
        users: {
            schema: 'authschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: true,
            softDeleteField: 'deleted_at',
        },
        auth_tokens: {
            schema: 'authschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        sessions: {
            schema: 'authschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        roles: {
            schema: 'authschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        permissions: {
            schema: 'authschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Books
        books: {
            schema: 'bookschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: true,
            softDeleteField: 'deleted_at',
        },
        book_translations: {
            schema: 'bookschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        authors: {
            schema: 'authorschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        categories: {
            schema: 'bookschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Comics
        comics: {
            schema: 'comicschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: true,
            softDeleteField: 'deleted_at',
        },

        // User Interactions
        reviews: {
            schema: 'userinteractionschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        reading_list: {
            schema: 'userinteractionschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Trading
        orders: {
            schema: 'tradingschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        payments: {
            schema: 'tradingschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Notifications
        notifications: {
            schema: 'notificationschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Academic
        courses: {
            schema: 'academicschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },
        lessons: {
            schema: 'academicschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at', 'updated_at'],
            softDelete: false,
        },

        // Analytics
        analytics_events: {
            schema: 'analyticschema',
            primaryKey: 'id',
            autoIncrement: true,
            timestamps: ['created_at'],
            softDelete: false,
        },
    },

    // ============================================
    // RELATIONSHIP DEFINITIONS
    // ============================================
    relationships: [
        // Language relationships
        { from: 'countries', to: 'languages', type: 'many-to-one', field: 'language_code' },
        { from: 'book_translations', to: 'languages', type: 'many-to-one', field: 'language_code' },

        // Geography relationships
        { from: 'countries', to: 'continents', type: 'many-to-one', field: 'continent_id' },
        { from: 'countries', to: 'regions', type: 'many-to-one', field: 'region_id' },
        { from: 'states', to: 'countries', type: 'many-to-one', field: 'country_id' },
        { from: 'cities', to: 'countries', type: 'many-to-one', field: 'country_id' },
        { from: 'cities', to: 'states', type: 'many-to-one', field: 'state_id' },

        // Auth relationships
        { from: 'user_profiles', to: 'users', type: 'one-to-one', field: 'user_id' },
        { from: 'auth_tokens', to: 'users', type: 'many-to-one', field: 'user_id' },
        { from: 'sessions', to: 'users', type: 'many-to-one', field: 'user_id' },
        { from: 'user_roles', to: 'users', type: 'many-to-one', field: 'user_id' },
        { from: 'user_roles', to: 'roles', type: 'many-to-one', field: 'role_id' },
        { from: 'role_permissions', to: 'roles', type: 'many-to-one', field: 'role_id' },
        { from: 'role_permissions', to: 'permissions', type: 'many-to-one', field: 'permission_id' },

        // Book relationships
        { from: 'books', to: 'authors', type: 'many-to-one', field: 'author_id' },
        { from: 'books', to: 'categories', type: 'many-to-one', field: 'category_id' },
        { from: 'books', to: 'languages', type: 'many-to-one', field: 'language_code' },
        { from: 'book_authors', to: 'books', type: 'many-to-one', field: 'book_id' },
        { from: 'book_authors', to: 'authors', type: 'many-to-one', field: 'author_id' },
        { from: 'book_translations', to: 'books', type: 'many-to-one', field: 'book_id' },
        { from: 'book_reviews', to: 'books', type: 'many-to-one', field: 'book_id' },

        // Comic relationships
        { from: 'comics', to: 'authors', type: 'many-to-one', field: 'author_id' },
        { from: 'comic_panels', to: 'comics', type: 'many-to-one', field: 'comic_id' },
        { from: 'comic_characters', to: 'comics', type: 'many-to-one', field: 'comic_id' },

        // User interaction relationships
        { from: 'reviews', to: 'users', type: 'many-to-one', field: 'user_id' },
        { from: 'reviews', to: 'books', type: 'many-to-one', field: 'book_id' },
        { from: 'reading_list', to: 'users', type: 'many-to-one', field: 'user_id' },
        { from: 'reading_list', to: 'books', type: 'many-to-one', field: 'book_id' },

        // Trading relationships
        { from: 'orders', to: 'users', type: 'many-to-one', field: 'user_id' },
        { from: 'orders', to: 'books', type: 'many-to-one', field: 'book_id' },
        { from: 'payments', to: 'orders', type: 'many-to-one', field: 'order_id' },

        // Notification relationships
        { from: 'notifications', to: 'users', type: 'many-to-one', field: 'user_id' },

        // Academic relationships
        { from: 'lessons', to: 'courses', type: 'many-to-one', field: 'course_id' },
        { from: 'chapters', to: 'courses', type: 'many-to-one', field: 'course_id' },
    ],

    // ============================================
    // DEPENDENCY ORDER (For creation/drop)
    // ============================================
    dependencyOrder: [
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
    // DROP ORDER (Reverse of creation)
    // ============================================
    dropOrder: [
        'analyticschema',
        'academicschema',
        'notificationschema',
        'tradingschema',
        'userinteractionschema',
        'comicschema',
        'bookschema',
        'authorschema',
        'authschema',
        'geographyschema',
        'languageschema',
    ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all schemas
 */
export const getSchemas = () => {
    return Object.keys(schemaConfig.schemas);
};

/**
 * Get schema by name
 */
export const getSchema = (name) => {
    return schemaConfig.schemas[name] || null;
};

/**
 * Get tables for a schema
 */
export const getSchemaTables = (schemaName) => {
    const schema = getSchema(schemaName);
    return schema ? schema.tables : [];
};

/**
 * Get all tables
 */
export const getAllTables = () => {
    const allTables = [];
    for (const schema of Object.values(schemaConfig.schemas)) {
        allTables.push(...schema.tables);
    }
    return allTables;
};

/**
 * Get table metadata
 */
export const getTableMetadata = (tableName) => {
    return schemaConfig.tables[tableName] || null;
};

/**
 * Get relationships for a table
 */
export const getTableRelationships = (tableName) => {
    return schemaConfig.relationships.filter(
        rel => rel.from === tableName || rel.to === tableName
    );
};

/**
 * Get dependencies for a schema
 */
export const getSchemaDependencies = (schemaName) => {
    const schema = getSchema(schemaName);
    return schema ? schema.dependencies : [];
};

/**
 * Get dependency order
 */
export const getDependencyOrder = () => {
    return schemaConfig.dependencyOrder;
};

/**
 * Get drop order
 */
export const getDropOrder = () => {
    return schemaConfig.dropOrder;
};

/**
 * Validate schema configuration
 */
export const validateSchemas = () => {
    const errors = [];
    const schemas = getSchemas();

    // Check each schema
    for (const name of schemas) {
        const schema = getSchema(name);
        
        // Check required fields
        if (!schema.tables || schema.tables.length === 0) {
            errors.push(`Schema '${name}' has no tables defined`);
        }

        // Check dependencies exist
        if (schema.dependencies) {
            for (const dep of schema.dependencies) {
                if (!schemas.includes(dep)) {
                    errors.push(`Schema '${name}' depends on '${dep}' which doesn't exist`);
                }
            }
        }

        // Check init file
        if (!schema.initFile) {
            errors.push(`Schema '${name}' missing initFile`);
        }

        // Check drop file
        if (!schema.dropFile) {
            errors.push(`Schema '${name}' missing dropFile`);
        }
    }

    // Check all tables have metadata
    const allTables = getAllTables();
    for (const table of allTables) {
        if (!schemaConfig.tables[table]) {
            errors.push(`Table '${table}' missing metadata`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Generate schema initialization order
 */
export const getInitOrder = () => {
    const order = [];
    const visited = new Set();

    const visit = (schemaName) => {
        if (visited.has(schemaName)) return;
        visited.add(schemaName);

        const schema = getSchema(schemaName);
        if (schema && schema.dependencies) {
            for (const dep of schema.dependencies) {
                visit(dep);
            }
        }
        order.push(schemaName);
    };

    for (const schema of getSchemas()) {
        visit(schema);
    }

    return order;
};

// ============================================
// VALIDATE ON IMPORT
// ============================================

const validation = validateSchemas();
if (!validation.valid) {
    console.error('❌ Schema configuration validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
} else {
    console.log('✅ Schema configuration validated successfully');
    console.log(`  📊 ${getSchemas().length} schemas`);
    console.log(`  📋 ${getAllTables().length} tables`);
    console.log(`  🔗 ${schemaConfig.relationships.length} relationships`);
}

// ============================================
// EXPORTS
// ============================================

export default {
    config: schemaConfig,
    getSchemas,
    getSchema,
    getSchemaTables,
    getAllTables,
    getTableMetadata,
    getTableRelationships,
    getSchemaDependencies,
    getDependencyOrder,
    getDropOrder,
    getInitOrder,
    validateSchemas,
};