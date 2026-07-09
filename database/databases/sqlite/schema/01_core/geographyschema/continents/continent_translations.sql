-- ============================================================
-- BookQubit Database
-- Schema      : Geography
-- Module      : Continents
-- Table       : continent_translations
-- Description : Multilingual translations for continents
-- Version     : 1.0.0
-- ============================================================

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS continent_translations (

    -- Primary Key
    continent_translation_id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Relationships
    continent_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,

    -- Names
    official_name TEXT NOT NULL,
    common_name TEXT,
    native_name TEXT,
    short_name TEXT,

    -- Romanization
    romanized_name TEXT,
    romanized_official_name TEXT,

    -- SEO
    slug TEXT NOT NULL,

    -- Search
    search_keywords TEXT,

    -- Localization
    locale TEXT,
    script TEXT,
    text_direction TEXT DEFAULT 'LTR'
        CHECK(text_direction IN ('LTR','RTL')),

    -- Translation Information
    translation_source TEXT,
    translator TEXT,
    translation_version TEXT,

    -- Flags
    is_default INTEGER NOT NULL DEFAULT 0
        CHECK(is_default IN (0,1)),

    is_official INTEGER NOT NULL DEFAULT 1
        CHECK(is_official IN (0,1)),

    is_verified INTEGER NOT NULL DEFAULT 0
        CHECK(is_verified IN (0,1)),

    is_active INTEGER NOT NULL DEFAULT 1
        CHECK(is_active IN (0,1)),

    -- Metadata
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Relationships
    FOREIGN KEY (continent_id)
        REFERENCES continents(continent_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (language_id)
        REFERENCES languages(language_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    -- Constraints
    UNIQUE(continent_id, language_id),

    UNIQUE(language_id, slug)
);