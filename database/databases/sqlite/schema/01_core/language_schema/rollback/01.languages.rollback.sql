-- ============================================================================
-- File: 01.languages.rollback.sql
-- Schema: language_schema
-- Purpose: Rollback Language Schema
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

-- ============================================================================
-- DROP VIEWS
-- ============================================================================

DROP VIEW IF EXISTS vw_language_regions;
DROP VIEW IF EXISTS vw_language_names;
DROP VIEW IF EXISTS vw_scripts;
DROP VIEW IF EXISTS vw_languages;

-- ============================================================================
-- DROP TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS trg_languages_updated_at;
DROP TRIGGER IF EXISTS trg_scripts_updated_at;
DROP TRIGGER IF EXISTS trg_language_names_updated_at;
DROP TRIGGER IF EXISTS trg_language_regions_updated_at;

-- ============================================================================
-- DROP TABLES
-- (Drop child tables first)
-- ============================================================================

DROP TABLE IF EXISTS language_regions;
DROP TABLE IF EXISTS language_names;
DROP TABLE IF EXISTS scripts;
DROP TABLE IF EXISTS languages;

COMMIT;

PRAGMA foreign_keys = ON;

-- ============================================================================
-- End of Rollback
-- ============================================================================