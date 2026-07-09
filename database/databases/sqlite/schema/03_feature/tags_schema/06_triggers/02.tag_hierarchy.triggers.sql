-- =============================================
-- Triggers for: tag_hierarchy table
-- Purpose: Maintain hierarchy integrity and relationships
-- =============================================

-- 1. Trigger: Validate hierarchy before insert
-- Purpose: Prevent circular references
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_validate_circular
BEFORE INSERT ON tag_hierarchy
BEGIN
    SELECT CASE
        WHEN EXISTS (
            WITH RECURSIVE parent_tree AS (
                SELECT parent_id, child_id
                FROM tag_hierarchy
                WHERE child_id = NEW.parent_id
                UNION ALL
                SELECT h.parent_id, h.child_id
                FROM tag_hierarchy h
                INNER JOIN parent_tree pt ON h.child_id = pt.parent_id
            )
            SELECT 1 FROM parent_tree WHERE parent_id = NEW.child_id
        )
        THEN RAISE(ABORT, 'Circular reference detected in hierarchy')
    END;
END;

-- 2. Trigger: Auto-calculate hierarchy level
-- Purpose: Maintain depth levels automatically
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_set_level_insert
BEFORE INSERT ON tag_hierarchy
BEGIN
    SELECT CASE
        WHEN NEW.level IS NULL OR NEW.level = 0
        THEN (
            SELECT COALESCE(MAX(level), 0) + 1
            FROM tag_hierarchy
            WHERE child_id = NEW.parent_id
            OR parent_id = NEW.parent_id
        )
        ELSE NEW.level
    END;
END;

-- 3. Trigger: Update hierarchy levels on insert
-- Purpose: Maintain levels for all descendants
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_update_levels
AFTER INSERT ON tag_hierarchy
BEGIN
    WITH RECURSIVE update_levels AS (
        SELECT child_id, 1 as level
        FROM tag_hierarchy
        WHERE parent_id = NEW.parent_id
        UNION ALL
        SELECT h.child_id, ul.level + 1
        FROM tag_hierarchy h
        INNER JOIN update_levels ul ON h.parent_id = ul.child_id
    )
    UPDATE tag_hierarchy
    SET level = (
        SELECT level
        FROM update_levels
        WHERE child_id = tag_hierarchy.child_id
    )
    WHERE parent_id = NEW.parent_id;
END;

-- 4. Trigger: Prevent duplicate parent-child relationships
-- Purpose: Ensure hierarchy integrity
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_prevent_duplicate
BEFORE INSERT ON tag_hierarchy
BEGIN
    SELECT CASE
        WHEN EXISTS (
            SELECT 1 FROM tag_hierarchy 
            WHERE parent_id = NEW.parent_id 
            AND child_id = NEW.child_id
        )
        THEN RAISE(ABORT, 'Duplicate parent-child relationship')
    END;
END;

-- 5. Trigger: Prevent self-reference in hierarchy
-- Purpose: Prevent parent-child cycle
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_prevent_self
BEFORE INSERT ON tag_hierarchy
BEGIN
    SELECT CASE
        WHEN NEW.parent_id = NEW.child_id
        THEN RAISE(ABORT, 'Tag cannot be parent of itself')
    END;
END;

-- 6. Trigger: Update hierarchy for child tags
-- Purpose: Update all child relationships when parent changes
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_update_children
AFTER UPDATE ON tags
WHEN OLD.parent_id != NEW.parent_id
BEGIN
    UPDATE tag_hierarchy
    SET level = (
        SELECT COALESCE(MAX(level), 0) + 1
        FROM tag_hierarchy
        WHERE child_id = NEW.id
    )
    WHERE child_id = NEW.id;
END;

-- 7. Trigger: Log hierarchy changes
-- Purpose: Track hierarchy modifications
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_audit_insert
AFTER INSERT ON tag_hierarchy
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'tag_hierarchy',
        NEW.id,
        'INSERT',
        NULL,
        json_object(
            'parent_id', NEW.parent_id,
            'child_id', NEW.child_id,
            'level', NEW.level
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 8. Trigger: Update parent tags count
-- Purpose: Maintain children count
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_update_parent_count_insert
AFTER INSERT ON tag_hierarchy
BEGIN
    UPDATE tags 
    SET child_count = COALESCE(child_count, 0) + 1
    WHERE id = NEW.parent_id;
END;

CREATE TRIGGER IF NOT EXISTS tr_hierarchy_update_parent_count_delete
AFTER DELETE ON tag_hierarchy
BEGIN
    UPDATE tags 
    SET child_count = COALESCE(child_count, 0) - 1
    WHERE id = OLD.parent_id;
END;

-- 9. Trigger: Validate parent-child tags exist and are active
-- Purpose: Ensure hierarchy integrity
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_validate_existence
BEFORE INSERT ON tag_hierarchy
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (SELECT 1 FROM tags WHERE id = NEW.parent_id AND is_active = 1)
        THEN RAISE(ABORT, 'Parent tag does not exist or is inactive')
    END;
    
    SELECT CASE
        WHEN NOT EXISTS (SELECT 1 FROM tags WHERE id = NEW.child_id AND is_active = 1)
        THEN RAISE(ABORT, 'Child tag does not exist or is inactive')
    END;
END;

-- 10. Trigger: Prevent moving tag to its own descendant
-- Purpose: Prevent circular references
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_prevent_descendant
BEFORE UPDATE ON tags
WHEN NEW.parent_id != OLD.parent_id
BEGIN
    SELECT CASE
        WHEN EXISTS (
            WITH RECURSIVE descendants AS (
                SELECT child_id
                FROM tag_hierarchy
                WHERE parent_id = NEW.id
                UNION ALL
                SELECT h.child_id
                FROM tag_hierarchy h
                INNER JOIN descendants d ON h.parent_id = d.child_id
            )
            SELECT 1 FROM descendants WHERE child_id = NEW.parent_id
        )
        THEN RAISE(ABORT, 'Cannot move tag to its own descendant')
    END;
END;

-- 11. Trigger: Maintain path for tag_hierarchy
-- Purpose: Track full path for easy querying
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_maintain_path
AFTER INSERT ON tag_hierarchy
BEGIN
    INSERT INTO tag_hierarchy_paths (tag_id, path)
    WITH RECURSIVE path_cte AS (
        SELECT 
            NEW.child_id as tag_id,
            CAST(NEW.parent_id AS VARCHAR) as path,
            1 as depth
        UNION ALL
        SELECT 
            p.tag_id,
            h.parent_id || ' -> ' || p.path,
            p.depth + 1
        FROM tag_hierarchy h
        INNER JOIN path_cte p ON h.child_id = p.tag_id
        WHERE h.parent_id IS NOT NULL
    )
    SELECT tag_id, path FROM path_cte;
END;