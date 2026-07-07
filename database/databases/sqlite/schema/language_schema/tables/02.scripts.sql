-- ============================================================================
-- File: 02.scripts.sql
-- Schema: language_schema
-- Table: scripts
-- Database: SQLite
-- ============================================================================

CREATE TABLE IF NOT EXISTS scripts
(
    script_id             INTEGER PRIMARY KEY AUTOINCREMENT,

    script_code           TEXT NOT NULL UNIQUE,

    iso15924_code         TEXT NOT NULL UNIQUE,

    script_name           TEXT NOT NULL,

    native_name           TEXT,

    direction             TEXT NOT NULL DEFAULT 'LTR'
                           CHECK(direction IN ('LTR','RTL')),

    unicode_range         TEXT,

    sort_order            INTEGER NOT NULL DEFAULT 0,

    is_active             INTEGER NOT NULL DEFAULT 1
                           CHECK(is_active IN (0,1)),

    created_at            TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at            TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);