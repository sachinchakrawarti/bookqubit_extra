-- ============================================================================
-- File: 04.language_regions.constraints.sql
-- Schema: language_schema
-- Table : language_regions
-- Purpose: Constraints for language_regions table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- Assumed Table Structure
-- ---------------------------------------------------------------------------
--
-- language_region_id    INTEGER PRIMARY KEY AUTOINCREMENT
-- language_id           INTEGER NOT NULL
-- country_id            INTEGER NOT NULL
-- region_type           TEXT
-- is_official           INTEGER DEFAULT 0
-- is_primary            INTEGER DEFAULT 0
-- is_active             INTEGER DEFAULT 1
-- sort_order            INTEGER DEFAULT 0
-- created_at            TEXT
-- updated_at            TEXT
--
-- ---------------------------------------------------------------------------

-- ============================================================================
-- UNIQUE CONSTRAINTS
-- ============================================================================

-- Prevent duplicate language-country mapping
CREATE UNIQUE INDEX IF NOT EXISTS uq_language_regions
ON language_regions(language_id, country_id);

-- ============================================================================
-- POSITIVE ID VALIDATION
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_regions_ids_insert
BEFORE INSERT ON language_regions
WHEN
    NEW.language_id <= 0
 OR NEW.country_id <= 0
BEGIN
    SELECT RAISE(ABORT,
        'language_id and country_id must be greater than zero.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_regions_ids_update
BEFORE UPDATE ON language_regions
WHEN
    NEW.language_id <= 0
 OR NEW.country_id <= 0
BEGIN
    SELECT RAISE(ABORT,
        'language_id and country_id must be greater than zero.');
END;

-- ============================================================================
-- REGION TYPE
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_regions_type_insert
BEFORE INSERT ON language_regions
WHEN NEW.region_type IS NOT NULL
AND NEW.region_type NOT IN
(
    'official',
    'regional',
    'minority',
    'recognized',
    'historical',
    'international'
)
BEGIN
    SELECT RAISE(ABORT,
        'Invalid region_type.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_regions_type_update
BEFORE UPDATE ON language_regions
WHEN NEW.region_type IS NOT NULL
AND NEW.region_type NOT IN
(
    'official',
    'regional',
    'minority',
    'recognized',
    'historical',
    'international'
)
BEGIN
    SELECT RAISE(ABORT,
        'Invalid region_type.');
END;

-- ============================================================================
-- SORT ORDER
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_regions_sort_insert
BEFORE INSERT ON language_regions
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,
        'sort_order cannot be negative.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_regions_sort_update
BEFORE UPDATE ON language_regions
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,
        'sort_order cannot be negative.');
END;

-- ============================================================================
-- BOOLEAN VALIDATION
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_regions_boolean_insert
BEFORE INSERT ON language_regions
WHEN
       NEW.is_official NOT IN (0,1)
    OR NEW.is_primary  NOT IN (0,1)
    OR NEW.is_active   NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,
        'Boolean fields must contain only 0 or 1.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_regions_boolean_update
BEFORE UPDATE ON language_regions
WHEN
       NEW.is_official NOT IN (0,1)
    OR NEW.is_primary  NOT IN (0,1)
    OR NEW.is_active   NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,
        'Boolean fields must contain only 0 or 1.');
END;

-- ============================================================================
-- End of File
-- ============================================================================