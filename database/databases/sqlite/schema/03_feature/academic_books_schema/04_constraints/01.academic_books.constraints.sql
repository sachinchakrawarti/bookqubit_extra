-- =============================================
-- Constraints for: academic_books table
-- Description: Data integrity rules for academic books
-- =============================================

-- =============================================
-- 1. NOT NULL CONSTRAINTS
-- =============================================

ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_title_not_null 
    CHECK (title IS NOT NULL AND length(trim(title)) > 0);

-- =============================================
-- 2. CHECK CONSTRAINTS FOR DATA VALIDATION
-- =============================================

-- 2.1 Title length validation
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_title_length 
    CHECK (length(trim(title)) >= 1 AND length(trim(title)) <= 500);

-- 2.2 Subtitle length validation
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_subtitle_length 
    CHECK (subtitle IS NULL OR length(trim(subtitle)) <= 500);

-- 2.3 Series length validation
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_series_length 
    CHECK (series IS NULL OR length(trim(series)) <= 200);

-- 2.4 Publication year validation (must be reasonable)
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_publication_year 
    CHECK (publication_year IS NULL OR (publication_year >= 1000 AND publication_year <= strftime('%Y', 'now') + 5));

-- 2.5 Edition name length validation
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_edition_length 
    CHECK (edition IS NULL OR length(trim(edition)) <= 50);

-- 2.6 Volume must be positive
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_volume_positive 
    CHECK (volume IS NULL OR volume >= 1);

-- 2.7 Pages must be positive
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_pages_positive 
    CHECK (pages IS NULL OR pages >= 0);

-- 2.8 Price must be non-negative
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_price_non_negative 
    CHECK (price IS NULL OR price >= 0);

-- 2.9 Sort order must be non-negative
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_sort_order_positive 
    CHECK (sort_order >= 0);

-- 2.10 Currency code validation
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_currency_code 
    CHECK (currency_code IS NULL OR length(trim(currency_code)) = 3);

-- =============================================
-- 3. ISBN VALIDATION CONSTRAINTS
-- =============================================

-- 3.1 ISBN-13 length validation (13 digits)
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_isbn_length 
    CHECK (isbn IS NULL OR length(trim(isbn)) = 13);

-- 3.2 ISBN-13 format validation (only digits)
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_isbn_format 
    CHECK (isbn IS NULL OR isbn GLOB '[0-9]*');

-- 3.3 ISBN-10 length validation (10 digits)
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_isbn10_length 
    CHECK (isbn10 IS NULL OR length(trim(isbn10)) = 10);

-- 3.4 DOI format validation
ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_doi_format 
    CHECK (doi IS NULL OR doi GLOB '10.*/*');

-- =============================================
-- 4. UNIQUE CONSTRAINTS (already defined in table)
-- =============================================

-- UNIQUE(isbn)
-- UNIQUE(isbn10)
-- UNIQUE(doi)

-- =============================================
-- 5. BOOLEAN VALIDATION
-- =============================================

ALTER TABLE academic_books ADD CONSTRAINT ck_academic_books_is_active_boolean 
    CHECK (is_active IN (0, 1));

-- =============================================
-- 6. FOREIGN KEY VALIDATION TRIGGERS
-- =============================================

-- 6.1 Validate language exists
CREATE TRIGGER IF NOT EXISTS tr_academic_books_validate_language
BEFORE INSERT ON academic_books
BEGIN
    SELECT CASE
        WHEN NEW.language_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM languages WHERE id = NEW.language_id AND is_active = 1)
        THEN RAISE(ABORT, 'Invalid or inactive language')
    END;
END;

-- 6.2 Validate publisher exists
CREATE TRIGGER IF NOT EXISTS tr_academic_books_validate_publisher
BEFORE INSERT ON academic_books
BEGIN
    SELECT CASE
        WHEN NEW.publisher_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM academic_publishers WHERE id = NEW.publisher_id AND is_active = 1)
        THEN RAISE(ABORT, 'Invalid or inactive publisher')
    END;
END;

-- =============================================
-- 7. DATA INTEGRITY CHECKS
-- =============================================

-- 7.1 Function to validate ISBN-13 checksum
CREATE FUNCTION IF NOT EXISTS is_valid_isbn13(isbn TEXT)
RETURNS BOOLEAN
BEGIN
    DECLARE i INTEGER;
    DECLARE sum INTEGER;
    DECLARE digit INTEGER;
    DECLARE checksum INTEGER;
    
    IF isbn IS NULL OR length(isbn) != 13 THEN
        RETURN 0;
    END IF;
    
    SET sum = 0;
    SET i = 1;
    
    WHILE i <= 13 DO
        SET digit = CAST(substr(isbn, i, 1) AS INTEGER);
        IF i % 2 = 0 THEN
            SET sum = sum + digit * 3;
        ELSE
            SET sum = sum + digit;
        END IF;
        SET i = i + 1;
    END WHILE;
    
    RETURN sum % 10 = 0;
END;

-- 7.2 Function to validate DOI format
CREATE FUNCTION IF NOT EXISTS is_valid_doi(doi TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN doi IS NOT NULL 
        AND length(doi) >= 4
        AND substr(doi, 1, 3) = '10.'
        AND instr(doi, '/') > 3;
END;

-- 7.3 Function to validate currency code
CREATE FUNCTION IF NOT EXISTS is_valid_currency_code(code TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN code IS NULL OR (length(code) = 3 AND code GLOB '[A-Z]*');
END;