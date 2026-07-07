-- ============================================================================
-- File: 05.language_aliases.sql
-- Schema: language_schema
-- Table: language_aliases
-- Database: SQLite
-- Purpose: Stores alternate names, spellings, abbreviations, historical names,
--          transliterations, and aliases for languages.
-- ============================================================================

CREATE TABLE IF NOT EXISTS language_aliases
(
    language_alias_id      INTEGER PRIMARY KEY AUTOINCREMENT,

    language_id            INTEGER NOT NULL,

    alias_name             TEXT NOT NULL,

    alias_type             TEXT NOT NULL DEFAULT 'alternative'
                           CHECK (
                               alias_type IN
                               (
                                   'alternative',
                                   'native',
                                   'historical',
                                   'abbreviation',
                                   'iso',
                                   'transliteration',
                                   'romanized',
                                   'common',
                                   'short'
                               )
                           ),

    language_code          TEXT,

    is_preferred           INTEGER NOT NULL DEFAULT 0
                           CHECK(is_preferred IN (0,1)),

    is_searchable          INTEGER NOT NULL DEFAULT 1
                           CHECK(is_searchable IN (0,1)),

    sort_order             INTEGER NOT NULL DEFAULT 0,

    notes                  TEXT,

    created_at             TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at             TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(language_id, alias_name),

    FOREIGN KEY (language_id)
        REFERENCES languages(language_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);