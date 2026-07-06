// ============================================================
// Module: Tags
// Description: Constants used throughout the Tags module.
// ============================================================

// ------------------------------------------------------------
// Database
// ------------------------------------------------------------

export const TABLES = {
    TAGS: "book_tags",
    TAG_TRANSLATIONS: "book_tags_translations",
};

// ------------------------------------------------------------
// API Routes
// ------------------------------------------------------------

export const ROUTES = {
    BASE: "/tags",
    ADMIN: "/admin",
};

// ------------------------------------------------------------
// Default Values
// ------------------------------------------------------------

export const DEFAULTS = {
    SORT_ORDER: 0,
    IS_ACTIVE: 1,
    IS_SYSTEM: 0,
    IS_FEATURED: 0,
};

// ------------------------------------------------------------
// Status
// ------------------------------------------------------------

export const STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
};

// ------------------------------------------------------------
// Sort Fields
// ------------------------------------------------------------

export const SORT = {
    NAME: "tag_name",
    CODE: "tag_code",
    ORDER: "sort_order",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
};

// ------------------------------------------------------------
// Order
// ------------------------------------------------------------

export const ORDER = {
    ASC: "asc",
    DESC: "desc",
};

// ------------------------------------------------------------
// Languages
// ------------------------------------------------------------

export const LANGUAGES = {
    ENGLISH: "en",
    HINDI: "hi",
};

// ------------------------------------------------------------
// Messages
// ------------------------------------------------------------

export const MESSAGE = {

    FETCH_SUCCESS: "Tags fetched successfully.",
    FETCH_ONE_SUCCESS: "Tag fetched successfully.",

    CREATED: "Tag created successfully.",
    UPDATED: "Tag updated successfully.",
    DELETED: "Tag deleted successfully.",

    NOT_FOUND: "Tag not found.",

    DUPLICATE_CODE: "Tag code already exists.",
    DUPLICATE_SLUG: "Tag slug already exists.",

    VALIDATION_FAILED: "Validation failed.",

    INTERNAL_ERROR: "Internal server error.",
};

// ------------------------------------------------------------
// Validation
// ------------------------------------------------------------

export const LIMITS = {

    TAG_CODE_MAX_LENGTH: 50,

    TAG_NAME_MAX_LENGTH: 255,

    SLUG_MAX_LENGTH: 255,

    DESCRIPTION_MAX_LENGTH: 2000,

};

// ------------------------------------------------------------
// Cache Keys
// ------------------------------------------------------------

export const CACHE_KEYS = {

    ALL_TAGS: "tags:all",

    TAG: "tag:",

    TRANSLATIONS: "tag:translations",

};

// ------------------------------------------------------------
// Export Default
// ------------------------------------------------------------

export default {
    TABLES,
    ROUTES,
    DEFAULTS,
    STATUS,
    SORT,
    ORDER,
    LANGUAGES,
    MESSAGE,
    LIMITS,
    CACHE_KEYS,
};