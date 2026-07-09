-- =============================================
-- Functions for: tags table
-- Purpose: Reusable functions for tag operations
-- =============================================

-- 1. Function: Get tag by ID with full details
-- Purpose: Fetch complete tag information including translations
CREATE FUNCTION IF NOT EXISTS get_tag_details(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'id', t.id,
            'name', t.name,
            'slug', t.slug,
            'description', t.description,
            'parent_id', t.parent_id,
            'parent_name', pt.name,
            'language_id', t.language_id,
            'language_code', l.code,
            'language_name', l.name,
            'usage_count', t.usage_count,
            'is_active', t.is_active,
            'sort_order', t.sort_order,
            'child_count', (
                SELECT COUNT(*) FROM tags WHERE parent_id = t.id
            ),
            'translations', (
                SELECT json_group_array(
                    json_object(
                        'language_id', tt.language_id,
                        'language_code', l2.code,
                        'language_name', l2.name,
                        'name', tt.name,
                        'description', tt.description
                    )
                )
                FROM tag_translations tt
                JOIN languages l2 ON tt.language_id = l2.id
                WHERE tt.tag_id = t.id
            ),
            'created_at', t.created_at,
            'updated_at', t.updated_at
        )
        FROM tags t
        LEFT JOIN tags pt ON t.parent_id = pt.id
        LEFT JOIN languages l ON t.language_id = l.id
        WHERE t.id = p_tag_id
    );
END;

-- 2. Function: Get tag by slug
-- Purpose: Fetch tag by URL-friendly slug
CREATE FUNCTION IF NOT EXISTS get_tag_by_slug(p_slug TEXT)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT id FROM tags WHERE slug = p_slug AND is_active = 1
    );
END;

-- 3. Function: Get tags by language
-- Purpose: Fetch all tags for a specific language
CREATE FUNCTION IF NOT EXISTS get_tags_by_language(p_language_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', COALESCE(tt.name, t.name),
                'slug', t.slug,
                'description', COALESCE(tt.description, t.description),
                'usage_count', t.usage_count,
                'sort_order', t.sort_order
            )
        )
        FROM tags t
        LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = p_language_id
        WHERE t.is_active = 1
        ORDER BY t.sort_order, COALESCE(tt.name, t.name)
    );
END;

-- 4. Function: Get popular tags
-- Purpose: Fetch most popular tags based on usage
CREATE FUNCTION IF NOT EXISTS get_popular_tags(p_limit INTEGER DEFAULT 10)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', t.name,
                'slug', t.slug,
                'usage_count', t.usage_count,
                'book_count', (
                    SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id
                )
            )
        )
        FROM tags t
        WHERE t.is_active = 1
        ORDER BY t.usage_count DESC
        LIMIT p_limit
    );
END;

-- 5. Function: Get tag hierarchy path
-- Purpose: Get full path of a tag in hierarchy
CREATE FUNCTION IF NOT EXISTS get_tag_hierarchy_path(p_tag_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        WITH RECURSIVE path_cte AS (
            SELECT id, name, parent_id, 0 as level, name as path
            FROM tags
            WHERE id = p_tag_id
            
            UNION ALL
            
            SELECT t.id, t.name, t.parent_id, p.level + 1, 
                   t.name || ' → ' || p.path
            FROM tags t
            INNER JOIN path_cte p ON t.id = p.parent_id
            WHERE t.parent_id IS NOT NULL
        )
        SELECT path FROM path_cte ORDER BY level DESC LIMIT 1
    );
END;

-- 6. Function: Get tag children
-- Purpose: Get all children of a tag (direct)
CREATE FUNCTION IF NOT EXISTS get_tag_children(p_tag_id INTEGER)
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
                )
            )
        )
        FROM tags t
        WHERE t.parent_id = p_tag_id AND t.is_active = 1
        ORDER BY t.sort_order, t.name
    );
END;

-- 7. Function: Get tag descendants
-- Purpose: Get all descendants of a tag (recursive)
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
            json_object(
                'id', d.id,
                'name', d.name,
                'slug', d.slug,
                'level', d.level
            )
        )
        FROM descendants d
        WHERE d.id != p_tag_id
        ORDER BY d.level, d.name
    );
END;

-- 8. Function: Merge tags
-- Purpose: Merge source tag into target tag
CREATE FUNCTION IF NOT EXISTS merge_tags(p_source_id INTEGER, p_target_id INTEGER)
RETURNS INTEGER
BEGIN
    DECLARE v_result INTEGER DEFAULT 0;
    
    -- Check if both tags exist
    IF NOT EXISTS (SELECT 1 FROM tags WHERE id = p_source_id) THEN
        RETURN -1; -- Source tag not found
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM tags WHERE id = p_target_id) THEN
        RETURN -2; -- Target tag not found
    END IF;
    
    -- Update book_tags
    UPDATE book_tags 
    SET tag_id = p_target_id 
    WHERE tag_id = p_source_id;
    
    -- Update tag_hierarchy
    UPDATE tag_hierarchy 
    SET parent_id = p_target_id 
    WHERE parent_id = p_source_id;
    
    UPDATE tag_hierarchy 
    SET child_id = p_target_id 
    WHERE child_id = p_source_id;
    
    -- Update child tags
    UPDATE tags 
    SET parent_id = p_target_id 
    WHERE parent_id = p_source_id;
    
    -- Update usage count for target
    UPDATE tags 
    SET usage_count = (
        SELECT COUNT(*) FROM book_tags WHERE tag_id = p_target_id
    )
    WHERE id = p_target_id;
    
    -- Delete source tag (will cascade)
    DELETE FROM tags WHERE id = p_source_id;
    
    RETURN 1; -- Success
END;

-- 9. Function: Search tags
-- Purpose: Search tags by name or description
CREATE FUNCTION IF NOT EXISTS search_tags(p_search_term TEXT, p_language_id INTEGER DEFAULT NULL)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', COALESCE(tt.name, t.name),
                'slug', t.slug,
                'description', COALESCE(tt.description, t.description),
                'language_id', t.language_id,
                'usage_count', t.usage_count,
                'relevance', (
                    CASE 
                        WHEN LOWER(COALESCE(tt.name, t.name)) LIKE LOWER('%' || p_search_term || '%') THEN 10
                        WHEN LOWER(t.name) LIKE LOWER('%' || p_search_term || '%') THEN 5
                        ELSE 1
                    END
                )
            )
        )
        FROM tags t
        LEFT JOIN tag_translations tt ON t.id = tt.tag_id 
            AND (tt.language_id = p_language_id OR p_language_id IS NULL)
        WHERE t.is_active = 1
        AND (
            LOWER(t.name) LIKE LOWER('%' || p_search_term || '%')
            OR LOWER(t.slug) LIKE LOWER('%' || p_search_term || '%')
            OR LOWER(tt.name) LIKE LOWER('%' || p_search_term || '%')
            OR LOWER(t.description) LIKE LOWER('%' || p_search_term || '%')
            OR LOWER(tt.description) LIKE LOWER('%' || p_search_term || '%')
        )
        ORDER BY relevance DESC, t.usage_count DESC
        LIMIT 20
    );
END;

-- 10. Function: Validate tag slug
-- Purpose: Check if slug is valid and unique
CREATE FUNCTION IF NOT EXISTS validate_tag_slug(p_slug TEXT, p_exclude_id INTEGER DEFAULT NULL)
RETURNS INTEGER
BEGIN
    DECLARE v_exists INTEGER DEFAULT 0;
    
    -- Check slug format
    IF p_slug NOT GLOB '[a-z0-9-]*' THEN
        RETURN -1; -- Invalid slug format
    END IF;
    
    -- Check if slug exists
    SELECT COUNT(*) INTO v_exists
    FROM tags 
    WHERE slug = p_slug 
    AND (p_exclude_id IS NULL OR id != p_exclude_id);
    
    IF v_exists > 0 THEN
        RETURN -2; -- Slug already exists
    END IF;
    
    RETURN 1; -- Valid slug
END;

-- 11. Function: Generate slug from name
-- Purpose: Create URL-friendly slug from tag name
CREATE FUNCTION IF NOT EXISTS generate_tag_slug(p_name TEXT)
RETURNS TEXT
BEGIN
    DECLARE v_slug TEXT;
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_base_slug TEXT;
    
    -- Convert to lowercase, replace spaces with hyphens
    SET v_slug = LOWER(p_name);
    SET v_slug = REPLACE(v_slug, ' ', '-');
    SET v_slug = REPLACE(v_slug, '_', '-');
    SET v_slug = REPLACE(v_slug, '.', '-');
    SET v_slug = REPLACE(v_slug, ',', '-');
    SET v_slug = REPLACE(v_slug, ':', '-');
    SET v_slug = REPLACE(v_slug, ';', '-');
    SET v_slug = REPLACE(v_slug, '?', '');
    SET v_slug = REPLACE(v_slug, '!', '');
    SET v_slug = REPLACE(v_slug, '"', '');
    SET v_slug = REPLACE(v_slug, "'", '');
    SET v_slug = REPLACE(v_slug, '--', '-');
    
    -- Remove leading/trailing hyphens
    SET v_slug = TRIM(v_slug, '-');
    
    -- Check if slug exists
    SET v_base_slug = v_slug;
    
    WHILE EXISTS (SELECT 1 FROM tags WHERE slug = v_slug) DO
        SET v_counter = v_counter + 1;
        SET v_slug = v_base_slug || '-' || v_counter;
    END WHILE;
    
    RETURN v_slug;
END;

-- 12. Function: Get tag statistics
-- Purpose: Get comprehensive tag statistics
CREATE FUNCTION IF NOT EXISTS get_tag_statistics()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'total_tags', (SELECT COUNT(*) FROM tags),
            'active_tags', (SELECT COUNT(*) FROM tags WHERE is_active = 1),
            'inactive_tags', (SELECT COUNT(*) FROM tags WHERE is_active = 0),
            'tags_with_translations', (
                SELECT COUNT(DISTINCT tag_id) FROM tag_translations
            ),
            'total_books_tagged', (
                SELECT COUNT(DISTINCT book_id) FROM book_tags
            ),
            'total_tag_assignments', (
                SELECT COUNT(*) FROM book_tags
            ),
            'avg_tags_per_book', (
                SELECT ROUND(AVG(tag_count), 2)
                FROM (
                    SELECT book_id, COUNT(*) as tag_count
                    FROM book_tags
                    GROUP BY book_id
                )
            ),
            'most_popular_tag', (
                SELECT json_object(
                    'id', t.id,
                    'name', t.name,
                    'usage_count', t.usage_count
                )
                FROM tags t
                ORDER BY t.usage_count DESC
                LIMIT 1
            ),
            'least_popular_tag', (
                SELECT json_object(
                    'id', t.id,
                    'name', t.name,
                    'usage_count', t.usage_count
                )
                FROM tags t
                WHERE t.is_active = 1
                ORDER BY t.usage_count ASC
                LIMIT 1
            ),
            'hierarchy_depth', (
                SELECT MAX(level) FROM tag_hierarchy
            ),
            'top_tags_last_30_days', (
                SELECT json_group_array(
                    json_object(
                        'id', t.id,
                        'name', t.name,
                        'usage_count', t.usage_count
                    )
                )
                FROM tags t
                WHERE t.created_at >= date('now', '-30 days')
                ORDER BY t.usage_count DESC
                LIMIT 10
            )
        )
    );
END;