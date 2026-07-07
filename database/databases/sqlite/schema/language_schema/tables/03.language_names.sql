-- ============================================================================
-- File: 03.language_names.sql
-- Schema: language_schema
-- Table: language_names
-- Database: SQLite
-- ============================================================================

CREATE TABLE IF NOT EXISTS language_names
(
    language_name_id      INTEGER PRIMARY KEY AUTOINCREMENT,

    language_id           INTEGER NOT NULL,

    display_language_id   INTEGER NOT NULL,

    language_name         TEXT NOT NULL,

    native_name           TEXT,

    short_name            TEXT,

    is_preferred          INTEGER NOT NULL DEFAULT 1
                          CHECK(is_preferred IN (0,1)),

    is_official           INTEGER NOT NULL DEFAULT 1
                          CHECK(is_official IN (0,1)),

    is_active             INTEGER NOT NULL DEFAULT 1
                          CHECK(is_active IN (0,1)),

    created_at            TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at            TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(language_id, display_language_id),

    FOREIGN KEY (language_id)
        REFERENCES languages(language_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (display_language_id)
        REFERENCES languages(language_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);