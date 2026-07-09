-- =============================================
-- View: vw_academic_authors
-- Description: Academic authors with publication statistics
-- =============================================

CREATE VIEW IF NOT EXISTS vw_academic_authors AS
SELECT 
    aa.id,
    aa.name,
    aa.name_native,
    aa.orcid,
    aa.email,
    aa.institution,
    aa.department,
    aa.position,
    aa.biography,
    aa.research_interests,
    aa.website,
    aa.is_active,
    aa.sort_order,
    aa.created_at,
    aa.updated_at,
    
    -- Publication statistics
    (
        SELECT COUNT(DISTINCT ba.book_id)
        FROM academic_book_authors ba
        WHERE ba.author_id = aa.id
    ) AS total_books,
    
    (
        SELECT COUNT(DISTINCT ba.book_id)
        FROM academic_book_authors ba
        WHERE ba.author_id = aa.id AND ba.is_corresponding = 1
    ) AS corresponding_books,
    
    (
        SELECT COUNT(DISTINCT ba.book_id)
        FROM academic_book_authors ba
        JOIN academic_books ab ON ba.book_id = ab.id
        WHERE ba.author_id = aa.id AND ab.publication_year >= strftime('%Y', 'now', '-5 years')
    ) AS books_last_5_years,
    
    -- Citation count (all books by this author)
    (
        SELECT COUNT(*)
        FROM academic_citations ac
        WHERE ac.cited_book_id IN (
            SELECT ba.book_id
            FROM academic_book_authors ba
            WHERE ba.author_id = aa.id
        )
    ) AS total_citations,
    
    -- Average citations per book
    (
        SELECT ROUND(
            CAST(COUNT(*) AS FLOAT) / 
            NULLIF((
                SELECT COUNT(DISTINCT ba.book_id)
                FROM academic_book_authors ba
                WHERE ba.author_id = aa.id
            ), 0),
            2
        )
        FROM academic_citations ac
        WHERE ac.cited_book_id IN (
            SELECT ba.book_id
            FROM academic_book_authors ba
            WHERE ba.author_id = aa.id
        )
    ) AS avg_citations_per_book,
    
    -- Books as JSON
    (
        SELECT json_group_array(
            json_object(
                'book_id', ab.id,
                'title', ab.title,
                'publication_year', ab.publication_year,
                'isbn', ab.isbn,
                'is_corresponding', ba.is_corresponding,
                'author_order', ba.author_order
            )
        )
        FROM academic_book_authors ba
        JOIN academic_books ab ON ba.book_id = ab.id
        WHERE ba.author_id = aa.id
        ORDER BY ba.author_order
    ) AS books_json

FROM academic_authors aa
WHERE aa.is_active = 1;