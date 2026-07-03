-- ==========================================================
-- File: books.view.sql
-- Schema: bookschema/books/
-- Description: Views for books table
-- Database: SQLite
-- ==========================================================

-- ==========================================================
-- Active Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_active AS
SELECT
    book_id,
    uuid,
    slug,
    original_title,
    original_language_id,
    country_id,
    first_publication_date,
    book_type,
    status,
    visibility,
    is_featured,
    is_trending,
    is_bestseller,
    created_at,
    updated_at
FROM books
WHERE
    deleted_at IS NULL
    AND status = 'published';

-- ==========================================================
-- Public Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_public AS
SELECT *
FROM v_books_active
WHERE visibility = 'public';

-- ==========================================================
-- Featured Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_featured AS
SELECT *
FROM v_books_public
WHERE is_featured = 1;

-- ==========================================================
-- Trending Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_trending AS
SELECT *
FROM v_books_public
WHERE is_trending = 1;

-- ==========================================================
-- Best Seller Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_bestsellers AS
SELECT *
FROM v_books_public
WHERE is_bestseller = 1;

-- ==========================================================
-- AI Generated Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_ai_generated AS
SELECT *
FROM v_books_public
WHERE is_ai_generated = 1;

-- ==========================================================
-- Draft Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_drafts AS
SELECT *
FROM books
WHERE
    status = 'draft'
    AND deleted_at IS NULL;

-- ==========================================================
-- Archived Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_archived AS
SELECT *
FROM books
WHERE
    status = 'archived'
    AND deleted_at IS NULL;

-- ==========================================================
-- Recently Published Books
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_recent AS
SELECT *
FROM v_books_public
ORDER BY published_at DESC;

-- ==========================================================
-- Books Ready for Search
-- ==========================================================

CREATE VIEW IF NOT EXISTS v_books_search AS
SELECT
    book_id,
    uuid,
    slug,
    original_title,
    short_description,
    search_keywords,
    original_language_id,
    status,
    visibility
FROM books
WHERE
    deleted_at IS NULL
    AND status = 'published'
    AND visibility = 'public';