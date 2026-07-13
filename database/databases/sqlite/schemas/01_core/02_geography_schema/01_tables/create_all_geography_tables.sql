-- ==========================================
-- Create All Geography Tables
-- ==========================================

PRAGMA foreign_keys = ON;

-- Read all table files
.read 01_tables/01_continents.sql
.read 01_tables/02_regions.sql
.read 01_tables/03_subregions.sql
.read 01_tables/04_countries.sql
.read 01_tables/05_states.sql
.read 01_tables/06_cities.sql
.read 01_tables/07_timezones.sql
.read 01_tables/08_currencies.sql
.read 01_tables/09_country_codes.sql

-- Verification
SELECT 'All geography tables created!' AS status;
SELECT name FROM sqlite_master WHERE type='table' AND name IN ('continents', 'regions', 'subregions', 'countries', 'states', 'cities', 'timezones', 'currencies', 'country_codes');