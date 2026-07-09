-- =============================================
-- Procedures for: tags table
-- Purpose: Complex tag management operations
-- =============================================

-- 1. Procedure: Create tag with translations
-- Purpose: Create a new tag with multiple translations in one operation
CREATE PROCEDURE create_tag_with_translations(
    p_name VARCHAR(100),
    p_slug VARCHAR(100),
    p_description TEXT,
    p_parent_id INTEGER,
    p_language_id INTEGER,
    p_sort_order INTEGER,
    p_created_by INTEGER,
    p_translations TEXT  -- JSON array of translations
)
BEGIN
    DECLARE v_tag_id INTEGER;
    DECLARE v_slug TEXT;
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_base_slug TEXT;
    
    -- Generate slug if not provided
    IF p_slug IS NULL OR p_slug = '' THEN
        SET v_slug = generate_tag_slug(p_name);
    ELSE
        SET v_slug = p_slug;
    END IF;
    
    -- Check if slug exists, if so, append number
    SET v_base_slug = v_slug;
    WHILE EXISTS (SELECT 1 FROM tags WHERE slug = v_slug) DO
        SET v_counter = v_counter + 1;
        SET v_slug = v_base_slug || '-' || v_counter;
    END WHILE;
    
    -- Insert tag
    INSERT INTO tags (
        name,
        slug,
        description,
        parent_id,
        language_id,
        sort_order,
        created_by,
        created_at,
        updated_at
    ) VALUES (
        p_name,
        v_slug,
        p_description,
        p_parent_id,
        p_language_id,
        COALESCE(p_sort_order, 0),
        p_created_by,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
    
    SET v_tag_id = LAST_INSERT_ROWID();
    
    -- Insert translations
    IF p_translations IS NOT NULL AND json_valid(p_translations) THEN
        INSERT INTO tag_translations (tag_id, language_id, name, description, created_by)
        SELECT 
            v_tag_id,
            json_extract(value, '$.language_id'),
            json_extract(value, '$.name'),
            json_extract(value, '$.description'),
            p_created_by
        FROM json_each(p_translations);
    END IF;
    
    -- Insert hierarchy if parent exists
    IF p_parent_id IS NOT NULL THEN
        INSERT INTO tag_hierarchy (parent_id, child_id, level)
        SELECT 
            p_parent_id,
            v_tag_id,
            COALESCE(MAX(level), 0) + 1
        FROM tag_hierarchy
        WHERE child_id = p_parent_id;
    END IF;
    
    SELECT v_tag_id AS tag_id;
END;

-- 2. Procedure: Update tag with translations
-- Purpose: Update tag and its translations in one operation
CREATE PROCEDURE update_tag_with_translations(
    p_tag_id INTEGER,
    p_name VARCHAR(100),
    p_slug VARCHAR(100),
    p_description TEXT,
    p_parent_id INTEGER,
    p_language_id INTEGER,
    p_is_active BOOLEAN,
    p_sort_order INTEGER,
    p_updated_by INTEGER,
    p_translations TEXT  -- JSON array of translations
)
BEGIN
    -- Validate tag exists
    IF NOT EXISTS (SELECT 1 FROM tags WHERE id = p_tag_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tag not found';
    END IF;
    
    -- Update tag
    UPDATE tags SET
        name = COALESCE(p_name, name),
        slug = COALESCE(p_slug, slug),
        description = COALESCE(p_description, description),
        parent_id = COALESCE(p_parent_id, parent_id),
        language_id = COALESCE(p_language_id, language_id),
        is_active = COALESCE(p_is_active, is_active),
        sort_order = COALESCE(p_sort_order, sort_order),
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tag_id;
    
    -- Update translations
    IF p_translations IS NOT NULL AND json_valid(p_translations) THEN
        -- Delete existing translations for this tag
        DELETE FROM tag_translations WHERE tag_id = p_tag_id;
        
        -- Insert new translations
        INSERT INTO tag_translations (tag_id, language_id, name, description, created_by, created_at)
        SELECT 
            p_tag_id,
            json_extract(value, '$.language_id'),
            json_extract(value, '$.name'),
            json_extract(value, '$.description'),
            p_updated_by,
            CURRENT_TIMESTAMP
        FROM json_each(p_translations);
    END IF;
    
    -- Update hierarchy
    IF p_parent_id IS NOT NULL AND p_parent_id != (SELECT parent_id FROM tags WHERE id = p_tag_id) THEN
        -- Delete existing hierarchy
        DELETE FROM tag_hierarchy WHERE child_id = p_tag_id;
        
        -- Insert new hierarchy
        INSERT INTO tag_hierarchy (parent_id, child_id, level)
        SELECT 
            p_parent_id,
            p_tag_id,
            COALESCE(MAX(level), 0) + 1
        FROM tag_hierarchy
        WHERE child_id = p_parent_id;
    END IF;
    
    SELECT p_tag_id AS tag_id;
END;

-- 3. Procedure: Bulk create tags
-- Purpose: Create multiple tags at once
CREATE PROCEDURE bulk_create_tags(
    p_tags TEXT,  -- JSON array of tags
    p_created_by INTEGER
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_tag JSON;
    DECLARE v_tag_id INTEGER;
    
    -- Validate JSON
    IF NOT json_valid(p_tags) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid JSON format';
    END IF;
    
    SET v_total = json_array_length(p_tags);
    
    WHILE v_counter < v_total DO
        SET v_tag = json_extract(p_tags, '$[' || v_counter || ']');
        
        INSERT INTO tags (
            name,
            slug,
            description,
            parent_id,
            language_id,
            sort_order,
            created_by,
            created_at,
            updated_at
        ) VALUES (
            json_extract(v_tag, '$.name'),
            COALESCE(json_extract(v_tag, '$.slug'), generate_tag_slug(json_extract(v_tag, '$.name'))),
            json_extract(v_tag, '$.description'),
            json_extract(v_tag, '$.parent_id'),
            json_extract(v_tag, '$.language_id'),
            COALESCE(json_extract(v_tag, '$.sort_order'), 0),
            p_created_by,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        );
        
        SET v_tag_id = LAST_INSERT_ROWID();
        
        -- Insert hierarchy if parent exists
        IF json_extract(v_tag, '$.parent_id') IS NOT NULL THEN
            INSERT INTO tag_hierarchy (parent_id, child_id, level)
            SELECT 
                json_extract(v_tag, '$.parent_id'),
                v_tag_id,
                COALESCE(MAX(level), 0) + 1
            FROM tag_hierarchy
            WHERE child_id = json_extract(v_tag, '$.parent_id');
        END IF;
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_total AS tags_created;
END;

-- 4. Procedure: Get tag report
-- Purpose: Generate comprehensive tag report
CREATE PROCEDURE get_tag_report(
    p_start_date DATETIME,
    p_end_date DATETIME
)
BEGIN
    SELECT 
        -- Tag statistics
        (SELECT COUNT(*) FROM tags WHERE is_active = 1) AS total_active_tags,
        (SELECT COUNT(*) FROM tags WHERE is_active = 0) AS total_inactive_tags,
        (SELECT COUNT(*) FROM tags WHERE created_at BETWEEN p_start_date AND p_end_date) AS tags_created_in_period,
        
        -- Tag usage statistics
        (SELECT COUNT(*) FROM book_tags) AS total_tag_assignments,
        (SELECT COUNT(DISTINCT tag_id) FROM book_tags) AS unique_tags_used,
        (SELECT COUNT(DISTINCT book_id) FROM book_tags) AS books_with_tags,
        
        -- Most popular tags
        (SELECT json_group_array(
            json_object(
                'id', id,
                'name', name,
                'usage_count', usage_count
            )
        )
        FROM tags
        WHERE is_active = 1
        ORDER BY usage_count DESC
        LIMIT 10) AS top_10_tags,
        
        -- Least popular tags
        (SELECT json_group_array(
            json_object(
                'id', id,
                'name', name,
                'usage_count', usage_count
            )
        )
        FROM tags
        WHERE is_active = 1 AND usage_count > 0
        ORDER BY usage_count ASC
        LIMIT 10) AS bottom_10_tags,
        
        -- Hierarchy statistics
        (SELECT COUNT(*) FROM tag_hierarchy) AS hierarchy_relationships,
        (SELECT MAX(level) FROM tag_hierarchy) AS max_hierarchy_depth,
        (SELECT ROUND(AVG(level), 2) FROM tag_hierarchy) AS avg_hierarchy_depth,
        
        -- Translation statistics
        (SELECT COUNT(*) FROM tag_translations) AS total_translations,
        (SELECT COUNT(DISTINCT tag_id) FROM tag_translations) AS tags_with_translations,
        (SELECT COUNT(DISTINCT language_id) FROM tag_translations) AS languages_used,
        
        -- Activity metrics
        (SELECT COUNT(*) FROM tags WHERE updated_at BETWEEN p_start_date AND p_end_date) AS tags_updated_in_period,
        (SELECT COUNT(*) FROM tag_translations WHERE created_at BETWEEN p_start_date AND p_end_date) AS translations_added_in_period,
        (SELECT COUNT(*) FROM book_tags WHERE created_at BETWEEN p_start_date AND p_end_date) AS tag_assignments_in_period;
END;

-- 5. Procedure: Archive inactive tags
-- Purpose: Archive tags that haven't been used for a specified period
CREATE PROCEDURE archive_inactive_tags(
    p_days_inactive INTEGER DEFAULT 365,
    p_archived_by INTEGER DEFAULT NULL
)
BEGIN
    DECLARE v_archived_count INTEGER DEFAULT 0;
    DECLARE v_tag_id INTEGER;
    DECLARE v_cursor CURSOR FOR
        SELECT id FROM tags
        WHERE is_active = 1
        AND DATEDIFF('day', updated_at, CURRENT_TIMESTAMP) > p_days_inactive
        AND NOT EXISTS (
            SELECT 1 FROM book_tags WHERE tag_id = tags.id
        );
    
    OPEN v_cursor;
    
    tag_loop: LOOP
        FETCH v_cursor INTO v_tag_id;
        IF v_tag_id IS NULL THEN
            LEAVE tag_loop;
        END IF;
        
        -- Archive tag (soft delete)
        UPDATE tags SET
            is_active = 0,
            updated_at = CURRENT_TIMESTAMP,
            updated_by = p_archived_by
        WHERE id = v_tag_id;
        
        SET v_archived_count = v_archived_count + 1;
    END LOOP;
    
    CLOSE v_cursor;
    
    SELECT v_archived_count AS tags_archived;
END;

-- 6. Procedure: Recalculate tag usage counts
-- Purpose: Recalculate usage_count for all tags
CREATE PROCEDURE recalculate_tag_usage_counts()
BEGIN
    -- Update all tags with current book count
    UPDATE tags
    SET usage_count = (
        SELECT COUNT(*)
        FROM book_tags
        WHERE tag_id = tags.id
    ),
    updated_at = CURRENT_TIMESTAMP
    WHERE is_active = 1;
    
    SELECT COUNT(*) AS tags_updated FROM tags;
END;

-- 7. Procedure: Get tags by popularity range
-- Purpose: Get tags within a popularity range
CREATE PROCEDURE get_tags_by_popularity_range(
    p_min_usage INTEGER DEFAULT 0,
    p_max_usage INTEGER DEFAULT NULL
)
BEGIN
    SELECT 
        t.id,
        t.name,
        t.slug,
        t.usage_count,
        t.is_active,
        (SELECT COUNT(*) FROM tag_translations WHERE tag_id = t.id) AS translation_count,
        (SELECT COUNT(*) FROM tag_hierarchy WHERE parent_id = t.id OR child_id = t.id) AS hierarchy_count,
        t.created_at,
        t.updated_at
    FROM tags t
    WHERE t.is_active = 1
    AND t.usage_count >= p_min_usage
    AND (p_max_usage IS NULL OR t.usage_count <= p_max_usage)
    ORDER BY t.usage_count DESC, t.name;
END;