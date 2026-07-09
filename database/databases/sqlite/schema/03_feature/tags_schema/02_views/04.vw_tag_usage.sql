-- =============================================
-- View: vw_tag_usage
-- Description: Detailed tag usage analytics
-- Dependencies: tags, book_tags, books, book_translations
-- =============================================

CREATE VIEW IF NOT EXISTS vw_tag_usage AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    pt.name AS parent_name,
    t.is_active,
    -- Book statistics
    COUNT(DISTINCT bt.book_id) AS book_count,
    -- Book details (JSON aggregation)
    json_group_array(
        DISTINCT json_object(
            'book_id', b.id,
            'title', b.title,
            'isbn', b.isbn,
            'publication_year', b.publication_year,
            'language_id', b.language_id
        )
    ) AS books_json,
    -- Language breakdown
    json_object(
        'total_languages', COUNT(DISTINCT b.language_id),
        'languages', json_group_array(
            DISTINCT json_object(
                'language_id', l.id,
                'name', l.name,
                'code', l.code
            )
        )
    ) AS language_stats,
    -- Book titles by language
    json_group_array(
        DISTINCT json_object(
            'language', l.name,
            'title', b.title,
            'book_id', b.id
        )
    ) AS title_by_language,
    -- Usage timeline (last 12 months)
    json_group_array(
        json_object(
            'month', strftime('%Y-%m', bt.created_at),
            'count', COUNT(bt.id)
        )
    ) AS monthly_usage_timeline,
    -- Total usage count
    COUNT(bt.id) AS total_usage_count,
    -- Last used
    MAX(bt.created_at) AS last_used,
    -- First used
    MIN(bt.created_at) AS first_used,
    -- Usage frequency
    ROUND(
        CAST(COUNT(bt.id) AS FLOAT) / 
        NULLIF(
            (julianday('now') - julianday(MIN(bt.created_at))) / 30.44, 
            0
        ), 
        2
    ) AS monthly_usage_frequency,
    -- Average books per tag
    ROUND(AVG(COUNT(bt.book_id)) OVER (), 2) AS avg_books_per_tag,
    t.created_at AS tag_created_at
FROM tags t
LEFT JOIN tags pt ON t.parent_id = pt.id
LEFT JOIN book_tags bt ON t.id = bt.tag_id
LEFT JOIN books b ON bt.book_id = b.id AND b.is_active = 1
LEFT JOIN languages l ON b.language_id = l.id
WHERE t.is_active = 1
GROUP BY t.id, t.name, t.slug, t.description, t.parent_id, pt.name, t.is_active, t.created_at
ORDER BY book_count DESC;