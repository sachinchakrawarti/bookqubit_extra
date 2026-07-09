-- =============================================
-- Migration: 003_add_tag_metadata
-- Version: 1.2.0
-- Date: 2024-03-01
-- Description: Add metadata fields and advanced features
-- Dependencies: 002_add_tag_hierarchy
-- =============================================

-- =============================================
-- 1. ADD METADATA COLUMNS
-- =============================================

-- 1.1 Add metadata to tags table
ALTER TABLE tags ADD COLUMN meta_title VARCHAR(255);
ALTER TABLE tags ADD COLUMN meta_description VARCHAR(500);
ALTER TABLE tags ADD COLUMN meta_keywords TEXT;
ALTER TABLE tags ADD COLUMN featured_image VARCHAR(500);
ALTER TABLE tags ADD COLUMN icon_class VARCHAR(100);
ALTER TABLE tags ADD COLUMN color_code VARCHAR(7);
ALTER TABLE tags ADD COLUMN seo_friendly BOOLEAN DEFAULT 0;
ALTER TABLE tags ADD COLUMN is_featured BOOLEAN DEFAULT 0;
ALTER TABLE tags ADD COLUMN view_count INTEGER DEFAULT 0;
ALTER TABLE tags ADD COLUMN last_viewed_at DATETIME;

-- 1.2 Add metadata to tag_translations table
ALTER TABLE tag_translations ADD COLUMN meta_title VARCHAR(255);
ALTER TABLE tag_translations ADD COLUMN meta_description VARCHAR(500);
ALTER TABLE tag_translations ADD COLUMN seo_slug VARCHAR(100);

-- =============================================
-- 2. ADD METADATA FUNCTIONS
-- =============================================

-- 2.1 Get tag SEO data
CREATE FUNCTION IF NOT EXISTS get_tag_seo_data(p_tag_id INTEGER, p_language_id INTEGER DEFAULT NULL)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'id', t.id,
            'name', t.name,
            'slug', t.slug,
            'meta_title', COALESCE(tt.meta_title, t.meta_title, t.name),
            'meta_description', COALESCE(tt.meta_description, t.meta_description, t.description),
            'seo_slug', COALESCE(tt.seo_slug, t.slug),
            'featured_image', t.featured_image,
            'icon_class', t.icon_class,
            'color_code', t.color_code
        )
        FROM tags t
        LEFT JOIN tag_translations tt ON t.id = tt.tag_id 
            AND (tt.language_id = p_language_id OR p_language_id IS NULL)
        WHERE t.id = p_tag_id
    );
END;

-- 2.2 Update tag view count
CREATE FUNCTION IF NOT EXISTS increment_tag_view(p_tag_id INTEGER)
RETURNS INTEGER
BEGIN
    UPDATE tags 
    SET view_count = view_count + 1,
        last_viewed_at = CURRENT_TIMESTAMP
    WHERE id = p_tag_id;
    
    RETURN (SELECT view_count FROM tags WHERE id = p_tag_id);
END;

-- 2.3 Get featured tags
CREATE FUNCTION IF NOT EXISTS get_featured_tags(p_limit INTEGER DEFAULT 10)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', t.id,
                'name', t.name,
                'slug', t.slug,
                'description', t.description,
                'featured_image', t.featured_image,
                'icon_class', t.icon_class,
                'color_code', t.color_code,
                'usage_count', t.usage_count,
                'view_count', t.view_count
            )
        )
        FROM tags t
        WHERE t.is_featured = 1 AND t.is_active = 1
        ORDER BY t.usage_count DESC, t.view_count DESC
        LIMIT p_limit
    );
END;

-- =============================================
-- 3. ADD METADATA PROCEDURES
-- =============================================

-- 3.1 Update tag metadata
CREATE PROCEDURE update_tag_metadata(
    p_tag_id INTEGER,
    p_meta_title VARCHAR(255),
    p_meta_description VARCHAR(500),
    p_meta_keywords TEXT,
    p_featured_image VARCHAR(500),
    p_icon_class VARCHAR(100),
    p_color_code VARCHAR(7),
    p_seo_friendly BOOLEAN,
    p_is_featured BOOLEAN,
    p_updated_by INTEGER
)
BEGIN
    UPDATE tags SET
        meta_title = COALESCE(p_meta_title, meta_title),
        meta_description = COALESCE(p_meta_description, meta_description),
        meta_keywords = COALESCE(p_meta_keywords, meta_keywords),
        featured_image = COALESCE(p_featured_image, featured_image),
        icon_class = COALESCE(p_icon_class, icon_class),
        color_code = COALESCE(p_color_code, color_code),
        seo_friendly = COALESCE(p_seo_friendly, seo_friendly),
        is_featured = COALESCE(p_is_featured, is_featured),
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_tag_id;
    
    SELECT p_tag_id AS tag_id;
END;

-- 3.2 Bulk update tag featured status
CREATE PROCEDURE bulk_update_tag_featured(
    p_tag_ids TEXT,  -- JSON array of tag IDs
    p_is_featured BOOLEAN,
    p_updated_by INTEGER
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_tag_id INTEGER;
    
    SET v_total = json_array_length(p_tag_ids);
    
    WHILE v_counter < v_total DO
        SET v_tag_id = json_extract(p_tag_ids, '$[' || v_counter || ']');
        
        UPDATE tags SET
            is_featured = p_is_featured,
            updated_by = p_updated_by,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = v_tag_id;
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_counter AS tags_updated;
END;

-- 3.3 Generate SEO slugs for translations
CREATE PROCEDURE generate_seo_slugs()
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    
    UPDATE tag_translations
    SET seo_slug = LOWER(REPLACE(REPLACE(REPLACE(name, ' ', '-'), '_', '-'), '--', '-'))
    WHERE seo_slug IS NULL;
    
    SELECT COUNT(*) AS seo_slugs_generated FROM tag_translations WHERE seo_slug IS NOT NULL;
END;

-- =============================================
-- 4. ADD METADATA INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_tags_is_featured ON tags(is_featured);
CREATE INDEX IF NOT EXISTS idx_tags_seo_friendly ON tags(seo_friendly);
CREATE INDEX IF NOT EXISTS idx_tags_view_count ON tags(view_count);
CREATE INDEX IF NOT EXISTS idx_tags_color_code ON tags(color_code);
CREATE INDEX IF NOT EXISTS idx_tag_translations_seo_slug ON tag_translations(seo_slug);

-- =============================================
-- 5. ADD METADATA VIEWS
-- =============================================

-- 5.1 Tag SEO view
CREATE VIEW IF NOT EXISTS vw_tag_seo AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.meta_title,
    t.meta_description,
    t.meta_keywords,
    t.featured_image,
    t.icon_class,
    t.color_code,
    t.seo_friendly,
    t.is_featured,
    tt.name AS translated_name,
    tt.meta_title AS translated_meta_title,
    tt.meta_description AS translated_meta_description,
    tt.seo_slug AS translated_seo_slug,
    l.code AS language_code
FROM tags t
LEFT JOIN tag_translations tt ON t.id = tt.tag_id
LEFT JOIN languages l ON tt.language_id = l.id
WHERE t.is_active = 1;

-- 5.2 Featured tags view
CREATE VIEW IF NOT EXISTS vw_featured_tags AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.featured_image,
    t.icon_class,
    t.color_code,
    t.usage_count,
    t.view_count,
    t.sort_order,
    (SELECT COUNT(*) FROM book_tags WHERE tag_id = t.id) AS book_count,
    (SELECT COUNT(*) FROM tag_translations WHERE tag_id = t.id) AS translation_count
FROM tags t
WHERE t.is_featured = 1 AND t.is_active = 1
ORDER BY t.sort_order, t.usage_count DESC, t.view_count DESC;

-- 5.3 Tag analytics view
CREATE VIEW IF NOT EXISTS vw_tag_analytics AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.usage_count,
    t.view_count,
    t.created_at,
    t.updated_at,
    t.last_viewed_at,
    julianday('now') - julianday(t.created_at) AS days_since_created,
    julianday('now') - julianday(t.last_viewed_at) AS days_since_viewed,
    ROUND(
        CAST(t.view_count AS FLOAT) / NULLIF(julianday('now') - julianday(t.created_at), 0) * 30, 2
    ) AS views_per_month,
    ROUND(
        CAST(t.usage_count AS FLOAT) / NULLIF(julianday('now') - julianday(t.created_at), 0) * 30, 2
    ) AS usage_per_month,
    CASE 
        WHEN t.usage_count > 100 AND t.view_count > 1000 THEN 'Viral'
        WHEN t.usage_count > 50 AND t.view_count > 500 THEN 'Popular'
        WHEN t.usage_count > 10 AND t.view_count > 100 THEN 'Growing'
        ELSE 'New'
    END AS tag_status
FROM tags t
WHERE t.is_active = 1;

-- =============================================
-- 6. UPDATE SEED DATA WITH METADATA
-- =============================================

UPDATE tags SET
    meta_title = name,
    meta_description = description,
    seo_friendly = 1,
    is_featured = CASE WHEN id <= 10 THEN 1 ELSE 0 END,
    color_code = CASE 
        WHEN id = 1 THEN '#FF6B6B'
        WHEN id = 2 THEN '#4ECDC4'
        WHEN id = 3 THEN '#45B7D1'
        WHEN id = 4 THEN '#96CEB4'
        WHEN id = 5 THEN '#FFEEAD'
        WHEN id = 6 THEN '#D4A5A5'
        WHEN id = 7 THEN '#9B59B6'
        WHEN id = 8 THEN '#E67E22'
        WHEN id = 9 THEN '#2ECC71'
        WHEN id = 10 THEN '#3498DB'
        ELSE '#95A5A6'
    END,
    icon_class = CASE 
        WHEN id = 1 THEN 'fas fa-book'
        WHEN id = 2 THEN 'fas fa-newspaper'
        WHEN id = 3 THEN 'fas fa-rocket'
        WHEN id = 4 THEN 'fas fa-hat-wizard'
        WHEN id = 5 THEN 'fas fa-search'
        WHEN id = 6 THEN 'fas fa-skull'
        WHEN id = 7 THEN 'fas fa-heart'
        WHEN id = 8 THEN 'fas fa-landmark'
        WHEN id = 9 THEN 'fas fa-user'
        WHEN id = 10 THEN 'fas fa-hand-holding-heart'
        ELSE 'fas fa-tag'
    END
WHERE id <= 20;

-- =============================================
-- 7. VERIFICATION
-- =============================================

SELECT 'Migration 003 completed successfully!' AS status;
SELECT 
    COUNT(*) AS tags_with_metadata,
    SUM(CASE WHEN is_featured = 1 THEN 1 ELSE 0 END) AS featured_tags,
    SUM(CASE WHEN seo_friendly = 1 THEN 1 ELSE 0 END) AS seo_friendly_tags,
    COUNT(DISTINCT color_code) AS unique_colors,
    COUNT(DISTINCT icon_class) AS unique_icons
FROM tags;