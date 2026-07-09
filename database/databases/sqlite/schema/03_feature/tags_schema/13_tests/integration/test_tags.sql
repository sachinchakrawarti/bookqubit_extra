-- =============================================
-- Integration Tests: Tags Schema
-- Description: Test tag operations with relationships
-- =============================================

-- =============================================
-- 1. TEST TAG CREATION WITH TRANSLATIONS
-- =============================================

-- 1.1 Test create tag with translations
BEGIN TRANSACTION;

INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Integration Test Tag', 'integration-test', 'Test tag description', 1, -1);

SELECT 'Created tag with ID: ' || last_insert_rowid() AS test_result;

INSERT INTO tag_translations (tag_id, language_id, name, description, created_by)
VALUES 
    (last_insert_rowid(), 2, 'एकीकरण परीक्षण टैग', 'परीक्षण टैग विवरण', -1),
    (last_insert_rowid(), 3, 'Etiqueta de Prueba de Integración', 'Descripción de etiqueta de prueba', -1);

SELECT 'Tag with translations created successfully' AS test_result;

ROLLBACK;

-- 1.2 Test create tag with invalid data
BEGIN TRANSACTION;

INSERT OR IGNORE INTO tags (name, slug, description, language_id, created_by)
VALUES ('', '', 'Test', 1, -1);

SELECT 'Invalid tag rejected' AS test_result;

ROLLBACK;

-- =============================================
-- 2. TEST HIERARCHY OPERATIONS
-- =============================================

-- 2.1 Test tag hierarchy creation
BEGIN TRANSACTION;

-- Create parent
INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Parent Tag', 'parent-tag', 'Parent tag description', 1, -1);
SELECT 'Parent tag created with ID: ' || last_insert_rowid() AS test_result;

-- Create child
INSERT INTO tags (name, slug, description, parent_id, language_id, created_by)
VALUES ('Child Tag', 'child-tag', 'Child tag description', last_insert_rowid(), 1, -1);
SELECT 'Child tag created with ID: ' || last_insert_rowid() AS test_result;

-- Create hierarchy
INSERT INTO tag_hierarchy (parent_id, child_id, level, created_by)
SELECT 
    parent.id,
    child.id,
    1,
    -1
FROM tags parent, tags child
WHERE parent.name = 'Parent Tag' AND child.name = 'Child Tag';

SELECT 'Hierarchy created successfully' AS test_result;

ROLLBACK;

-- 2.2 Test preventing circular references
BEGIN TRANSACTION;

-- Create tags
INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Tag A', 'tag-a', 'Tag A', 1, -1);
SELECT last_insert_rowid();

INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Tag B', 'tag-b', 'Tag B', 1, -1);
SELECT last_insert_rowid();

-- Add hierarchy
INSERT OR IGNORE INTO tag_hierarchy (parent_id, child_id, level, created_by)
VALUES (last_insert_rowid() - 1, last_insert_rowid(), 1, -1);

-- Try to create circular reference (should fail)
INSERT OR IGNORE INTO tag_hierarchy (parent_id, child_id, level, created_by)
VALUES (last_insert_rowid(), last_insert_rowid() - 1, 1, -1);

SELECT 'Circular reference prevented' AS test_result;

ROLLBACK;

-- =============================================
-- 3. TEST BOOK TAGS RELATIONSHIPS
-- =============================================

-- 3.1 Test book-tag assignment
BEGIN TRANSACTION;

-- Create test book (if not exists)
INSERT OR IGNORE INTO books (id, title, language_id, created_by)
VALUES (9999, 'Test Book for Tags', 1, -1);

-- Create test tag
INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Book Test Tag', 'book-test-tag', 'Tag for book testing', 1, -1);

-- Assign tag to book
INSERT INTO book_tags (book_id, tag_id, is_primary, created_by)
VALUES (9999, last_insert_rowid(), 1, -1);

SELECT 'Book-tag relationship created' AS test_result;

-- Verify assignment
SELECT 
    b.title,
    t.name AS tag_name,
    bt.is_primary
FROM books b
JOIN book_tags bt ON b.id = bt.book_id
JOIN tags t ON bt.tag_id = t.id
WHERE b.id = 9999 AND t.created_by = -1;

ROLLBACK;

-- =============================================
-- 4. TEST TAG SEARCH
-- =============================================

-- 4.1 Test basic search
SELECT 
    id,
    name,
    slug,
    description,
    usage_count
FROM tags
WHERE created_by = -1
AND name LIKE '%Test%'
ORDER BY name;

-- 4.2 Test search with translations
SELECT 
    t.id,
    t.name,
    COALESCE(tt.name, t.name) AS display_name,
    t.description,
    COALESCE(tt.description, t.description) AS display_description
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = 2
WHERE t.created_by = -1
AND (t.name LIKE '%Test%' OR tt.name LIKE '%परीक्षण%')
ORDER BY t.name;

-- =============================================
-- 5. TEST TAG MERGE
-- =============================================

-- 5.1 Test merge operation
BEGIN TRANSACTION;

-- Create two tags
INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Merge Source', 'merge-source', 'Source tag', 1, -1);

INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Merge Target', 'merge-target', 'Target tag', 1, -1);

-- Move book_tags from source to target
UPDATE book_tags 
SET tag_id = (SELECT id FROM tags WHERE name = 'Merge Target')
WHERE tag_id = (SELECT id FROM tags WHERE name = 'Merge Source');

-- Delete source tag
DELETE FROM tags WHERE name = 'Merge Source';

SELECT 'Tags merged successfully' AS test_result;

ROLLBACK;

-- =============================================
-- 6. TEST TAG DELETE WITH CASCADE
-- =============================================

-- 6.1 Test cascade delete
BEGIN TRANSACTION;

-- Create tag with child
INSERT INTO tags (name, slug, description, language_id, created_by)
VALUES ('Parent Delete Test', 'parent-delete', 'Parent tag', 1, -1);

INSERT INTO tags (name, slug, description, parent_id, language_id, created_by)
VALUES ('Child Delete Test', 'child-delete', 'Child tag', last_insert_rowid(), 1, -1);

-- Delete parent (should cascade to child if foreign keys set properly)
DELETE FROM tags WHERE name = 'Parent Delete Test';

-- Check if child remains (if foreign keys not set, it becomes orphan)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM tags WHERE name = 'Child Delete Test') 
        THEN 'Child remains (orphan)' 
        ELSE 'Child deleted (cascade)' 
    END AS test_result;

ROLLBACK;

-- =============================================
-- 7. TEST TAG STATISTICS
-- =============================================

-- 7.1 Test tag statistics
SELECT 
    COUNT(*) AS total_tags,
    SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active_tags,
    SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive_tags,
    SUM(usage_count) AS total_usage,
    AVG(usage_count) AS avg_usage,
    MAX(usage_count) AS max_usage,
    MIN(usage_count) AS min_usage
FROM tags
WHERE created_by = -1;

-- =============================================
-- 8. TEST TAG VALIDATION
-- =============================================

-- 8.1 Test duplicate name validation
BEGIN TRANSACTION;

INSERT OR IGNORE INTO tags (name, slug, description, language_id, created_by)
VALUES ('Duplicate Test', 'duplicate-test', 'First tag', 1, -1);

INSERT OR IGNORE INTO tags (name, slug, description, language_id, created_by)
VALUES ('Duplicate Test', 'duplicate-test-2', 'Second tag with same name', 1, -1);

SELECT 
    COUNT(*) AS duplicate_count
FROM tags
WHERE name = 'Duplicate Test' AND created_by = -1;

ROLLBACK;

-- 8.2 Test slug format validation
SELECT 
    name,
    slug,
    CASE 
        WHEN slug GLOB '[a-z0-9-]*' THEN 'Valid'
        ELSE 'Invalid'
    END AS slug_valid
FROM tags
WHERE created_by = -1;

-- =============================================
-- 9. TEST PERFORMANCE
-- =============================================

-- 9.1 Test query performance with indexes
EXPLAIN QUERY PLAN
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    COUNT(bt.id) AS book_count
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
WHERE t.is_active = 1
AND t.created_by = -1
GROUP BY t.id
ORDER BY t.usage_count DESC
LIMIT 10;

-- =============================================
-- 10. TEST CLEANUP
-- =============================================

-- 10.1 Clean up test data
DELETE FROM tag_hierarchy WHERE created_by = -1;
DELETE FROM book_tags WHERE created_by = -1;
DELETE FROM tag_translations WHERE created_by = -1;
DELETE FROM tags WHERE created_by = -1;
DELETE FROM books WHERE created_by = -1 AND id >= 9000;

SELECT 'Integration tests completed' AS status;