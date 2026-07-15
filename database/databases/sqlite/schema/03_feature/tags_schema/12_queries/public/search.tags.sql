-- =============================================
-- Public Query: Search Tags
-- Description: Search tags with various criteria
-- =============================================

-- 1. Basic search by name
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 5
        ELSE 1
    END AS relevance
FROM tags t
WHERE t.is_active = 1
AND (
    LOWER(t.name) LIKE LOWER('%science%')
    OR LOWER(t.slug) LIKE LOWER('%science%')
    OR LOWER(t.description) LIKE LOWER('%science%')
)
ORDER BY relevance DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 2. Search with translations
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    COALESCE(tt.name, t.name) AS display_name,
    COALESCE(tt.description, t.description) AS display_description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN LOWER(COALESCE(tt.name, t.name)) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 5
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 3
        ELSE 1
    END AS relevance
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = 1
WHERE t.is_active = 1
AND (
    LOWER(t.name) LIKE LOWER('%science%')
    OR LOWER(t.slug) LIKE LOWER('%science%')
    OR LOWER(t.description) LIKE LOWER('%science%')
    OR LOWER(tt.name) LIKE LOWER('%science%')
    OR LOWER(tt.description) LIKE LOWER('%science%')
)
ORDER BY relevance DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 3. Search with autocomplete
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    LENGTH(t.name) AS name_length
FROM tags t
WHERE t.is_active = 1
AND LOWER(t.name) LIKE LOWER('sci%')
ORDER BY t.usage_count DESC, t.name
LIMIT 10;

-- 4. Full-text search (using FTS)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    fts.name AS matched_name,
    fts.description AS matched_description,
    rank
FROM tags_fts fts
JOIN tags t ON fts.rowid = t.id
WHERE tags_fts MATCH 'science fiction'
AND t.is_active = 1
ORDER BY rank, t.usage_count DESC
LIMIT 20;

-- 5. Search with filters
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    t.language_id,
    t.usage_count,
    t.sort_order,
    t.is_active,
    t.created_at,
    CASE 
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 5
        ELSE 1
    END AS relevance
FROM tags t
WHERE t.is_active = 1
AND (LOWER(t.name) LIKE LOWER('%science%') OR LOWER(t.description) LIKE LOWER('%science%'))
AND (t.parent_id IS NULL OR t.parent_id = 1)  -- Filter by parent
AND (t.language_id = 1)  -- Filter by language
AND (t.usage_count >= 10)  -- Filter by usage
ORDER BY relevance DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 6. Search with pagination
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 5
        ELSE 1
    END AS relevance,
    COUNT(*) OVER() AS total_count
FROM tags t
WHERE t.is_active = 1
AND (LOWER(t.name) LIKE LOWER('%science%') OR LOWER(t.description) LIKE LOWER('%science%'))
ORDER BY relevance DESC, t.usage_count DESC, t.name
LIMIT 20 OFFSET 0;

-- 7. Search by partial match
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN LOWER(t.name) LIKE LOWER('science%') THEN 10
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 5
        WHEN LOWER(t.name) LIKE LOWER('%science') THEN 3
        ELSE 1
    END AS match_type
FROM tags t
WHERE t.is_active = 1
AND LOWER(t.name) LIKE LOWER('%science%')
ORDER BY match_type DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 8. Search with hierarchy
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    p.name AS parent_name,
    p.slug AS parent_slug,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 5
        ELSE 1
    END AS relevance,
    COALESCE(th.level, 0) AS hierarchy_level
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
LEFT JOIN tag_hierarchy th ON t.id = th.child_id
WHERE t.is_active = 1
AND (LOWER(t.name) LIKE LOWER('%science%') OR LOWER(t.description) LIKE LOWER('%science%'))
ORDER BY relevance DESC, hierarchy_level, t.usage_count DESC, t.name
LIMIT 20;

-- 9. Search with language filter and translations
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    tt.name AS translated_name,
    tt.description AS translated_description,
    l.code AS language_code,
    l.name AS language_name,
    CASE 
        WHEN LOWER(tt.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 5
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 3
        ELSE 1
    END AS relevance
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = 1
LEFT JOIN languages l ON tt.language_id = l.id
WHERE t.is_active = 1
AND (
    LOWER(t.name) LIKE LOWER('%science%')
    OR LOWER(t.slug) LIKE LOWER('%science%')
    OR LOWER(t.description) LIKE LOWER('%science%')
    OR LOWER(tt.name) LIKE LOWER('%science%')
    OR LOWER(tt.description) LIKE LOWER('%science%')
)
ORDER BY relevance DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 10. Search with exact match
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    t.created_at,
    t.updated_at
FROM tags t
WHERE t.is_active = 1
AND LOWER(t.name) = LOWER('Science Fiction')
ORDER BY t.usage_count DESC;

-- 11. Search with multiple terms
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    (
        CASE WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 1 ELSE 0 END +
        CASE WHEN LOWER(t.name) LIKE LOWER('%fiction%') THEN 1 ELSE 0 END +
        CASE WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 1 ELSE 0 END +
        CASE WHEN LOWER(t.description) LIKE LOWER('%fiction%') THEN 1 ELSE 0 END
    ) AS match_count
FROM tags t
WHERE t.is_active = 1
AND (
    LOWER(t.name) LIKE LOWER('%science%')
    OR LOWER(t.name) LIKE LOWER('%fiction%')
    OR LOWER(t.description) LIKE LOWER('%science%')
    OR LOWER(t.description) LIKE LOWER('%fiction%')
)
ORDER BY match_count DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 12. Search with popularity boosting
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 5
        ELSE 1
    END AS relevance,
    t.usage_count * 0.1 AS popularity_boost,
    (CASE 
        WHEN LOWER(t.name) LIKE LOWER('%science%') THEN 10
        WHEN LOWER(t.description) LIKE LOWER('%science%') THEN 5
        ELSE 1
    END + t.usage_count * 0.1) AS score
FROM tags t
WHERE t.is_active = 1
AND (LOWER(t.name) LIKE LOWER('%science%') OR LOWER(t.description) LIKE LOWER('%science%'))
ORDER BY score DESC, t.usage_count DESC, t.name
LIMIT 20;

-- 13. Search with related tags
WITH search_results AS (
    SELECT id, name, slug, description, usage_count, sort_order
    FROM tags
    WHERE is_active = 1
    AND LOWER(name) LIKE LOWER('%science%')
    LIMIT 5
)
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    CASE 
        WHEN t.id IN (SELECT id FROM search_results) THEN 'Direct Match'
        ELSE 'Related'
    END AS match_type,
    (
        SELECT COUNT(*) 
        FROM book_tags bt 
        WHERE bt.tag_id = t.id 
        AND EXISTS (
            SELECT 1 FROM search_results sr
            WHERE sr.id IN (SELECT tag_id FROM book_tags WHERE book_id = bt.book_id)
        )
    ) AS related_score
FROM tags t
WHERE t.is_active = 1
AND EXISTS (
    SELECT 1 FROM search_results sr
    WHERE sr.id IN (SELECT tag_id FROM book_tags WHERE book_id IN (
        SELECT book_id FROM book_tags WHERE tag_id = sr.id
    ))
)
ORDER BY 
    CASE WHEN t.id IN (SELECT id FROM search_results) THEN 0 ELSE 1 END,
    related_score DESC,
    t.usage_count DESC
LIMIT 20;

-- 14. Search with suggestion
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.usage_count,
    t.sort_order,
    t.is_active,
    'tag' AS type
FROM tags t
WHERE t.is_active = 1
AND LOWER(t.name) LIKE LOWER('%science%')
UNION ALL
SELECT 
    NULL AS id,
    'Search for "' || '%science%' || '"' AS name,
    NULL AS slug,
    NULL AS description,
    NULL AS usage_count,
    NULL AS sort_order,
    NULL AS is_active,
    'suggestion' AS type
ORDER BY type, usage_count DESC, name
LIMIT 20;