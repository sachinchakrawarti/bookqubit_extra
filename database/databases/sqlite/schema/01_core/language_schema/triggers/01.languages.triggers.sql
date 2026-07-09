-- ============================================================================
-- File: 01.languages.triggers.sql
-- Schema: language_schema
-- Table: languages
-- Purpose: Automatically maintain updated_at and enforce default language rules
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- Trigger: Update updated_at on row modification
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_languages_updated_at
AFTER UPDATE ON languages
FOR EACH ROW
WHEN OLD.updated_at = NEW.updated_at
BEGIN
    UPDATE languages
       SET updated_at = CURRENT_TIMESTAMP
     WHERE language_id = NEW.language_id;
END;

-- ============================================================================
-- Trigger: Ensure only one default language
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_languages_single_default
AFTER UPDATE OF is_default ON languages
FOR EACH ROW
WHEN NEW.is_default = 1
BEGIN
    UPDATE languages
       SET is_default = 0
     WHERE language_id <> NEW.language_id
       AND is_default = 1;
END;

-- ============================================================================
-- Trigger: Ensure only one default language on INSERT
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_languages_single_default_insert
AFTER INSERT ON languages
FOR EACH ROW
WHEN NEW.is_default = 1
BEGIN
    UPDATE languages
       SET is_default = 0
     WHERE language_id <> NEW.language_id
       AND is_default = 1;
END;

-- ============================================================================
-- Trigger: Normalize codes to lowercase
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_languages_normalize_codes
AFTER INSERT ON languages
FOR EACH ROW
WHEN NEW.language_code <> LOWER(NEW.language_code)
   OR NEW.iso_639_1 <> LOWER(NEW.iso_639_1)
   OR NEW.iso_639_2 <> LOWER(NEW.iso_639_2)
   OR NEW.iso_639_3 <> LOWER(NEW.iso_639_3)
BEGIN
    UPDATE languages
       SET language_code = LOWER(NEW.language_code),
           iso_639_1    = LOWER(NEW.iso_639_1),
           iso_639_2    = LOWER(NEW.iso_639_2),
           iso_639_3    = LOWER(NEW.iso_639_3)
     WHERE language_id = NEW.language_id;
END;

-- ============================================================================
-- Trigger: Prevent deactivating the default language
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_languages_protect_default
BEFORE UPDATE OF is_active ON languages
FOR EACH ROW
WHEN OLD.is_default = 1
 AND NEW.is_active = 0
BEGIN
    SELECT RAISE(ABORT, 'Cannot deactivate the default language.');
END;