-- ==========================================================
-- File: books.sql
-- Schema: bookschema/books/
-- Description: Core Books Table
-- ==========================================================

CREATE TABLE IF NOT EXISTS books (
    book_id                 INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Identification
    uuid                    TEXT NOT NULL UNIQUE,
    slug                    TEXT NOT NULL UNIQUE,

    -- Original Book Information
    original_title          TEXT NOT NULL,
    original_language_id    INTEGER NOT NULL,

    -- Geography
    country_id              INTEGER,

    -- Publishing
    first_publication_date  DATE,

    -- Classification
    book_type               TEXT NOT NULL DEFAULT 'book',

    -- Content
    description             TEXT,
    short_description       TEXT,

    -- ISBN
    isbn10                  TEXT UNIQUE,
    isbn13                  TEXT UNIQUE,

    -- Pages
    page_count              INTEGER,

    -- Reading
    reading_time_minutes    INTEGER,

    -- Copyright
    copyright_year          INTEGER,

    -- Status
    status                  TEXT NOT NULL DEFAULT 'published',

    -- Visibility
    visibility              TEXT NOT NULL DEFAULT 'public',

    -- Adult Content
    is_adult                INTEGER NOT NULL DEFAULT 0,

    -- Featured
    is_featured             INTEGER NOT NULL DEFAULT 0,

    -- Trending
    is_trending             INTEGER NOT NULL DEFAULT 0,

    -- Bestseller
    is_bestseller           INTEGER NOT NULL DEFAULT 0,

    -- Series
    has_series              INTEGER NOT NULL DEFAULT 0,

    -- AI Generated
    is_ai_generated         INTEGER NOT NULL DEFAULT 0,

    -- Search
    search_keywords         TEXT,

    -- Metadata
    created_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at            DATETIME,

    -- Soft Delete
    deleted_at              DATETIME,

    -- Foreign Keys
    FOREIGN KEY (original_language_id)
        REFERENCES languages(language_id),

    FOREIGN KEY (country_id)
        REFERENCES countries(country_id),

    CHECK (page_count >= 0),
    CHECK (reading_time_minutes >= 0),
    CHECK (copyright_year >= 0),

    CHECK (
        status IN (
            'draft',
            'review',
            'scheduled',
            'published',
            'archived'
        )
    ),

    CHECK (
        visibility IN (
            'public',
            'private',
            'unlisted'
        )
    ),

    CHECK (
        book_type IN (
            'book',
            'ebook',
            'audiobook',
            'comic',
            'magazine',
            'journal',
            'research',
            'thesis'
        )
    )
);