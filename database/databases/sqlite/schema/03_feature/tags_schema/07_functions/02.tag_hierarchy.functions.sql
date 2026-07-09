-- =============================================
-- Functions for: tag_hierarchy table
-- Purpose: Reusable functions for hierarchy operations
-- =============================================

-- 1. Function: Get full hierarchy tree
-- Purpose: Get complete tag hierarchy as JSON
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
                json_object(
                    'id', id,
                    'name', name,
                    'slug', slug,
                    'children', json_array()
                ) as node
            FROM tags
            WHERE parent_id IS NULL AND is_active = 1
            
            UNION ALL
            
            SELECT 
                c.id,
                c.name,
                c.slug,
                c.parent_id,
                p.level + 1,
                json_object(
                    'id', c.id,
                    'name', c.name,
                    'slug', c.slug,
                    'children', json_array()
                )
            FROM tags c
            INNER JOIN tree p ON c.parent_id = p.id
            WHERE c.is_active = 1
        )
        SELECT json_group_array(node)
        FROM tree
        WHERE parent_id IS NULL
    );
END;

-- 2. Function: Get hierarchy depth
-- Purpose: Get maximum depth of tag hierarchy
CREATE FUNCTION IF NOT EXISTS get_hierarchy_depth()
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT MAX(level) FROM tag_hierarchy
    );
END;

-- 3. Function: Get tag ancestors
-- Purpose: Get all ancestors of a tag
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
            json_object(
                'id', a.id,
                'name', a.name,
                'level', a.level
            )
        )
        FROM ancestors a
        WHERE a.id != p_tag_id
        ORDER BY a.level DESC
    );
END;

-- 4. Function: Get tag siblings
-- Purpose: Get all siblings of a tag
CREATE FUNCTION IF NOT EXISTS get_tag_siblings(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', t.name,
                'slug', t.slug,
                'usage_count', t.usage_count
            )
        )
        FROM tags t
        WHERE t.parent_id = (
            SELECT parent_id FROM tags WHERE id = p_tag_id
        )
        AND t.id != p_tag_id
        AND t.is_active = 1
        ORDER BY t.sort_order, t.name
    );
END;

-- 5. Function: Get tag tree path as JSON
-- Purpose: Get full path of a tag as JSON array
CREATE FUNCTION IF NOT EXISTS get_tag_tree_path(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        WITH RECURSIVE path_cte AS (
            SELECT id, name, parent_id, 0 as level
            FROM tags
            WHERE id = p_tag_id
            
            UNION ALL
            
            SELECT t.id, t.name, t.parent_id, p.level + 1
            FROM tags t
            INNER JOIN path_cte p ON t.id = p.parent_id
            WHERE t.parent_id IS NOT NULL
        )
        SELECT json_group_array(
            json_object(
                'id', id,
                'name', name,
                'level', level
            )
        )
        FROM path_cte
        ORDER BY level DESC
    );
END;

-- 6. Function: Get tag subtree
-- Purpose: Get entire subtree starting from a tag
CREATE FUNCTION IF NOT EXISTS get_tag_subtree(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        WITH RECURSIVE subtree AS (
            SELECT 
                id,
                name,
                slug,
                parent_id,
                0 as level,
                json_object(
                    'id', id,
                    'name', name,
                    'slug', slug,
                    'children', json_array()
                ) as node
            FROM tags
            WHERE id = p_tag_id AND is_active = 1
            
            UNION ALL
            
            SELECT 
                c.id,
                c.name,
                c.slug,
                c.parent_id,
                p.level + 1,
                json_object(
                    'id', c.id,
                    'name', c.name,
                    'slug', c.slug,
                    'children', json_array()
                )
            FROM tags c
            INNER JOIN subtree p ON c.parent_id = p.id
            WHERE c.is_active = 1
        )
        SELECT json_group_array(node)
        FROM subtree
        WHERE id = p_tag_id
    );
END;

-- 7. Function: Check if tag has children
-- Purpose: Check if tag has any children
CREATE FUNCTION IF NOT EXISTS has_tag_children(p_tag_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT CASE 
            WHEN EXISTS (SELECT 1 FROM tags WHERE parent_id = p_tag_id) 
            THEN 1 
            ELSE 0 
        END
    );
END;

-- 8. Function: Get tag level in hierarchy
-- Purpose: Get the level of a tag in hierarchy
CREATE FUNCTION IF NOT EXISTS get_tag_level(p_tag_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT level FROM tag_hierarchy 
        WHERE child_id = p_tag_id
        LIMIT 1
    );
END;

-- 9. Function: Get leaf tags
-- Purpose: Get all leaf tags (tags with no children)
CREATE FUNCTION IF NOT EXISTS get_leaf_tags()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', t.name,
                'slug', t.slug,
                'usage_count', t.usage_count
            )
        )
        FROM tags t
        WHERE NOT EXISTS (
            SELECT 1 FROM tags WHERE parent_id = t.id
        )
        AND t.is_active = 1
        ORDER BY t.name
    );
END;

-- 10. Function: Get root tags
-- Purpose: Get all root tags (tags with no parent)
CREATE FUNCTION IF NOT EXISTS get_root_tags()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', t.name,
                'slug', t.slug,
                'child_count', (
                    SELECT COUNT(*) FROM tags WHERE parent_id = t.id
                ),
                'usage_count', t.usage_count
            )
        )
        FROM tags t
        WHERE t.parent_id IS NULL AND t.is_active = 1
        ORDER BY t.sort_order, t.name
    );
END;

-- 11. Function: Move tag to new parent
-- Purpose: Move a tag and its subtree to a new parent
CREATE FUNCTION IF NOT EXISTS move_tag_to_parent(
    p_tag_id INTEGER,
    p_new_parent_id INTEGER
)
RETURNS INTEGER
BEGIN
    DECLARE v_result INTEGER DEFAULT 0;
    
    -- Validate tag exists
    IF NOT EXISTS (SELECT 1 FROM tags WHERE id = p_tag_id) THEN
        RETURN -1;
    END IF;
    
    -- Validate new parent exists (if not NULL)
    IF p_new_parent_id IS NOT NULL AND 
       NOT EXISTS (SELECT 1 FROM tags WHERE id = p_new_parent_id) THEN
        RETURN -2;
    END IF;
    
    -- Prevent circular reference
    IF EXISTS (
        WITH RECURSIVE ancestors AS (
            SELECT id, parent_id
            FROM tags
            WHERE id = p_new_parent_id
            UNION ALL
            SELECT t.id, t.parent_id
            FROM tags t
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
    
    RETURN 1; -- Success
END;

-- 12. Function: Get hierarchy statistics
-- Purpose: Get comprehensive hierarchy statistics
CREATE FUNCTION IF NOT EXISTS get_hierarchy_statistics()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'total_tags', (SELECT COUNT(*) FROM tags WHERE is_active = 1),
            'root_tags', (SELECT COUNT(*) FROM tags WHERE parent_id IS NULL AND is_active = 1),
            'leaf_tags', (SELECT COUNT(*) FROM tags t WHERE NOT EXISTS (SELECT 1 FROM tags WHERE parent_id = t.id) AND t.is_active = 1),
            'max_depth', (SELECT MAX(level) FROM tag_hierarchy),
            'avg_depth', (SELECT ROUND(AVG(level), 2) FROM tag_hierarchy),
            'tags_with_children', (SELECT COUNT(DISTINCT parent_id) FROM tag_hierarchy),
            'top_level_tags', (
                SELECT json_group_array(
                    json_object(
                        'id', t.id,
                        'name', t.name,
                        'child_count', (
                            SELECT COUNT(*) FROM tags WHERE parent_id = t.id
                        )
                    )
                )
                FROM tags t
                WHERE t.parent_id IS NULL AND t.is_active = 1
                ORDER BY t.sort_order
                LIMIT 10
            )
        )
    );
END;