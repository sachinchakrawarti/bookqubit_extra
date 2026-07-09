-- =============================================
-- Table: states
-- Description: Stores state/province data
-- Dependencies: countries
-- =============================================

CREATE TABLE IF NOT EXISTS states (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_native VARCHAR(100),
    country_id INTEGER NOT NULL,
    region_id INTEGER,
    capital VARCHAR(100),
    population BIGINT,
    area_sq_km DECIMAL(15,2),
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);