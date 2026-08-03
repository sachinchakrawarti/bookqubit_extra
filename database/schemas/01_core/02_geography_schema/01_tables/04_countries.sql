-- ==========================================
-- Table: countries
-- Description: Country information
-- Schema: 01_core/02_geography_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    native_name TEXT,
    capital TEXT,
    region_id INTEGER,
    subregion_id INTEGER,
    continent_id INTEGER,
    population INTEGER,
    area_km2 INTEGER,
    currency_code TEXT,
    phone_code TEXT,
    tld TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE SET NULL,
    FOREIGN KEY (subregion_id) REFERENCES subregions(id) ON DELETE SET NULL,
    FOREIGN KEY (continent_id) REFERENCES continents(id) ON DELETE SET NULL
);

CREATE INDEX idx_countries_code ON countries(code);
CREATE INDEX idx_countries_name ON countries(name);
CREATE INDEX idx_countries_region ON countries(region_id);
CREATE INDEX idx_countries_continent ON countries(continent_id);