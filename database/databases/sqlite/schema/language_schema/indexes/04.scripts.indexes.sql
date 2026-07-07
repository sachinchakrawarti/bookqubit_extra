-- ============================================================================
-- File: 04.scripts.indexes.sql
-- Schema: language_schema
-- Table : scripts
-- Purpose: Performance indexes for scripts
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- UNIQUE INDEXES
-- ============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_scripts_code
ON scripts(script_code);

CREATE UNIQUE INDEX IF NOT EXISTS idx_scripts_iso15924
ON scripts(iso15924_code);

CREATE UNIQUE INDEX IF NOT EXISTS idx_scripts_name
ON scripts(script_name);

-- ============================================================================
-- LOOKUP INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_scripts_native_name
ON scripts(native_name);

CREATE INDEX IF NOT EXISTS idx_scripts_direction
ON scripts(direction);

-- ============================================================================
-- FILTER INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_scripts_active
ON scripts(is_active);

CREATE INDEX IF NOT EXISTS idx_scripts_sort_order
ON scripts(sort_order);

-- ============================================================================
-- COMPOSITE INDEXES
-- ============================================================================

-- Active scripts ordered by display order
CREATE INDEX IF NOT EXISTS idx_scripts_active_sort
ON scripts(
    is_active,
    sort_order
);

-- Filter scripts by writing direction
CREATE INDEX IF NOT EXISTS idx_scripts_direction_active
ON scripts(
    direction,
    is_active
);

-- ============================================================================
-- SEARCH INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_scripts_name_search
ON scripts(
    script_name,
    native_name
);

-- ============================================================================
-- TIMESTAMP INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_scripts_created_at
ON scripts(created_at);

CREATE INDEX IF NOT EXISTS idx_scripts_updated_at
ON scripts(updated_at);

-- ============================================================================
-- END OF FILE
-- ============================================================================