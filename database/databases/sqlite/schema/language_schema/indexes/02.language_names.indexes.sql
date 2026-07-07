-- ============================================================================
-- File: 02.language_names.indexes.sql
-- Schema: language_schema
-- Table : language_names
-- Purpose: Performance indexes for language_names
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- PRIMARY LOOKUPS
-- ============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_language_names_unique_translation
ON language_names(language_id, display_language_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_language_names_unique_name
ON language_names(display_language_id, language_name);

-- ============================================================================
-- FOREIGN KEY INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_names_language
ON language_names(language_id);

CREATE INDEX IF NOT EXISTS idx_language_names_display_language
ON language_names(display_language_id);

-- ============================================================================
-- NAME SEARCH
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_names_name
ON language_names(language_name);

CREATE INDEX IF NOT EXISTS idx_language_names_native_name
ON language_names(native_name);

CREATE INDEX IF NOT EXISTS idx_language_names_short_name
ON language_names(short_name);

-- ============================================================================
-- BOOLEAN FILTERS
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_names_official
ON language_names(is_official);

CREATE INDEX IF NOT EXISTS idx_language_names_preferred
ON language_names(is_preferred);

CREATE INDEX IF NOT EXISTS idx_language_names_active
ON language_names(is_active);

-- ============================================================================
-- COMPOSITE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_names_language_preferred
ON language_names(
    language_id,
    is_preferred
);

CREATE INDEX IF NOT EXISTS idx_language_names_language_official
ON language_names(
    language_id,
    is_official
);

CREATE INDEX IF NOT EXISTS idx_language_names_display_preferred
ON language_names(
    display_language_id,
    is_preferred
);

CREATE INDEX IF NOT EXISTS idx_language_names_active_preferred
ON language_names(
    is_active,
    is_preferred
);

-- ============================================================================
-- TIMESTAMP INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_names_created_at
ON language_names(created_at);

CREATE INDEX IF NOT EXISTS idx_language_names_updated_at
ON language_names(updated_at);

-- ============================================================================
-- END OF FILE
-- ============================================================================