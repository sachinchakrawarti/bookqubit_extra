// src/api/v1/modules/books/config/constants.js

/**
 * Book Module Constants
 * Central configuration for book module
 */

// ============================================
// BOOK STATUS
// ============================================
export const BOOK_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    DELETED: 'deleted'
};

// ============================================
// DEFAULT VALUES
// ============================================
export const DEFAULTS = {
    LANGUAGE: 'english',
    PAGE: 1,
    LIMIT: 10,
    MAX_LIMIT: 100,
    CURRENCY: 'USD',
    PRICE: 0.00,
    RATING: 0,
    STATUS: 'published'
};

// ============================================
// HTTP STATUS CODES
// ============================================
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};

// ============================================
// ERROR CODES
// ============================================
export const ERROR_CODES = {
    BOOK_NOT_FOUND: 'BOOK_NOT_FOUND',
    BOOK_ALREADY_EXISTS: 'BOOK_ALREADY_EXISTS',
    INVALID_BOOK_ID: 'INVALID_BOOK_ID',
    INVALID_SLUG: 'INVALID_SLUG',
    INVALID_ISBN: 'INVALID_ISBN',
    INVALID_RATING: 'INVALID_RATING',
    INVALID_PRICE: 'INVALID_PRICE',
    MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS',
    SEARCH_QUERY_REQUIRED: 'SEARCH_QUERY_REQUIRED',
    INVALID_LANGUAGE: 'INVALID_LANGUAGE',
    BULK_CREATE_LIMIT_EXCEEDED: 'BULK_CREATE_LIMIT_EXCEEDED',
    DUPLICATE_BOOKS: 'DUPLICATE_BOOKS',
    UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
    DATABASE_ERROR: 'DATABASE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
    FILE_TOO_LARGE: 'FILE_TOO_LARGE',
    IMPORT_ERROR: 'IMPORT_ERROR',
    EXPORT_ERROR: 'EXPORT_ERROR'
};

// ============================================
// CACHE CONFIGURATION
// ============================================
export const CACHE = {
    TTL: {
        SHORT: 60,          // 1 minute
        MEDIUM: 300,        // 5 minutes
        LONG: 3600,         // 1 hour
        VERY_LONG: 86400,   // 24 hours
        WEEK: 604800        // 1 week
    },
    KEYS: {
        BOOK_LIST: 'books:list',
        BOOK_DETAIL: 'books:detail',
        BOOK_FEATURED: 'books:featured',
        BOOK_TRENDING: 'books:trending',
        BOOK_STATS: 'books:stats',
        BOOK_SEARCH: 'books:search',
        BOOK_AUTHOR: 'books:author',
        BOOK_CATEGORY: 'books:category',
        BOOK_LANGUAGE: 'books:language'
    }
};

// ============================================
// RATE LIMITING
// ============================================
export const RATE_LIMIT = {
    WINDOW_MS: 15 * 60 * 1000,  // 15 minutes
    MAX_REQUESTS: 100,
    MAX_REQUESTS_ADMIN: 500,
    BULK_WINDOW_MS: 60 * 1000,   // 1 minute
    BULK_MAX_REQUESTS: 5
};

// ============================================
// SORTING
// ============================================
export const SORT = {
    FIELDS: ['title', 'author', 'rating', 'price', 'published_date', 'page_count', 'views', 'downloads'],
    ORDERS: ['asc', 'desc'],
    DEFAULT_FIELD: 'created_at',
    DEFAULT_ORDER: 'desc'
};

// ============================================
// FILTERING
// ============================================
export const FILTER = {
    OPERATORS: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'between'],
    DATE_RANGE: {
        MIN_YEAR: 1900,
        MAX_YEAR: new Date().getFullYear() + 5
    },
    PRICE_RANGE: {
        MIN: 0,
        MAX: 999999.99
    },
    RATING_RANGE: {
        MIN: 0,
        MAX: 5
    },
    PAGE_RANGE: {
        MIN: 1,
        MAX: 1000
    },
    LIMIT_RANGE: {
        MIN: 1,
        MAX: 100
    }
};

// ============================================
// FILE UPLOAD
// ============================================
export const FILE = {
    IMAGE: {
        MAX_SIZE: 5 * 1024 * 1024,  // 5MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
        ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.svg']
    },
    EBOOK: {
        MAX_SIZE: 50 * 1024 * 1024,  // 50MB
        ALLOWED_TYPES: ['application/pdf', 'application/epub+zip', 'application/mobi'],
        ALLOWED_EXTENSIONS: ['.pdf', '.epub', '.mobi']
    },
    AUDIOBOOK: {
        MAX_SIZE: 500 * 1024 * 1024,  // 500MB
        ALLOWED_TYPES: ['audio/mpeg', 'audio/mp3', 'audio/m4a', 'audio/aac'],
        ALLOWED_EXTENSIONS: ['.mp3', '.m4a', '.aac']
    }
};

// ============================================
// BULK OPERATIONS
// ============================================
export const BULK = {
    MAX_CREATE: 50,
    MAX_UPDATE: 50,
    MAX_DELETE: 100,
    MAX_IMPORT: 1000,
    MAX_EXPORT: 10000
};

// ============================================
// REGEX PATTERNS
// ============================================
export const REGEX = {
    ISBN10: /^(?:\d{9}[\dXx])$/,
    ISBN13: /^(?:\d{13})$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    SLUG: /^[a-z0-9-]+$/,
    PHONE: /^\+?[\d\s-]{10,15}$/,
    PRICE: /^\d+(\.\d{1,2})?$/,
    YEAR: /^\d{4}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9\s-]+$/
};

// ============================================
// API VERSION
// ============================================
export const API = {
    VERSION: 'v1',
    BASE_PATH: '/api/v1/books',
    DOCS_URL: '/api/v1/books/docs',
    HEALTH_URL: '/api/v1/books/health'
};

// ============================================
// EXTERNAL SERVICES
// ============================================
export const EXTERNAL = {
    COVER_IMAGE_BASE_URL: process.env.COVER_IMAGE_BASE_URL || 'https://example.com/covers/',
    DEFAULT_COVER: process.env.DEFAULT_COVER || 'default-cover.jpg',
    GOOGLE_BOOKS_API: 'https://www.googleapis.com/books/v1',
    OPEN_LIBRARY_API: 'https://openlibrary.org/api',
    ISBN_DB_API: 'https://api.isbndb.com'
};

// ============================================
// FEATURE FLAGS
// ============================================
export const FEATURES = {
    ENABLE_CACHING: process.env.ENABLE_CACHING === 'true' || false,
    ENABLE_LOGGING: process.env.ENABLE_LOGGING === 'true' || true,
    ENABLE_COMPRESSION: process.env.ENABLE_COMPRESSION === 'true' || true,
    ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING === 'true' || true,
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true' || false,
    ENABLE_EXPORT: process.env.ENABLE_EXPORT === 'true' || true,
    ENABLE_IMPORT: process.env.ENABLE_IMPORT === 'true' || true,
    ENABLE_BULK_OPERATIONS: process.env.ENABLE_BULK_OPERATIONS === 'true' || true
};

// ============================================
// MESSAGES
// ============================================
export const MESSAGES = {
    SUCCESS: {
        BOOK_CREATED: 'Book created successfully',
        BOOK_UPDATED: 'Book updated successfully',
        BOOK_DELETED: 'Book deleted successfully',
        BOOK_RESTORED: 'Book restored successfully',
        BOOKS_IMPORTED: 'Books imported successfully',
        BOOKS_EXPORTED: 'Books exported successfully',
        BULK_CREATED: 'Books created successfully',
        BULK_UPDATED: 'Books updated successfully',
        BULK_DELETED: 'Books deleted successfully'
    },
    ERROR: {
        BOOK_NOT_FOUND: 'Book not found',
        BOOK_ALREADY_EXISTS: 'Book already exists',
        INVALID_BOOK_ID: 'Invalid book ID',
        INVALID_SLUG: 'Invalid slug format',
        INVALID_ISBN: 'Invalid ISBN format',
        INVALID_RATING: 'Rating must be between 0 and 5',
        INVALID_PRICE: 'Price must be a valid number',
        MISSING_REQUIRED_FIELDS: 'Missing required fields',
        SEARCH_QUERY_REQUIRED: 'Search query is required',
        INVALID_LANGUAGE: 'Invalid language specified',
        UNAUTHORIZED_ACCESS: 'Unauthorized access',
        DATABASE_ERROR: 'Database error occurred',
        VALIDATION_ERROR: 'Validation failed',
        FILE_UPLOAD_ERROR: 'File upload failed',
        INVALID_FILE_TYPE: 'Invalid file type',
        FILE_TOO_LARGE: 'File too large',
        IMPORT_ERROR: 'Import failed',
        EXPORT_ERROR: 'Export failed'
    }
};