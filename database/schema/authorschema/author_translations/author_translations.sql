-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: author_translations
-- File: author_translations.sql
-- Description: Multilingual author names
-- Database: SQLite
-- =============================================================================

DROP TABLE IF EXISTS author_translations;

CREATE TABLE author_translations (

    translation_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id           INTEGER NOT NULL,
    language_code       TEXT NOT NULL,
    name                TEXT NOT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (author_id)
        REFERENCES authors(author_id)
        ON DELETE CASCADE,

    UNIQUE(author_id, language_code)

);