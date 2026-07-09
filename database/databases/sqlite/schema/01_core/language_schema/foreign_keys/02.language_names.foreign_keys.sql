-- ============================================================================
-- File: 02.language_names.foreign_keys.sql
-- Schema: language_schema
-- Table : language_names
-- Purpose: Foreign key definitions for language_names
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

/*

language_names
---------------

language_name_id      INTEGER PRIMARY KEY AUTOINCREMENT,

language_id           INTEGER NOT NULL,
display_language_id   INTEGER NOT NULL,

language_name         TEXT NOT NULL,
native_name           TEXT,
short_name            TEXT,

is_official           INTEGER DEFAULT 0,
is_preferred          INTEGER DEFAULT 1,

created_at            TEXT DEFAULT CURRENT_TIMESTAMP,
updated_at            TEXT DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (language_id)
    REFERENCES languages(language_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

FOREIGN KEY (display_language_id)
    REFERENCES languages(language_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE

*/

-- ============================================================================
-- Notes
-- ============================================================================
--
-- language_id
--      -> The language being translated.
--
-- display_language_id
--      -> The language in which the name is written.
--
-- Example
-- ---------------------------------------------------------------------------
-- language_id = English
-- display_language_id = Hindi
-- language_name = अंग्रेज़ी
--
-- language_id = Hindi
-- display_language_id = English
-- language_name = Hindi
--
-- language_id = Japanese
-- display_language_id = French
-- language_name = Japonais
--
-- ============================================================================
-- End of File
-- ============================================================================