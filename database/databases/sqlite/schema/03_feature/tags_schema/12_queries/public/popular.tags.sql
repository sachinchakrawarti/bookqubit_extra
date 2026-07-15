-- =============================================
-- Public Query: Popular Tags
-- Description: Get popular tags with various metrics
-- =============================================

-- 1. Most popular tags (by usage count)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.created_at,
    t.updated_at,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count
FROM tags t
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.name
LIMIT 20;

-- 2. Popular tags with translation for specific language
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    COALESCE(tt.name, t.name) AS display_name,
    COALESCE(tt.description, t.description) AS display_description,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = 1
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.name
LIMIT 20;

-- 3. Popular tags with parent information
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    p.name AS parent_name,
    p.slug AS parent_slug,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count,
    CASE 
        WHEN EXISTS (SELECT 1 FROM tags WHERE parent_id = t.id AND is_active = 1) 
        THEN 1 
        ELSE 0 
    END AS has_children
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.name
LIMIT 20;

-- 4. Popular tags with hierarchy level
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    COALESCE(th.level, 0) AS hierarchy_level,
    p.name AS parent_name,
    p.slug AS parent_slug,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count
FROM tags t
LEFT JOIN tag_hierarchy th ON t.id = th.child_id
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.name
LIMIT 20;

-- 5. Trending tags (last 30 days)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(*) FROM book_tags 
        WHERE tag_id = t.id 
        AND created_at >= date('now', '-30 days')
    ) AS new_usage_30d,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags 
        WHERE tag_id = t.id 
        AND created_at >= date('now', '-30 days')
    ) AS new_books_30d,
    ROUND(
        CAST((
            SELECT COUNT(*) FROM book_tags 
            WHERE tag_id = t.id 
            AND created_at >= date('now', '-30 days')
        ) AS FLOAT) / NULLIF(30, 0), 2
    ) AS avg_daily_usage
FROM tags t
WHERE t.is_active = 1
AND EXISTS (
    SELECT 1 FROM book_tags 
    WHERE tag_id = t.id 
    AND created_at >= date('now', '-30 days')
)
ORDER BY new_usage_30d DESC, t.usage_count DESC
LIMIT 20;

-- 6. Most used tags with statistics
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count,
    (
        SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id
    ) AS total_assignments,
    ROUND(
        CAST((
            SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
        ) AS FLOAT) / NULLIF(t.usage_count, 0), 2
    ) AS avg_usage_per_book,
    t.created_at,
    t.updated_at,
    julianday('now') - julianday(t.created_at) AS days_since_created
FROM tags t
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.sort_order, t.name
LIMIT 20;

-- 7. Popular tags by language
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    l.code AS language_code,
    l.name AS language_name,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count
FROM tags t
JOIN languages l ON t.language_id = l.id
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.sort_order, t.name
LIMIT 20;

-- 8. Popular tags with translation coverage
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count,
    (
        SELECT COUNT(*) FROM tag_translations WHERE tag_id = t.id
    ) AS translation_count,
    CASE 
        WHEN (
            SELECT COUNT(*) FROM tag_translations WHERE tag_id = t.id
        ) >= 3 THEN 'High'
        WHEN (
            SELECT COUNT(*) FROM tag_translations WHERE tag_id = t.id
        ) >= 1 THEN 'Medium'
        ELSE 'Low'
    END AS translation_coverage
FROM tags t
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.sort_order, t.name
LIMIT 20;

-- 9. Popular root tags (no parent)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count,
    (
        SELECT COUNT(*) FROM tags WHERE parent_id = t.id AND is_active = 1
    ) AS child_count,
    (
        SELECT json_group_array(
            json_object(
                'id', c.id,
                'name', c.name,
                'slug', c.slug,
                'usage_count', c.usage_count
            )
        )
        FROM tags c
        WHERE c.parent_id = t.id AND c.is_active = 1
        ORDER BY c.usage_count DESC
        LIMIT 5
    ) AS top_children
FROM tags t
WHERE t.parent_id IS NULL AND t.is_active = 1
ORDER BY t.usage_count DESC, t.sort_order, t.name
LIMIT 20;

-- 10. Popular tags with month-over-month growth
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(*) FROM book_tags 
        WHERE tag_id = t.id 
        AND strftime('%Y-%m', created_at) = strftime('%Y-%m', date('now'))
    ) AS current_month_usage,
    (
        SELECT COUNT(*) FROM book_tags 
        WHERE tag_id = t.id 
        AND strftime('%Y-%m', created_at) = strftime('%Y-%m', date('now', '-1 month'))
    ) AS previous_month_usage,
    CASE 
        WHEN (
            SELECT COUNT(*) FROM book_tags 
            WHERE tag_id = t.id 
            AND strftime('%Y-%m', created_at) = strftime('%Y-%m', date('now', '-1 month'))
        ) > 0 THEN 
            ROUND(
                (
                    (
                        SELECT COUNT(*) FROM book_tags 
                        WHERE tag_id = t.id 
                        AND strftime('%Y-%m', created_at) = strftime('%Y-%m', date('now'))
                    ) - 
                    (
                        SELECT COUNT(*) FROM book_tags 
                        WHERE tag_id = t.id 
                        AND strftime('%Y-%m', created_at) = strftime('%Y-%m', date('now', '-1 month'))
                    )
                ) / NULLIF(
                    (
                        SELECT COUNT(*) FROM book_tags 
                        WHERE tag_id = t.id 
                        AND strftime('%Y-%m', created_at) = strftime('%Y-%m', date('now', '-1 month'))
                    ), 0
                ) * 100, 2
            )
        ELSE 0
    END AS growth_percentage
FROM tags t
WHERE t.is_active = 1
ORDER BY growth_percentage DESC, t.usage_count DESC
LIMIT 20;

-- 11. Popular tags with book titles
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    t.sort_order,
    (
        SELECT json_group_array(
            json_object(
                'book_id', b.id,
                'title', b.title,
                'author', b.author,
                'cover_image', b.cover_image
            )
        )
        FROM book_tags bt
        JOIN books b ON bt.book_id = b.id
        WHERE bt.tag_id = t.id
        AND b.is_active = 1
        ORDER BY b.popularity DESC
        LIMIT 5
    ) AS top_books
FROM tags t
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.sort_order, t.name
LIMIT 10;

-- 12. Popular tags with user engagement
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    t.sort_order,
    t.view_count,
    t.last_viewed_at,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count,
    ROUND(
        CAST(t.view_count AS FLOAT) / NULLIF(t.usage_count, 0), 2
    ) AS views_per_usage,
    CASE 
        WHEN t.view_count > 1000 AND t.usage_count > 100 THEN 'Viral'
        WHEN t.view_count > 500 AND t.usage_count > 50 THEN 'Popular'
        WHEN t.view_count > 100 AND t.usage_count > 10 THEN 'Growing'
        ELSE 'New'
    END AS tag_status
FROM tags t
WHERE t.is_active = 1
ORDER BY t.usage_count DESC, t.view_count DESC
LIMIT 20;