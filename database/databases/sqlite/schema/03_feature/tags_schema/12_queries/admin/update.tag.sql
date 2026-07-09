-- =============================================
-- Admin Query: Update Tag
-- Description: Update tag details
-- =============================================

-- 1. Basic tag update
UPDATE tags 
SET 
    name = 'Science Fiction',
    description = 'Updated description',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 2. Update tag slug
UPDATE tags 
SET 
    slug = 'science-fiction-updated',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 3. Update parent (move tag)
UPDATE tags 
SET 
    parent_id = 2,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 4. Update sort order
UPDATE tags 
SET 
    sort_order = 5,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 5. Toggle active status
UPDATE tags 
SET 
    is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 6. Update tag with validation
UPDATE tags 
SET 
    name = 'New Name',
    slug = 'new-slug',
    description = 'New description',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1
AND (name != 'New Name' OR slug != 'new-slug');

-- 7. Batch update tags
UPDATE tags 
SET 
    language_id = 2,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id IN (1, 2, 3, 4, 5);

-- 8. Update tag and its translations
BEGIN TRANSACTION;

-- Update tag
UPDATE tags 
SET 
    name = 'Science Fiction',
    description = 'Updated description',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- Update translations
UPDATE tag_translations 
SET 
    name = 'विज्ञान कथा',
    description = 'अद्यतन विवरण',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE tag_id = 1 AND language_id = 2;

COMMIT;

-- 9. Update tag with metadata
UPDATE tags 
SET 
    meta_title = 'Science Fiction Books',
    meta_description = 'Explore the best science fiction books',
    meta_keywords = 'science fiction, sci-fi, space',
    featured_image = '/images/tags/sci-fi.jpg',
    icon_class = 'fas fa-rocket',
    color_code = '#45B7D1',
    seo_friendly = 1,
    is_featured = 1,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 10. Increment view count
UPDATE tags 
SET 
    view_count = view_count + 1,
    last_viewed_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- 11. Recalculate usage count
UPDATE tags 
SET usage_count = (
    SELECT COUNT(*) FROM book_tags WHERE tag_id = tags.id
)
WHERE id = 1;

-- 12. Update tag with hierarchy
-- 12.1 Remove from old hierarchy
DELETE FROM tag_hierarchy WHERE child_id = 1;

-- 12.2 Add to new hierarchy
INSERT INTO tag_hierarchy (parent_id, child_id, level)
SELECT 2, 1, COALESCE(MAX(level), 0) + 1
FROM tag_hierarchy
WHERE child_id = 2;

-- 12.3 Update parent
UPDATE tags SET parent_id = 2 WHERE id = 1;

-- 13. Update tag name and sync slug
UPDATE tags 
SET 
    name = 'Science Fiction',
    slug = LOWER(REPLACE(REPLACE('Science Fiction', ' ', '-'), '_', '-')),
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 14. Update multiple tags with same parent
UPDATE tags 
SET 
    parent_id = 2,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE parent_id = 1;

-- 15. Update tag and move children
-- 15.1 Move children to new parent
UPDATE tags 
SET parent_id = 2 
WHERE parent_id = 1;

-- 15.2 Update the tag
UPDATE tags 
SET 
    name = 'New Name',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 16. Update tag with audit log
BEGIN TRANSACTION;

-- Log before update
INSERT INTO audit_log (table_name, record_id, action, old_data, created_at, user_id)
SELECT 
    'tags',
    id,
    'UPDATE_BEFORE',
    json_object(
        'id', id,
        'name', name,
        'slug', slug,
        'description', description,
        'parent_id', parent_id,
        'language_id', language_id,
        'is_active', is_active,
        'sort_order', sort_order
    ),
    CURRENT_TIMESTAMP,
    1
FROM tags WHERE id = 1;

-- Update tag
UPDATE tags 
SET 
    name = 'Updated Name',
    description = 'Updated description',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- Log after update
INSERT INTO audit_log (table_name, record_id, action, new_data, created_at, user_id)
SELECT 
    'tags',
    id,
    'UPDATE_AFTER',
    json_object(
        'id', id,
        'name', name,
        'slug', slug,
        'description', description,
        'parent_id', parent_id,
        'language_id', language_id,
        'is_active', is_active,
        'sort_order', sort_order
    ),
    CURRENT_TIMESTAMP,
    1
FROM tags WHERE id = 1;

COMMIT;

-- 17. Update tag with conditional check
UPDATE tags 
SET 
    name = 'New Name',
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1 
AND NOT EXISTS (
    SELECT 1 FROM tags 
    WHERE LOWER(name) = LOWER('New Name') 
    AND id != 1
);

-- 18. Verify update
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
    updated_at,
    updated_by
FROM tags 
WHERE id = 1;