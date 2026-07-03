-- =============================================================================
-- BookQubit Database
-- Schema: Language Schema
-- Table: languages
-- File: languages.view.sql
-- Description: Views for languages
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Remove Existing Views
-- ============================================================================

DROP VIEW IF EXISTS v_languages;
DROP VIEW IF EXISTS v_active_languages;

-- ============================================================================
-- All Languages
-- ============================================================================

CREATE VIEW v_languages AS
SELECT
    language_id,
    code,
    name,
    status,
    created_at
FROM languages;

-- ============================================================================
-- Active Languages
-- ============================================================================

CREATE VIEW v_active_languages AS
SELECT
    language_id,
    code,
    name
FROM languages
WHERE status = 'active';