-- =============================================
-- Test Fixtures: Tags Schema
-- Description: Sample data for testing
-- =============================================

-- =============================================
-- 1. CLEANUP EXISTING TEST DATA
-- =============================================
DELETE FROM tag_hierarchy WHERE parent_id IN (SELECT id FROM tags WHERE created_by = -1);
DELETE FROM book_tags WHERE tag_id IN (SELECT id FROM tags WHERE created_by = -1);
DELETE FROM tag_translations WHERE tag_id IN (SELECT id FROM tags WHERE created_by = -1);
DELETE FROM tags WHERE created_by = -1;

-- =============================================
-- 2. INSERT TEST TAGS
-- =============================================

-- Root tags
INSERT INTO tags (id, name, slug, description, parent_id, language_id, usage_count, is_active, sort_order, created_by, created_at, updated_at)
VALUES 
    (1001, 'Test Fiction', 'test-fiction', 'Test fiction category', NULL, 1, 0, 1, 1, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1002, 'Test Non-Fiction', 'test-non-fiction', 'Test non-fiction category', NULL, 1, 0, 1, 2, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1003, 'Test Children', 'test-children', 'Test children books', NULL, 1, 0, 1, 3, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Child tags (under Fiction)
INSERT INTO tags (id, name, slug, description, parent_id, language_id, usage_count, is_active, sort_order, created_by, created_at, updated_at)
VALUES 
    (1004, 'Test Science Fiction', 'test-sci-fi', 'Test science fiction', 1001, 1, 0, 1, 1, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1005, 'Test Fantasy', 'test-fantasy', 'Test fantasy', 1001, 1, 0, 1, 2, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1006, 'Test Mystery', 'test-mystery', 'Test mystery', 1001, 1, 0, 1, 3, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Grandchild tags (under Science Fiction)
INSERT INTO tags (id, name, slug, description, parent_id, language_id, usage_count, is_active, sort_order, created_by, created_at, updated_at)
VALUES 
    (1007, 'Test Hard Sci-Fi', 'test-hard-sci-fi', 'Test hard science fiction', 1004, 1, 0, 1, 1, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1008, 'Test Soft Sci-Fi', 'test-soft-sci-fi', 'Test soft science fiction', 1004, 1, 0, 1, 2, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Child tags (under Non-Fiction)
INSERT INTO tags (id, name, slug, description, parent_id, language_id, usage_count, is_active, sort_order, created_by, created_at, updated_at)
VALUES 
    (1009, 'Test Biography', 'test-biography', 'Test biography', 1002, 1, 0, 1, 1, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1010, 'Test Self-Help', 'test-self-help', 'Test self-help', 1002, 1, 0, 1, 2, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1011, 'Test Technology', 'test-technology', 'Test technology', 1002, 1, 0, 1, 3, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inactive tag (for testing)
INSERT INTO tags (id, name, slug, description, parent_id, language_id, usage_count, is_active, sort_order, created_by, created_at, updated_at)
VALUES 
    (1099, 'Test Inactive Tag', 'test-inactive', 'Test inactive tag', NULL, 1, 0, 0, 99, -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =============================================
-- 3. INSERT TEST TRANSLATIONS
-- =============================================

-- Hindi translations (language_id = 2)
INSERT INTO tag_translations (tag_id, language_id, name, description, created_by, created_at, updated_at)
VALUES 
    (1001, 2, 'परीक्षण कल्पना', 'परीक्षण काल्पनिक श्रेणी', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1002, 2, 'परीक्षण गैर-कल्पना', 'परीक्षण गैर-काल्पनिक श्रेणी', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1003, 2, 'परीक्षण बच्चों के', 'परीक्षण बच्चों की किताबें', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1004, 2, 'परीक्षण विज्ञान कथा', 'परीक्षण विज्ञान कथा', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1005, 2, 'परीक्षण काल्पनिक', 'परीक्षण काल्पनिक', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Spanish translations (language_id = 3)
INSERT INTO tag_translations (tag_id, language_id, name, description, created_by, created_at, updated_at)
VALUES 
    (1001, 3, 'Ficción de Prueba', 'Categoría de ficción de prueba', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1002, 3, 'No Ficción de Prueba', 'Categoría de no ficción de prueba', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1004, 3, 'Ciencia Ficción de Prueba', 'Ciencia ficción de prueba', -1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =============================================
-- 4. INSERT TEST HIERARCHY
-- =============================================

INSERT INTO tag_hierarchy (parent_id, child_id, level, created_by, created_at)
VALUES 
    (1001, 1004, 1, -1, CURRENT_TIMESTAMP),
    (1001, 1005, 1, -1, CURRENT_TIMESTAMP),
    (1001, 1006, 1, -1, CURRENT_TIMESTAMP),
    (1004, 1007, 2, -1, CURRENT_TIMESTAMP),
    (1004, 1008, 2, -1, CURRENT_TIMESTAMP),
    (1002, 1009, 1, -1, CURRENT_TIMESTAMP),
    (1002, 1010, 1, -1, CURRENT_TIMESTAMP),
    (1002, 1011, 1, -1, CURRENT_TIMESTAMP);

-- =============================================
-- 5. INSERT TEST BOOK TAGS
-- =============================================

-- Add test book_tags (using existing test books if available, otherwise create)
-- Assuming we have test books with IDs 1001-1005

INSERT INTO book_tags (book_id, tag_id, is_primary, created_by, created_at)
VALUES 
    (1001, 1004, 1, -1, CURRENT_TIMESTAMP),
    (1001, 1005, 0, -1, CURRENT_TIMESTAMP),
    (1002, 1004, 0, -1, CURRENT_TIMESTAMP),
    (1002, 1007, 1, -1, CURRENT_TIMESTAMP),
    (1003, 1005, 1, -1, CURRENT_TIMESTAMP),
    (1003, 1006, 0, -1, CURRENT_TIMESTAMP),
    (1004, 1009, 1, -1, CURRENT_TIMESTAMP),
    (1005, 1011, 1, -1, CURRENT_TIMESTAMP);

-- =============================================
-- 6. UPDATE USAGE COUNTS
-- =============================================

UPDATE tags SET usage_count = (
    SELECT COUNT(*) FROM book_tags WHERE tag_id = tags.id
) WHERE id IN (1004, 1005, 1006, 1007, 1009, 1011);

-- =============================================
-- 7. VERIFY FIXTURES
-- =============================================

SELECT 'Fixture setup complete' AS status;
SELECT COUNT(*) AS total_test_tags FROM tags WHERE created_by = -1;
SELECT COUNT(*) AS total_test_translations FROM tag_translations WHERE created_by = -1;
SELECT COUNT(*) AS total_test_hierarchy FROM tag_hierarchy WHERE created_by = -1;
SELECT COUNT(*) AS total_test_book_tags FROM book_tags WHERE created_by = -1;