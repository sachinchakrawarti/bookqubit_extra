-- ============================================================================
-- File: 04.language_regions.sql
-- Schema: language_schema
-- Table: language_regions
-- Database: SQLite
-- ============================================================================

CREATE TABLE IF NOT EXISTS language_regions
(
    language_region_id     INTEGER PRIMARY KEY AUTOINCREMENT,

    language_id            INTEGER NOT NULL,

    country_id             INTEGER NOT NULL,

    is_official            INTEGER NOT NULL DEFAULT 0
                           CHECK(is_official IN (0,1)),

    is_primary             INTEGER NOT NULL DEFAULT 0
                           CHECK(is_primary IN (0,1)),

    speaker_population     INTEGER DEFAULT 0
                           CHECK(speaker_population >= 0),

    literacy_rate          REAL
                           CHECK(literacy_rate BETWEEN 0 AND 100),

    notes                  TEXT,

    created_at             TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at             TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(language_id, country_id),

    FOREIGN KEY (language_id)
        REFERENCES languages(language_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);