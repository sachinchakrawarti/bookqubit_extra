-- ============================================================================
-- File: schema_order.sql
-- Schema: language_schema
-- Purpose: Master execution order for complete language schema
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = OFF;

-- ============================================================================
-- TABLES
-- ============================================================================

.read tables/02.scripts.sql
.read tables/01.languages.sql
.read tables/03.language_names.sql
.read tables/04.language_regions.sql
.read tables/05.language_aliases.sql

-- ============================================================================
-- CONSTRAINTS
-- ============================================================================

.read constraints/01.languages.constraints.sql
.read constraints/02.scripts.constraints.sql
.read constraints/03.language_names.constraints.sql
.read constraints/04.language_regions.constraints.sql

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

.read foreign_keys/01.languages.foreign_keys.sql
.read foreign_keys/02.language_names.foreign_keys.sql
.read foreign_keys/03.language_regions.foreign_keys.sql
.read foreign_keys/04.scripts.foreign_keys.sql

-- ============================================================================
-- INDEXES
-- ============================================================================

.read indexes/01.languages.indexes.sql
.read indexes/02.language_names.indexes.sql
.read indexes/03.language_regions.indexes.sql
.read indexes/04.scripts.indexes.sql

-- ============================================================================
-- TRIGGERS
-- ============================================================================

.read triggers/01.languages.triggers.sql
.read triggers/02.language_names.triggers.sql
.read triggers/03.scripts.triggers.sql

-- ============================================================================
-- VIEWS
-- ============================================================================

.read views/01.languages.views.sql
.read views/02.language_names.views.sql
.read views/03.language_lookup.views.sql

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

.read samples/01.languages.sample.sql
.read samples/02.language_names.sample.sql
.read samples/03.scripts.sample.sql

-- ============================================================================
-- SEED DATA
-- ============================================================================

.read seed/01.languages.seed.sql
.read seed/02.scripts.seed.sql
.read seed/03.regions.seed.sql
.read seed/04.language_names.seed.sql

-- ============================================================================
-- MIGRATIONS
-- ============================================================================

.read migrations/001_initial_languages.sql
.read migrations/002_add_scripts.sql
.read migrations/003_add_regions.sql
.read migrations/004_add_native_names.sql

-- ============================================================================
-- VALIDATION
-- ============================================================================

.read validation/01.languages.validation.sql
.read validation/02.language_names.validation.sql

PRAGMA foreign_keys = ON;