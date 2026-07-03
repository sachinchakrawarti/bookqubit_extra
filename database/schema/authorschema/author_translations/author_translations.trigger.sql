-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: author_translations
-- File: author_translations.trigger.sql
-- Description: Triggers for author_translations
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Remove Existing Triggers
-- ============================================================================

DROP TRIGGER IF EXISTS trg_author_translations_validate_name;

-- ============================================================================
-- Prevent Empty Author Name
-- ============================================================================

CREATE TRIGGER trg_author_translations_validate_name
BEFORE INSERT ON author_translations
FOR EACH ROW
WHEN TRIM(NEW.name) = ''
BEGIN
    SELECT RAISE(ABORT, 'Author name cannot be empty.');
END;