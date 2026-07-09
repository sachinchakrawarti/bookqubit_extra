-- =============================================
-- View: vw_tag_hierarchy
-- Description: Complete tag hierarchy with levels and paths
-- Dependencies: tags, tag_hierarchy
-- =============================================

CREATE VIEW IF NOT EXISTS vw_tag_hierarchy AS
WITH RECURSIVE tag_tree AS (
    -- Anchor: Get all root tags (no parent)
    SELECT 
        t.id,
        t.name,
        t.slug,
        t.description,
        t.parent_id,
        0 AS level,
        CAST(t.id AS VARCHAR) AS path,
        t.name AS path_names,
        t.is_active,
        t.sort_order
    FROM tags t
    WHERE t.parent_id IS NULL
    
    UNION ALL
    
    -- Recursive: Get children
    SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.parent_id,
        tt.level + 1 AS level,
        tt.path || ' → ' || CAST(c.id AS VARCHAR) AS path,
        tt.path_names || ' → ' || c.name AS path_names,
        c.is_active,
        c.sort_order
    FROM tags c
    INNER JOIN tag_tree tt ON c.parent_id = tt.id
    WHERE c.is_active = 1
)
SELECT 
    id,
    name,
    slug,
    description,
    parent_id,
    level,
    path,
    path_names,
    is_active,
    sort_order,
    -- Full hierarchical path as JSON
    json_object(
        'id', id,
        'name', name,
        'level', level,
        'path', path_names
    ) AS hierarchy_json,
    -- Depth from root
    level AS depth,
    -- Is leaf (no children)
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM tags WHERE parent_id = t.id
        ) THEN 0
        ELSE 1
    END AS is_leaf
FROM tag_tree t
ORDER BY level, sort_order, name;