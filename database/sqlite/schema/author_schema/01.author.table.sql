-- ============================================================================
-- File       : 01.author.table.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Creates the primary author table.
-- ============================================================================

CREATE TABLE IF NOT EXISTS author (

    -- Primary Key
    author_id               INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Basic Information
    slug                    TEXT NOT NULL,
    full_name               TEXT NOT NULL,
    display_name            TEXT,
    sort_name               TEXT,

    -- Personal Information
    gender                  TEXT,
    birth_date              TEXT,
    death_date              TEXT,
    nationality             TEXT,

    -- Biography
    biography               TEXT,
    short_biography         TEXT,

    -- Profile Images
    profile_image_url       TEXT,
    cover_image_url         TEXT,

    -- Contact
    website                 TEXT,
    email                   TEXT,

    -- Social Media
    facebook_url            TEXT,
    twitter_url             TEXT,
    instagram_url           TEXT,
    youtube_url             TEXT,
    linkedin_url            TEXT,
    wikipedia_url           TEXT,

    -- Statistics
    books_count             INTEGER DEFAULT 0,
    followers_count         INTEGER DEFAULT 0,
    views_count             INTEGER DEFAULT 0,
    average_rating          REAL DEFAULT 0,
    ratings_count           INTEGER DEFAULT 0,

    -- Status
    is_verified             INTEGER DEFAULT 0,
    is_featured             INTEGER DEFAULT 0,
    is_active               INTEGER DEFAULT 1,
    is_deleted              INTEGER DEFAULT 0,

    -- SEO
    meta_title              TEXT,
    meta_description        TEXT,
    meta_keywords           TEXT,

    -- Audit
    created_at              TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at              TEXT DEFAULT CURRENT_TIMESTAMP,
    deleted_at              TEXT
);