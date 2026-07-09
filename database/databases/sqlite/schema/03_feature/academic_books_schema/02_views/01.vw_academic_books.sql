-- =============================================
-- View: vw_academic_books
-- Description: Basic academic book information with language and publisher
-- =============================================

CREATE VIEW IF NOT EXISTS vw_academic_books AS
SELECT 
    ab.id,
    ab.title,
    ab.subtitle,
    ab.series,
    ab.volume,
    ab.edition,
    ab.publication_year,
    ab.isbn,
    ab.isbn10,
    ab.doi,
    ab.abstract,
    ab.keywords,
    ab.pages,
    ab.price,
    ab.currency_code,
    ab.is_active,
    ab.sort_order,
    ab.created_at,
    ab.updated_at,
    
    -- Language information
    ab.language_id,
    l.code AS language_code,
    l.name AS language_name,
    
    -- Publisher information
    ab.publisher_id,
    ap.name AS publisher_name,
    ap.abbreviation AS publisher_abbreviation,
    
    -- Subject information (aggregated)
    (
        SELECT GROUP_CONCAT(DISTINCT s.name, ', ')
        FROM academic_book_subjects bs
        JOIN academic_subjects s ON bs.subject_id = s.id
        WHERE bs.book_id = ab.id
        AND bs.is_primary = 1
    ) AS primary_subjects,
    
    (
        SELECT GROUP_CONCAT(DISTINCT s.name, ', ')
        FROM academic_book_subjects bs
        JOIN academic_subjects s ON bs.subject_id = s.id
        WHERE bs.book_id = ab.id
    ) AS all_subjects,
    
    -- Author information (aggregated)
    (
        SELECT GROUP_CONCAT(DISTINCT aa.name, ', ')
        FROM academic_book_authors ba
        JOIN academic_authors aa ON ba.author_id = aa.id
        WHERE ba.book_id = ab.id
        ORDER BY ba.author_order
    ) AS authors,
    
    -- Citation count
    (
        SELECT COUNT(*) 
        FROM academic_citations 
        WHERE cited_book_id = ab.id
    ) AS citation_count,
    
    -- Review count and average rating
    (
        SELECT COUNT(*) 
        FROM academic_reviews 
        WHERE book_id = ab.id AND is_public = 1
    ) AS review_count,
    
    (
        SELECT ROUND(AVG(rating), 2)
        FROM academic_reviews 
        WHERE book_id = ab.id AND is_public = 1 AND rating > 0
    ) AS avg_rating

FROM academic_books ab
LEFT JOIN languages l ON ab.language_id = l.id
LEFT JOIN academic_publishers ap ON ab.publisher_id = ap.id
WHERE ab.is_active = 1;