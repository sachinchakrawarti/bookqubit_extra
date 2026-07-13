-- ==========================================
-- Table: cities
-- Description: City information
-- Schema: 01_core/02_geography_schema
-- ==========================================

CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    state_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    native_name TEXT,
    population INTEGER,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone_id INTEGER,
    postal_code TEXT,
    is_capital BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
    FOREIGN KEY (timezone_id) REFERENCES timezones(id) ON DELETE SET NULL
);

CREATE INDEX idx_cities_state ON cities(state_id);
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_coordinates ON cities(latitude, longitude);