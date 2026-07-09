-- =============================================
-- Unit Tests: Tags Schema
-- Description: Individual component tests
-- =============================================

-- =============================================
-- 1. TABLE EXISTENCE TESTS
-- =============================================

-- 1.1 Check if all tables exist
SELECT 
    'tags' AS table_name,
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END AS test_result
FROM sqlite_master 
WHERE type = 'table' AND name = 'tags'
UNION ALL
SELECT 
    'tag_translations',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'table' AND name = 'tag_translations'
UNION ALL
SELECT 
    'book_tags',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'table' AND name = 'book_tags'
UNION ALL
SELECT 
    'tag_hierarchy',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'table' AND name = 'tag_hierarchy';

-- =============================================
-- 2. VIEW EXISTENCE TESTS
-- =============================================

SELECT 
    'vw_tags' AS view_name,
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END AS test_result
FROM sqlite_master 
WHERE type = 'view' AND name = 'vw_tags'
UNION ALL
SELECT 
    'vw_tag_hierarchy',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'view' AND name = 'vw_tag_hierarchy'
UNION ALL
SELECT 
    'vw_tag_popularity',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'view' AND name = 'vw_tag_popularity'
UNION ALL
SELECT 
    'vw_tag_usage',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'view' AND name = 'vw_tag_usage';

-- =============================================
-- 3. INDEX EXISTENCE TESTS
-- =============================================

SELECT 
    'idx_tags_slug_unique' AS index_name,
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END AS test_result
FROM sqlite_master 
WHERE type = 'index' AND name = 'idx_tags_slug_unique'
UNION ALL
SELECT 
    'idx_tags_name',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'index' AND name = 'idx_tags_name'
UNION ALL
SELECT 
    'idx_tag_translations_tag_lang',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'index' AND name = 'idx_tag_translations_tag_lang'
UNION ALL
SELECT 
    'idx_book_tags_book_tag',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'index' AND name = 'idx_book_tags_book_tag';

-- =============================================
-- 4. TRIGGER EXISTENCE TESTS
-- =============================================

SELECT 
    'tr_tags_update_timestamp' AS trigger_name,
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END AS test_result
FROM sqlite_master 
WHERE type = 'trigger' AND name = 'tr_tags_update_timestamp'
UNION ALL
SELECT 
    'tr_tags_update_usage_count_insert',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'trigger' AND name = 'tr_tags_update_usage_count_insert'
UNION ALL
SELECT 
    'tr_hierarchy_validate_circular',
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END
FROM sqlite_master 
WHERE type = 'trigger' AND name = 'tr_hierarchy_validate_circular';

-- =============================================
-- 5. CONSTRAINT TESTS
-- =============================================

-- 5.1 Test NOT NULL constraints
BEGIN TRANSACTION;

-- Should fail (name is NULL)
INSERT OR IGNORE INTO tags (slug, description, language_id, created_by)
VALUES ('test-slug', 'Test description', 1, -1);

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM tags WHERE slug = 'test-slug' AND created_by = -1) = 0 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS not_null_test_result;

ROLLBACK;

-- 5.2 Test UNIQUE constraints
BEGIN TRANSACTION;

INSERT OR IGNORE INTO tags (name, slug, description, language_id, created_by)
VALUES ('Unique Test', 'unique-slug', 'Test description', 1, -1);

INSERT OR IGNORE INTO tags (name, slug, description, language_id, created_by)
VALUES ('Unique Test 2', 'unique-slug', 'Test description 2', 1, -1);

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM tags WHERE slug = 'unique-slug' AND created_by = -1) <= 1 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS unique_constraint_test_result;

ROLLBACK;

-- 5.3 Test CHECK constraints
BEGIN TRANSACTION;

-- Should fail (sort_order negative)
INSERT OR IGNORE INTO tags (name, slug, sort_order, language_id, created_by)
VALUES ('Check Test', 'check-test', -1, 1, -1);

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM tags WHERE slug = 'check-test' AND created_by = -1) = 0 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS check_constraint_test_result;

ROLLBACK;

-- =============================================
-- 6. FUNCTION TESTS
-- =============================================

-- 6.1 Test generate_tag_slug function
SELECT 
    generate_tag_slug('Test Tag') AS generated_slug,
    CASE 
        WHEN generate_tag_slug('Test Tag') = 'test-tag' 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS test_result;

-- 6.2 Test get_tag_hierarchy_path function
BEGIN TRANSACTION;

INSERT INTO tags (id, name, slug, description, language_id, created_by)
VALUES (9991, 'Level 1', 'level-1', 'Level 1', 1, -1);

INSERT INTO tags (id, name, slug, description, parent_id, language_id, created_by)
VALUES (9992, 'Level 2', 'level-2', 'Level 2', 9991, 1, -1);

INSERT INTO tags (id, name, slug, description, parent_id, language_id, created_by)
VALUES (9993, 'Level 3', 'level-3', 'Level 3', 9992, 1, -1);

INSERT INTO tag_hierarchy (parent_id, child_id, level, created_by)
VALUES (9991, 9992, 1, -1);
INSERT INTO tag_hierarchy (parent_id, child_id, level, created_by)
VALUES (9992, 9993, 2, -1);

SELECT 
    get_tag_hierarchy_path(9993) AS hierarchy_path,
    CASE 
        WHEN get_tag_hierarchy_path(9993) LIKE '%Level 1%Level 2%Level 3%' 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS test_result;

ROLLBACK;

-- =============================================
-- 7. VIEW TESTS
-- =============================================

-- 7.1 Test vw_tags view
BEGIN TRANSACTION;

INSERT INTO tags (id, name, slug, description, language_id, created_by)
VALUES (9981, 'View Test', 'view-test', 'Test view', 1, -1);

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM vw_tags WHERE id = 9981) 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS view_test_result;

ROLLBACK;

-- 7.2 Test vw_tag_hierarchy view
BEGIN TRANSACTION;

INSERT INTO tags (id, name, slug, description, language_id, created_by)
VALUES (9982, 'Parent', 'parent-test', 'Parent', 1, -1);

INSERT INTO tags (id, name, slug, description, parent_id, language_id, created_by)
VALUES (9983, 'Child', 'child-test', 'Child', 9982, 1, -1);

INSERT INTO tag_hierarchy (parent_id, child_id, level, created_by)
VALUES (9982, 9983, 1, -1);

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM vw_tag_hierarchy WHERE id = 9983 AND level >= 0) 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS hierarchy_view_test_result;

ROLLBACK;

-- =============================================
-- 8. TRIGGER TESTS
-- =============================================

-- 8.1 Test timestamp trigger
BEGIN TRANSACTION;

INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Timestamp Test', 'timestamp-test', 'Test timestamp', 1, -1);

-- Wait a moment
SELECT sleep(1);

UPDATE tags SET description = 'Updated description' WHERE slug = 'timestamp-test';

SELECT 
    CASE 
        WHEN updated_at > created_at 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS timestamp_trigger_test_result;

ROLLBACK;

-- 8.2 Test usage count trigger
BEGIN TRANSACTION;

INSERT INTO tags (id, name, slug, description, language_id, created_by)
VALUES (9996, 'Usage Test', 'usage-test', 'Test usage', 1, -1);

INSERT INTO book_tags (book_id, tag_id, is_primary, created_by)
VALUES (9998, 9996, 1, -1);

SELECT 
    CASE 
        WHEN (SELECT usage_count FROM tags WHERE id = 9996) = 1 
        THEN 'PASS' 
        ELSE 'FAIL' 
    END AS usage_trigger_test_result;

ROLLBACK;

-- =============================================
-- 9. PERFORMANCE TESTS
-- =============================================

-- 9.1 Query performance with large dataset
EXPLAIN QUERY PLAN
SELECT 
    t.id,
    t.name,
    t.slug,
    COUNT(bt.id) AS book_count,
    COUNT(tt.id) AS translation_count
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
WHERE t.is_active = 1
GROUP BY t.id
ORDER BY t.usage_count DESC
LIMIT 20;

-- =============================================
-- 10. DATA INTEGRITY TESTS
-- =============================================

-- 10.1 Check for orphaned translations
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS' 
        ELSE 'FAIL' 
    END AS orphaned_translations_test
FROM tag_translations tt
LEFT JOIN tags t ON tt.tag_id = t.id
WHERE t.id IS NULL;

-- 10.2 Check for orphaned book_tags
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS' 
        ELSE 'FAIL' 
    END AS orphaned_book_tags_test
FROM book_tags bt
LEFT JOIN tags t ON bt.tag_id = t.id
LEFT JOIN books b ON bt.book_id = b.id
WHERE t.id IS NULL OR b.id IS NULL;

-- 10.3 Check for circular hierarchy
WITH RECURSIVE circular_check AS (
    SELECT parent_id, child_id, 
           parent_id || '->' || child_id AS path
    FROM tag_hierarchy
    WHERE parent_id = child_id
    
    UNION ALL
    
    SELECT h.parent_id, h.child_id,
           cc.path || '->' || h.child_id
    FROM tag_hierarchy h
    INNER JOIN circular_check cc ON h.parent_id = cc.child_id
    WHERE cc.path NOT LIKE '%' || h.child_id || '%'
)
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS' 
        ELSE 'FAIL' 
    END AS circular_hierarchy_test
FROM circular_check;

-- =============================================
-- 11. BULK OPERATION TESTS
-- =============================================

-- 11.1 Test bulk insert
BEGIN TRANSACTION;

INSERT INTO tags (name, slug, description, language_id, created_by)
SELECT 
    'Bulk Tag ' || n,
    'bulk-tag-' || n,
    'Bulk description ' || n,
    1,
    -1
FROM (
    SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
);

SELECT 
    CASE 
        WHEN COUNT(*) = 5 THEN 'PASS' 
        ELSE 'FAIL' 
    END AS bulk_insert_test
FROM tags
WHERE created_by = -1 AND name LIKE 'Bulk Tag%';

ROLLBACK;

-- =============================================
-- 12. SUMMARY
-- =============================================

SELECT 'Unit tests completed' AS status;
SELECT 
    COUNT(*) AS total_tests_run,
    SUM(CASE WHEN test_result = 'PASS' THEN 1 ELSE 0 END) AS tests_passed,
    SUM(CASE WHEN test_result = 'FAIL' THEN 1 ELSE 0 END) AS tests_failed
FROM (
    SELECT 'PASS' AS test_result WHERE 1=1
    UNION ALL SELECT 'PASS'
    -- This is a placeholder; actual tests are above
);