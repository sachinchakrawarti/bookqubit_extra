-- ==========================================
-- Table: states
-- Description: State/Province information
-- Schema: 01_core/02_geography_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS states (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_id INTEGER NOT NULL,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    native_name TEXT,
    capital TEXT,
    population INTEGER,
    area_km2 INTEGER,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    UNIQUE(country_id, code)
);

CREATE INDEX idx_states_country ON states(country_id);
CREATE INDEX idx_states_code ON states(code);
CREATE INDEX idx_states_name ON states(name);