-- ==========================================
-- Table: languages
-- Description: Core table for supported languages
-- Schema: 01_core/01_language_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    native_name TEXT,
    script TEXT DEFAULT 'Latn',
    direction TEXT DEFAULT 'ltr' CHECK (direction IN ('ltr', 'rtl')),
    is_active BOOLEAN DEFAULT 1,
    is_rtl BOOLEAN DEFAULT 0,
    fallback_language_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (fallback_language_id) REFERENCES languages(id) ON DELETE SET NULL
);

CREATE INDEX idx_languages_code ON languages(code);
CREATE INDEX idx_languages_name ON languages(name);
CREATE INDEX idx_languages_active ON languages(is_active);

COMMENT ON TABLE languages IS 'Core table for supported languages';
COMMENT ON COLUMN languages.id IS 'Unique identifier for the language';
COMMENT ON COLUMN languages.code IS 'ISO 639-1 language code (e.g., en, es, fr)';
COMMENT ON COLUMN languages.name IS 'Full language name in English';
COMMENT ON COLUMN languages.native_name IS 'Language name in its own script';
COMMENT ON COLUMN languages.script IS 'Script used for the language (ISO 15924)';
COMMENT ON COLUMN languages.direction IS 'Text direction (ltr or rtl)';
COMMENT ON COLUMN languages.is_active IS 'Whether the language is actively used';
COMMENT ON COLUMN languages.is_rtl IS 'Whether the language is right-to-left';
COMMENT ON COLUMN languages.fallback_language_id IS 'Fallback language ID';
COMMENT ON COLUMN languages.created_at IS 'Creation timestamp';
COMMENT ON COLUMN languages.updated_at IS 'Last update timestamp';
COMMENT ON COLUMN languages.deleted_at IS 'Soft delete timestamp';