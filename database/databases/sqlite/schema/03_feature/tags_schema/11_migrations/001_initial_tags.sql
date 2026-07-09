-- =============================================
-- Migration: 001_initial_tags
-- Version: 1.0.0
-- Date: 2024-01-01
-- Description: Initial tags schema creation
-- Dependencies: language_schema, book_schema
-- =============================================

-- =============================================
-- 1. CREATE TABLES
-- =============================================

-- 1.1 Tags table
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER,
    language_id INTEGER,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_by INTEGER,
    updated_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 1.2 Tag translations table
CREATE TABLE IF NOT EXISTS tag_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INTEGER,
    updated_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tag_id, language_id)
);

-- 1.3 Book tags junction table
CREATE TABLE IF NOT EXISTS book_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    is_primary BOOLEAN DEFAULT 0,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book_id, tag_id)
);

-- 1.4 Tag hierarchy table
CREATE TABLE IF NOT EXISTS tag_hierarchy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    child_id INTEGER NOT NULL,
    level INTEGER DEFAULT 1,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(parent_id, child_id)
);

-- =============================================
-- 2. CREATE INDEXES
-- =============================================

-- Tags indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_slug_unique ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_tags_parent_id ON tags(parent_id);
CREATE INDEX IF NOT EXISTS idx_tags_language_id ON tags(language_id);
CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON tags(usage_count);
CREATE INDEX IF NOT EXISTS idx_tags_is_active ON tags(is_active);
CREATE INDEX IF NOT EXISTS idx_tags_active_sort ON tags(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_tags_parent_active ON tags(parent_id, is_active);
CREATE INDEX IF NOT EXISTS idx_tags_created_at ON tags(created_at);

-- Tag translations indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_tag_translations_tag_lang ON tag_translations(tag_id, language_id);
CREATE INDEX IF NOT EXISTS idx_tag_translations_tag_id ON tag_translations(tag_id);
CREATE INDEX IF NOT EXISTS idx_tag_translations_language_id ON tag_translations(language_id);
CREATE INDEX IF NOT EXISTS idx_tag_translations_name ON tag_translations(name);
CREATE INDEX IF NOT EXISTS idx_tag_translations_lang_name ON tag_translations(language_id, name);
CREATE INDEX IF NOT EXISTS idx_tag_translations_created_at ON tag_translations(created_at);

-- Book tags indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_book_tags_book_tag ON book_tags(book_id, tag_id);
CREATE INDEX IF NOT EXISTS idx_book_tags_book_id ON book_tags(book_id);
CREATE INDEX IF NOT EXISTS idx_book_tags_tag_id ON book_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_book_tags_is_primary ON book_tags(is_primary);
CREATE INDEX IF NOT EXISTS idx_book_tags_book_primary ON book_tags(book_id, is_primary);
CREATE INDEX IF NOT EXISTS idx_book_tags_tag_primary ON book_tags(tag_id, is_primary);
CREATE INDEX IF NOT EXISTS idx_book_tags_created_at ON book_tags(created_at);

-- Tag hierarchy indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_child ON tag_hierarchy(parent_id, child_id);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_id ON tag_hierarchy(parent_id);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_child_id ON tag_hierarchy(child_id);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_level ON tag_hierarchy(level);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_level ON tag_hierarchy(parent_id, level);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_child_level ON tag_hierarchy(child_id, level);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_created_at ON tag_hierarchy(created_at);

-- =============================================
-- 3. CREATE FOREIGN KEYS
-- =============================================

-- Tags foreign keys
ALTER TABLE tags ADD CONSTRAINT fk_tags_parent_id 
    FOREIGN KEY (parent_id) REFERENCES tags(id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE tags ADD CONSTRAINT fk_tags_language_id 
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE tags ADD CONSTRAINT fk_tags_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE tags ADD CONSTRAINT fk_tags_updated_by 
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- Tag translations foreign keys
ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_tag_id 
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_language_id 
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_updated_by 
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- Book tags foreign keys
ALTER TABLE book_tags ADD CONSTRAINT fk_book_tags_book_id 
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE book_tags ADD CONSTRAINT fk_book_tags_tag_id 
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE book_tags ADD CONSTRAINT fk_book_tags_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- Tag hierarchy foreign keys
ALTER TABLE tag_hierarchy ADD CONSTRAINT fk_tag_hierarchy_parent_id 
    FOREIGN KEY (parent_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE tag_hierarchy ADD CONSTRAINT fk_tag_hierarchy_child_id 
    FOREIGN KEY (child_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE tag_hierarchy ADD CONSTRAINT fk_tag_hierarchy_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- =============================================
-- 4. CREATE CONSTRAINTS
-- =============================================

-- Tags constraints
ALTER TABLE tags ADD CONSTRAINT ck_tags_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

ALTER TABLE tags ADD CONSTRAINT ck_tags_slug_not_null 
    CHECK (slug IS NOT NULL AND length(trim(slug)) > 0);

ALTER TABLE tags ADD CONSTRAINT ck_tags_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

ALTER TABLE tags ADD CONSTRAINT ck_tags_slug_length 
    CHECK (length(trim(slug)) >= 2 AND length(trim(slug)) <= 100);

ALTER TABLE tags ADD CONSTRAINT ck_tags_slug_format 
    CHECK (slug GLOB '[a-z0-9-]*' AND slug NOT LIKE '%-%' AND slug NOT LIKE '%--%');

ALTER TABLE tags ADD CONSTRAINT ck_tags_sort_order_non_negative 
    CHECK (sort_order >= 0);

ALTER TABLE tags ADD CONSTRAINT ck_tags_usage_count_non_negative 
    CHECK (usage_count >= 0);

ALTER TABLE tags ADD CONSTRAINT ck_tags_parent_not_self 
    CHECK (parent_id IS NULL OR parent_id != id);

-- Tag translations constraints
ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_tag_id_not_null 
    CHECK (tag_id IS NOT NULL);

ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_language_id_not_null 
    CHECK (language_id IS NOT NULL);

ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_description_length 
    CHECK (description IS NULL OR length(description) <= 5000);

-- Book tags constraints
ALTER TABLE book_tags ADD CONSTRAINT ck_book_tags_book_id_not_null 
    CHECK (book_id IS NOT NULL);

ALTER TABLE book_tags ADD CONSTRAINT ck_book_tags_tag_id_not_null 
    CHECK (tag_id IS NOT NULL);

ALTER TABLE book_tags ADD CONSTRAINT ck_book_tags_is_primary_boolean 
    CHECK (is_primary IN (0, 1));

-- Tag hierarchy constraints
ALTER TABLE tag_hierarchy ADD CONSTRAINT ck_tag_hierarchy_parent_id_not_null 
    CHECK (parent_id IS NOT NULL);

ALTER TABLE tag_hierarchy ADD CONSTRAINT ck_tag_hierarchy_child_id_not_null 
    CHECK (child_id IS NOT NULL);

ALTER TABLE tag_hierarchy ADD CONSTRAINT ck_tag_hierarchy_not_self 
    CHECK (parent_id != child_id);

ALTER TABLE tag_hierarchy ADD CONSTRAINT ck_tag_hierarchy_level_positive 
    CHECK (level >= 1);

-- =============================================
-- 5. CREATE VIEWS
-- =============================================

-- 5.1 Tags view
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
    tt.name AS translated_name,
    tt.description AS translated_description,
    CASE WHEN t.parent_id IS NULL THEN 0 ELSE 1 END AS hierarchy_level,
    EXISTS (SELECT 1 FROM tags WHERE parent_id = t.id) AS has_children,
    (SELECT COUNT(*) FROM tags WHERE parent_id = t.id) AS child_count
FROM tags t
LEFT JOIN tags pt ON t.parent_id = pt.id
LEFT JOIN languages l ON t.language_id = l.id
LEFT JOIN tag_translations tt ON t.id = tt.tag_id AND tt.language_id = t.language_id
WHERE t.is_active = 1;

-- 5.2 Tag hierarchy view
CREATE VIEW IF NOT EXISTS vw_tag_hierarchy AS
WITH RECURSIVE tag_tree AS (
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
    json_object('id', id, 'name', name, 'level', level, 'path', path_names) AS hierarchy_json,
    level AS depth,
    CASE WHEN EXISTS (SELECT 1 FROM tags WHERE parent_id = t.id) THEN 0 ELSE 1 END AS is_leaf
FROM tag_tree t
ORDER BY level, sort_order, name;

-- 5.3 Tag popularity view
CREATE VIEW IF NOT EXISTS vw_tag_popularity AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    t.is_active,
    t.usage_count,
    COUNT(DISTINCT bt.book_id) AS book_count,
    ROUND(
        CAST(COUNT(DISTINCT bt.book_id) AS FLOAT) / 
        NULLIF((SELECT COUNT(*) FROM books WHERE is_active = 1), 0) * 100, 2
    ) AS usage_percentage,
    RANK() OVER (ORDER BY COUNT(DISTINCT bt.book_id) DESC) AS popularity_rank,
    CASE 
        WHEN COUNT(DISTINCT bt.book_id) > 100 THEN 'High'
        WHEN COUNT(DISTINCT bt.book_id) > 50 THEN 'Medium'
        WHEN COUNT(DISTINCT bt.book_id) > 10 THEN 'Low'
        ELSE 'Rare'
    END AS popularity_level,
    MAX(bt.created_at) AS last_used_at,
    SUM(CASE WHEN bt.created_at >= date('now', '-30 days') THEN 1 ELSE 0 END) AS new_usage_30d,
    ROUND(
        CAST(COUNT(DISTINCT bt.book_id) AS FLOAT) / 
        NULLIF((julianday('now') - julianday(MIN(bt.created_at))) / 30.44, 0), 2
    ) AS avg_monthly_usage
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
LEFT JOIN books b ON bt.book_id = b.id AND b.is_active = 1
WHERE t.is_active = 1
GROUP BY t.id, t.name, t.slug, t.description, t.parent_id, t.is_active, t.usage_count
ORDER BY popularity_rank;

-- 5.4 Tag usage view
CREATE VIEW IF NOT EXISTS vw_tag_usage AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    pt.name AS parent_name,
    t.is_active,
    COUNT(DISTINCT bt.book_id) AS book_count,
    json_group_array(
        DISTINCT json_object(
            'book_id', b.id,
            'title', b.title,
            'isbn', b.isbn,
            'publication_year', b.publication_year
        )
    ) AS books_json,
    json_object(
        'total_languages', COUNT(DISTINCT b.language_id),
        'languages', json_group_array(
            DISTINCT json_object('language_id', l.id, 'name', l.name, 'code', l.code)
        )
    ) AS language_stats,
    COUNT(bt.id) AS total_usage_count,
    MAX(bt.created_at) AS last_used,
    MIN(bt.created_at) AS first_used,
    ROUND(
        CAST(COUNT(bt.id) AS FLOAT) / 
        NULLIF((julianday('now') - julianday(MIN(bt.created_at))) / 30.44, 0), 2
    ) AS monthly_usage_frequency
FROM tags t
LEFT JOIN tags pt ON t.parent_id = pt.id
LEFT JOIN book_tags bt ON t.id = bt.tag_id
LEFT JOIN books b ON bt.book_id = b.id AND b.is_active = 1
LEFT JOIN languages l ON b.language_id = l.id
WHERE t.is_active = 1
GROUP BY t.id, t.name, t.slug, t.description, t.parent_id, pt.name, t.is_active
ORDER BY book_count DESC;

-- =============================================
-- 6. CREATE FTS TABLES
-- =============================================

-- Full-text search for tags
CREATE VIRTUAL TABLE IF NOT EXISTS tags_fts USING fts5(
    name,
    description,
    content='tags',
    content_rowid='id'
);

-- Full-text search for tag translations
CREATE VIRTUAL TABLE IF NOT EXISTS tag_translations_fts USING fts5(
    name,
    description,
    content='tag_translations',
    content_rowid='id'
);

-- =============================================
-- 7. CREATE TRIGGERS
-- =============================================

-- 7.1 Update timestamp on tag update
CREATE TRIGGER IF NOT EXISTS tr_tags_update_timestamp
AFTER UPDATE ON tags
BEGIN
    UPDATE tags SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- 7.2 Update usage count on book_tags insert
CREATE TRIGGER IF NOT EXISTS tr_tags_update_usage_count_insert
AFTER INSERT ON book_tags
BEGIN
    UPDATE tags 
    SET usage_count = (SELECT COUNT(*) FROM book_tags WHERE tag_id = NEW.tag_id)
    WHERE id = NEW.tag_id;
END;

-- 7.3 Update usage count on book_tags delete
CREATE TRIGGER IF NOT EXISTS tr_tags_update_usage_count_delete
AFTER DELETE ON book_tags
BEGIN
    UPDATE tags 
    SET usage_count = (SELECT COUNT(*) FROM book_tags WHERE tag_id = OLD.tag_id)
    WHERE id = OLD.tag_id;
END;

-- 7.4 Validate tag name uniqueness
CREATE TRIGGER IF NOT EXISTS tr_tags_validate_name_unique
BEFORE INSERT ON tags
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM tags WHERE LOWER(name) = LOWER(NEW.name) AND id != NEW.id)
        THEN RAISE(ABORT, 'Tag name must be unique')
    END;
END;

-- 7.5 Validate slug uniqueness
CREATE TRIGGER IF NOT EXISTS tr_tags_validate_slug_unique
BEFORE INSERT ON tags
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM tags WHERE LOWER(slug) = LOWER(NEW.slug) AND id != NEW.id)
        THEN RAISE(ABORT, 'Tag slug must be unique')
    END;
END;

-- 7.6 FTS sync triggers
CREATE TRIGGER IF NOT EXISTS tr_tags_update_fts_insert
AFTER INSERT ON tags
BEGIN
    INSERT INTO tags_fts(rowid, name, description) VALUES (NEW.id, NEW.name, NEW.description);
END;

CREATE TRIGGER IF NOT EXISTS tr_tags_update_fts_update
AFTER UPDATE ON tags
BEGIN
    UPDATE tags_fts SET name = NEW.name, description = NEW.description WHERE rowid = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_tags_update_fts_delete
AFTER DELETE ON tags
BEGIN
    DELETE FROM tags_fts WHERE rowid = OLD.id;
END;

-- =============================================
-- 8. INSERT SEED DATA
-- =============================================

INSERT OR IGNORE INTO tags (id, name, slug, description, parent_id, language_id, sort_order) VALUES
    (1, 'Fiction', 'fiction', 'Imaginative narrative literature', NULL, 1, 1),
    (2, 'Non-Fiction', 'non-fiction', 'Factual and informative content', NULL, 1, 2),
    (3, 'Science Fiction', 'science-fiction', 'Futuristic and scientific themes', 1, 1, 1),
    (4, 'Fantasy', 'fantasy', 'Magical and supernatural themes', 1, 1, 2),
    (5, 'Mystery', 'mystery', 'Suspenseful stories involving crime', 1, 1, 3),
    (6, 'Thriller', 'thriller', 'Exciting and suspenseful plots', 1, 1, 4),
    (7, 'Romance', 'romance', 'Love and relationship stories', 1, 1, 5),
    (8, 'Historical', 'historical', 'Stories set in historical periods', 1, 1, 6),
    (9, 'Biography', 'biography', 'Life stories of real people', 2, 1, 1),
    (10, 'Self-Help', 'self-help', 'Personal development guides', 2, 1, 2),
    (11, 'Technology', 'technology', 'Technical and digital topics', 2, 1, 3),
    (12, 'Science', 'science', 'Scientific concepts and discoveries', 2, 1, 4),
    (13, 'Philosophy', 'philosophy', 'Philosophical ideas and thinkers', 2, 1, 5),
    (14, 'Psychology', 'psychology', 'Human mind and behavior studies', 2, 1, 6),
    (15, 'Art', 'art', 'Visual and performing arts', 2, 1, 7),
    (16, 'History', 'history', 'Historical events and periods', 2, 1, 8),
    (17, 'Politics', 'politics', 'Political systems and ideologies', 2, 1, 9),
    (18, 'Economics', 'economics', 'Economic theories and systems', 2, 1, 10),
    (19, 'Children', 'children', 'Books for children', NULL, 1, 3),
    (20, 'Young Adult', 'young-adult', 'Books for young adult readers', NULL, 1, 4);

-- Insert tag hierarchy
INSERT OR IGNORE INTO tag_hierarchy (parent_id, child_id, level) VALUES
    (1, 3, 1), (1, 4, 1), (1, 5, 1), (1, 6, 1), (1, 7, 1), (1, 8, 1),
    (2, 9, 1), (2, 10, 1), (2, 11, 1), (2, 12, 1), (2, 13, 1), (2, 14, 1),
    (2, 15, 1), (2, 16, 1), (2, 17, 1), (2, 18, 1);

-- Insert tag translations (Hindi)
INSERT OR IGNORE INTO tag_translations (tag_id, language_id, name, description) VALUES
    (1, 2, 'कल्पना', 'काल्पनिक वर्णनात्मक साहित्य'),
    (2, 2, 'गैर-कल्पना', 'तथ्यात्मक और सूचनात्मक सामग्री'),
    (3, 2, 'विज्ञान कथा', 'भविष्य और वैज्ञानिक विषय'),
    (4, 2, 'काल्पनिक', 'जादुई और अलौकिक विषय'),
    (5, 2, 'रहस्य', 'सस्पेंस और अपराध समाधान'),
    (6, 2, 'थ्रिलर', 'रोमांचक और सस्पेंसपूर्ण कथानक'),
    (7, 2, 'रोमांस', 'प्रेम और संबंध कहानियां'),
    (8, 2, 'ऐतिहासिक', 'ऐतिहासिक सेटिंग्स और घटनाएं'),
    (9, 2, 'जीवनी', 'वास्तविक लोगों की जीवन कहानियाँ'),
    (10, 2, 'आत्म-सहायता', 'व्यक्तिगत विकास और सुधार गाइड');

-- =============================================
-- 9. VERIFICATION
-- =============================================

SELECT 'Migration 001 completed successfully!' AS status;
SELECT COUNT(*) AS tags_created FROM tags;
SELECT COUNT(*) AS translations_created FROM tag_translations;
SELECT COUNT(*) AS hierarchy_created FROM tag_hierarchy;