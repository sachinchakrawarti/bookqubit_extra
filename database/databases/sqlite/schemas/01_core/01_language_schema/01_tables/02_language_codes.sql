-- ==========================================
-- Table: language_codes
-- Description: Reference table for language code standards
-- Schema: 01_core/01_language_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS language_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_id INTEGER NOT NULL,
    standard TEXT NOT NULL,
    code TEXT NOT NULL,
    is_preferred BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE(standard, code)
);

CREATE INDEX idx_language_codes_standard ON language_codes(standard, code);
CREATE INDEX idx_language_codes_language ON language_codes(language_id);
CREATE INDEX idx_language_codes_preferred ON language_codes(is_preferred);

COMMENT ON TABLE language_codes IS 'Reference table for language code standards';
COMMENT ON COLUMN language_codes.id IS 'Unique identifier';
COMMENT ON COLUMN language_codes.language_id IS 'Reference to the language';
COMMENT ON COLUMN language_codes.standard IS 'Code standard (ISO-639-1, ISO-639-2, RFC-5646)';
COMMENT ON COLUMN language_codes.code IS 'Code value for the standard';
COMMENT ON COLUMN language_codes.is_preferred IS 'Whether this is the preferred code';
COMMENT ON COLUMN language_codes.created_at IS 'Creation timestamp';
COMMENT ON COLUMN language_codes.updated_at IS 'Last update timestamp';
COMMENT ON COLUMN language_codes.deleted_at IS 'Soft delete timestamp';