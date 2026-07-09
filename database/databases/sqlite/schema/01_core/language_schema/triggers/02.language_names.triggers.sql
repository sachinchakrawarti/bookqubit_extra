-- ============================================================================
-- File: 02.language_names.triggers.sql
-- Schema: language_schema
-- Table: language_names
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- Trigger: Automatically update updated_at
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_updated_at
AFTER UPDATE ON language_names
FOR EACH ROW
WHEN OLD.updated_at = NEW.updated_at
BEGIN
    UPDATE language_names
       SET updated_at = CURRENT_TIMESTAMP
     WHERE language_name_id = NEW.language_name_id;
END;

-- ============================================================================
-- Trigger: Trim whitespace
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_trim_insert
AFTER INSERT ON language_names
FOR EACH ROW
BEGIN
    UPDATE language_names
       SET language_name = TRIM(language_name),
           native_name   = TRIM(COALESCE(native_name, '')),
           short_name    = TRIM(COALESCE(short_name, ''))
     WHERE language_name_id = NEW.language_name_id;
END;

-- ============================================================================
-- Trigger: Keep only one preferred name per language/display language pair
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_single_preferred
AFTER UPDATE OF is_preferred ON language_names
FOR EACH ROW
WHEN NEW.is_preferred = 1
BEGIN
    UPDATE language_names
       SET is_preferred = 0
     WHERE language_id = NEW.language_id
       AND display_language_id = NEW.display_language_id
       AND language_name_id <> NEW.language_name_id;
END;

-- ============================================================================
-- Trigger: Same rule on INSERT
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_single_preferred_insert
AFTER INSERT ON language_names
FOR EACH ROW
WHEN NEW.is_preferred = 1
BEGIN
    UPDATE language_names
       SET is_preferred = 0
     WHERE language_id = NEW.language_id
       AND display_language_id = NEW.display_language_id
       AND language_name_id <> NEW.language_name_id;
END;

-- ============================================================================
-- Trigger: Prevent empty language names
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_validate_name
BEFORE INSERT ON language_names
FOR EACH ROW
WHEN TRIM(NEW.language_name) = ''
BEGIN
    SELECT RAISE(ABORT, 'language_name cannot be empty.');
END;

-- ============================================================================
-- Trigger: Prevent empty language names on update
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_validate_name_update
BEFORE UPDATE OF language_name ON language_names
FOR EACH ROW
WHEN TRIM(NEW.language_name) = ''
BEGIN
    SELECT RAISE(ABORT, 'language_name cannot be empty.');
END;

-- ============================================================================
-- Trigger: Normalize short_name
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_language_names_short_name
AFTER INSERT ON language_names
FOR EACH ROW
WHEN NEW.short_name IS NULL OR TRIM(NEW.short_name) = ''
BEGIN
    UPDATE language_names
       SET short_name = NEW.language_name
     WHERE language_name_id = NEW.language_name_id;
END;