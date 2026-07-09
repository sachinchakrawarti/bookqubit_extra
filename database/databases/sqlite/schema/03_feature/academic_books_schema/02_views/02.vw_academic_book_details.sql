-- =============================================
-- View: vw_academic_book_details
-- Description: Complete academic book details with all related data
-- =============================================

CREATE VIEW IF NOT EXISTS vw_academic_book_details AS
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
    
    -- Language
    ab.language_id,
    l.code AS language_code,
    l.name AS language_name,
    l.native_name AS language_native_name,
    
    -- Publisher
    ab.publisher_id,
    ap.name AS publisher_name,
    ap.name_native AS publisher_name_native,
    ap.abbreviation AS publisher_abbreviation,
    ap.website AS publisher_website,
    ap.email AS publisher_email,
    ap.country_id AS publisher_country_id,
    c.name AS publisher_country,
    
    -- Authors (as JSON array)
    (
        SELECT json_group_array(
            json_object(
                'id', aa.id,
                'name', aa.name,
                'name_native', aa.name_native,
                'orcid', aa.orcid,
                'institution', aa.institution,
                'department', aa.department,
                'position', aa.position,
                'order', ba.author_order,
                'is_corresponding', ba.is_corresponding
            )
        )
        FROM academic_book_authors ba
        JOIN academic_authors aa ON ba.author_id = aa.id
        WHERE ba.book_id = ab.id
        ORDER BY ba.author_order
    ) AS authors_json,
    
    -- Subjects (as JSON array)
    (
        SELECT json_group_array(
            json_object(
                'id', s.id,
                'code', s.code,
                'name', s.name,
                'level', s.level,
                'is_primary', bs.is_primary
            )
        )
        FROM academic_book_subjects bs
        JOIN academic_subjects s ON bs.subject_id = s.id
        WHERE bs.book_id = ab.id
        ORDER BY bs.is_primary DESC, s.name
    ) AS subjects_json,
    
    -- Translations (as JSON array)
    (
        SELECT json_group_array(
            json_object(
                'language_id', at.language_id,
                'language_code', l2.code,
                'language_name', l2.name,
                'title', at.title,
                'subtitle', at.subtitle,
                'abstract', at.abstract,
                'keywords', at.keywords
            )
        )
        FROM academic_translations at
        JOIN languages l2 ON at.language_id = l2.id
        WHERE at.book_id = ab.id
    ) AS translations_json,
    
    -- Editions (as JSON array)
    (
        SELECT json_group_array(
            json_object(
                'id', ae.id,
                'edition_number', ae.edition_number,
                'edition_name', ae.edition_name,
                'publication_year', ae.publication_year,
                'isbn', ae.isbn,
                'pages', ae.pages,
                'price', ae.price,
                'is_active', ae.is_active
            )
        )
        FROM academic_editions ae
        WHERE ae.book_id = ab.id
        ORDER BY ae.edition_number DESC
    ) AS editions_json,
    
    -- Citations (as JSON array)
    (
        SELECT json_group_array(
            json_object(
                'id', ac.id,
                'citing_book_id', ac.citing_book_id,
                'citing_title', (
                    SELECT title FROM academic_books WHERE id = ac.citing_book_id
                ),
                'citation_type', ac.citation_type,
                'context', ac.context,
                'created_at', ac.created_at
            )
        )
        FROM academic_citations ac
        WHERE ac.cited_book_id = ab.id
    ) AS citations_json,
    
    -- Reviews (as JSON array)
    (
        SELECT json_group_array(
            json_object(
                'id', ar.id,
                'reviewer_name', ar.reviewer_name,
                'reviewer_institution', ar.reviewer_institution,
                'rating', ar.rating,
                'review_text', ar.review_text,
                'created_at', ar.created_at
            )
        )
        FROM academic_reviews ar
        WHERE ar.book_id = ab.id AND ar.is_public = 1
        ORDER BY ar.created_at DESC
    ) AS reviews_json,
    
    -- Statistics
    (
        SELECT COUNT(*) FROM academic_citations WHERE cited_book_id = ab.id
    ) AS total_citations,
    
    (
        SELECT COUNT(*) FROM academic_reviews WHERE book_id = ab.id AND is_public = 1
    ) AS total_reviews,
    
    (
        SELECT ROUND(AVG(rating), 2)
        FROM academic_reviews 
        WHERE book_id = ab.id AND is_public = 1 AND rating > 0
    ) AS average_rating

FROM academic_books ab
LEFT JOIN languages l ON ab.language_id = l.id
LEFT JOIN academic_publishers ap ON ab.publisher_id = ap.id
LEFT JOIN countries c ON ap.country_id = c.id
WHERE ab.is_active = 1;