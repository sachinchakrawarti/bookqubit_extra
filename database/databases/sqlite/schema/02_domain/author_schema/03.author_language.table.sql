-- ============================================================================
-- File       : 03.author_language.table.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Stores languages known or used by an author.
-- ============================================================================

CREATE TABLE IF NOT EXISTS author_language (

    -- Primary Key
    author_language_id    INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Reference to Author
    author_id             INTEGER NOT NULL,

    -- Language
    language_code         TEXT NOT NULL,

    -- Language Type
    -- native
    -- primary
    -- secondary
    -- spoken
    -- written
    language_type         TEXT DEFAULT 'primary',

    -- Proficiency
    -- beginner
    -- intermediate
    -- advanced
    -- fluent
    -- native
    proficiency           TEXT DEFAULT 'native',

    -- Audit
    created_at            TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at            TEXT DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    FOREIGN KEY (author_id)
        REFERENCES author(author_id)
        ON DELETE CASCADE,

    UNIQUE(author_id, language_code)
);