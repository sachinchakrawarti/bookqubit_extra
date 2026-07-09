-- ============================================================================
-- File: 01.languages.indexes.sql
-- Schema: language_schema
-- Table : languages
-- Purpose: Performance indexes for the languages table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- PRIMARY LOOKUPS
-- ============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_languages_code
ON languages(language_code);

CREATE UNIQUE INDEX IF NOT EXISTS idx_languages_iso639_1
ON languages(iso_639_1);

CREATE UNIQUE INDEX IF NOT EXISTS idx_languages_iso639_2
ON languages(iso_639_2);

CREATE UNIQUE INDEX IF NOT EXISTS idx_languages_iso639_3
ON languages(iso_639_3);

CREATE UNIQUE INDEX IF NOT EXISTS idx_languages_locale
ON languages(locale_code);

-- ============================================================================
-- NAME SEARCH
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_name
ON languages(language_name);

CREATE INDEX IF NOT EXISTS idx_languages_native_name
ON languages(native_name);

CREATE INDEX IF NOT EXISTS idx_languages_english_name
ON languages(english_name);

-- ============================================================================
-- SCRIPT
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_script
ON languages(default_script_id);

-- ============================================================================
-- FILTERING
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_active
ON languages(is_active);

CREATE INDEX IF NOT EXISTS idx_languages_default
ON languages(is_default);

CREATE INDEX IF NOT EXISTS idx_languages_direction
ON languages(direction);

CREATE INDEX IF NOT EXISTS idx_languages_sort_order
ON languages(sort_order);

-- ============================================================================
-- COMPOSITE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_active_sort
ON languages(
    is_active,
    sort_order
);

CREATE INDEX IF NOT EXISTS idx_languages_direction_active
ON languages(
    direction,
    is_active
);

CREATE INDEX IF NOT EXISTS idx_languages_script_active
ON languages(
    default_script_id,
    is_active
);

-- ============================================================================
-- TIMESTAMPS
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_created_at
ON languages(created_at);

CREATE INDEX IF NOT EXISTS idx_languages_updated_at
ON languages(updated_at);

-- ============================================================================
-- End of File
-- ============================================================================