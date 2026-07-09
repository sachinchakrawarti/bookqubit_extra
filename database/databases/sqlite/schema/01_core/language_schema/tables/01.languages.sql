-- ============================================================================
-- File: 01.languages.sql
-- Schema: language_schema
-- Table: languages
-- Database: SQLite
-- ============================================================================

CREATE TABLE IF NOT EXISTS languages
(
    language_id            INTEGER PRIMARY KEY AUTOINCREMENT,

    language_code          TEXT NOT NULL UNIQUE,

    language_name          TEXT NOT NULL,

    english_name           TEXT NOT NULL,

    native_name            TEXT NOT NULL,

    iso_639_1              TEXT UNIQUE,

    iso_639_2              TEXT UNIQUE,

    iso_639_3              TEXT UNIQUE,

    locale_code            TEXT UNIQUE,

    default_script_id      INTEGER,

    direction              TEXT NOT NULL DEFAULT 'LTR'
                           CHECK(direction IN ('LTR','RTL')),

    sort_order             INTEGER NOT NULL DEFAULT 0,

    is_default             INTEGER NOT NULL DEFAULT 0
                           CHECK(is_default IN (0,1)),

    is_active              INTEGER NOT NULL DEFAULT 1
                           CHECK(is_active IN (0,1)),

    created_at             TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at             TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (default_script_id)
        REFERENCES scripts(script_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);