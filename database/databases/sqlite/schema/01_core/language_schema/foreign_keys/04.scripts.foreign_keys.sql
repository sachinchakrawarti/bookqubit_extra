-- ============================================================================
-- File: 04.scripts.foreign_keys.sql
-- Schema: language_schema
-- Table : scripts
-- Purpose: Foreign key definitions for scripts
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

/*

scripts
-------

script_id              INTEGER PRIMARY KEY AUTOINCREMENT,

iso15924_code          TEXT NOT NULL,
script_code            TEXT,
script_name            TEXT NOT NULL,
native_name            TEXT,

direction              TEXT DEFAULT 'LTR',

unicode_start          TEXT,
unicode_end            TEXT,

is_active              INTEGER DEFAULT 1,

created_at             TEXT DEFAULT CURRENT_TIMESTAMP,
updated_at             TEXT DEFAULT CURRENT_TIMESTAMP

*/

-- ============================================================================
-- Notes
-- ============================================================================

-- The scripts table is a master/reference table.
-- It does not reference any other tables.

-- Other tables reference scripts.script_id, for example:
--
-- languages.default_script_id
-- language_names.script_id
-- writing_systems.script_id
-- transliterations.script_id
-- romanizations.script_id
--
-- Therefore, this table contains NO FOREIGN KEY constraints.

-- ============================================================================
-- Future References
-- ============================================================================
--
-- languages
--     default_script_id
--         ─────────────► scripts.script_id
--
-- language_names
--     script_id
--         ─────────────► scripts.script_id
--
-- book_translations
--     script_id (optional)
--         ─────────────► scripts.script_id
--
-- author_translations
--     script_id (optional)
--         ─────────────► scripts.script_id
--
-- ============================================================================
-- End of File
-- ============================================================================