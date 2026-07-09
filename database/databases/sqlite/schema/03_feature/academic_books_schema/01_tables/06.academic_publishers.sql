-- =============================================
-- Table: academic_publishers
-- Description: Academic publishers information
-- Dependencies: geography_schema (countries)
-- =============================================

CREATE TABLE IF NOT EXISTS academic_publishers (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Publisher Information
    name VARCHAR(200) NOT NULL,
    name_native VARCHAR(200),
    abbreviation VARCHAR(50),
    
    -- Contact Information
    website VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(50),
    address TEXT,
    
    -- Location
    country_id INTEGER,
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL
);

-- =============================================
-- Indexes for academic_publishers
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_publishers_name ON academic_publishers(name);
CREATE INDEX IF NOT EXISTS idx_academic_publishers_abbreviation ON academic_publishers(abbreviation);
CREATE INDEX IF NOT EXISTS idx_academic_publishers_country_id ON academic_publishers(country_id);
CREATE INDEX IF NOT EXISTS idx_academic_publishers_is_active ON academic_publishers(is_active);