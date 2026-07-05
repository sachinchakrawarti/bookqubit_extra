-- ============================================================================
-- File       : 04.author_translation.table.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Stores multilingual author information.
-- ============================================================================

CREATE TABLE IF NOT EXISTS author_translation (

    -- Primary Key
    author_translation_id    INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Reference to Author
    author_id                INTEGER NOT NULL,

    -- Language Code
    language_code            TEXT NOT NULL,

    -- Translated Fields
    name                     TEXT NOT NULL,
    biography                TEXT,
    nationality              TEXT,
    birth_place              TEXT,

    -- Audit
    created_at               TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at               TEXT DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    FOREIGN KEY (author_id)
        REFERENCES author(author_id)
        ON DELETE CASCADE,

    UNIQUE(author_id, language_code)
);