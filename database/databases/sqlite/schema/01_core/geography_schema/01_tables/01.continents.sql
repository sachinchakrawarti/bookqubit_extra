-- =============================================
-- Table: continents
-- Description: Stores continent master data
-- Dependencies: None
-- =============================================

CREATE TABLE IF NOT EXISTS continents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(2) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    name_native VARCHAR(100),
    population BIGINT,
    area_sq_km DECIMAL(15,2),
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);