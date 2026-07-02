-- =====================================================
-- BookQubit Geography Schema
-- Table: continents
-- Description: Master list of world continents
-- =====================================================

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS continents (

    continent_id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- ISO / Internal Code
    code TEXT NOT NULL UNIQUE,

    -- English Name (Canonical)
    name TEXT NOT NULL UNIQUE,

    -- Scientific / Official Name
    official_name TEXT,

    -- Display Order
    sort_order INTEGER DEFAULT 0,

    -- Geographic Data
    area_sq_km REAL,

    population BIGINT,

    country_count INTEGER DEFAULT 0,

    -- Coordinates (Center Point)
    latitude REAL,

    longitude REAL,

    -- Status
    is_active INTEGER NOT NULL DEFAULT 1
        CHECK(is_active IN (0,1)),

    -- Metadata
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
