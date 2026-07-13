-- ==========================================
-- Table: continents
-- Description: Continent information
-- Schema: 01_core/02_geography_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS continents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_continents_code ON continents(code);