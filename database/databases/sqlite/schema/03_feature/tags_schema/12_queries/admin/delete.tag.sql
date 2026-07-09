-- =============================================
-- Admin Query: Delete Tag
-- Description: Delete tag with cascade handling
-- =============================================

-- 1. Soft delete (set inactive)
UPDATE tags 
SET is_active = 0,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 1
WHERE id = 1;

-- 2. Hard delete (remove completely)
DELETE FROM tags WHERE id = 1;

-- 3. Delete tag with cascade (will cascade to translations and book_tags)
DELETE FROM tags WHERE id = 1;

-- 4. Delete tag and move children to parent
-- 4.1 Get children
SELECT id, name FROM tags WHERE parent_id = 1;

-- 4.2 Move children to parent's parent
UPDATE tags 
SET parent_id = (SELECT parent_id FROM tags WHERE id = 1)
WHERE parent_id = 1;

-- 4.3 Delete the tag
DELETE FROM tags WHERE id = 1;

-- 5. Delete tag and reassign book_tags
-- 5.1 Reassign books to another tag
UPDATE book_tags 
SET tag_id = 2 
WHERE tag_id = 1;

-- 5.2 Delete the tag
DELETE FROM tags WHERE id = 1;

-- 6. Delete inactive tags
DELETE FROM tags 
WHERE is_active = 0 
AND NOT EXISTS (SELECT 1 FROM book_tags WHERE tag_id = tags.id);

-- 7. Delete orphaned tags (no books)
DELETE FROM tags 
WHERE NOT EXISTS (SELECT 1 FROM book_tags WHERE tag_id = tags.id)
AND created_at < datetime('now', '-30 days');

-- 8. Bulk delete tags
DELETE FROM tags WHERE id IN (1, 2, 3, 4, 5);

-- 9. Delete tag with audit log
-- 9.1 Log the deletion
INSERT INTO audit_log (table_name, record_id, action, old_data, created_at, user_id)
SELECT 
    'tags',
    id,
    'DELETE',
    json_object(
        'id', id,
        'name', name,
        'slug', slug,
        'description', description,
        'parent_id', parent_id,
        'language_id', language_id
    ),
    CURRENT_TIMESTAMP,
    1
FROM tags WHERE id = 1;

-- 9.2 Delete the tag
DELETE FROM tags WHERE id = 1;

-- 10. Delete tag and all descendants
WITH RECURSIVE descendants AS (
    SELECT id FROM tags WHERE id = 1
    UNION ALL
    SELECT t.id FROM tags t
    INNER JOIN descendants d ON t.parent_id = d.id
)
DELETE FROM tags WHERE id IN (SELECT id FROM descendants);

-- 11. Delete tag with foreign key checks disabled (SQLite specific)
PRAGMA foreign_keys = OFF;
DELETE FROM tags WHERE id = 1;
PRAGMA foreign_keys = ON;

-- 12. Verify deletion
SELECT COUNT(*) AS remaining_tags FROM tags WHERE id = 1;