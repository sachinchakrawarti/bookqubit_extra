-- =============================================================================
-- BookQubit Database
-- Schema: Language Schema
-- Table: languages
-- File: languages.sql
-- Description: Supported languages
-- Database: SQLite
-- =============================================================================

DROP TABLE IF EXISTS languages;

CREATE TABLE languages (

    language_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    code           TEXT NOT NULL UNIQUE,
    name           TEXT NOT NULL,
    status         TEXT DEFAULT 'active',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP

);