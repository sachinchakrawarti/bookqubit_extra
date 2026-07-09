-- =============================================
-- Table: countries
-- Description: Stores country master data
-- Dependencies: continents
-- =============================================

CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(2) NOT NULL UNIQUE,
    code3 VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    name_native VARCHAR(100),
    capital VARCHAR(100),
    continent_id INTEGER,
    region_id INTEGER,
    population BIGINT,
    area_sq_km DECIMAL(15,2),
    phone_code VARCHAR(10),
    currency_code VARCHAR(3),
    currency_name VARCHAR(50),
    iso_numeric INTEGER,
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);