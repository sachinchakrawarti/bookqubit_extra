-- ==========================================================
-- File: book_translations.sql
-- Schema: bookschema/book_translations/
-- Description: Multilingual translations for books
-- Database: SQLite
-- ==========================================================

CREATE TABLE IF NOT EXISTS book_translations (

    translation_id          INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Relationship
    book_id                 INTEGER NOT NULL,

    -- Language
    language_id             INTEGER NOT NULL,

    -- Localized Content
    title                   TEXT NOT NULL,
    subtitle                TEXT,
    short_description       TEXT,
    description             TEXT,

    -- SEO
    slug                    TEXT NOT NULL,
    meta_title              TEXT,
    meta_description        TEXT,
    meta_keywords           TEXT,

    -- Search
    search_keywords         TEXT,

    -- Translation Information
    translator_name         TEXT,
    translation_version     TEXT DEFAULT '1.0',
    is_machine_translation  INTEGER NOT NULL DEFAULT 0,
    is_verified             INTEGER NOT NULL DEFAULT 0,

    -- Status
    status                  TEXT NOT NULL DEFAULT 'published',

    -- Timestamps
    created_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    UNIQUE(book_id, language_id),
    UNIQUE(slug),

    FOREIGN KEY (book_id)
        REFERENCES books(book_id)
        ON DELETE CASCADE,

    FOREIGN KEY (language_id)
        REFERENCES languages(language_id),

    CHECK (
        status IN (
            'draft',
            'review',
            'published',
            'archived'
        )
    ),

    CHECK (
        is_machine_translation IN (0,1)
    ),

    CHECK (
        is_verified IN (0,1)
    )
);