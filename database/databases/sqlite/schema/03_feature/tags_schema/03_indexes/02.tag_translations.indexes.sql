-- =============================================
-- Indexes for: tag_translations table
-- Purpose: Optimize multilingual tag queries
-- =============================================

-- Primary key index (automatically created)
-- PRIMARY KEY (id)

-- 1. Unique composite index on tag_id + language_id (ensures one translation per language)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tag_translations_tag_lang ON tag_translations(tag_id, language_id);

-- 2. Index on tag_id (for fetching all translations of a tag)
CREATE INDEX IF NOT EXISTS idx_tag_translations_tag_id ON tag_translations(tag_id);

-- 3. Index on language_id (for fetching translations for a language)
CREATE INDEX IF NOT EXISTS idx_tag_translations_language_id ON tag_translations(language_id);

-- 4. Index on translated name (for searching translations)
CREATE INDEX IF NOT EXISTS idx_tag_translations_name ON tag_translations(name);

-- 5. Composite index on language_id + name (for language-specific searches)
CREATE INDEX IF NOT EXISTS idx_tag_translations_lang_name ON tag_translations(language_id, name);

-- 6. Index on created_at (for time-based queries)
CREATE INDEX IF NOT EXISTS idx_tag_translations_created_at ON tag_translations(created_at);

-- 7. Full-text search index on translated name and description
CREATE VIRTUAL TABLE IF NOT EXISTS tag_translations_fts USING fts5(
    name,
    description,
    content='tag_translations',
    content_rowid='id'
);

-- Trigger to keep FTS index in sync
CREATE TRIGGER IF NOT EXISTS tag_translations_fts_after_insert AFTER INSERT ON tag_translations
BEGIN
    INSERT INTO tag_translations_fts(rowid, name, description)
    VALUES (new.id, new.name, new.description);
END;

CREATE TRIGGER IF NOT EXISTS tag_translations_fts_after_update AFTER UPDATE ON tag_translations
BEGIN
    UPDATE tag_translations_fts
    SET name = new.name,
        description = new.description
    WHERE rowid = new.id;
END;

CREATE TRIGGER IF NOT EXISTS tag_translations_fts_after_delete AFTER DELETE ON tag_translations
BEGIN
    DELETE FROM tag_translations_fts WHERE rowid = old.id;
END;