-- =============================================
-- Migration: 002_add_tag_hierarchy
-- Version: 1.1.0
-- Date: 2024-02-01
-- Description: Add advanced tag hierarchy features
-- Dependencies: 001_initial_tags
-- =============================================

-- =============================================
-- 1. ADD HIERARCHY FUNCTIONS
-- =============================================

-- 1.1 Get full hierarchy tree
CREATE FUNCTION IF NOT EXISTS get_hierarchy_tree()
RETURNS TEXT
BEGIN
    RETURN (
        WITH RECURSIVE tree AS (
            SELECT 
                id,
                name,
                slug,
                parent_id,
                0 as level,
                json_object('id', id, 'name', name, 'slug', slug, 'children', json_array()) as node
            FROM tags
            WHERE parent_id IS NULL AND is_active = 1
            
            UNION ALL
            
            SELECT 
                c.id,
                c.name,
                c.slug,
                c.parent_id,
                p.level + 1,
                json_object('id', c.id, 'name', c.name, 'slug', c.slug, 'children', json_array())
            FROM tags c
            INNER JOIN tree p ON c.parent_id = p.id
            WHERE c.is_active = 1
        )
        SELECT json_group_array(node)
        FROM tree
        WHERE parent_id IS NULL
    );
END;

-- 1.2 Get tag ancestors
CREATE FUNCTION IF NOT EXISTS get_tag_ancestors(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        WITH RECURSIVE ancestors AS (
            SELECT id, name, parent_id, 0 as level
            FROM tags
            WHERE id = p_tag_id
            
            UNION ALL
            
            SELECT t.id, t.name, t.parent_id, a.level + 1
            FROM tags t
            INNER JOIN ancestors a ON t.id = a.parent_id
            WHERE t.parent_id IS NOT NULL
        )
        SELECT json_group_array(
            json_object('id', a.id, 'name', a.name, 'level', a.level)
        )
        FROM ancestors a
        WHERE a.id != p_tag_id
        ORDER BY a.level DESC
    );
END;

-- 1.3 Get tag descendants
CREATE FUNCTION IF NOT EXISTS get_tag_descendants(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        WITH RECURSIVE descendants AS (
            SELECT id, name, slug, parent_id, 0 as level
            FROM tags
            WHERE id = p_tag_id
            
            UNION ALL
            
            SELECT t.id, t.name, t.slug, t.parent_id, d.level + 1
            FROM tags t
            INNER JOIN descendants d ON t.parent_id = d.id
            WHERE t.is_active = 1
        )
        SELECT json_group_array(
            json_object('id', d.id, 'name', d.name, 'slug', d.slug, 'level', d.level)
        )
        FROM descendants d
        WHERE d.id != p_tag_id
        ORDER BY d.level, d.name
    );
END;

-- 1.4 Move tag to new parent
CREATE FUNCTION IF NOT EXISTS move_tag_to_parent(p_tag_id INTEGER, p_new_parent_id INTEGER)
RETURNS INTEGER
BEGIN
    -- Validate tag exists
    IF NOT EXISTS (SELECT 1 FROM tags WHERE id = p_tag_id) THEN
        RETURN -1;
    END IF;
    
    -- Validate new parent exists
    IF p_new_parent_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM tags WHERE id = p_new_parent_id) THEN
        RETURN -2;
    END IF;
    
    -- Prevent circular reference
    IF EXISTS (
        WITH RECURSIVE ancestors AS (
            SELECT id, parent_id FROM tags WHERE id = p_new_parent_id
            UNION ALL
            SELECT t.id, t.parent_id FROM tags t
            INNER JOIN ancestors a ON t.id = a.parent_id
        )
        SELECT 1 FROM ancestors WHERE id = p_tag_id
    ) THEN
        RETURN -3;
    END IF;
    
    -- Update parent
    UPDATE tags SET parent_id = p_new_parent_id WHERE id = p_tag_id;
    
    -- Update hierarchy
    DELETE FROM tag_hierarchy WHERE child_id = p_tag_id;
    INSERT INTO tag_hierarchy (parent_id, child_id, level)
    VALUES (p_new_parent_id, p_tag_id, 1);
    
    RETURN 1;
END;

-- =============================================
-- 2. ADD HIERARCHY PROCEDURES
-- =============================================

-- 2.1 Bulk move tags to new parent
CREATE PROCEDURE bulk_move_tags_to_parent(
    p_tag_ids TEXT,  -- JSON array of tag IDs
    p_new_parent_id INTEGER,
    p_updated_by INTEGER
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_tag_id INTEGER;
    DECLARE v_result INTEGER;
    
    SET v_total = json_array_length(p_tag_ids);
    
    WHILE v_counter < v_total DO
        SET v_tag_id = json_extract(p_tag_ids, '$[' || v_counter || ']');
        SET v_result = move_tag_to_parent(v_tag_id, p_new_parent_id);
        
        IF v_result = 1 THEN
            UPDATE tags SET updated_by = p_updated_by, updated_at = CURRENT_TIMESTAMP
            WHERE id = v_tag_id;
        END IF;
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_counter AS tags_moved;
END;

-- 2.2 Get tag subtree
CREATE PROCEDURE get_tag_subtree(p_tag_id INTEGER)
BEGIN
    WITH RECURSIVE subtree AS (
        SELECT id, name, slug, parent_id, 0 as level
        FROM tags
        WHERE id = p_tag_id
        
        UNION ALL
        
        SELECT t.id, t.name, t.slug, t.parent_id, s.level + 1
        FROM tags t
        INNER JOIN subtree s ON t.parent_id = s.id
        WHERE t.is_active = 1
    )
    SELECT 
        id,
        name,
        slug,
        parent_id,
        level,
        REPEAT('  ', level) || name AS indented_name,
        (SELECT COUNT(*) FROM tags WHERE parent_id = s.id) AS child_count
    FROM subtree s
    ORDER BY level, name;
END;

-- =============================================
-- 3. ADD HIERARCHY TRIGGERS
-- =============================================

-- 3.1 Prevent circular references in hierarchy
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

-- 3.2 Auto-calculate hierarchy level
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_set_level_insert
BEFORE INSERT ON tag_hierarchy
WHEN NEW.level IS NULL OR NEW.level = 0
BEGIN
    SELECT COALESCE(MAX(level), 0) + 1 INTO NEW.level
    FROM tag_hierarchy
    WHERE child_id = NEW.parent_id OR parent_id = NEW.parent_id;
END;

-- 3.3 Prevent duplicate parent-child relationships
CREATE TRIGGER IF NOT EXISTS tr_hierarchy_prevent_duplicate
BEFORE INSERT ON tag_hierarchy
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM tag_hierarchy WHERE parent_id = NEW.parent_id AND child_id = NEW.child_id)
        THEN RAISE(ABORT, 'Duplicate parent-child relationship')
    END;
END;

-- =============================================
-- 4. ADD HIERARCHY INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_tags_hierarchy_path ON tags(parent_id);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_level_children ON tag_hierarchy(level, child_id);

-- =============================================
-- 5. ADD HIERARCHY VIEWS
-- =============================================

-- 5.1 Tag tree view
CREATE VIEW IF NOT EXISTS vw_tag_tree AS
WITH RECURSIVE tag_tree AS (
    SELECT 
        id,
        name,
        slug,
        parent_id,
        0 AS level,
        name AS tree_path
    FROM tags 
    WHERE parent_id IS NULL AND is_active = 1
    
    UNION ALL
    
    SELECT 
        c.id,
        c.name,
        c.slug,
        c.parent_id,
        p.level + 1 AS level,
        p.tree_path || ' → ' || c.name AS tree_path
    FROM tags c
    INNER JOIN tag_tree p ON c.parent_id = p.id
    WHERE c.is_active = 1
)
SELECT 
    id,
    name,
    slug,
    parent_id,
    level,
    tree_path,
    REPEAT('  ', level) || name AS indented_name,
    (SELECT COUNT(*) FROM tags WHERE parent_id = t.id) AS child_count
FROM tag_tree t
ORDER BY tree_path;

-- 5.2 Hierarchy statistics view
CREATE VIEW IF NOT EXISTS vw_hierarchy_statistics AS
SELECT 
    (SELECT COUNT(*) FROM tags WHERE parent_id IS NULL AND is_active = 1) AS root_tags,
    (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_tags,
    (SELECT MAX(level) FROM tag_hierarchy) AS max_depth,
    (SELECT ROUND(AVG(level), 2) FROM tag_hierarchy) AS avg_depth,
    (SELECT COUNT(DISTINCT parent_id) FROM tag_hierarchy) AS tags_with_children,
    (SELECT COUNT(*) FROM tags WHERE NOT EXISTS (SELECT 1 FROM tags WHERE parent_id = tags.id) AND is_active = 1) AS leaf_tags;

-- =============================================
-- 6. VERIFICATION
-- =============================================

SELECT 'Migration 002 completed successfully!' AS status;
SELECT * FROM vw_hierarchy_statistics;