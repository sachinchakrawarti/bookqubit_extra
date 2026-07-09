-- =============================================
-- Triggers for: tags table
-- Purpose: Automate audit trails, validation, and data consistency
-- =============================================

-- 1. Trigger: Update timestamp on tag update
-- Purpose: Automatically update updated_at field
CREATE TRIGGER IF NOT EXISTS tr_tags_update_timestamp
AFTER UPDATE ON tags
BEGIN
    UPDATE tags 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 2. Trigger: Update usage_count when book_tags changes
-- Purpose: Keep tag popularity metrics current
CREATE TRIGGER IF NOT EXISTS tr_tags_update_usage_count_insert
AFTER INSERT ON book_tags
BEGIN
    UPDATE tags 
    SET usage_count = (
        SELECT COUNT(*) 
        FROM book_tags 
        WHERE tag_id = NEW.tag_id
    )
    WHERE id = NEW.tag_id;
END;

CREATE TRIGGER IF NOT EXISTS tr_tags_update_usage_count_delete
AFTER DELETE ON book_tags
BEGIN
    UPDATE tags 
    SET usage_count = (
        SELECT COUNT(*) 
        FROM book_tags 
        WHERE tag_id = OLD.tag_id
    )
    WHERE id = OLD.tag_id;
END;

-- 3. Trigger: Validate tag name uniqueness with soft delete
-- Purpose: Ensure tag names are unique (case-insensitive)
CREATE TRIGGER IF NOT EXISTS tr_tags_validate_name_unique
BEFORE INSERT ON tags
BEGIN
    SELECT CASE
        WHEN EXISTS (
            SELECT 1 FROM tags 
            WHERE LOWER(name) = LOWER(NEW.name) 
            AND id != NEW.id
        )
        THEN RAISE(ABORT, 'Tag name must be unique')
    END;
END;

-- 4. Trigger: Validate slug uniqueness
-- Purpose: Ensure slugs are unique
CREATE TRIGGER IF NOT EXISTS tr_tags_validate_slug_unique
BEFORE INSERT ON tags
BEGIN
    SELECT CASE
        WHEN EXISTS (
            SELECT 1 FROM tags 
            WHERE LOWER(slug) = LOWER(NEW.slug) 
            AND id != NEW.id
        )
        THEN RAISE(ABORT, 'Tag slug must be unique')
    END;
END;

-- 5. Trigger: Prevent circular references in hierarchy
-- Purpose: Ensure no tag references itself
CREATE TRIGGER IF NOT EXISTS tr_tags_prevent_self_reference
BEFORE UPDATE ON tags
BEGIN
    SELECT CASE
        WHEN NEW.id = NEW.parent_id
        THEN RAISE(ABORT, 'Tag cannot reference itself')
    END;
END;

-- 6. Trigger: Log tag creation for audit
-- Purpose: Track who created the tag
CREATE TRIGGER IF NOT EXISTS tr_tags_audit_insert
AFTER INSERT ON tags
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'tags',
        NEW.id,
        'INSERT',
        NULL,
        json_object(
            'id', NEW.id,
            'name', NEW.name,
            'slug', NEW.slug,
            'description', NEW.description,
            'parent_id', NEW.parent_id,
            'language_id', NEW.language_id
        ),
        NEW.created_by,
        CURRENT_TIMESTAMP
    );
END;

-- 7. Trigger: Log tag updates for audit
-- Purpose: Track who updated the tag
CREATE TRIGGER IF NOT EXISTS tr_tags_audit_update
AFTER UPDATE ON tags
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'tags',
        NEW.id,
        'UPDATE',
        json_object(
            'id', OLD.id,
            'name', OLD.name,
            'slug', OLD.slug,
            'description', OLD.description,
            'parent_id', OLD.parent_id,
            'language_id', OLD.language_id
        ),
        json_object(
            'id', NEW.id,
            'name', NEW.name,
            'slug', NEW.slug,
            'description', NEW.description,
            'parent_id', NEW.parent_id,
            'language_id', NEW.language_id
        ),
        NEW.updated_by,
        CURRENT_TIMESTAMP
    );
END;

-- 8. Trigger: Log tag deletion for audit
-- Purpose: Track who deleted the tag
CREATE TRIGGER IF NOT EXISTS tr_tags_audit_delete
AFTER DELETE ON tags
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'tags',
        OLD.id,
        'DELETE',
        json_object(
            'id', OLD.id,
            'name', OLD.name,
            'slug', OLD.slug,
            'description', OLD.description,
            'parent_id', OLD.parent_id,
            'language_id', OLD.language_id
        ),
        NULL,
        OLD.updated_by,
        CURRENT_TIMESTAMP
    );
END;

-- 9. Trigger: Maintain tag hierarchy level
-- Purpose: Auto-calculate hierarchy level on insert
CREATE TRIGGER IF NOT EXISTS tr_tags_set_hierarchy_level
AFTER INSERT ON tag_hierarchy
BEGIN
    UPDATE tag_hierarchy
    SET level = (
        SELECT COALESCE(MAX(level), 0) + 1
        FROM tag_hierarchy
        WHERE child_id = NEW.parent_id
    )
    WHERE parent_id = NEW.parent_id AND child_id = NEW.child_id;
END;

-- 10. Trigger: Clean up orphaned translations
-- Purpose: Delete translations when tag is deleted
CREATE TRIGGER IF NOT EXISTS tr_tags_cleanup_translations
BEFORE DELETE ON tags
BEGIN
    DELETE FROM tag_translations WHERE tag_id = OLD.id;
END;

-- 11. Trigger: Clean up orphaned book_tags
-- Purpose: Delete book_tags when tag is deleted
CREATE TRIGGER IF NOT EXISTS tr_tags_cleanup_book_tags
BEFORE DELETE ON tags
BEGIN
    DELETE FROM book_tags WHERE tag_id = OLD.id;
END;

-- 12. Trigger: Clean up orphaned hierarchy
-- Purpose: Delete hierarchy entries when tag is deleted
CREATE TRIGGER IF NOT EXISTS tr_tags_cleanup_hierarchy
BEFORE DELETE ON tags
BEGIN
    DELETE FROM tag_hierarchy WHERE parent_id = OLD.id OR child_id = OLD.id;
END;

-- 13. Trigger: Update child tags when parent changes
-- Purpose: Maintain hierarchy consistency
CREATE TRIGGER IF NOT EXISTS tr_tags_update_children
AFTER UPDATE ON tags
WHEN OLD.parent_id != NEW.parent_id
BEGIN
    UPDATE tags 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE parent_id = NEW.id;
END;

-- 14. Trigger: Prevent deletion of tags with children
-- Purpose: Ensure no orphaned children
CREATE TRIGGER IF NOT EXISTS tr_tags_prevent_delete_with_children
BEFORE DELETE ON tags
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM tags WHERE parent_id = OLD.id)
        THEN RAISE(ABORT, 'Cannot delete tag with children')
    END;
END;

-- 15. Trigger: Update search index
-- Purpose: Keep FTS index in sync
CREATE TRIGGER IF NOT EXISTS tr_tags_update_fts_insert
AFTER INSERT ON tags
BEGIN
    INSERT INTO tags_fts(rowid, name, description)
    VALUES (NEW.id, NEW.name, NEW.description);
END;

CREATE TRIGGER IF NOT EXISTS tr_tags_update_fts_update
AFTER UPDATE ON tags
BEGIN
    UPDATE tags_fts
    SET name = NEW.name,
        description = NEW.description
    WHERE rowid = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_tags_update_fts_delete
AFTER DELETE ON tags
BEGIN
    DELETE FROM tags_fts WHERE rowid = OLD.id;
END;