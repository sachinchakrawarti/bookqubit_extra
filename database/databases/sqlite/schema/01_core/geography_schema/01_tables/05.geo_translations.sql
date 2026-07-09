-- =============================================
-- Table: geo_translations
-- Description: Multilingual translations for geography
-- Dependencies: continents, countries, states, regions
-- =============================================

CREATE TABLE IF NOT EXISTS geo_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type VARCHAR(20) NOT NULL,
    entity_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entity_type, entity_id, language_id)
);