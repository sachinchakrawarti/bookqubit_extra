-- =============================================
-- Admin Query: Merge Tags
-- Description: Merge two tags into one
-- =============================================

-- 1. Basic tag merge (source → target)
-- 1.1 Update book_tags
UPDATE book_tags 
SET tag_id = 2  -- target tag ID
WHERE tag_id = 1;  -- source tag ID

-- 1.2 Update tag hierarchy
UPDATE tag_hierarchy 
SET parent_id = 2 
WHERE parent_id = 1;

UPDATE tag_hierarchy 
SET child_id = 2 
WHERE child_id = 1;

-- 1.3 Update child tags
UPDATE tags 
SET parent_id = 2 
WHERE parent_id = 1;

-- 1.4 Update usage count for target
UPDATE tags 
SET usage_count = (
    SELECT COUNT(*) FROM book_tags WHERE tag_id = 2
)
WHERE id = 2;

-- 1.5 Delete source tag
DELETE FROM tags WHERE id = 1;

-- 2. Merge with translations merge
-- 2.1 Move translations
UPDATE tag_translations 
SET tag_id = 2 
WHERE tag_id = 1 
AND NOT EXISTS (
    SELECT 1 FROM tag_translations 
    WHERE tag_id = 2 AND language_id = tag_translations.language_id
);

-- 2.2 Delete remaining translations
DELETE FROM tag_translations 
WHERE tag_id = 1;

-- 2.3 Continue with merge steps...
UPDATE book_tags SET tag_id = 2 WHERE tag_id = 1;
UPDATE tag_hierarchy SET parent_id = 2 WHERE parent_id = 1;
UPDATE tag_hierarchy SET child_id = 2 WHERE child_id = 1;
UPDATE tags SET parent_id = 2 WHERE parent_id = 1;
UPDATE tags SET usage_count = (SELECT COUNT(*) FROM book_tags WHERE tag_id = 2) WHERE id = 2;
DELETE FROM tags WHERE id = 1;

-- 3. Merge with confirmation check
-- 3.1 Check if source tag exists
SELECT COUNT(*) AS source_exists FROM tags WHERE id = 1;

-- 3.2 Check if target tag exists
SELECT COUNT(*) AS target_exists FROM tags WHERE id = 2;

-- 3.3 Perform merge if both exist
INSERT INTO tag_translations (tag_id, language_id, name, description, created_by, created_at, updated_at)
SELECT 
    2,
    language_id,
    name,
    description,
    created_by,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM tag_translations
WHERE tag_id = 1
AND NOT EXISTS (
    SELECT 1 FROM tag_translations 
    WHERE tag_id = 2 AND language_id = tag_translations.language_id
);

UPDATE book_tags SET tag_id = 2 WHERE tag_id = 1;
UPDATE tag_hierarchy SET parent_id = 2 WHERE parent_id = 1;
UPDATE tag_hierarchy SET child_id = 2 WHERE child_id = 1;
UPDATE tags SET parent_id = 2 WHERE parent_id = 1;
UPDATE tags SET usage_count = (SELECT COUNT(*) FROM book_tags WHERE tag_id = 2) WHERE id = 2;
DELETE FROM tags WHERE id = 1;

-- 4. Merge multiple tags into one
UPDATE book_tags SET tag_id = 10 WHERE tag_id IN (1, 2, 3, 4, 5);

-- Move translations
INSERT OR IGNORE INTO tag_translations (tag_id, language_id, name, description, created_by, created_at, updated_at)
SELECT 
    10,
    language_id,
    name,
    description,
    created_by,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM tag_translations
WHERE tag_id IN (1, 2, 3, 4, 5);

-- Update hierarchy
UPDATE tag_hierarchy SET parent_id = 10 WHERE parent_id IN (1, 2, 3, 4, 5);
UPDATE tag_hierarchy SET child_id = 10 WHERE child_id IN (1, 2, 3, 4, 5);

-- Update child tags
UPDATE tags SET parent_id = 10 WHERE parent_id IN (1, 2, 3, 4, 5);

-- Delete source tags
DELETE FROM tags WHERE id IN (1, 2, 3, 4, 5);

-- 5. Merge with audit log
-- 5.1 Log the merge operation
INSERT INTO audit_log (table_name, record_id, action, old_data, new_data, created_at, user_id)
VALUES (
    'tags',
    2,
    'MERGE',
    json_object('source_ids', '1,2,3', 'target_id', 4),
    json_object('merged', 'Tags merged successfully'),
    CURRENT_TIMESTAMP,
    1
);

-- 5.2 Perform merge
UPDATE book_tags SET tag_id = 4 WHERE tag_id IN (1, 2, 3);
UPDATE tag_hierarchy SET parent_id = 4 WHERE parent_id IN (1, 2, 3);
UPDATE tag_hierarchy SET child_id = 4 WHERE child_id IN (1, 2, 3);
UPDATE tags SET parent_id = 4 WHERE parent_id IN (1, 2, 3);
UPDATE tags SET usage_count = (SELECT COUNT(*) FROM book_tags WHERE tag_id = 4) WHERE id = 4;
DELETE FROM tags WHERE id IN (1, 2, 3);

-- 6. Safe merge with transaction (SQLite)
BEGIN TRANSACTION;

-- Merge steps here

COMMIT;
-- Or ROLLBACK if error

-- 7. Merge and update tag counts
UPDATE tags SET usage_count = (
    SELECT COUNT(*) FROM book_tags WHERE tag_id = tags.id
) WHERE id IN (1, 2);

-- 8. Verify merge result
SELECT 
    'Source tag' AS type,
    id,
    name,
    usage_count,
    is_active
FROM tags WHERE id = 1
UNION ALL
SELECT 
    'Target tag' AS type,
    id,
    name,
    usage_count,
    is_active
FROM tags WHERE id = 2;

-- 9. Merge duplicate tags (by name)
-- 9.1 Find duplicates
SELECT LOWER(name) AS name_lower, GROUP_CONCAT(id) AS ids, COUNT(*) AS count
FROM tags
GROUP BY LOWER(name)
HAVING COUNT(*) > 1;

-- 9.2 Merge duplicates
WITH duplicates AS (
    SELECT 
        LOWER(name) AS name_lower,
        MIN(id) AS keep_id,
        json_group_array(id) AS duplicate_ids
    FROM tags
    GROUP BY LOWER(name)
    HAVING COUNT(*) > 1
)
SELECT 
    name_lower,
    keep_id,
    duplicate_ids
FROM duplicates;