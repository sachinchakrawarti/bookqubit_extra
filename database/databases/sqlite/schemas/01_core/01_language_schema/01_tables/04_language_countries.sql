-- ==========================================
-- Table: language_countries
-- Description: Maps languages to countries where they are spoken
-- Schema: 01_core/01_language_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS language_countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language_id INTEGER NOT NULL,
    country_id INTEGER NOT NULL,
    is_official BOOLEAN DEFAULT 0,
    is_primary BOOLEAN DEFAULT 0,
    population_percentage DECIMAL(5, 2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    UNIQUE(language_id, country_id)
);

CREATE INDEX idx_language_countries_language ON language_countries(language_id);
CREATE INDEX idx_language_countries_country ON language_countries(country_id);
CREATE INDEX idx_language_countries_official ON language_countries(is_official);
CREATE INDEX idx_language_countries_primary ON language_countries(is_primary);

COMMENT ON TABLE language_countries IS 'Maps languages to countries where they are spoken';
COMMENT ON COLUMN language_countries.id IS 'Unique identifier';
COMMENT ON COLUMN language_countries.language_id IS 'Reference to the language';
COMMENT ON COLUMN language_countries.country_id IS 'Reference to the country';
COMMENT ON COLUMN language_countries.is_official IS 'Whether the language is official in the country';
COMMENT ON COLUMN language_countries.is_primary IS 'Whether the language is primary in the country';
COMMENT ON COLUMN language_countries.population_percentage IS 'Percentage of population speaking the language';
COMMENT ON COLUMN language_countries.created_at IS 'Creation timestamp';
COMMENT ON COLUMN language_countries.updated_at IS 'Last update timestamp';
COMMENT ON COLUMN language_countries.deleted_at IS 'Soft delete timestamp';