-- ============================================================================
-- File: 03.language_regions.indexes.sql
-- Schema: language_schema
-- Table : language_regions
-- Purpose: Performance indexes for language_regions
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- UNIQUE INDEX
-- ============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_language_regions_unique
ON language_regions(
    language_id,
    country_id
);

-- ============================================================================
-- FOREIGN KEY INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_regions_language
ON language_regions(language_id);

CREATE INDEX IF NOT EXISTS idx_language_regions_country
ON language_regions(country_id);

-- ============================================================================
-- REGION TYPE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_regions_type
ON language_regions(region_type);

-- ============================================================================
-- STATUS INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_regions_active
ON language_regions(is_active);

CREATE INDEX IF NOT EXISTS idx_language_regions_official
ON language_regions(is_official);

CREATE INDEX IF NOT EXISTS idx_language_regions_primary
ON language_regions(is_primary);

-- ============================================================================
-- SORTING
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_regions_sort
ON language_regions(sort_order);

-- ============================================================================
-- COMPOSITE INDEXES
-- ============================================================================

-- Languages by country
CREATE INDEX IF NOT EXISTS idx_language_regions_country_active
ON language_regions(
    country_id,
    is_active
);

-- Countries by language
CREATE INDEX IF NOT EXISTS idx_language_regions_language_active
ON language_regions(
    language_id,
    is_active
);

-- Official languages of a country
CREATE INDEX IF NOT EXISTS idx_language_regions_country_official
ON language_regions(
    country_id,
    is_official
);

-- Primary language of a country
CREATE INDEX IF NOT EXISTS idx_language_regions_country_primary
ON language_regions(
    country_id,
    is_primary
);

-- Active official languages
CREATE INDEX IF NOT EXISTS idx_language_regions_active_official
ON language_regions(
    is_active,
    is_official
);

-- Region type filtering
CREATE INDEX IF NOT EXISTS idx_language_regions_type_active
ON language_regions(
    region_type,
    is_active
);

-- ============================================================================
-- TIMESTAMP INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_language_regions_created_at
ON language_regions(created_at);

CREATE INDEX IF NOT EXISTS idx_language_regions_updated_at
ON language_regions(updated_at);

-- ============================================================================
-- END OF FILE
-- ============================================================================