-- =============================================
-- View: vw_academic_search
-- Description: Unified search across academic books, authors, subjects
-- =============================================

CREATE VIEW IF NOT EXISTS vw_academic_search AS

-- Books search
SELECT 
    'book' AS search_type,
    ab.id AS entity_id,
    ab.title AS title,
    ab.subtitle AS subtitle,
    ab.abstract AS description,
    ab.isbn AS identifier,
    ab.doi AS doi,
    ab.publication_year AS year,
    NULL AS author_name,
    NULL AS author_orcid,
    NULL AS subject_name,
    NULL AS subject_code,
    (
        SELECT GROUP_CONCAT(DISTINCT aa.name, ', ')
        FROM academic_book_authors ba
        JOIN academic_authors aa ON ba.author_id = aa.id
        WHERE ba.book_id = ab.id
        ORDER BY ba.author_order
    ) AS related_names,
    ab.is_active,
    ab.created_at,
    ab.updated_at,
    ab.sort_order,
    'academic_books' AS source_table

FROM academic_books ab
WHERE ab.is_active = 1

UNION ALL

-- Authors search
SELECT 
    'author' AS search_type,
    aa.id AS entity_id,
    aa.name AS title,
    NULL AS subtitle,
    aa.biography AS description,
    aa.orcid AS identifier,
    NULL AS doi,
    NULL AS year,
    aa.name AS author_name,
    aa.orcid AS author_orcid,
    NULL AS subject_name,
    NULL AS subject_code,
    (
        SELECT GROUP_CONCAT(DISTINCT ab.title, ', ')
        FROM academic_book_authors ba
        JOIN academic_books ab ON ba.book_id = ab.id
        WHERE ba.author_id = aa.id
        LIMIT 5
    ) AS related_names,
    aa.is_active,
    aa.created_at,
    aa.updated_at,
    aa.sort_order,
    'academic_authors' AS source_table

FROM academic_authors aa
WHERE aa.is_active = 1

UNION ALL

-- Subjects search
SELECT 
    'subject' AS search_type,
    s.id AS entity_id,
    s.name AS title,
    NULL AS subtitle,
    s.description AS description,
    s.code AS identifier,
    NULL AS doi,
    NULL AS year,
    NULL AS author_name,
    NULL AS author_orcid,
    s.name AS subject_name,
    s.code AS subject_code,
    (
        SELECT GROUP_CONCAT(DISTINCT ab.title, ', ')
        FROM academic_book_subjects bs
        JOIN academic_books ab ON bs.book_id = ab.id
        WHERE bs.subject_id = s.id
        LIMIT 5
    ) AS related_names,
    s.is_active,
    s.created_at,
    s.updated_at,
    s.sort_order,
    'academic_subjects' AS source_table

FROM academic_subjects s
WHERE s.is_active = 1

ORDER BY title;