-- ==========================================
-- Table: country_codes
-- Description: Country code standards reference
-- Schema: 01_core/02_geography_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS country_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_id INTEGER NOT NULL,
    standard TEXT NOT NULL,
    code TEXT NOT NULL,
    is_preferred BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    UNIQUE(standard, code)
);

CREATE INDEX idx_country_codes_standard ON country_codes(standard, code);
CREATE INDEX idx_country_codes_country ON country_codes(country_id);
CREATE INDEX idx_country_codes_preferred ON country_codes(is_preferred);