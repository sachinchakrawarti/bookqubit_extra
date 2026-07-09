-- ============================================================================
-- File: 01.languages.constraints.sql
-- Schema: language_schema
-- Table : languages
-- Purpose: Constraints for the languages table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- Primary Key
-- ---------------------------------------------------------------------------

-- language_id INTEGER PRIMARY KEY AUTOINCREMENT

-- ---------------------------------------------------------------------------
-- Required Fields
-- ---------------------------------------------------------------------------

-- language_code      NOT NULL
-- language_name      NOT NULL
-- native_name        NOT NULL
-- iso_639_1          NOT NULL
-- iso_639_3          NOT NULL

-- ---------------------------------------------------------------------------
-- Unique Constraints
-- ---------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS uq_languages_code
ON languages(language_code);

CREATE UNIQUE INDEX IF NOT EXISTS uq_languages_iso639_1
ON languages(iso_639_1);

CREATE UNIQUE INDEX IF NOT EXISTS uq_languages_iso639_3
ON languages(iso_639_3);

CREATE UNIQUE INDEX IF NOT EXISTS uq_languages_locale
ON languages(locale_code);

-- ---------------------------------------------------------------------------
-- CHECK Constraints
-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_languages_check_iso6391_insert
BEFORE INSERT ON languages
WHEN LENGTH(NEW.iso_639_1) <> 2
BEGIN
    SELECT RAISE(ABORT,'iso_639_1 must contain exactly 2 characters.');
END;

CREATE TRIGGER IF NOT EXISTS trg_languages_check_iso6391_update
BEFORE UPDATE ON languages
WHEN LENGTH(NEW.iso_639_1) <> 2
BEGIN
    SELECT RAISE(ABORT,'iso_639_1 must contain exactly 2 characters.');
END;

-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_languages_check_iso6393_insert
BEFORE INSERT ON languages
WHEN LENGTH(NEW.iso_639_3) <> 3
BEGIN
    SELECT RAISE(ABORT,'iso_639_3 must contain exactly 3 characters.');
END;

CREATE TRIGGER IF NOT EXISTS trg_languages_check_iso6393_update
BEFORE UPDATE ON languages
WHEN LENGTH(NEW.iso_639_3) <> 3
BEGIN
    SELECT RAISE(ABORT,'iso_639_3 must contain exactly 3 characters.');
END;

-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_languages_check_direction_insert
BEFORE INSERT ON languages
WHEN NEW.direction NOT IN ('LTR','RTL')
BEGIN
    SELECT RAISE(ABORT,'direction must be LTR or RTL.');
END;

CREATE TRIGGER IF NOT EXISTS trg_languages_check_direction_update
BEFORE UPDATE ON languages
WHEN NEW.direction NOT IN ('LTR','RTL')
BEGIN
    SELECT RAISE(ABORT,'direction must be LTR or RTL.');
END;

-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_languages_check_sort_order_insert
BEFORE INSERT ON languages
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,'sort_order cannot be negative.');
END;

CREATE TRIGGER IF NOT EXISTS trg_languages_check_sort_order_update
BEFORE UPDATE ON languages
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,'sort_order cannot be negative.');
END;

-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_languages_check_locale_insert
BEFORE INSERT ON languages
WHEN LENGTH(TRIM(NEW.locale_code)) = 0
BEGIN
    SELECT RAISE(ABORT,'locale_code cannot be empty.');
END;

CREATE TRIGGER IF NOT EXISTS trg_languages_check_locale_update
BEFORE UPDATE ON languages
WHEN LENGTH(TRIM(NEW.locale_code)) = 0
BEGIN
    SELECT RAISE(ABORT,'locale_code cannot be empty.');
END;

-- ---------------------------------------------------------------------------
-- Boolean Validation
-- ---------------------------------------------------------------------------

CREATE TRIGGER IF NOT EXISTS trg_languages_check_boolean_insert
BEFORE INSERT ON languages
WHEN NEW.is_active NOT IN (0,1)
   OR NEW.is_default NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,'Boolean columns must contain only 0 or 1.');
END;

CREATE TRIGGER IF NOT EXISTS trg_languages_check_boolean_update
BEFORE UPDATE ON languages
WHEN NEW.is_active NOT IN (0,1)
   OR NEW.is_default NOT IN (0,1)
BEGIN
    SELECT RAISE(ABORT,'Boolean columns must contain only 0 or 1.');
END;

-- ============================================================================
-- End of File
-- ============================================================================