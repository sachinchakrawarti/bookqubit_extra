-- =============================================
-- Rollback: tag_translations table and related objects
-- Purpose: Remove tag translations schema objects
-- =============================================

-- 1. Drop triggers specific to tag_translations
DROP TRIGGER IF EXISTS tr_tag_translations_after_insert;
DROP TRIGGER IF EXISTS tr_tag_translations_after_update;
DROP TRIGGER IF EXISTS tr_tag_translations_after_delete;
DROP TRIGGER IF EXISTS tr_tag_translations_validate_duplicate;
DROP TRIGGER IF EXISTS tr_tag_translations_audit_insert;
DROP TRIGGER IF EXISTS tr_tag_translations_audit_update;
DROP TRIGGER IF EXISTS tr_tag_translations_audit_delete;

-- 2. Drop functions specific to tag_translations
DROP FUNCTION IF EXISTS get_tag_translations;
DROP FUNCTION IF EXISTS get_tag_translation_by_language;
DROP FUNCTION IF EXISTS get_tags_with_translations;
DROP FUNCTION IF EXISTS get_translation_count;

-- 3. Drop procedures specific to tag_translations
DROP PROCEDURE IF EXISTS sync_tag_translations;
DROP PROCEDURE IF EXISTS migrate_translations;

-- 4. Drop views specific to tag_translations
DROP VIEW IF EXISTS vw_tag_translations;
DROP VIEW IF EXISTS vw_tag_translations_by_language;
DROP VIEW IF EXISTS vw_tag_translation_coverage;

-- 5. Drop FTS tables for translations
DROP TABLE IF EXISTS tag_translations_fts;

-- 6. Drop indexes
DROP INDEX IF EXISTS idx_tag_translations_tag_lang;
DROP INDEX IF EXISTS idx_tag_translations_tag_id;
DROP INDEX IF EXISTS idx_tag_translations_language_id;
DROP INDEX IF EXISTS idx_tag_translations_name;
DROP INDEX IF EXISTS idx_tag_translations_lang_name;
DROP INDEX IF EXISTS idx_tag_translations_created_at;

-- 7. Drop table
DROP TABLE IF EXISTS tag_translations;

-- 8. Reset sequence
DELETE FROM sqlite_sequence WHERE name = 'tag_translations';

-- 9. Drop audit log entries
-- DELETE FROM audit_log WHERE table_name = 'tag_translations';

-- 10. Verification
SELECT 'Tag translations rollback completed successfully' AS status;