-- =============================================
-- Procedures for: Tag cleanup and maintenance
-- Purpose: Clean up orphaned and duplicate data
-- =============================================

-- 1. Procedure: Clean up orphaned translations
-- Purpose: Remove translations that reference non-existent tags
CREATE PROCEDURE cleanup_orphaned_translations()
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Delete translations without tags
    DELETE FROM tag_translations
    WHERE NOT EXISTS (
        SELECT 1 FROM tags WHERE id = tag_translations.tag_id
    );
    
    SET v_deleted_count = CHANGES();
    
    SELECT v_deleted_count AS orphaned_translations_removed;
END;

-- 2. Procedure: Clean up orphaned book_tags
-- Purpose: Remove book_tags that reference non-existent books or tags
CREATE PROCEDURE cleanup_orphaned_book_tags()
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Delete book_tags without books
    DELETE FROM book_tags
    WHERE NOT EXISTS (
        SELECT 1 FROM books WHERE id = book_tags.book_id
    );
    
    -- Delete book_tags without tags
    DELETE FROM book_tags
    WHERE NOT EXISTS (
        SELECT 1 FROM tags WHERE id = book_tags.tag_id
    );
    
    SET v_deleted_count = CHANGES();
    
    SELECT v_deleted_count AS orphaned_book_tags_removed;
END;

-- 3. Procedure: Clean up orphaned hierarchy
-- Purpose: Remove hierarchy entries that reference non-existent tags
CREATE PROCEDURE cleanup_orphaned_hierarchy()
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Delete hierarchy entries without parent
    DELETE FROM tag_hierarchy
    WHERE NOT EXISTS (
        SELECT 1 FROM tags WHERE id = tag_hierarchy.parent_id
    );
    
    -- Delete hierarchy entries without child
    DELETE FROM tag_hierarchy
    WHERE NOT EXISTS (
        SELECT 1 FROM tags WHERE id = tag_hierarchy.child_id
    );
    
    SET v_deleted_count = CHANGES();
    
    SELECT v_deleted_count AS orphaned_hierarchy_removed;
END;

-- 4. Procedure: Remove duplicate tags
-- Purpose: Find and remove duplicate tags (by name or slug)
CREATE PROCEDURE remove_duplicate_tags()
BEGIN
    DECLARE v_merged_count INTEGER DEFAULT 0;
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Identify and merge duplicate tags
    WITH duplicates AS (
        SELECT 
            LOWER(name) as name_lower,
            MIN(id) as keep_id,
            json_group_array(id) as duplicate_ids
        FROM tags
        WHERE is_active = 1
        GROUP BY LOWER(name)
        HAVING COUNT(*) > 1
    )
    SELECT 
        json_array_length(duplicate_ids) - 1 INTO v_merged_count
    FROM duplicates;
    
    -- Merge duplicates
    INSERT INTO tag_merge_log (source_id, target_id, merged_at)
    SELECT 
        json_extract(d.value, '$'),
        d.keep_id,
        CURRENT_TIMESTAMP
    FROM duplicates d,
    json_each(d.duplicate_ids) d2
    WHERE json_extract(d.value, '$') != d.keep_id;
    
    -- Move book_tags to keep_id
    UPDATE book_tags
    SET tag_id = (
        SELECT keep_id 
        FROM duplicates 
        WHERE duplicate_ids LIKE '%' || book_tags.tag_id || '%'
    )
    WHERE tag_id IN (
        SELECT json_extract(value, '$')
        FROM duplicates,
        json_each(duplicate_ids)
        WHERE json_extract(value, '$') != keep_id
    );
    
    -- Move tag_hierarchy to keep_id
    UPDATE tag_hierarchy
    SET parent_id = (
        SELECT keep_id 
        FROM duplicates 
        WHERE duplicate_ids LIKE '%' || tag_hierarchy.parent_id || '%'
    )
    WHERE parent_id IN (
        SELECT json_extract(value, '$')
        FROM duplicates,
        json_each(duplicate_ids)
        WHERE json_extract(value, '$') != keep_id
    );
    
    -- Delete duplicate tags
    DELETE FROM tags
    WHERE id IN (
        SELECT json_extract(value, '$')
        FROM duplicates,
        json_each(duplicate_ids)
        WHERE json_extract(value, '$') != keep_id
    );
    
    SET v_deleted_count = CHANGES();
    
    SELECT v_merged_count AS duplicates_merged, 
           v_deleted_count AS duplicates_deleted;
END;

-- 5. Procedure: Fix tag hierarchy levels
-- Purpose: Recalculate and fix hierarchy levels
CREATE PROCEDURE fix_hierarchy_levels()
BEGIN
    DECLARE v_fixed_count INTEGER DEFAULT 0;
    
    -- Rebuild hierarchy levels
    WITH RECURSIVE hierarchy_cte AS (
        SELECT 
            id,
            parent_id,
            0 as level
        FROM tags
        WHERE parent_id IS NULL AND is_active = 1
        
        UNION ALL
        
        SELECT 
            t.id,
            t.parent_id,
            h.level + 1
        FROM tags t
        INNER JOIN hierarchy_cte h ON t.parent_id = h.id
        WHERE t.is_active = 1
    )
    UPDATE tag_hierarchy
    SET level = (
        SELECT level 
        FROM hierarchy_cte 
        WHERE id = tag_hierarchy.child_id
    )
    WHERE EXISTS (
        SELECT 1 
        FROM hierarchy_cte 
        WHERE id = tag_hierarchy.child_id
    );
    
    SET v_fixed_count = CHANGES();
    
    SELECT v_fixed_count AS hierarchy_levels_fixed;
END;

-- 6. Procedure: Cleanup unused tags
-- Purpose: Remove tags that are not used in any book
CREATE PROCEDURE cleanup_unused_tags(
    p_days_old INTEGER DEFAULT 90,
    p_keep_if_active BOOLEAN DEFAULT 1
)
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    DECLARE v_archived_count INTEGER DEFAULT 0;
    
    -- Archive unused tags
    IF p_keep_if_active = 1 THEN
        UPDATE tags
        SET is_active = 0,
            updated_at = CURRENT_TIMESTAMP
        WHERE is_active = 1
        AND NOT EXISTS (
            SELECT 1 FROM book_tags WHERE tag_id = tags.id
        )
        AND DATEDIFF('day', created_at, CURRENT_TIMESTAMP) > p_days_old;
        
        SET v_archived_count = CHANGES();
    ELSE
        -- Delete unused tags
        DELETE FROM tags
        WHERE is_active = 1
        AND NOT EXISTS (
            SELECT 1 FROM book_tags WHERE tag_id = tags.id
        )
        AND DATEDIFF('day', created_at, CURRENT_TIMESTAMP) > p_days_old;
        
        SET v_deleted_count = CHANGES();
    END IF;
    
    SELECT v_archived_count AS tags_archived,
           v_deleted_count AS tags_deleted;
END;

-- 7. Procedure: Full database cleanup
-- Purpose: Run all cleanup procedures
CREATE PROCEDURE full_cleanup()
BEGIN
    -- Run all cleanup procedures
    CALL cleanup_orphaned_translations();
    CALL cleanup_orphaned_book_tags();
    CALL cleanup_orphaned_hierarchy();
    CALL fix_hierarchy_levels();
    CALL recalculate_tag_usage_counts();
    
    SELECT 'Cleanup completed successfully' AS status;
END;

-- 8. Procedure: Generate cleanup report
-- Purpose: Report on orphaned and duplicate data
CREATE PROCEDURE get_cleanup_report()
BEGIN
    SELECT 
        -- Orphaned translations count
        (SELECT COUNT(*) 
         FROM tag_translations tt
         WHERE NOT EXISTS (SELECT 1 FROM tags WHERE id = tt.tag_id)
        ) AS orphaned_translations,
        
        -- Orphaned book_tags count
        (SELECT COUNT(*) 
         FROM book_tags bt
         WHERE NOT EXISTS (SELECT 1 FROM tags WHERE id = bt.tag_id)
         OR NOT EXISTS (SELECT 1 FROM books WHERE id = bt.book_id)
        ) AS orphaned_book_tags,
        
        -- Orphaned hierarchy count
        (SELECT COUNT(*) 
         FROM tag_hierarchy th
         WHERE NOT EXISTS (SELECT 1 FROM tags WHERE id = th.parent_id)
         OR NOT EXISTS (SELECT 1 FROM tags WHERE id = th.child_id)
        ) AS orphaned_hierarchy,
        
        -- Duplicate tags count
        (SELECT COUNT(*) 
         FROM (
             SELECT LOWER(name) as name_lower, COUNT(*) 
             FROM tags 
             GROUP BY LOWER(name) 
             HAVING COUNT(*) > 1
         )
        ) AS duplicate_tag_groups,
        
        -- Unused tags count
        (SELECT COUNT(*) 
         FROM tags t
         WHERE NOT EXISTS (SELECT 1 FROM book_tags WHERE tag_id = t.id)
         AND is_active = 1
        ) AS unused_active_tags;
END;