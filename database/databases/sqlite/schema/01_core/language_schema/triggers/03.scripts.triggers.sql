-- ============================================================================
-- File: 03.scripts.triggers.sql
-- Schema: language_schema
-- Table: scripts
-- Purpose: Maintain script data integrity
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- Trigger: Automatically update updated_at
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_updated_at
AFTER UPDATE ON scripts
FOR EACH ROW
WHEN OLD.updated_at = NEW.updated_at
BEGIN
    UPDATE scripts
       SET updated_at = CURRENT_TIMESTAMP
     WHERE script_id = NEW.script_id;
END;

-- ============================================================================
-- Trigger: Normalize script codes to lowercase and ISO15924 to Title Case
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_normalize_codes
AFTER INSERT ON scripts
FOR EACH ROW
BEGIN
    UPDATE scripts
       SET script_code   = LOWER(TRIM(NEW.script_code)),
           iso15924_code =
               UPPER(SUBSTR(TRIM(NEW.iso15924_code),1,1)) ||
               LOWER(SUBSTR(TRIM(NEW.iso15924_code),2)),
           script_name   = TRIM(NEW.script_name),
           native_name   = TRIM(COALESCE(NEW.native_name,'')),
           unicode_range = TRIM(COALESCE(NEW.unicode_range,''))
     WHERE script_id = NEW.script_id;
END;

-- ============================================================================
-- Trigger: Validate direction
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_validate_direction
BEFORE INSERT ON scripts
FOR EACH ROW
WHEN NEW.direction NOT IN ('LTR','RTL')
BEGIN
    SELECT RAISE(ABORT,'Invalid script direction.');
END;

-- ============================================================================
-- Trigger: Validate direction on update
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_validate_direction_update
BEFORE UPDATE OF direction ON scripts
FOR EACH ROW
WHEN NEW.direction NOT IN ('LTR','RTL')
BEGIN
    SELECT RAISE(ABORT,'Invalid script direction.');
END;

-- ============================================================================
-- Trigger: Prevent empty script name
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_validate_name
BEFORE INSERT ON scripts
FOR EACH ROW
WHEN TRIM(NEW.script_name) = ''
BEGIN
    SELECT RAISE(ABORT,'script_name cannot be empty.');
END;

-- ============================================================================
-- Trigger: Prevent empty script name on update
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_validate_name_update
BEFORE UPDATE OF script_name ON scripts
FOR EACH ROW
WHEN TRIM(NEW.script_name) = ''
BEGIN
    SELECT RAISE(ABORT,'script_name cannot be empty.');
END;

-- ============================================================================
-- Trigger: Prevent negative sort_order
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_validate_sort_order
BEFORE INSERT ON scripts
FOR EACH ROW
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,'sort_order must be zero or greater.');
END;

-- ============================================================================
-- Trigger: Prevent negative sort_order on update
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS trg_scripts_validate_sort_order_update
BEFORE UPDATE OF sort_order ON scripts
FOR EACH ROW
WHEN NEW.sort_order < 0
BEGIN
    SELECT RAISE(ABORT,'sort_order must be zero or greater.');
END;