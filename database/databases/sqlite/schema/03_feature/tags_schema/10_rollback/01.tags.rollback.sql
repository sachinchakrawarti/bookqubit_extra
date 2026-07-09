-- =============================================
-- Rollback: tags table and related objects
-- Purpose: Remove all tags schema objects in correct order
-- =============================================

-- 1. Drop triggers (to prevent foreign key issues)
DROP TRIGGER IF EXISTS tr_tags_update_timestamp;
DROP TRIGGER IF EXISTS tr_tags_update_usage_count_insert;
DROP TRIGGER IF EXISTS tr_tags_update_usage_count_delete;
DROP TRIGGER IF EXISTS tr_tags_validate_name_unique;
DROP TRIGGER IF EXISTS tr_tags_validate_slug_unique;
DROP TRIGGER IF EXISTS tr_tags_prevent_self_reference;
DROP TRIGGER IF EXISTS tr_tags_audit_insert;
DROP TRIGGER IF EXISTS tr_tags_audit_update;
DROP TRIGGER IF EXISTS tr_tags_audit_delete;
DROP TRIGGER IF EXISTS tr_tags_set_hierarchy_level;
DROP TRIGGER IF EXISTS tr_tags_cleanup_translations;
DROP TRIGGER IF EXISTS tr_tags_cleanup_book_tags;
DROP TRIGGER IF EXISTS tr_tags_cleanup_hierarchy;
DROP TRIGGER IF EXISTS tr_tags_update_children;
DROP TRIGGER IF EXISTS tr_tags_prevent_delete_with_children;
DROP TRIGGER IF EXISTS tr_tags_update_fts_insert;
DROP TRIGGER IF EXISTS tr_tags_update_fts_update;
DROP TRIGGER IF EXISTS tr_tags_update_fts_delete;

-- 2. Drop functions (if they exist)
DROP FUNCTION IF EXISTS get_tag_details;
DROP FUNCTION IF EXISTS get_tag_by_slug;
DROP FUNCTION IF EXISTS get_tags_by_language;
DROP FUNCTION IF EXISTS get_popular_tags;
DROP FUNCTION IF EXISTS get_tag_hierarchy_path;
DROP FUNCTION IF EXISTS get_tag_children;
DROP FUNCTION IF EXISTS get_tag_descendants;
DROP FUNCTION IF EXISTS merge_tags;
DROP FUNCTION IF EXISTS search_tags;
DROP FUNCTION IF EXISTS validate_tag_slug;
DROP FUNCTION IF EXISTS generate_tag_slug;
DROP FUNCTION IF EXISTS get_tag_statistics;

-- 3. Drop procedures
DROP PROCEDURE IF EXISTS create_tag_with_translations;
DROP PROCEDURE IF EXISTS update_tag_with_translations;
DROP PROCEDURE IF EXISTS bulk_create_tags;
DROP PROCEDURE IF EXISTS get_tag_report;
DROP PROCEDURE IF EXISTS archive_inactive_tags;
DROP PROCEDURE IF EXISTS recalculate_tag_usage_counts;
DROP PROCEDURE IF EXISTS get_tags_by_popularity_range;
DROP PROCEDURE IF EXISTS cleanup_orphaned_translations;
DROP PROCEDURE IF EXISTS cleanup_orphaned_book_tags;
DROP PROCEDURE IF EXISTS cleanup_orphaned_hierarchy;
DROP PROCEDURE IF EXISTS remove_duplicate_tags;
DROP PROCEDURE IF EXISTS fix_hierarchy_levels;
DROP PROCEDURE IF EXISTS cleanup_unused_tags;
DROP PROCEDURE IF EXISTS full_cleanup;
DROP PROCEDURE IF EXISTS get_cleanup_report;

-- 4. Drop views
DROP VIEW IF EXISTS vw_tags;
DROP VIEW IF EXISTS vw_tag_hierarchy;
DROP VIEW IF EXISTS vw_tag_popularity;
DROP VIEW IF EXISTS vw_tag_usage;
DROP VIEW IF EXISTS vw_tag_tree;
DROP VIEW IF EXISTS vw_tags_by_language;

-- 5. Drop FTS tables (virtual tables)
DROP TABLE IF EXISTS tags_fts;
DROP TABLE IF EXISTS tag_translations_fts;

-- 6. Drop indexes
DROP INDEX IF EXISTS idx_tags_slug_unique;
DROP INDEX IF EXISTS idx_tags_name;
DROP INDEX IF EXISTS idx_tags_parent_id;
DROP INDEX IF EXISTS idx_tags_language_id;
DROP INDEX IF EXISTS idx_tags_usage_count;
DROP INDEX IF EXISTS idx_tags_is_active;
DROP INDEX IF EXISTS idx_tags_active_sort;
DROP INDEX IF EXISTS idx_tags_parent_active;
DROP INDEX IF EXISTS idx_tags_created_at;

-- 7. Remove foreign key constraints (SQLite doesn't support dropping FKs directly)
-- In SQLite, we need to recreate the table without constraints
-- Or use PRAGMA foreign_keys = OFF to ignore them

-- 8. Drop tables (in correct order to avoid foreign key violations)
-- Note: SQLite doesn't support DROP TABLE CASCADE, so drop in correct order
DROP TABLE IF EXISTS tag_hierarchy;
DROP TABLE IF EXISTS book_tags;
DROP TABLE IF EXISTS tag_translations;
DROP TABLE IF EXISTS tags;

-- 9. Reset sequence (if using autoincrement)
-- In SQLite, autoincrement sequence is stored in sqlite_sequence table
DELETE FROM sqlite_sequence WHERE name = 'tags';

-- 10. Drop audit log entries (if audit log table exists)
-- DELETE FROM audit_log WHERE table_name = 'tags';

-- 11. Verification
SELECT 'Tags schema rollback completed successfully' AS status;