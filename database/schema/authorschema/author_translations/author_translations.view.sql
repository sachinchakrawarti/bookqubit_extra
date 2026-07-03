-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: author_translations
-- File: author_translations.view.sql
-- Description: Views for author_translations
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Drop Existing Views
-- ============================================================================

DROP VIEW IF EXISTS v_author_translations;
DROP VIEW IF EXISTS v_author_names;

-- ============================================================================
-- All Author Translations
-- ============================================================================

CREATE VIEW v_author_translations AS
SELECT
    at.translation_id,
    at.author_id,
    a.uuid,
    a.slug,
    at.language_code,
    at.name,
    at.created_at
FROM author_translations AS at
JOIN authors AS a
ON at.author_id = a.author_id;

-- ============================================================================
-- Author Names
-- ============================================================================

CREATE VIEW v_author_names AS
SELECT
    author_id,
    language_code,
    name
FROM author_translations;