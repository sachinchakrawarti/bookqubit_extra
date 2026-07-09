-- =============================================
-- Table: tags
-- Description: Core tags table for categorizing books and content
-- Dependencies: language_schema (languages table)
-- =============================================

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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for tags table
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_parent_id ON tags(parent_id);
CREATE INDEX IF NOT EXISTS idx_tags_language_id ON tags(language_id);
CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON tags(usage_count);
CREATE INDEX IF NOT EXISTS idx_tags_is_active ON tags(is_active);