-- =============================================
-- Indexes for: Geography Tables
-- Description: Performance optimization for geographic data
-- =============================================

-- =============================================
-- 1. CONTINENTS TABLE INDEXES
-- =============================================

-- 1.1 Unique index on continent code
CREATE UNIQUE INDEX IF NOT EXISTS idx_continents_code ON continents(code);

-- 1.2 Index on continent name for searching
CREATE INDEX IF NOT EXISTS idx_continents_name ON continents(name);

-- 1.3 Index on active status for filtering
CREATE INDEX IF NOT EXISTS idx_continents_is_active ON continents(is_active);

-- 1.4 Composite index on active status and sort order
CREATE INDEX IF NOT EXISTS idx_continents_active_sort ON continents(is_active, sort_order);

-- 1.5 Index on population for sorting
CREATE INDEX IF NOT EXISTS idx_continents_population ON continents(population);

-- 1.6 Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_continents_created_at ON continents(created_at);

-- =============================================
-- 2. COUNTRIES TABLE INDEXES
-- =============================================

-- 2.1 Unique index on ISO 2-letter code
CREATE UNIQUE INDEX IF NOT EXISTS idx_countries_code ON countries(code);

-- 2.2 Unique index on ISO 3-letter code
CREATE UNIQUE INDEX IF NOT EXISTS idx_countries_code3 ON countries(code3);

-- 2.3 Index on country name for searching
CREATE INDEX IF NOT EXISTS idx_countries_name ON countries(name);

-- 2.4 Index on continent_id for joins and filtering
CREATE INDEX IF NOT EXISTS idx_countries_continent_id ON countries(continent_id);

-- 2.5 Index on region_id for joins and filtering
CREATE INDEX IF NOT EXISTS idx_countries_region_id ON countries(region_id);

-- 2.6 Index on active status for filtering
CREATE INDEX IF NOT EXISTS idx_countries_is_active ON countries(is_active);

-- 2.7 Composite index on continent_id and is_active
CREATE INDEX IF NOT EXISTS idx_countries_continent_active ON countries(continent_id, is_active);

-- 2.8 Composite index on region_id and is_active
CREATE INDEX IF NOT EXISTS idx_countries_region_active ON countries(region_id, is_active);

-- 2.9 Composite index on active status and sort order
CREATE INDEX IF NOT EXISTS idx_countries_active_sort ON countries(is_active, sort_order);

-- 2.10 Index on population for sorting
CREATE INDEX IF NOT EXISTS idx_countries_population ON countries(population);

-- 2.11 Index on capital city for searching
CREATE INDEX IF NOT EXISTS idx_countries_capital ON countries(capital);

-- 2.12 Index on currency_code for filtering
CREATE INDEX IF NOT EXISTS idx_countries_currency_code ON countries(currency_code);

-- 2.13 Index on phone_code for searching
CREATE INDEX IF NOT EXISTS idx_countries_phone_code ON countries(phone_code);

-- 2.14 Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_countries_created_at ON countries(created_at);

-- =============================================
-- 3. STATES TABLE INDEXES
-- =============================================

-- 3.1 Index on country_id for joins and filtering
CREATE INDEX IF NOT EXISTS idx_states_country_id ON states(country_id);

-- 3.2 Index on region_id for joins and filtering
CREATE INDEX IF NOT EXISTS idx_states_region_id ON states(region_id);

-- 3.3 Index on state name for searching
CREATE INDEX IF NOT EXISTS idx_states_name ON states(name);

-- 3.4 Index on state code for searching
CREATE INDEX IF NOT EXISTS idx_states_code ON states(code);

-- 3.5 Index on active status for filtering
CREATE INDEX IF NOT EXISTS idx_states_is_active ON states(is_active);

-- 3.6 Composite index on country_id and is_active
CREATE INDEX IF NOT EXISTS idx_states_country_active ON states(country_id, is_active);

-- 3.7 Composite index on region_id and is_active
CREATE INDEX IF NOT EXISTS idx_states_region_active ON states(region_id, is_active);

-- 3.8 Composite index on country_id and name
CREATE INDEX IF NOT EXISTS idx_states_country_name ON states(country_id, name);

-- 3.9 Composite index on active status and sort order
CREATE INDEX IF NOT EXISTS idx_states_active_sort ON states(is_active, sort_order);

-- 3.10 Index on population for sorting
CREATE INDEX IF NOT EXISTS idx_states_population ON states(population);

-- 3.11 Index on capital city for searching
CREATE INDEX IF NOT EXISTS idx_states_capital ON states(capital);

-- 3.12 Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_states_created_at ON states(created_at);

-- =============================================
-- 4. REGIONS TABLE INDEXES
-- =============================================

-- 4.1 Unique index on region code
CREATE UNIQUE INDEX IF NOT EXISTS idx_regions_code ON regions(code);

-- 4.2 Index on region name for searching
CREATE INDEX IF NOT EXISTS idx_regions_name ON regions(name);

-- 4.3 Index on continent_id for joins and filtering
CREATE INDEX IF NOT EXISTS idx_regions_continent_id ON regions(continent_id);

-- 4.4 Index on active status for filtering
CREATE INDEX IF NOT EXISTS idx_regions_is_active ON regions(is_active);

-- 4.5 Composite index on continent_id and is_active
CREATE INDEX IF NOT EXISTS idx_regions_continent_active ON regions(continent_id, is_active);

-- 4.6 Composite index on active status and sort order
CREATE INDEX IF NOT EXISTS idx_regions_active_sort ON regions(is_active, sort_order);

-- 4.7 Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_regions_created_at ON regions(created_at);

-- =============================================
-- 5. COMPOSITE INDEXES FOR JOINS
-- =============================================

-- 5.1 Index for joining countries with continents
CREATE INDEX IF NOT EXISTS idx_countries_continent_join ON countries(continent_id, is_active);

-- 5.2 Index for joining countries with regions
CREATE INDEX IF NOT EXISTS idx_countries_region_join ON countries(region_id, is_active);

-- 5.3 Index for joining states with countries
CREATE INDEX IF NOT EXISTS idx_states_country_join ON states(country_id, is_active);

-- 5.4 Index for joining states with regions
CREATE INDEX IF NOT EXISTS idx_states_region_join ON states(region_id, is_active);

-- 5.5 Index for joining regions with continents
CREATE INDEX IF NOT EXISTS idx_regions_continent_join ON regions(continent_id, is_active);

-- =============================================
-- 6. PERFORMANCE OPTIMIZATION INDEXES
-- =============================================

-- 6.1 Index for hierarchical queries
CREATE INDEX IF NOT EXISTS idx_geo_hierarchy_continent ON countries(continent_id, id);
CREATE INDEX IF NOT EXISTS idx_geo_hierarchy_country ON states(country_id, id);
CREATE INDEX IF NOT EXISTS idx_geo_hierarchy_region ON countries(region_id, id);

-- 6.2 Index for full-text search (if using FTS)
-- CREATE VIRTUAL TABLE IF NOT EXISTS geo_fts USING fts5(name, name_native, content='geo_search');

-- 6.3 Index for geo search optimization
CREATE INDEX IF NOT EXISTS idx_geo_search_name ON countries(name, code, code3);
CREATE INDEX IF NOT EXISTS idx_geo_search_state ON states(name, code);