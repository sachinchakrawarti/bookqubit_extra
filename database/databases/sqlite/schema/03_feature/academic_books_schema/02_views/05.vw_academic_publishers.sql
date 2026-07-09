-- =============================================
-- View: vw_academic_publishers
-- Description: Academic publishers with publication statistics
-- =============================================

CREATE VIEW IF NOT EXISTS vw_academic_publishers AS
SELECT 
    ap.id,
    ap.name,
    ap.name_native,
    ap.abbreviation,
    ap.website,
    ap.email,
    ap.phone,
    ap.address,
    ap.country_id,
    c.name AS country_name,
    c.code AS country_code,
    ap.is_active,
    ap.sort_order,
    ap.created_at,
    ap.updated_at,
    
    -- Publication statistics
    (
        SELECT COUNT(*)
        FROM academic_books ab
        WHERE ab.publisher_id = ap.id AND ab.is_active = 1
    ) AS total_books,
    
    (
        SELECT COUNT(*)
        FROM academic_books ab
        WHERE ab.publisher_id = ap.id 
        AND ab.publication_year >= strftime('%Y', 'now', '-5 years')
        AND ab.is_active = 1
    ) AS books_last_5_years,
    
    (
        SELECT COUNT(DISTINCT ab.language_id)
        FROM academic_books ab
        WHERE ab.publisher_id = ap.id AND ab.is_active = 1
    ) AS language_count,
    
    (
        SELECT COUNT(DISTINCT ba.author_id)
        FROM academic_books ab
        JOIN academic_book_authors ba ON ab.id = ba.book_id
        WHERE ab.publisher_id = ap.id AND ab.is_active = 1
    ) AS author_count,
    
    -- Total citations for all books by this publisher
    (
        SELECT COUNT(*)
        FROM academic_citations ac
        WHERE ac.cited_book_id IN (
            SELECT id
            FROM academic_books
            WHERE publisher_id = ap.id AND is_active = 1
        )
    ) AS total_citations,
    
    -- Books as JSON
    (
        SELECT json_group_array(
            json_object(
                'book_id', ab.id,
                'title', ab.title,
                'publication_year', ab.publication_year,
                'isbn', ab.isbn,
                'authors', (
                    SELECT GROUP_CONCAT(DISTINCT aa.name, ', ')
                    FROM academic_book_authors ba
                    JOIN academic_authors aa ON ba.author_id = aa.id
                    WHERE ba.book_id = ab.id
                    ORDER BY ba.author_order
                )
            )
        )
        FROM academic_books ab
        WHERE ab.publisher_id = ap.id AND ab.is_active = 1
        ORDER BY ab.publication_year DESC
        LIMIT 10
    ) AS recent_books_json

FROM academic_publishers ap
LEFT JOIN countries c ON ap.country_id = c.id
WHERE ap.is_active = 1;