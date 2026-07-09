-- ==========================================================
-- File: books.trigger.sql
-- Schema: bookschema/books/
-- Description: Triggers for books table
-- Database: SQLite
-- ==========================================================

-- ==========================================================
-- Automatically update updated_at
-- ==========================================================

CREATE TRIGGER IF NOT EXISTS trg_books_updated_at
AFTER UPDATE ON books
FOR EACH ROW
WHEN OLD.updated_at = NEW.updated_at
BEGIN
    UPDATE books
    SET updated_at = CURRENT_TIMESTAMP
    WHERE book_id = NEW.book_id;
END;

-- ==========================================================
-- Generate published_at when first published
-- ==========================================================

CREATE TRIGGER IF NOT EXISTS trg_books_published_at
AFTER UPDATE OF status ON books
FOR EACH ROW
WHEN
    OLD.status <> 'published'
    AND NEW.status = 'published'
    AND NEW.published_at IS NULL
BEGIN
    UPDATE books
    SET published_at = CURRENT_TIMESTAMP
    WHERE book_id = NEW.book_id;
END;

-- ==========================================================
-- Prevent changing UUID
-- ==========================================================

CREATE TRIGGER IF NOT EXISTS trg_books_protect_uuid
BEFORE UPDATE OF uuid ON books
FOR EACH ROW
BEGIN
    SELECT
        RAISE(ABORT, 'Book UUID cannot be changed');
END;

-- ==========================================================
-- Prevent changing original language
-- ==========================================================

CREATE TRIGGER IF NOT EXISTS trg_books_protect_original_language
BEFORE UPDATE OF original_language_id ON books
FOR EACH ROW
BEGIN
    SELECT
        RAISE(ABORT, 'Original language cannot be changed');
END;

-- ==========================================================
-- Soft delete protection
-- ==========================================================

CREATE TRIGGER IF NOT EXISTS trg_books_prevent_restore_deleted
BEFORE UPDATE OF deleted_at ON books
FOR EACH ROW
WHEN
    OLD.deleted_at IS NOT NULL
    AND NEW.deleted_at IS NULL
BEGIN
    SELECT
        RAISE(ABORT, 'Restore books using dedicated restore procedure');
END;

-- ==========================================================
-- Prevent physical deletion
-- ==========================================================

CREATE TRIGGER IF NOT EXISTS trg_books_no_delete
BEFORE DELETE ON books
FOR EACH ROW
BEGIN
    SELECT
        RAISE(ABORT, 'Physical delete is not allowed. Use soft delete.');
END;