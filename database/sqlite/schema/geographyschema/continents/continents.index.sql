-- ============================================================
-- BookQubit Database
-- Schema      : Geography
-- Module      : Continents
-- File        : continents.index.sql
-- Description : Indexes for continents table
-- Version     : 1.0.0
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============================================================
-- PRIMARY LOOKUP
-- ============================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_continents_code
ON continents(code);

CREATE UNIQUE INDEX IF NOT EXISTS idx_continents_name
ON continents(name);

-- ============================================================
-- SORTING
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continents_sort_order
ON continents(sort_order);

-- ============================================================
-- STATUS
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continents_active
ON continents(is_active);

-- ============================================================
-- GEOGRAPHIC DATA
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continents_area
ON continents(area_sq_km);

CREATE INDEX IF NOT EXISTS idx_continents_population
ON continents(population);

CREATE INDEX IF NOT EXISTS idx_continents_country_count
ON continents(country_count);

-- ============================================================
-- LOCATION
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continents_coordinates
ON continents(latitude, longitude);

-- ============================================================
-- AUDIT
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continents_created_at
ON continents(created_at);

CREATE INDEX IF NOT EXISTS idx_continents_updated_at
ON continents(updated_at);

-- ============================================================
-- NOTES
-- ============================================================
--
-- Optimized Queries
--
-- ✔ Find continent by code
-- ✔ Find continent by English name
-- ✔ List active continents
-- ✔ Sort continents
-- ✔ Geographic lookups
-- ✔ Analytics & reporting
--
-- Example Queries
--
-- SELECT * FROM continents
-- WHERE code = 'AS';
--
-- SELECT * FROM continents
-- WHERE name = 'Asia';
--
-- SELECT * FROM continents
-- WHERE is_active = 1
-- ORDER BY sort_order;
--
-- SELECT *
-- FROM continents
-- ORDER BY population DESC;
--
-- SELECT *
-- FROM continents
-- ORDER BY area_sq_km DESC;
--
-- ============================================================