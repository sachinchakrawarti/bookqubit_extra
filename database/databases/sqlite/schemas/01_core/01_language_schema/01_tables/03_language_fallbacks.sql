-- ==========================================
-- Table: language_fallbacks
-- Description: Defines fallback language chains
-- Schema: 01_core/01_language_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS language_fallbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_id INTEGER NOT NULL,
    fallback_language_id INTEGER NOT NULL,
    priority INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    FOREIGN KEY (fallback_language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE(language_id, fallback_language_id)
);

CREATE INDEX idx_language_fallbacks_language ON language_fallbacks(language_id);
CREATE INDEX idx_language_fallbacks_fallback ON language_fallbacks(fallback_language_id);
CREATE INDEX idx_language_fallbacks_priority ON language_fallbacks(priority);

COMMENT ON TABLE language_fallbacks IS 'Defines fallback language chains';
COMMENT ON COLUMN language_fallbacks.id IS 'Unique identifier';
COMMENT ON COLUMN language_fallbacks.language_id IS 'Primary language ID';
COMMENT ON COLUMN language_fallbacks.fallback_language_id IS 'Fallback language ID';
COMMENT ON COLUMN language_fallbacks.priority IS 'Priority order (lower = higher priority)';
COMMENT ON COLUMN language_fallbacks.created_at IS 'Creation timestamp';
COMMENT ON COLUMN language_fallbacks.updated_at IS 'Last update timestamp';
COMMENT ON COLUMN language_fallbacks.deleted_at IS 'Soft delete timestamp';