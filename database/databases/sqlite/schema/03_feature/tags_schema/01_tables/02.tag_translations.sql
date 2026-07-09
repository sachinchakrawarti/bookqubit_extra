-- =============================================
-- Table: tag_translations
-- Description: Multilingual translations for tags
-- Dependencies: tags, language_schema (languages)
-- =============================================

CREATE TABLE IF NOT EXISTS tag_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tag_id, language_id)
);

-- Indexes for tag_translations table
CREATE INDEX IF NOT EXISTS idx_tag_translations_tag_id ON tag_translations(tag_id);
CREATE INDEX IF NOT EXISTS idx_tag_translations_language_id ON tag_translations(language_id);
CREATE INDEX IF NOT EXISTS idx_tag_translations_name ON tag_translations(name);