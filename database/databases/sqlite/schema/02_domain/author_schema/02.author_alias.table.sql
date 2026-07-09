-- ============================================================================
-- File       : 02.author_alias.table.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Stores author aliases, pen names, and alternate names.
-- ============================================================================

CREATE TABLE IF NOT EXISTS author_alias (

    -- Primary Key
    author_alias_id      INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Reference to Author
    author_id            INTEGER NOT NULL,

    -- Alias / Pen Name
    alias_name           TEXT NOT NULL,

    -- Alias Type
    -- Examples:
    -- pen_name
    -- pseudonym
    -- nickname
    -- alternate_name
    alias_type           TEXT DEFAULT 'alternate_name',

    -- Preferred Alias
    is_primary           INTEGER DEFAULT 0,

    -- Audit
    created_at           TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at           TEXT DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    FOREIGN KEY (author_id)
        REFERENCES author(author_id)
        ON DELETE CASCADE,

    UNIQUE(author_id, alias_name)
);