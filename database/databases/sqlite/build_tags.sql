-- =============================================
-- Tags Schema - Build Script
-- Description: Build only tags_schema
-- =============================================

-- Enable foreign keys
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;

-- =============================================
-- Build Tags Schema
-- =============================================
.read schema/03_feature/tags_schema/schema_order.sql

-- =============================================
-- Verification
-- =============================================
SELECT '✅ Tags Schema Build Complete!' AS status;
SELECT datetime('now') AS build_date;

-- Count objects
SELECT '📊 Tags Schema Statistics:' AS status;
SELECT 
    (SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name LIKE '%tag%') AS tables,
    (SELECT COUNT(*) FROM sqlite_master WHERE type='view' AND name LIKE '%tag%') AS views,
    (SELECT COUNT(*) FROM sqlite_master WHERE type='index' AND name LIKE '%tag%') AS indexes,
    (SELECT COUNT(*) FROM sqlite_master WHERE type='trigger' AND name LIKE '%tag%') AS triggers;

-- Show data
SELECT '📊 Sample Data:' AS status;
SELECT COUNT(*) AS total_tags FROM tags;
SELECT COUNT(*) AS total_translations FROM tag_translations;
SELECT COUNT(*) AS total_book_tags FROM book_tags;
SELECT COUNT(*) AS total_hierarchy FROM tag_hierarchy;

-- Show sample tags
SELECT '📊 Sample Tags:' AS status;
SELECT id, name, slug, usage_count FROM tags LIMIT 10;

SELECT '✅ Build completed successfully!' AS status;