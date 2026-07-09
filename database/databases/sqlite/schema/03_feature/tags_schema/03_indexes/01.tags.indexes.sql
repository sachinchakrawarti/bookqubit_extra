-- =============================================
-- Indexes for: tags table
-- Purpose: Optimize queries for tag lookups, searches, and relationships
-- =============================================

-- Primary key index (automatically created)
-- PRIMARY KEY (id)

-- 1. Unique index on slug (for URL-friendly lookups)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_slug_unique ON tags(slug);

-- 2. Index on name (for searching and sorting)
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);

-- 3. Index on parent_id (for hierarchy queries)
CREATE INDEX IF NOT EXISTS idx_tags_parent_id ON tags(parent_id);

-- 4. Index on language_id (for language filtering)
CREATE INDEX IF NOT EXISTS idx_tags_language_id ON tags(language_id);

-- 5. Index on usage_count (for popularity sorting)
CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON tags(usage_count);

-- 6. Index on is_active (for filtering active tags)
CREATE INDEX IF NOT EXISTS idx_tags_is_active ON tags(is_active);

-- 7. Composite index on is_active + sort_order (for listing)
CREATE INDEX IF NOT EXISTS idx_tags_active_sort ON tags(is_active, sort_order);

-- 8. Composite index on parent_id + is_active (for hierarchy filtering)
CREATE INDEX IF NOT EXISTS idx_tags_parent_active ON tags(parent_id, is_active);

-- 9. Index on created_at (for time-based queries)
CREATE INDEX IF NOT EXISTS idx_tags_created_at ON tags(created_at);

-- 10. Full-text search index on name and description
CREATE VIRTUAL TABLE IF NOT EXISTS tags_fts USING fts5(
    name,
    description,
    content='tags',
    content_rowid='id'
);

-- Trigger to keep FTS index in sync
CREATE TRIGGER IF NOT EXISTS tags_fts_after_insert AFTER INSERT ON tags
BEGIN
    INSERT INTO tags_fts(rowid, name, description)
    VALUES (new.id, new.name, new.description);
END;

CREATE TRIGGER IF NOT EXISTS tags_fts_after_update AFTER UPDATE ON tags
BEGIN
    UPDATE tags_fts
    SET name = new.name,
        description = new.description
    WHERE rowid = new.id;
END;

CREATE TRIGGER IF NOT EXISTS tags_fts_after_delete AFTER DELETE ON tags
BEGIN
    DELETE FROM tags_fts WHERE rowid = old.id;
END;