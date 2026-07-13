-- ==========================================
-- Table: regions
-- Description: Region information
-- Schema: 01_core/02_geography_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS regions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    continent_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (continent_id) REFERENCES continents(id) ON DELETE CASCADE
);

CREATE INDEX idx_regions_continent ON regions(continent_id);