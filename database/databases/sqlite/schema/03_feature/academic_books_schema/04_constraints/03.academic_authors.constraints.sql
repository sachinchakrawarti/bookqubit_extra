-- =============================================
-- Constraints for: academic_authors table
-- Description: Data integrity rules for academic authors
-- =============================================

-- =============================================
-- 1. NOT NULL CONSTRAINTS
-- =============================================

ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- =============================================
-- 2. CHECK CONSTRAINTS FOR DATA VALIDATION
-- =============================================

-- 2.1 Name length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 200);

-- 2.2 Native name length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_name_native_length 
    CHECK (name_native IS NULL OR length(trim(name_native)) <= 200);

-- 2.3 ORCID format validation (0000-0000-0000-0000)
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_orcid_format 
    CHECK (orcid IS NULL OR orcid GLOB '0000-0000-0000-0000');

-- 2.4 ORCID length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_orcid_length 
    CHECK (orcid IS NULL OR length(trim(orcid)) = 19);

-- 2.5 Email format validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_email_format 
    CHECK (email IS NULL OR email GLOB '*@*.*');

-- 2.6 Email length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_email_length 
    CHECK (email IS NULL OR length(trim(email)) <= 100);

-- 2.7 Institution length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_institution_length 
    CHECK (institution IS NULL OR length(trim(institution)) <= 255);

-- 2.8 Department length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_department_length 
    CHECK (department IS NULL OR length(trim(department)) <= 200);

-- 2.9 Position length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_position_length 
    CHECK (position IS NULL OR length(trim(position)) <= 100);

-- 2.10 Website length validation
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_website_length 
    CHECK (website IS NULL OR length(trim(website)) <= 255);

-- 2.11 Sort order must be non-negative
ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_sort_order_positive 
    CHECK (sort_order >= 0);

-- =============================================
-- 3. UNIQUE CONSTRAINTS (already defined in table)
-- =============================================

-- UNIQUE(orcid)
-- UNIQUE(email)

-- =============================================
-- 4. BOOLEAN VALIDATION
-- =============================================

ALTER TABLE academic_authors ADD CONSTRAINT ck_academic_authors_is_active_boolean 
    CHECK (is_active IN (0, 1));

-- =============================================
-- 5. DATA VALIDATION FUNCTIONS
-- =============================================

-- 5.1 Function to validate ORCID format
CREATE FUNCTION IF NOT EXISTS is_valid_orcid(orcid TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN orcid IS NULL OR (
        length(orcid) = 19 
        AND substr(orcid, 5, 1) = '-' 
        AND substr(orcid, 10, 1) = '-' 
        AND substr(orcid, 15, 1) = '-'
        AND orcid GLOB '0000-0000-0000-0000'
    );
END;

-- 5.2 Function to validate email
CREATE FUNCTION IF NOT EXISTS is_valid_email(email TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN email IS NULL OR (
        length(email) >= 5 
        AND instr(email, '@') > 1 
        AND instr(email, '.') > instr(email, '@') + 1
    );
END;

-- 5.3 Function to get author publication count
CREATE FUNCTION IF NOT EXISTS get_author_publication_count(author_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COUNT(DISTINCT ba.book_id)
        FROM academic_book_authors ba
        WHERE ba.author_id = author_id
    );
END;

-- 5.4 Function to get author citation count
CREATE FUNCTION IF NOT EXISTS get_author_citation_count(author_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM academic_citations ac
        WHERE ac.cited_book_id IN (
            SELECT DISTINCT ba.book_id
            FROM academic_book_authors ba
            WHERE ba.author_id = author_id
        )
    );
END;

-- 5.5 Function to get author h-index (simplified)
CREATE FUNCTION IF NOT EXISTS get_author_h_index(author_id INTEGER)
RETURNS INTEGER
BEGIN
    DECLARE h_index INTEGER DEFAULT 0;
    DECLARE i INTEGER;
    
    -- This is a simplified h-index calculation
    -- Full implementation would require citation data per paper
    RETURN (
        SELECT 
            CASE 
                WHEN COUNT(*) = 0 THEN 0
                ELSE ROUND(COUNT(*) * 0.1, 0)
            END
        FROM academic_book_authors ba
        WHERE ba.author_id = author_id
    );
END;