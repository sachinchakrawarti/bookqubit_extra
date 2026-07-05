-- ==========================================================
-- File: books.index.sql
-- Schema: bookschema/books/
-- Description: Indexes for books table
-- Database: SQLite
-- ==========================================================

-- ----------------------------------------------------------
-- Primary Search
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_original_title
ON books(original_title);

CREATE INDEX IF NOT EXISTS idx_books_slug
ON books(slug);

CREATE INDEX IF NOT EXISTS idx_books_uuid
ON books(uuid);

-- ----------------------------------------------------------
-- Language & Geography
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_original_language
ON books(original_language_id);

CREATE INDEX IF NOT EXISTS idx_books_country
ON books(country_id);

-- ----------------------------------------------------------
-- Publication
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_publication_date
ON books(first_publication_date);

CREATE INDEX IF NOT EXISTS idx_books_copyright_year
ON books(copyright_year);

CREATE INDEX IF NOT EXISTS idx_books_published_at
ON books(published_at);

-- ----------------------------------------------------------
-- ISBN
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_isbn10
ON books(isbn10);

CREATE INDEX IF NOT EXISTS idx_books_isbn13
ON books(isbn13);

-- ----------------------------------------------------------
-- Status
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_status
ON books(status);

CREATE INDEX IF NOT EXISTS idx_books_visibility
ON books(visibility);

CREATE INDEX IF NOT EXISTS idx_books_book_type
ON books(book_type);

-- ----------------------------------------------------------
-- Boolean Flags
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_featured
ON books(is_featured);

CREATE INDEX IF NOT EXISTS idx_books_trending
ON books(is_trending);

CREATE INDEX IF NOT EXISTS idx_books_bestseller
ON books(is_bestseller);

CREATE INDEX IF NOT EXISTS idx_books_adult
ON books(is_adult);

CREATE INDEX IF NOT EXISTS idx_books_ai_generated
ON books(is_ai_generated);

-- ----------------------------------------------------------
-- Dates
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_created_at
ON books(created_at);

CREATE INDEX IF NOT EXISTS idx_books_updated_at
ON books(updated_at);

CREATE INDEX IF NOT EXISTS idx_books_deleted_at
ON books(deleted_at);

-- ----------------------------------------------------------
-- Composite Indexes
-- ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_books_status_visibility
ON books(status, visibility);

CREATE INDEX IF NOT EXISTS idx_books_language_status
ON books(original_language_id, status);

CREATE INDEX IF NOT EXISTS idx_books_country_status
ON books(country_id, status);

CREATE INDEX IF NOT EXISTS idx_books_type_status
ON books(book_type, status);

CREATE INDEX IF NOT EXISTS idx_books_featured_status
ON books(is_featured, status);

CREATE INDEX IF NOT EXISTS idx_books_trending_status
ON books(is_trending, status);

CREATE INDEX IF NOT EXISTS idx_books_bestseller_status
ON books(is_bestseller, status);

CREATE INDEX IF NOT EXISTS idx_books_publication_status
ON books(first_publication_date, status);

CREATE INDEX IF NOT EXISTS idx_books_visibility_status
ON books(visibility, status);