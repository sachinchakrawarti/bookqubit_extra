-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: author_translations
-- File: author_translations.index.sql
-- Description: Indexes for author_translations
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Primary Lookup
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_author_translations_author_id
ON author_translations(author_id);

CREATE INDEX IF NOT EXISTS idx_author_translations_language_code
ON author_translations(language_code);

CREATE INDEX IF NOT EXISTS idx_author_translations_name
ON author_translations(name);

-- ============================================================================
-- Composite Lookup
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_author_translations_author_language
ON author_translations(author_id, language_code);