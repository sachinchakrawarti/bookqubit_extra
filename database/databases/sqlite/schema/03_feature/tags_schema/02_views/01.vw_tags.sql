-- =============================================
-- View: vw_tags
-- Description: Complete tag information with translations and usage stats
-- Dependencies: tags, tag_translations, languages
-- =============================================

CREATE VIEW IF NOT EXISTS vw_tags AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    pt.name AS parent_name,
    t.language_id,
    l.code AS language_code,
    l.name AS language_name,
    t.usage_count,
    t.is_active,
    t.sort_order,
    t.created_at,
    t.updated_at,
    -- Translation fields (default language)
    tt.name AS translated_name,
    tt.description AS translated_description,
    -- Hierarchy level
    CASE 
        WHEN t.parent_id IS NULL THEN 0
        ELSE 1
    END AS hierarchy_level,
    -- Has children
    EXISTS (
        SELECT 1 FROM tags WHERE parent_id = t.id
    ) AS has_children,
    -- Child count
    (
        SELECT COUNT(*) FROM tags WHERE parent_id = t.id
    ) AS child_count
FROM tags t
LEFT JOIN tags pt ON t.parent_id = pt.id
LEFT JOIN languages l ON t.language_id = l.id
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = t.language_id
WHERE t.is_active = 1;