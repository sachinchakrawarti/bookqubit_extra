-- ============================================================================
-- File: 01.languages.foreign_keys.sql
-- Schema: language_schema
-- Table : languages
-- Purpose: Foreign key definitions for languages table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

-- The languages table is a master (parent) table.
-- It does not reference any other table.
--
-- Other tables reference languages.language_id, for example:
--
--   scripts_languages
--   language_names.language_id
--   language_names.display_language_id
--   language_regions.language_id
--   book_translations.language_id
--   author_translations.language_id
--   category_translations.language_id
--   tag_translations.language_id
--   publisher_translations.language_id
--   country_translations.language_id
--   city_translations.language_id
--
-- Therefore no FOREIGN KEY clauses are required here.

-- ============================================================================
-- End of File
-- ============================================================================