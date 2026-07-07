-- ============================================================================
-- File: 02.scripts.constraints.sql
-- Schema: language_schema
-- Table : scripts
-- Purpose: Constraints for the scripts table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- Primary Key
-- ---------------------------------------------------------------------------

-- script_id INTEGER PRIMARY KEY AUTOINCREMENT

-- ---------------------------------------------------------------------------
-- Required Fields
-- ---------------------------------------------------------------------------

-- script_code     NOT NULL
-- script_name     NOT NULL
-- native_name     NOT NULL
-- iso15924_code   NOT NULL

-- ---------------------------------------------------------------------------
-- Unique Constraints
-- ---------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS uq_scripts_code
ON scripts(script_code);

CREATE UNIQUE INDEX IF NOT EXISTS uq_scripts_iso15924
ON scripts(iso15924_code);

CREATE UNIQUE INDEX IF NOT EXISTS uq_scripts_name
ON scripts(script_name);

-- ---------------------------------------------------------------------------
-- ISO 15924 Validation
-- Must contain exactly 4 characters.
-- Examples:
-- Latn
-- Arab
-- Cyrl
-- Hans
-- Hant
-- Deva
-- ===========================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_check_iso15924_insert
BEFORE INSERT ON scripts
WHEN LENGTH(NEW.iso15924_code) <> 4
BEGIN
    SELECT RAISE(ABORT,
        'iso15924_code must contain exactly 4 characters.');
END;

CREATE TRIGGER IF NOT EXISTS trg_scripts_check_iso15924_update
BEFORE UPDATE ON scripts
WHEN LENGTH(NEW.iso15924_code) <> 4
BEGIN
    SELECT RAISE(ABORT,
        'iso15924_code must contain exactly 4 characters.');
END;

-- ---------------------------------------------------------------------------
-- Writing Direction
-- Allowed:
-- LTR
-- RTL
-- TTB (Top To Bottom)
-- BTT (Bottom To Top)
-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_scripts_check_direction_insert
BEFORE INSERT ON scripts
WHEN NEW.direction NOT IN ('LTR','RTL','TTB','BTT')
BEGIN
    SELECT RAISE(ABORT,
        'direction must be LTR, RTL, TTB or BTT.');
END;

CREATE TRIGGER IF NOT EXISTS trg_scripts_check_direction_update
BEFORE UPDATE ON scripts
WHEN NEW.direction NOT IN ('LTR','RTL','TTB','BTT')
BEGIN
    SELECT RAISE(ABORT,
        'direction must be LTR, RTL, TTB or BTT.');
END;

-- ---------------------------------------------------------------------------
-- Unicode Range
-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_scripts_unicode_insert
BEFORE INSERT ON scripts
WHEN LENGTH(TRIM(NEW.unicode_range)) = 0
BEGIN
    SELECT RAISE(ABORT,
        'unicode_range cannot be empty.');
END;

CREATE TRIGGER IF NOT EXISTS trg_scripts_unicode_update
BEFORE UPDATE ON scripts
WHEN LENGTH(TRIM(NEW.unicode_range)) = 0
BEGIN
    SELECT RAISE(ABORT,
        'unicode_range cannot be empty.');
END;

-- ---------------------------------------------------------------------------
-- Sort Order
-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_scripts_sort_order_insert
BEFORE INSERT ON scripts
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,
        'sort_order cannot be negative.');
END;

CREATE TRIGGER IF NOT EXISTS trg_scripts_sort_order_update
BEFORE UPDATE ON scripts
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,
        'sort_order cannot be negative.');
END;

-- ---------------------------------------------------------------------------
-- Boolean Validation
-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_scripts_boolean_insert
BEFORE INSERT ON scripts
WHEN NEW.is_active NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,
        'is_active must be 0 or 1.');
END;

CREATE TRIGGER IF NOT EXISTS trg_scripts_boolean_update
BEFORE UPDATE ON scripts
WHEN NEW.is_active NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,
        'is_active must be 0 or 1.');
END;

-- ============================================================================
-- End of File
-- ============================================================================