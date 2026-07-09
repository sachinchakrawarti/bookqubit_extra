-- =============================================
-- Indexes for: geo_translations Table
-- Description: Performance optimization for multilingual support
-- =============================================

-- =============================================
-- 1. UNIQUE INDEXES
-- =============================================

-- 1.1 Unique composite index on entity_type, entity_id, language_id
-- Prevents duplicate translations for the same entity and language
CREATE UNIQUE INDEX IF NOT EXISTS idx_geo_translations_unique 
ON geo_translations(entity_type, entity_id, language_id);

-- =============================================
-- 2. SINGLE COLUMN INDEXES
-- =============================================

-- 2.1 Index on entity_type for filtering by type
CREATE INDEX IF NOT EXISTS idx_geo_translations_entity_type 
ON geo_translations(entity_type);

-- 2.2 Index on entity_id for finding translations of a specific entity
CREATE INDEX IF NOT EXISTS idx_geo_translations_entity_id 
ON geo_translations(entity_id);

-- 2.3 Index on language_id for filtering by language
CREATE INDEX IF NOT EXISTS idx_geo_translations_language_id 
ON geo_translations(language_id);

-- 2.4 Index on translated name for searching
CREATE INDEX IF NOT EXISTS idx_geo_translations_name 
ON geo_translations(name);

-- 2.5 Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_geo_translations_created_at 
ON geo_translations(created_at);

-- =============================================
-- 3. COMPOSITE INDEXES
-- =============================================

-- 3.1 Composite index on entity_type and entity_id
-- Optimizes queries for all translations of a specific entity
CREATE INDEX IF NOT EXISTS idx_geo_translations_entity 
ON geo_translations(entity_type, entity_id);

-- 3.2 Composite index on entity_type and language_id
-- Optimizes queries for translations of a specific type in a language
CREATE INDEX IF NOT EXISTS idx_geo_translations_type_language 
ON geo_translations(entity_type, language_id);

-- 3.3 Composite index on language_id and name
-- Optimizes searches for translated names in a specific language
CREATE INDEX IF NOT EXISTS idx_geo_translations_lang_name 
ON geo_translations(language_id, name);

-- 3.4 Composite index on entity_type, language_id, and name
-- Optimizes searches for entities by type and language
CREATE INDEX IF NOT EXISTS idx_geo_translations_type_lang_name 
ON geo_translations(entity_type, language_id, name);

-- =============================================
-- 4. JOIN OPTIMIZATION INDEXES
-- =============================================

-- 4.1 Index for joining translations with continents
CREATE INDEX IF NOT EXISTS idx_geo_translations_continent_join 
ON geo_translations(entity_id) 
WHERE entity_type = 'continent';

-- 4.2 Index for joining translations with countries
CREATE INDEX IF NOT EXISTS idx_geo_translations_country_join 
ON geo_translations(entity_id) 
WHERE entity_type = 'country';

-- 4.3 Index for joining translations with states
CREATE INDEX IF NOT EXISTS idx_geo_translations_state_join 
ON geo_translations(entity_id) 
WHERE entity_type = 'state';

-- 4.4 Index for joining translations with regions
CREATE INDEX IF NOT EXISTS idx_geo_translations_region_join 
ON geo_translations(entity_id) 
WHERE entity_type = 'region';

-- =============================================
-- 5. FULL-TEXT SEARCH INDEXES
-- =============================================

-- 5.1 Virtual FTS table for translations
-- Note: Requires FTS5 extension
-- CREATE VIRTUAL TABLE IF NOT EXISTS geo_translations_fts USING fts5(
--     name,
--     description,
--     content='geo_translations',
--     content_rowid='id'
-- );

-- 5.2 Triggers to keep FTS in sync (if using FTS)
-- CREATE TRIGGER IF NOT EXISTS tr_geo_translations_fts_insert AFTER INSERT ON geo_translations
-- BEGIN
--     INSERT INTO geo_translations_fts(rowid, name, description)
--     VALUES (new.id, new.name, new.description);
-- END;

-- CREATE TRIGGER IF NOT EXISTS tr_geo_translations_fts_update AFTER UPDATE ON geo_translations
-- BEGIN
--     UPDATE geo_translations_fts
--     SET name = new.name,
--         description = new.description
--     WHERE rowid = new.id;
-- END;

-- CREATE TRIGGER IF NOT EXISTS tr_geo_translations_fts_delete AFTER DELETE ON geo_translations
-- BEGIN
--     DELETE FROM geo_translations_fts WHERE rowid = old.id;
-- END;

-- =============================================
-- 6. PERFORMANCE MONITORING
-- =============================================

-- 6.1 Analyze indexes for performance
ANALYZE;

-- 6.2 Check index usage
-- SELECT * FROM sqlite_stat1 WHERE tbl LIKE 'geo%';