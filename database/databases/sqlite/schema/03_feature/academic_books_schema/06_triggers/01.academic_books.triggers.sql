-- =============================================
-- Triggers for: Academic Books Tables
-- Description: Data integrity, automation, and business logic triggers
-- =============================================

-- =============================================
-- 1. ACADEMIC BOOKS TRIGGERS
-- =============================================

-- 1.1 Update timestamp on book update
CREATE TRIGGER IF NOT EXISTS tr_academic_books_update_timestamp
AFTER UPDATE ON academic_books
BEGIN
    UPDATE academic_books 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 1.2 Validate ISBN-13 checksum before insert
CREATE TRIGGER IF NOT EXISTS tr_academic_books_validate_isbn
BEFORE INSERT ON academic_books
WHEN NEW.isbn IS NOT NULL
BEGIN
    SELECT CASE
        WHEN NOT is_valid_isbn13(NEW.isbn)
        THEN RAISE(ABORT, 'Invalid ISBN-13 checksum')
    END;
END;

-- 1.3 Validate DOI format before insert
CREATE TRIGGER IF NOT EXISTS tr_academic_books_validate_doi
BEFORE INSERT ON academic_books
WHEN NEW.doi IS NOT NULL
BEGIN
    SELECT CASE
        WHEN NOT is_valid_doi(NEW.doi)
        THEN RAISE(ABORT, 'Invalid DOI format')
    END;
END;

-- 1.4 Validate ISBN-10 conversion
CREATE TRIGGER IF NOT EXISTS tr_academic_books_validate_isbn10
BEFORE INSERT ON academic_books
WHEN NEW.isbn10 IS NOT NULL
BEGIN
    SELECT CASE
        WHEN length(NEW.isbn10) != 10 OR NEW.isbn10 NOT GLOB '[0-9]*'
        THEN RAISE(ABORT, 'Invalid ISBN-10 format')
    END;
END;

-- 1.5 Prevent duplicate ISBN
CREATE TRIGGER IF NOT EXISTS tr_academic_books_prevent_duplicate_isbn
BEFORE INSERT ON academic_books
BEGIN
    SELECT CASE
        WHEN NEW.isbn IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_books WHERE isbn = NEW.isbn AND id != NEW.id)
        THEN RAISE(ABORT, 'ISBN already exists')
    END;
END;

-- 1.6 Prevent duplicate DOI
CREATE TRIGGER IF NOT EXISTS tr_academic_books_prevent_duplicate_doi
BEFORE INSERT ON academic_books
BEGIN
    SELECT CASE
        WHEN NEW.doi IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_books WHERE doi = NEW.doi AND id != NEW.id)
        THEN RAISE(ABORT, 'DOI already exists')
    END;
END;

-- =============================================
-- 2. ACADEMIC SUBJECTS TRIGGERS
-- =============================================

-- 2.1 Update timestamp on subject update
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_update_timestamp
AFTER UPDATE ON academic_subjects
BEGIN
    UPDATE academic_subjects 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 2.2 Auto-calculate subject level on insert
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_calculate_level
BEFORE INSERT ON academic_subjects
BEGIN
    UPDATE academic_subjects
    SET level = (
        SELECT COALESCE(MAX(level), 0) + 1
        FROM academic_subjects
        WHERE id = NEW.parent_id
    )
    WHERE id = NEW.id AND NEW.parent_id IS NOT NULL;
END;

-- 2.3 Prevent duplicate subject code
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_prevent_duplicate_code
BEFORE INSERT ON academic_subjects
BEGIN
    SELECT CASE
        WHEN NEW.code IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_subjects WHERE code = NEW.code AND id != NEW.id)
        THEN RAISE(ABORT, 'Subject code already exists')
    END;
END;

-- 2.4 Prevent circular reference in subject hierarchy
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_prevent_circular
BEFORE INSERT ON academic_subjects
BEGIN
    SELECT CASE
        WHEN NEW.parent_id IS NOT NULL AND 
             EXISTS (
                WITH RECURSIVE ancestors AS (
                    SELECT parent_id FROM academic_subjects WHERE id = NEW.parent_id
                    UNION ALL
                    SELECT s.parent_id FROM academic_subjects s
                    INNER JOIN ancestors a ON s.id = a.parent_id
                    WHERE s.parent_id IS NOT NULL
                )
                SELECT 1 FROM ancestors WHERE parent_id = NEW.id
             )
        THEN RAISE(ABORT, 'Circular reference detected in subject hierarchy')
    END;
END;

-- =============================================
-- 3. ACADEMIC AUTHORS TRIGGERS
-- =============================================

-- 3.1 Update timestamp on author update
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_update_timestamp
AFTER UPDATE ON academic_authors
BEGIN
    UPDATE academic_authors 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 3.2 Validate ORCID format
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_validate_orcid
BEFORE INSERT ON academic_authors
WHEN NEW.orcid IS NOT NULL
BEGIN
    SELECT CASE
        WHEN NOT is_valid_orcid(NEW.orcid)
        THEN RAISE(ABORT, 'Invalid ORCID format')
    END;
END;

-- 3.3 Validate email format
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_validate_email
BEFORE INSERT ON academic_authors
WHEN NEW.email IS NOT NULL
BEGIN
    SELECT CASE
        WHEN NOT is_valid_email(NEW.email)
        THEN RAISE(ABORT, 'Invalid email format')
    END;
END;

-- 3.4 Prevent duplicate ORCID
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_prevent_duplicate_orcid
BEFORE INSERT ON academic_authors
BEGIN
    SELECT CASE
        WHEN NEW.orcid IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_authors WHERE orcid = NEW.orcid AND id != NEW.id)
        THEN RAISE(ABORT, 'ORCID already exists')
    END;
END;

-- 3.5 Prevent duplicate email
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_prevent_duplicate_email
BEFORE INSERT ON academic_authors
BEGIN
    SELECT CASE
        WHEN NEW.email IS NOT NULL AND 
             EXISTS (SELECT 1 FROM academic_authors WHERE email = NEW.email AND id != NEW.id)
        THEN RAISE(ABORT, 'Email already exists')
    END;
END;

-- =============================================
-- 4. ACADEMIC BOOK AUTHORS TRIGGERS
-- =============================================

-- 4.1 Auto-set author order on insert
CREATE TRIGGER IF NOT EXISTS tr_academic_book_authors_set_order
BEFORE INSERT ON academic_book_authors
BEGIN
    UPDATE academic_book_authors
    SET author_order = (
        SELECT COALESCE(MAX(author_order), 0) + 1
        FROM academic_book_authors
        WHERE book_id = NEW.book_id
    )
    WHERE id = NEW.id;
END;

-- 4.2 Ensure at least one corresponding author
CREATE TRIGGER IF NOT EXISTS tr_academic_book_authors_ensure_corresponding
BEFORE INSERT ON academic_book_authors
WHEN NEW.is_corresponding = 0
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (
            SELECT 1 FROM academic_book_authors 
            WHERE book_id = NEW.book_id 
            AND is_corresponding = 1
        )
        THEN RAISE(ABORT, 'At least one corresponding author is required')
    END;
END;

-- 4.3 Reorder authors on delete
CREATE TRIGGER IF NOT EXISTS tr_academic_book_authors_reorder_on_delete
AFTER DELETE ON academic_book_authors
BEGIN
    UPDATE academic_book_authors
    SET author_order = author_order - 1
    WHERE book_id = OLD.book_id
    AND author_order > OLD.author_order;
END;

-- =============================================
-- 5. ACADEMIC CITATIONS TRIGGERS
-- =============================================

-- 5.1 Prevent self-citation
CREATE TRIGGER IF NOT EXISTS tr_academic_citations_prevent_self
BEFORE INSERT ON academic_citations
BEGIN
    SELECT CASE
        WHEN NEW.citing_book_id = NEW.cited_book_id
        THEN RAISE(ABORT, 'Cannot cite the same book')
    END;
END;

-- 5.2 Prevent duplicate citation
CREATE TRIGGER IF NOT EXISTS tr_academic_citations_prevent_duplicate
BEFORE INSERT ON academic_citations
BEGIN
    SELECT CASE
        WHEN EXISTS (
            SELECT 1 FROM academic_citations 
            WHERE citing_book_id = NEW.citing_book_id 
            AND cited_book_id = NEW.cited_book_id
        )
        THEN RAISE(ABORT, 'Citation already exists')
    END;
END;

-- =============================================
-- 6. ACADEMIC REVIEWS TRIGGERS
-- =============================================

-- 6.1 Update timestamp on review update
CREATE TRIGGER IF NOT EXISTS tr_academic_reviews_update_timestamp
AFTER UPDATE ON academic_reviews
BEGIN
    UPDATE academic_reviews 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 6.2 Validate rating range
CREATE TRIGGER IF NOT EXISTS tr_academic_reviews_validate_rating
BEFORE INSERT ON academic_reviews
WHEN NEW.rating IS NOT NULL
BEGIN
    SELECT CASE
        WHEN NEW.rating < 0 OR NEW.rating > 5
        THEN RAISE(ABORT, 'Rating must be between 0 and 5')
    END;
END;

-- 6.3 Prevent multiple reviews from same reviewer
CREATE TRIGGER IF NOT EXISTS tr_academic_reviews_prevent_duplicate
BEFORE INSERT ON academic_reviews
BEGIN
    SELECT CASE
        WHEN NEW.reviewer_name IS NOT NULL AND 
             EXISTS (
                SELECT 1 FROM academic_reviews 
                WHERE book_id = NEW.book_id 
                AND reviewer_name = NEW.reviewer_name
             )
        THEN RAISE(ABORT, 'Reviewer already reviewed this book')
    END;
END;