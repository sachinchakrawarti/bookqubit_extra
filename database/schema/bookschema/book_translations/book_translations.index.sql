-- ==========================================================
-- File: book_translations.index.sql
-- Schema: bookschema/book_translations/
-- Description: Indexes for book_translations table
-- Database: SQLite
-- ==========================================================

-- ==========================================================
-- Book
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_book
ON book_translations(book_id);

-- ==========================================================
-- Language
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_language
ON book_translations(language_id);

-- ==========================================================
-- Title
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_title
ON book_translations(title);

-- ==========================================================
-- Status
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_status
ON book_translations(status);

-- ==========================================================
-- Verification
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_verified
ON book_translations(is_verified);

CREATE INDEX IF NOT EXISTS idx_book_translations_machine_translation
ON book_translations(is_machine_translation);

-- ==========================================================
-- Dates
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_created_at
ON book_translations(created_at);

CREATE INDEX IF NOT EXISTS idx_book_translations_updated_at
ON book_translations(updated_at);

-- ==========================================================
-- Composite Indexes
-- ==========================================================

CREATE INDEX IF NOT EXISTS idx_book_translations_language_status
ON book_translations(language_id, status);

CREATE INDEX IF NOT EXISTS idx_book_translations_book_status
ON book_translations(book_id, status);

CREATE INDEX IF NOT EXISTS idx_book_translations_language_verified
ON book_translations(language_id, is_verified);

CREATE INDEX IF NOT EXISTS idx_book_translations_book_language_verified
ON book_translations(book_id, language_id, is_verified);

CREATE INDEX IF NOT EXISTS idx_book_translations_status_created
ON book_translations(status, created_at);