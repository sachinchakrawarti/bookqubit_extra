-- =============================================
-- Admin Query: List Tags
-- Description: List tags with various filters and sorting
-- =============================================

-- 1. List all active tags
SELECT 
    id,
    name,
    slug,
    description,
    parent_id,
    language_id,
    usage_count,
    is_active,
    sort_order,
    created_at,
    updated_at
FROM tags
WHERE is_active = 1
ORDER BY sort_order, name;

-- 2. List all tags with translations
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    json_group_array(
        json_object(
            'language_id', tt.language_id,
            'name', tt.name,
            'description', tt.description
        )
    ) AS translations
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
WHERE t.is_active = 1
GROUP BY t.id
ORDER BY t.sort_order, t.name;

-- 3. List tags with hierarchy
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    p.name AS parent_name,
    t.usage_count,
    t.sort_order,
    CASE 
        WHEN EXISTS (SELECT 1 FROM tags WHERE parent_id = t.id) 
        THEN 'Parent' 
        ELSE 'Leaf' 
    END AS tag_type,
    (SELECT COUNT(*) FROM tags WHERE parent_id = t.id) AS child_count
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.is_active = 1
ORDER BY COALESCE(t.parent_id, 0), t.sort_order, t.name;

-- 4. List tags with pagination
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at
FROM tags
WHERE is_active = 1
ORDER BY sort_order, name
LIMIT 20 OFFSET 0;

-- 5. List tags with filtering
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at
FROM tags
WHERE is_active = 1
    AND (name LIKE '%science%' OR description LIKE '%science%')
    AND parent_id IS NULL
    AND language_id = 1
ORDER BY usage_count DESC, name
LIMIT 50;

-- 6. List popular tags
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    (SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id) AS book_count,
    is_active
FROM tags t
WHERE is_active = 1
ORDER BY usage_count DESC, name
LIMIT 20;

-- 7. List tags with book count
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    COUNT(DISTINCT bt.book_id) AS book_count,
    COUNT(DISTINCT bt.id) AS tag_assignments,
    t.is_active,
    t.sort_order
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
WHERE t.is_active = 1
GROUP BY t.id
ORDER BY book_count DESC, t.sort_order, t.name;

-- 8. List tags with translation coverage
SELECT 
    t.id,
    t.name,
    t.slug,
    t.language_id,
    COUNT(tt.id) AS translation_count,
    GROUP_CONCAT(DISTINCT l.code) AS languages,
    CASE 
        WHEN COUNT(tt.id) >= 3 THEN 'High'
        WHEN COUNT(tt.id) >= 1 THEN 'Medium'
        ELSE 'Low'
    END AS translation_coverage
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
LEFT JOIN languages l ON tt.language_id = l.id
WHERE t.is_active = 1
GROUP BY t.id
ORDER BY translation_count DESC, t.name;

-- 9. List tags with hierarchy depth
SELECT 
    t.id,
    t.name,
    t.slug,
    COALESCE(th.level, 0) AS hierarchy_level,
    t.parent_id,
    t.sort_order,
    t.usage_count
FROM tags t
LEFT JOIN tag_hierarchy th ON t.id = th.child_id
WHERE t.is_active = 1
ORDER BY COALESCE(th.level, 0), t.sort_order, t.name;

-- 10. List root tags (no parent)
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    (SELECT COUNT(*) FROM tags WHERE parent_id = t.id) AS child_count,
    sort_order
FROM tags t
WHERE parent_id IS NULL AND is_active = 1
ORDER BY sort_order, name;

-- 11. List leaf tags (no children)
SELECT 
    id,
    name,
    slug,
    description,
    parent_id,
    usage_count,
    sort_order
FROM tags t
WHERE is_active = 1
AND NOT EXISTS (SELECT 1 FROM tags WHERE parent_id = t.id)
ORDER BY sort_order, name;

-- 12. List recently created tags
SELECT 
    id,
    name,
    slug,
    description,
    created_at,
    updated_at,
    created_by,
    usage_count
FROM tags
WHERE is_active = 1
ORDER BY created_at DESC
LIMIT 20;

-- 13. List tags by parent
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    p.name AS parent_name
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.parent_id = 1 AND t.is_active = 1
ORDER BY t.sort_order, t.name;

-- 14. List tags with search
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    CASE 
        WHEN name LIKE '%science%' THEN 10
        WHEN description LIKE '%science%' THEN 5
        ELSE 1
    END AS relevance
FROM tags
WHERE is_active = 1
AND (name LIKE '%science%' OR description LIKE '%science%')
ORDER BY relevance DESC, usage_count DESC
LIMIT 20;

-- 15. List tags with statistics
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    (SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id) AS book_count,
    (SELECT COUNT(*) FROM tag_translations WHERE tag_id = t.id) AS translation_count,
    (SELECT COUNT(*) FROM tag_hierarchy WHERE parent_id = t.id OR child_id = t.id) AS hierarchy_count,
    t.is_active,
    t.created_at,
    t.updated_at
FROM tags t
WHERE t.is_active = 1
ORDER BY t.usage_count DESC
LIMIT 20;

-- 16. List tags with audit info
SELECT 
    t.id,
    t.name,
    t.slug,
    t.created_at,
    t.updated_at,
    u1.username AS created_by_username,
    u2.username AS updated_by_username,
    t.usage_count,
    t.is_active
FROM tags t
LEFT JOIN users u1 ON t.created_by = u1.id
LEFT JOIN users u2 ON t.updated_by = u2.id
WHERE t.is_active = 1
ORDER BY t.created_at DESC
LIMIT 20;

-- 17. Get tag tree structure
WITH RECURSIVE tag_tree AS (
    SELECT 
        id,
        name,
        slug,
        parent_id,
        0 AS level,
        name AS path,
        CAST(id AS VARCHAR) AS id_path
    FROM tags
    WHERE parent_id IS NULL AND is_active = 1
    
    UNION ALL
    
    SELECT 
        t.id,
        t.name,
        t.slug,
        t.parent_id,
        tt.level + 1,
        tt.path || ' → ' || t.name,
        tt.id_path || ',' || CAST(t.id AS VARCHAR)
    FROM tags t
    INNER JOIN tag_tree tt ON t.parent_id = tt.id
    WHERE t.is_active = 1
)
SELECT 
    id,
    name,
    slug,
    parent_id,
    level,
    path,
    id_path,
    REPEAT('  ', level) || name AS indented_name,
    (SELECT COUNT(*) FROM tags WHERE parent_id = tt.id) AS child_count
FROM tag_tree tt
ORDER BY path;

-- 18. Get tag usage analytics
SELECT 
    t.id,
    t.name,
    t.slug,
    COUNT(DISTINCT bt.book_id) AS unique_books,
    COUNT(bt.id) AS total_assignments,
    AVG(bt.id) AS avg_assignments_per_book,
    MAX(bt.created_at) AS last_used,
    MIN(bt.created_at) AS first_used,
    ROUND(CAST(COUNT(bt.id) AS FLOAT) / NULLIF(COUNT(DISTINCT bt.book_id), 0), 2) AS avg_usage_per_book
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
WHERE t.is_active = 1
GROUP BY t.id
HAVING COUNT(bt.id) > 0
ORDER BY unique_books DESC, total_assignments DESC;