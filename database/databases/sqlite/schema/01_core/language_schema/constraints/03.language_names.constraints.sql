-- ============================================================================
-- File: 03.language_names.constraints.sql
-- Schema: language_schema
-- Table : language_names
-- Purpose: Constraints for language_names table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- Assumed Table Structure
-- ---------------------------------------------------------------------------
--
-- language_name_id      INTEGER PRIMARY KEY AUTOINCREMENT
-- language_id           INTEGER NOT NULL
-- display_language_id   INTEGER NOT NULL
-- language_name         TEXT NOT NULL
-- native_name           TEXT
-- short_name            TEXT
-- is_official           INTEGER DEFAULT 0
-- is_preferred          INTEGER DEFAULT 1
-- created_at            TEXT
-- updated_at            TEXT
--
-- ---------------------------------------------------------------------------

-- ============================================================================
-- UNIQUE INDEXES
-- ============================================================================

-- One translation per display language
CREATE UNIQUE INDEX IF NOT EXISTS uq_language_names_translation
ON language_names(language_id, display_language_id);

-- Prevent duplicate names inside same display language
CREATE UNIQUE INDEX IF NOT EXISTS uq_language_names_name
ON language_names(display_language_id, language_name);

-- ============================================================================
-- REQUIRED TEXT
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_required_insert
BEFORE INSERT ON language_names
WHEN
    LENGTH(TRIM(NEW.language_name)) = 0
BEGIN
    SELECT RAISE(ABORT,
        'language_name cannot be empty.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_names_required_update
BEFORE UPDATE ON language_names
WHEN
    LENGTH(TRIM(NEW.language_name)) = 0
BEGIN
    SELECT RAISE(ABORT,
        'language_name cannot be empty.');
END;

-- ============================================================================
-- SELF TRANSLATION CHECK
-- language_id cannot equal display_language_id
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_self_insert
BEFORE INSERT ON language_names
WHEN NEW.language_id = NEW.display_language_id
BEGIN
    SELECT RAISE(ABORT,
        'language_id and display_language_id cannot be the same.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_names_self_update
BEFORE UPDATE ON language_names
WHEN NEW.language_id = NEW.display_language_id
BEGIN
    SELECT RAISE(ABORT,
        'language_id and display_language_id cannot be the same.');
END;

-- ============================================================================
-- BOOLEAN VALIDATION
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_boolean_insert
BEFORE INSERT ON language_names
WHEN
    NEW.is_official NOT IN (0,1)
 OR NEW.is_preferred NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,
        'Boolean fields must contain only 0 or 1.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_names_boolean_update
BEFORE UPDATE ON language_names
WHEN
    NEW.is_official NOT IN (0,1)
 OR NEW.is_preferred NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,
        'Boolean fields must contain only 0 or 1.');
END;

-- ============================================================================
-- POSITIVE IDS
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_positive_insert
BEFORE INSERT ON language_names
WHEN
    NEW.language_id <= 0
 OR NEW.display_language_id <= 0
BEGIN
    SELECT RAISE(ABORT,
        'IDs must be greater than zero.');
END;

CREATE TRIGGER IF NOT EXISTS trg_language_names_positive_update
BEFORE UPDATE ON language_names
WHEN
    NEW.language_id <= 0
 OR NEW.display_language_id <= 0
BEGIN
    SELECT RAISE(ABORT,
        'IDs must be greater than zero.');
END;

-- ============================================================================
-- End of File
-- ============================================================================