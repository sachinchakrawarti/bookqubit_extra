-- =============================================
-- Public Query: Get Tag
-- Description: Retrieve tag details for public viewing
-- =============================================

-- 1. Get tag by ID
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    t.updated_at,
    p.name AS parent_name,
    p.slug AS parent_slug,
    l.code AS language_code,
    l.name AS language_name
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
LEFT JOIN languages l ON t.language_id = l.id
WHERE t.id = 1 AND t.is_active = 1;

-- 2. Get tag by slug
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    t.updated_at,
    p.name AS parent_name,
    p.slug AS parent_slug,
    l.code AS language_code,
    l.name AS language_name
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
LEFT JOIN languages l ON t.language_id = l.id
WHERE t.slug = 'science-fiction' AND t.is_active = 1;

-- 3. Get tag with translations
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    t.updated_at,
    json_group_array(
        json_object(
            'language_id', tt.language_id,
            'language_code', l.code,
            'language_name', l.name,
            'name', tt.name,
            'description', tt.description
        )
    ) AS translations
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
LEFT JOIN languages l ON tt.language_id = l.id
WHERE t.id = 1 AND t.is_active = 1
GROUP BY t.id;

-- 4. Get tag with hierarchy
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    t.updated_at,
    p.name AS parent_name,
    p.slug AS parent_slug,
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
        ORDER BY c.sort_order, c.name
    ) AS children,
    (
        SELECT COUNT(*) FROM tags WHERE parent_id = t.id AND is_active = 1
    ) AS child_count
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.id = 1 AND t.is_active = 1;

-- 5. Get tag with full details (JSON format)
SELECT json_object(
    'id', t.id,
    'name', t.name,
    'slug', t.slug,
    'description', t.description,
    'usage_count', t.usage_count,
    'is_active', t.is_active,
    'sort_order', t.sort_order,
    'created_at', t.created_at,
    'updated_at', t.updated_at,
    'parent', CASE 
        WHEN p.id IS NOT NULL THEN json_object(
            'id', p.id,
            'name', p.name,
            'slug', p.slug
        )
        ELSE NULL
    END,
    'translations', (
        SELECT json_group_array(
            json_object(
                'language_id', tt.language_id,
                'language_code', l.code,
                'language_name', l.name,
                'name', tt.name,
                'description', tt.description
            )
        )
        FROM tag_translations tt
        LEFT JOIN languages l ON tt.language_id = l.id
        WHERE tt.tag_id = t.id
    ),
    'children', (
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
        ORDER BY c.sort_order, c.name
        LIMIT 10
    ),
    'child_count', (
        SELECT COUNT(*) FROM tags WHERE parent_id = t.id AND is_active = 1
    ),
    'book_count', (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ),
    'total_assignments', (
        SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id
    ),
    'meta', json_object(
        'title', t.meta_title,
        'description', t.meta_description,
        'keywords', t.meta_keywords,
        'featured_image', t.featured_image,
        'icon_class', t.icon_class,
        'color_code', t.color_code,
        'seo_friendly', t.seo_friendly,
        'is_featured', t.is_featured
    ),
    'statistics', json_object(
        'view_count', t.view_count,
        'last_viewed_at', t.last_viewed_at,
        'days_since_created', julianday('now') - julianday(t.created_at),
        'days_since_updated', julianday('now') - julianday(t.updated_at)
    )
) AS tag_details
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.id = 1 AND t.is_active = 1;

-- 6. Get tag with related tags
WITH tag_books AS (
    SELECT DISTINCT book_id 
    FROM book_tags 
    WHERE tag_id = 1
)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT bt2.book_id)
        FROM book_tags bt2
        WHERE bt2.tag_id = t.id
        AND bt2.book_id IN (SELECT book_id FROM tag_books)
    ) AS related_count
FROM tags t
WHERE t.id != 1
AND t.is_active = 1
AND EXISTS (
    SELECT 1 FROM book_tags bt
    WHERE bt.tag_id = t.id
    AND bt.book_id IN (SELECT book_id FROM tag_books)
)
ORDER BY related_count DESC, t.usage_count DESC
LIMIT 10;

-- 7. Get tag with hierarchy path
WITH RECURSIVE path_cte AS (
    SELECT id, name, slug, parent_id, name as path, 0 as level
    FROM tags
    WHERE id = 1
    
    UNION ALL
    
    SELECT t.id, t.name, t.slug, t.parent_id, t.name || ' → ' || p.path, p.level + 1
    FROM tags t
    INNER JOIN path_cte p ON t.id = p.parent_id
    WHERE t.parent_id IS NOT NULL
)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    p.path AS hierarchy_path,
    p.level AS hierarchy_level,
    (
        SELECT json_group_array(
            json_object(
                'id', a.id,
                'name', a.name,
                'slug', a.slug,
                'level', a.level
            )
        )
        FROM path_cte a
        WHERE a.id != 1
        ORDER BY a.level DESC
    ) AS ancestors
FROM tags t
CROSS JOIN path_cte p
WHERE t.id = 1 AND p.id = 1;

-- 8. Get tag with popularity metrics
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
    ) AS book_count,
    (
        SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id
    ) AS total_assignments,
    (
        SELECT COUNT(DISTINCT language_id) 
        FROM books 
        WHERE id IN (SELECT DISTINCT book_id FROM book_tags WHERE tag_id = t.id)
    ) AS language_count,
    ROUND(
        CAST((
            SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
        ) AS FLOAT) / NULLIF((
            SELECT COUNT(*) FROM books WHERE is_active = 1
        ), 0) * 100, 2
    ) AS usage_percentage,
    CASE 
        WHEN (
            SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
        ) > 100 THEN 'High'
        WHEN (
            SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
        ) > 50 THEN 'Medium'
        WHEN (
            SELECT COUNT(DISTINCT book_id) FROM book_tags WHERE tag_id = t.id
        ) > 10 THEN 'Low'
        ELSE 'Rare'
    END AS popularity_level
FROM tags t
WHERE t.id = 1 AND t.is_active = 1;

-- 9. Get tag with SEO data (for specific language)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    COALESCE(tt.meta_title, t.meta_title, t.name) AS meta_title,
    COALESCE(tt.meta_description, t.meta_description, t.description) AS meta_description,
    COALESCE(tt.seo_slug, t.slug) AS seo_slug,
    t.featured_image,
    t.icon_class,
    t.color_code,
    t.seo_friendly,
    t.is_featured,
    t.usage_count,
    tt.name AS translated_name,
    tt.description AS translated_description
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = 1
WHERE t.id = 1 AND t.is_active = 1;

-- 10. Get tag with book count breakdown
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    (
        SELECT COUNT(DISTINCT bt.book_id) FROM book_tags bt WHERE bt.tag_id = t.id
    ) AS total_books,
    (
        SELECT json_group_array(
            json_object(
                'language_id', b.language_id,
                'language_code', l.code,
                'language_name', l.name,
                'book_count', COUNT(DISTINCT b.id)
            )
        )
        FROM book_tags bt
        JOIN books b ON bt.book_id = b.id
        JOIN languages l ON b.language_id = l.id
        WHERE bt.tag_id = t.id
        GROUP BY b.language_id
        ORDER BY COUNT(DISTINCT b.id) DESC
    ) AS books_by_language,
    (
        SELECT json_group_array(
            json_object(
                'year', strftime('%Y', b.publication_date),
                'book_count', COUNT(DISTINCT b.id)
            )
        )
        FROM book_tags bt
        JOIN books b ON bt.book_id = b.id
        WHERE bt.tag_id = t.id
        GROUP BY strftime('%Y', b.publication_date)
        ORDER BY strftime('%Y', b.publication_date) DESC
        LIMIT 5
    ) AS books_by_year
FROM tags t
WHERE t.id = 1 AND t.is_active = 1;