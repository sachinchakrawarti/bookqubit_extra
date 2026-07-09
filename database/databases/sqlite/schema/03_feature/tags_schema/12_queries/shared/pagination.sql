-- =============================================
-- Shared Query: Pagination
-- Description: Common pagination patterns for tag queries
-- =============================================

-- 1. Basic pagination with LIMIT and OFFSET
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

-- 2. Pagination with total count
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_count
FROM tags
WHERE is_active = 1
ORDER BY sort_order, name
LIMIT 20 OFFSET 0;

-- 3. Pagination with page calculation
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_count,
    CASE 
        WHEN (SELECT COUNT(*) FROM tags WHERE is_active = 1) > 0 
        THEN CEIL((SELECT COUNT(*) FROM tags WHERE is_active = 1) / 20.0)
        ELSE 1
    END AS total_pages,
    1 AS current_page,
    20 AS per_page
FROM tags
WHERE is_active = 1
ORDER BY sort_order, name
LIMIT 20 OFFSET 0;

-- 4. Pagination with cursor (keyset pagination)
-- For better performance on large datasets
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
AND (sort_order, id) > (10, 100)  -- cursor values from last item
ORDER BY sort_order, id
LIMIT 20;

-- 5. Pagination with search filter
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1 AND name LIKE '%science%') AS total_count
FROM tags
WHERE is_active = 1
AND name LIKE '%science%'
ORDER BY sort_order, name
LIMIT 20 OFFSET 0;

-- 6. Pagination with multiple filters
SELECT 
    id,
    name,
    slug,
    description,
    parent_id,
    usage_count,
    is_active,
    sort_order,
    created_at,
    (SELECT COUNT(*) 
     FROM tags 
     WHERE is_active = 1 
     AND parent_id = 1 
     AND usage_count > 0
    ) AS total_count
FROM tags
WHERE is_active = 1
AND parent_id = 1
AND usage_count > 0
ORDER BY usage_count DESC, name
LIMIT 20 OFFSET 0;

-- 7. Pagination with joined tables
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    COUNT(DISTINCT bt.book_id) AS book_count,
    COUNT(DISTINCT tt.id) AS translation_count,
    (SELECT COUNT(DISTINCT t2.id) 
     FROM tags t2
     LEFT JOIN book_tags bt2 ON t2.id = bt2.tag_id
     WHERE t2.is_active = 1
    ) AS total_count
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
WHERE t.is_active = 1
GROUP BY t.id
ORDER BY t.usage_count DESC, t.name
LIMIT 20 OFFSET 0;

-- 8. Pagination with sorting options
-- Sort by name (ascending)
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY name 
LIMIT 20 OFFSET 0;

-- Sort by name (descending)
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY name DESC 
LIMIT 20 OFFSET 0;

-- Sort by usage (descending)
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY usage_count DESC, name 
LIMIT 20 OFFSET 0;

-- Sort by created date (newest first)
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY created_at DESC, name 
LIMIT 20 OFFSET 0;

-- Sort by updated date (recently updated)
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY updated_at DESC, name 
LIMIT 20 OFFSET 0;

-- Sort by hierarchy level
SELECT 
    t.*,
    COALESCE(th.level, 0) AS hierarchy_level
FROM tags t
LEFT JOIN tag_hierarchy th ON t.id = th.child_id
WHERE t.is_active = 1
ORDER BY hierarchy_level, t.sort_order, t.name
LIMIT 20 OFFSET 0;

-- 9. Pagination with dynamic sorting
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at,
    CASE 
        WHEN :sort_by = 'name' THEN name
        WHEN :sort_by = 'usage' THEN usage_count
        WHEN :sort_by = 'created' THEN created_at
        WHEN :sort_by = 'updated' THEN updated_at
    END AS sort_field,
    :sort_direction AS sort_direction
FROM tags
WHERE is_active = 1
ORDER BY 
    CASE WHEN :sort_by = 'name' AND :sort_direction = 'ASC' THEN name END,
    CASE WHEN :sort_by = 'name' AND :sort_direction = 'DESC' THEN name END DESC,
    CASE WHEN :sort_by = 'usage' AND :sort_direction = 'ASC' THEN usage_count END,
    CASE WHEN :sort_by = 'usage' AND :sort_direction = 'DESC' THEN usage_count END DESC,
    CASE WHEN :sort_by = 'created' AND :sort_direction = 'ASC' THEN created_at END,
    CASE WHEN :sort_by = 'created' AND :sort_direction = 'DESC' THEN created_at END DESC,
    CASE WHEN :sort_by = 'updated' AND :sort_direction = 'ASC' THEN updated_at END,
    CASE WHEN :sort_by = 'updated' AND :sort_direction = 'DESC' THEN updated_at END DESC
LIMIT 20 OFFSET 0;

-- 10. Pagination with batch processing (for large datasets)
-- Using row number for efficient pagination
WITH numbered_tags AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (ORDER BY sort_order, name) AS row_num
    FROM tags
    WHERE is_active = 1
)
SELECT *
FROM numbered_tags
WHERE row_num BETWEEN 1 AND 20  -- page 1
ORDER BY row_num;

-- 11. Pagination with previous/next links
WITH pagination_data AS (
    SELECT 
        id,
        name,
        slug,
        description,
        usage_count,
        is_active,
        sort_order,
        created_at,
        (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_count,
        ROW_NUMBER() OVER (ORDER BY sort_order, name) AS row_num
    FROM tags
    WHERE is_active = 1
)
SELECT 
    *,
    CASE WHEN row_num > 20 THEN 
        (SELECT id FROM pagination_data WHERE row_num = row_num - 20) 
    ELSE NULL END AS previous_id,
    CASE WHEN row_num + 20 <= total_count THEN 
        (SELECT id FROM pagination_data WHERE row_num = row_num + 20) 
    ELSE NULL END AS next_id
FROM pagination_data
WHERE row_num BETWEEN 21 AND 40  -- page 2
ORDER BY row_num;

-- 12. Pagination metadata query
-- Get pagination metadata separately
SELECT 
    COUNT(*) AS total_count,
    COUNT(*) / 20 + CASE WHEN COUNT(*) % 20 > 0 THEN 1 ELSE 0 END AS total_pages,
    20 AS per_page,
    1 AS current_page,
    20 * (1 - 1) + 1 AS start_item,
    LEAST(20 * 1, COUNT(*)) AS end_item
FROM tags
WHERE is_active = 1;

-- 13. Pagination with group by
SELECT 
    t.parent_id,
    t.id,
    t.name,
    t.usage_count,
    COUNT(bt.id) AS book_assignments,
    (SELECT COUNT(DISTINCT t2.parent_id) 
     FROM tags t2 
     WHERE t2.is_active = 1
    ) AS total_groups
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
WHERE t.is_active = 1
AND t.parent_id IS NOT NULL
GROUP BY t.id
ORDER BY t.parent_id, t.usage_count DESC
LIMIT 20 OFFSET 0;

-- 14. Pagination with subquery pagination (for complex queries)
-- First get the IDs, then fetch full data
WITH paginated_ids AS (
    SELECT id
    FROM tags
    WHERE is_active = 1
    ORDER BY sort_order, name
    LIMIT 20 OFFSET 0
)
SELECT t.*
FROM tags t
WHERE t.id IN (SELECT id FROM paginated_ids)
ORDER BY t.sort_order, t.name;

-- 15. Pagination with total count and filtered count
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_count,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1 AND usage_count > 0) AS filtered_count
FROM tags
WHERE is_active = 1
AND usage_count > 0
ORDER BY usage_count DESC, name
LIMIT 20 OFFSET 0;

-- 16. Infinite scroll pagination (load more)
-- Using last seen values
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
AND (sort_order > 10 OR (sort_order = 10 AND id > 100))  -- last values
ORDER BY sort_order, id
LIMIT 20;

-- 17. Pagination with cursor (encrypted/encoded)
-- Using base64 encoded cursor
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at,
    -- Create cursor for next page
    base64_encode(json_object('sort_order', sort_order, 'id', id)) AS cursor
FROM tags
WHERE is_active = 1
AND (sort_order > :last_sort_order OR (sort_order = :last_sort_order AND id > :last_id))
ORDER BY sort_order, id
LIMIT 20;

-- 18. Pagination with offset and limit variables
SELECT 
    id,
    name,
    slug,
    description,
    usage_count,
    is_active,
    sort_order,
    created_at,
    @page_number := 1 AS page_number,
    @per_page := 20 AS per_page,
    @offset := (@page_number - 1) * @per_page AS offset_value
FROM tags
WHERE is_active = 1
ORDER BY sort_order, name
LIMIT @per_page OFFSET @offset;