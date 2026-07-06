-- =============================================================================
-- BookQubit Database
-- Schema: Language Schema
-- Table: languages
-- File: languages.trigger.sql
-- Description: Triggers for languages
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Remove Existing Triggers
-- ============================================================================

DROP TRIGGER IF EXISTS trg_languages_validate_name;

-- ============================================================================
-- Prevent Empty Language Name
-- ============================================================================

CREATE TRIGGER trg_languages_validate_name
BEFORE INSERT ON languages
FOR EACH ROW
WHEN TRIM(NEW.name) = ''
BEGIN
    SELECT RAISE(ABORT, 'Language name cannot be empty.');
END;