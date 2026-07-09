-- =============================================
-- Shared Query: Filters
-- Description: Common filter patterns for tag queries
-- =============================================

-- 1. Filter by active status
-- Get only active tags
SELECT * FROM tags WHERE is_active = 1;

-- Get only inactive tags
SELECT * FROM tags WHERE is_active = 0;

-- Get all tags (active and inactive)
SELECT * FROM tags;

-- 2. Filter by parent
-- Get root tags (no parent)
SELECT * FROM tags WHERE parent_id IS NULL AND is_active = 1;

-- Get child tags (has parent)
SELECT * FROM tags WHERE parent_id IS NOT NULL AND is_active = 1;

-- Get tags with specific parent
SELECT * FROM tags WHERE parent_id = 1 AND is_active = 1;

-- Get tags with multiple parents
SELECT * FROM tags WHERE parent_id IN (1, 2, 3) AND is_active = 1;

-- Get direct children of a tag (using hierarchy)
SELECT t.* 
FROM tags t
JOIN tag_hierarchy th ON t.id = th.child_id
WHERE th.parent_id = 1
AND t.is_active = 1;

-- Get all descendants of a tag
WITH RECURSIVE descendants AS (
    SELECT id FROM tags WHERE id = 1
    UNION ALL
    SELECT t.id FROM tags t
    JOIN descendants d ON t.parent_id = d.id
)
SELECT t.* 
FROM tags t
WHERE t.id IN (SELECT id FROM descendants)
AND t.is_active = 1;

-- 3. Filter by language
-- Get tags for specific language
SELECT * FROM tags WHERE language_id = 1 AND is_active = 1;

-- Get tags with translations in specific language
SELECT t.* 
FROM tags t
JOIN tag_translations tt ON t.id = tt.tag_id
WHERE tt.language_id = 1
AND t.is_active = 1;

-- Get tags without translations in specific language
SELECT t.* 
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = 1
WHERE tt.id IS NULL
AND t.is_active = 1;

-- 4. Filter by usage
-- Get tags with usage count > 0
SELECT * FROM tags WHERE usage_count > 0 AND is_active = 1;

-- Get tags with no usage
SELECT * FROM tags WHERE usage_count = 0 AND is_active = 1;

-- Get tags with usage count between range
SELECT * FROM tags 
WHERE usage_count BETWEEN 10 AND 100 
AND is_active = 1;

-- Get tags with minimum usage
SELECT * FROM tags 
WHERE usage_count >= 10 
AND is_active = 1
ORDER BY usage_count DESC;

-- 5. Filter by date
-- Get tags created in last 30 days
SELECT * FROM tags 
WHERE created_at >= date('now', '-30 days')
AND is_active = 1;

-- Get tags created between dates
SELECT * FROM tags 
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'
AND is_active = 1;

-- Get tags updated in last 7 days
SELECT * FROM tags 
WHERE updated_at >= date('now', '-7 days')
AND is_active = 1;

-- Get tags created this month
SELECT * FROM tags 
WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
AND is_active = 1;

-- 6. Filter by name
-- Exact name match
SELECT * FROM tags WHERE name = 'Science Fiction' AND is_active = 1;

-- Case-insensitive name match
SELECT * FROM tags WHERE LOWER(name) = LOWER('science fiction') AND is_active = 1;

-- Name contains text
SELECT * FROM tags WHERE name LIKE '%Science%' AND is_active = 1;

-- Name starts with text
SELECT * FROM tags WHERE name LIKE 'Science%' AND is_active = 1;

-- Name ends with text
SELECT * FROM tags WHERE name LIKE '%Fiction' AND is_active = 1;

-- 7. Filter by slug
-- Exact slug match
SELECT * FROM tags WHERE slug = 'science-fiction' AND is_active = 1;

-- Slug contains text
SELECT * FROM tags WHERE slug LIKE '%science%' AND is_active = 1;

-- 8. Filter by multiple criteria combination
-- Active tags with parent and usage
SELECT * FROM tags 
WHERE is_active = 1
AND parent_id IS NOT NULL
AND usage_count > 0
ORDER BY usage_count DESC;

-- Active tags with specific language and parent
SELECT * FROM tags 
WHERE is_active = 1
AND language_id = 1
AND parent_id = 1
ORDER BY sort_order, name;

-- Active tags with translations in specific language
SELECT t.* 
FROM tags t
JOIN tag_translations tt ON t.id = tt.tag_id
WHERE t.is_active = 1
AND tt.language_id = 1
AND tt.name LIKE '%science%'
ORDER BY t.usage_count DESC;

-- 9. Filter with joins
-- Tags with book count
SELECT 
    t.*,
    COUNT(DISTINCT bt.book_id) AS book_count,
    COUNT(bt.id) AS assignment_count
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
WHERE t.is_active = 1
GROUP BY t.id
HAVING book_count > 0
ORDER BY book_count DESC;

-- Tags with translations count
SELECT 
    t.*,
    COUNT(tt.id) AS translation_count,
    GROUP_CONCAT(DISTINCT l.code) AS language_codes
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
LEFT JOIN languages l ON tt.language_id = l.id
WHERE t.is_active = 1
GROUP BY t.id
ORDER BY translation_count DESC;

-- 10. Filter with subqueries
-- Tags that are used in books
SELECT * FROM tags 
WHERE id IN (SELECT DISTINCT tag_id FROM book_tags)
AND is_active = 1;

-- Tags that have translations
SELECT * FROM tags 
WHERE id IN (SELECT DISTINCT tag_id FROM tag_translations)
AND is_active = 1;

-- Tags that have children
SELECT * FROM tags 
WHERE id IN (SELECT DISTINCT parent_id FROM tags WHERE parent_id IS NOT NULL)
AND is_active = 1;

-- Tags that are leaf (no children)
SELECT * FROM tags 
WHERE id NOT IN (SELECT DISTINCT parent_id FROM tags WHERE parent_id IS NOT NULL)
AND is_active = 1;

-- 11. Filter by hierarchy level
-- Tags at specific level
SELECT t.* 
FROM tags t
JOIN tag_hierarchy th ON t.id = th.child_id
WHERE th.level = 1
AND t.is_active = 1;

-- Tags above/below specific level
SELECT t.* 
FROM tags t
JOIN tag_hierarchy th ON t.id = th.child_id
WHERE th.level <= 2
AND t.is_active = 1;

-- 12. Filter by metadata
-- Featured tags
SELECT * FROM tags WHERE is_featured = 1 AND is_active = 1;

-- SEO friendly tags
SELECT * FROM tags WHERE seo_friendly = 1 AND is_active = 1;

-- Tags with images
SELECT * FROM tags WHERE featured_image IS NOT NULL AND is_active = 1;

-- Tags with specific color
SELECT * FROM tags WHERE color_code = '#45B7D1' AND is_active = 1;

-- 13. Filter with sorting
-- Sort by name
SELECT * FROM tags WHERE is_active = 1 ORDER BY name;

-- Sort by usage count (most used first)
SELECT * FROM tags WHERE is_active = 1 ORDER BY usage_count DESC;

-- Sort by sort_order
SELECT * FROM tags WHERE is_active = 1 ORDER BY sort_order, name;

-- Sort by created date (newest first)
SELECT * FROM tags WHERE is_active = 1 ORDER BY created_at DESC;

-- Sort by multiple columns
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY parent_id NULLS FIRST, sort_order, name;

-- 14. Filter with pagination
-- Basic pagination
SELECT * FROM tags 
WHERE is_active = 1 
ORDER BY name 
LIMIT 20 OFFSET 0;

-- Pagination with total count
SELECT 
    *,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_count
FROM tags 
WHERE is_active = 1 
ORDER BY name 
LIMIT 20 OFFSET 0;

-- 15. Filter with JSON conditions (for JSON columns)
-- Tags with specific meta data (if using JSON)
SELECT * FROM tags 
WHERE json_extract(meta_data, '$.featured') = 1
AND is_active = 1;

-- 16. Combined filter function (for dynamic queries)
-- This can be used as a template for building dynamic WHERE clauses
SELECT * FROM tags 
WHERE 1=1
AND (is_active = 1 OR :include_inactive = 1)
AND (parent_id = :parent_id OR :parent_id IS NULL)
AND (language_id = :language_id OR :language_id IS NULL)
AND (usage_count >= :min_usage OR :min_usage IS NULL)
AND (usage_count <= :max_usage OR :max_usage IS NULL)
AND (created_at >= :start_date OR :start_date IS NULL)
AND (created_at <= :end_date OR :end_date IS NULL)
AND (name LIKE '%' || :search || '%' OR :search IS NULL)
ORDER BY 
    CASE WHEN :sort_by = 'name' THEN name END,
    CASE WHEN :sort_by = 'usage' THEN usage_count END DESC,
    CASE WHEN :sort_by = 'created' THEN created_at END DESC,
    CASE WHEN :sort_by = 'updated' THEN updated_at END DESC
LIMIT :limit OFFSET :offset;