-- =============================================
-- Foreign Keys for: academic_authors table
-- Description: Define relationships for academic authors
-- =============================================

-- =============================================
-- 1. ACADEMIC BOOK AUTHORS FOREIGN KEYS
-- =============================================

-- These are already defined in 01.academic_books.foreign_keys.sql
-- Included here for completeness

-- 1.1 Foreign key from academic_book_authors to academic_authors
-- ALTER TABLE academic_book_authors ADD CONSTRAINT fk_academic_book_authors_author_id 
--     FOREIGN KEY (author_id) 
--     REFERENCES academic_authors(id) 
--     ON DELETE CASCADE 
--     ON UPDATE CASCADE;

-- =============================================
-- 2. VALIDATION TRIGGERS FOR AUTHORS
-- =============================================

-- 2.1 Trigger to validate ORCID uniqueness
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_validate_orcid
BEFORE INSERT ON academic_authors
BEGIN
    SELECT CASE
        WHEN NEW.orcid IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_authors WHERE orcid = NEW.orcid AND id != NEW.id)
        THEN RAISE(ABORT, 'ORCID must be unique')
    END;
END;

-- 2.2 Trigger to validate email uniqueness
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_validate_email
BEFORE INSERT ON academic_authors
BEGIN
    SELECT CASE
        WHEN NEW.email IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_authors WHERE email = NEW.email AND id != NEW.id)
        THEN RAISE(ABORT, 'Email must be unique')
    END;
END;

-- 2.3 Trigger to prevent deleting author with books
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_prevent_delete_books
BEFORE DELETE ON academic_authors
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM academic_book_authors WHERE author_id = OLD.id)
        THEN RAISE(ABORT, 'Cannot delete author with associated books')
    END;
END;

-- 2.4 Trigger to update author_order when authors change
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_update_order
AFTER INSERT ON academic_book_authors
BEGIN
    UPDATE academic_book_authors
    SET author_order = (
        SELECT COUNT(*) + 1
        FROM academic_book_authors
        WHERE book_id = NEW.book_id
        AND (author_order < NEW.author_order OR id <= NEW.id)
    )
    WHERE book_id = NEW.book_id AND id = NEW.id;
END;

-- 2.5 Trigger to reorder authors when one is removed
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_reorder
AFTER DELETE ON academic_book_authors
BEGIN
    UPDATE academic_book_authors
    SET author_order = author_order - 1
    WHERE book_id = OLD.book_id
    AND author_order > OLD.author_order;
END;

-- 2.6 Trigger to ensure at least one corresponding author
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_validate_corresponding
BEFORE UPDATE ON academic_book_authors
WHEN NEW.is_corresponding = 0
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (
            SELECT 1 FROM academic_book_authors 
            WHERE book_id = NEW.book_id 
            AND is_corresponding = 1 
            AND id != NEW.id
        )
        THEN RAISE(ABORT, 'At least one corresponding author is required')
    END;
END;