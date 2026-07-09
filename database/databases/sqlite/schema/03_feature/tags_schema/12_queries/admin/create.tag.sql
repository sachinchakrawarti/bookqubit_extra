-- =============================================
-- Admin Query: Create Tag
-- Description: Create a new tag with full details
-- =============================================

-- 1. Basic tag creation
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
    'Science Fiction',                          -- name
    'science-fiction',                          -- slug
    'Futuristic and scientific themes',         -- description
    NULL,                                       -- parent_id
    1,                                          -- language_id
    10,                                         -- sort_order
    1,                                          -- created_by
    CURRENT_TIMESTAMP,                          -- created_at
    CURRENT_TIMESTAMP                           -- updated_at
);

-- 2. Create tag with automatic slug generation
INSERT INTO tags (
    name,
    description,
    parent_id,
    language_id,
    sort_order,
    created_by,
    created_at,
    updated_at
) VALUES (
    'Science Fiction',
    'Futuristic and scientific themes',
    NULL,
    1,
    10,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- 3. Create tag with translations
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
    'Science Fiction',
    'science-fiction',
    'Futuristic and scientific themes',
    NULL,
    1,
    10,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Then insert translations
INSERT INTO tag_translations (
    tag_id,
    language_id,
    name,
    description,
    created_by,
    created_at,
    updated_at
) VALUES 
    (LAST_INSERT_ROWID(), 2, 'विज्ञान कथा', 'भविष्य और वैज्ञानिक विषय', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (LAST_INSERT_ROWID(), 3, 'Ciencia Ficción', 'Temas futuristas y científicos', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4. Create tag with hierarchy
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
    'Hard Science Fiction',
    'hard-science-fiction',
    'Scientifically accurate science fiction',
    3,  -- parent_id (Science Fiction)
    1,
    1,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Add to hierarchy table
INSERT INTO tag_hierarchy (parent_id, child_id, level)
VALUES (3, LAST_INSERT_ROWID(), 1);

-- 5. Create tag with full metadata
INSERT INTO tags (
    name,
    slug,
    description,
    parent_id,
    language_id,
    sort_order,
    meta_title,
    meta_description,
    meta_keywords,
    featured_image,
    icon_class,
    color_code,
    seo_friendly,
    is_featured,
    created_by,
    created_at,
    updated_at
) VALUES (
    'Science Fiction',
    'science-fiction',
    'Futuristic and scientific themes',
    NULL,
    1,
    10,
    'Science Fiction Books - Explore the Future',
    'Discover the best science fiction books, from classic space operas to modern dystopian tales.',
    'science fiction, sci-fi, space, future, technology',
    '/images/tags/science-fiction.jpg',
    'fas fa-rocket',
    '#45B7D1',
    1,
    1,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- 6. Create multiple tags in batch
INSERT INTO tags (name, slug, description, language_id, sort_order, created_by, created_at, updated_at) VALUES
    ('Science Fiction', 'science-fiction', 'Futuristic and scientific themes', 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Fantasy', 'fantasy', 'Magical and supernatural themes', 1, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mystery', 'mystery', 'Suspenseful stories involving crime', 1, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Thriller', 'thriller', 'Exciting and suspenseful plots', 1, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Romance', 'romance', 'Love and relationship stories', 1, 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 7. Create tag with validation check
INSERT OR IGNORE INTO tags (name, slug, description, language_id, sort_order, created_by)
SELECT 
    'Science Fiction',
    'science-fiction',
    'Futuristic and scientific themes',
    1,
    10,
    1
WHERE NOT EXISTS (
    SELECT 1 FROM tags WHERE LOWER(name) = LOWER('Science Fiction')
);

-- 8. Create tag and get ID
INSERT INTO tags (name, slug, description, language_id, sort_order, created_by)
VALUES ('Science Fiction', 'science-fiction', 'Futuristic and scientific themes', 1, 10, 1);

SELECT LAST_INSERT_ROWID() AS new_tag_id;

-- 9. Create tag with parent validation
INSERT INTO tags (name, slug, description, parent_id, language_id, sort_order, created_by)
SELECT 
    'Hard Science Fiction',
    'hard-science-fiction',
    'Scientifically accurate science fiction',
    3,
    1,
    1,
    1
WHERE EXISTS (SELECT 1 FROM tags WHERE id = 3);