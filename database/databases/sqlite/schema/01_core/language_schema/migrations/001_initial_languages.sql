-- ============================================================================
-- File: 001_initial_languages.sql
-- Schema: language_schema
-- Migration: Initial Language Schema
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys =OFF;

BEGIN TRANSACTION;

-- ============================================================================
-- LANGUAGES
-- ============================================================================

.read ../tables/01.languages.sql

-- ============================================================================
-- SCRIPTS
-- ============================================================================

.read ../tables/02.scripts.sql

-- ============================================================================
-- LANGUAGE NAMES
-- ============================================================================

.read ../tables/03.language_names.sql

-- ============================================================================
-- LANGUAGE REGIONS
-- ============================================================================

.read ../tables/04.language_regions.sql

-- ============================================================================
-- CONSTRAINTS
-- ============================================================================

.read ../constraints/01.languages.constraints.sql
.read ../constraints/02.scripts.constraints.sql
.read ../constraints/03.language_names.constraints.sql
.read ../constraints/04.language_regions.constraints.sql

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

.read ../foreign_keys/01.languages.foreign_keys.sql
.read ../foreign_keys/02.language_names.foreign_keys.sql
.read ../foreign_keys/03.language_regions.foreign_keys.sql
.read ../foreign_keys/04.scripts.foreign_keys.sql

-- ============================================================================
-- INDEXES
-- ============================================================================

.read ../indexes/01.languages.indexes.sql
.read ../indexes/02.language_names.indexes.sql
.read ../indexes/03.language_regions.indexes.sql
.read ../indexes/04.scripts.indexes.sql

-- ============================================================================
-- TRIGGERS
-- ============================================================================

.read ../triggers/01.languages.triggers.sql
.read ../triggers/02.scripts.triggers.sql
.read ../triggers/03.language_names.triggers.sql
.read ../triggers/04.language_regions.triggers.sql

-- ============================================================================
-- VIEWS
-- ============================================================================

.read ../views/01.languages.views.sql
.read ../views/02.language_names.views.sql
.read ../views/03.language_regions.views.sql
.read ../views/04.scripts.views.sql

-- ============================================================================
-- SEED DATA
-- ============================================================================

.read ../seed/01.languages.seed.sql
.read ../seed/02.scripts.seed.sql
.read ../seed/03.language_names.seed.sql
.read ../seed/04.language_regions.seed.sql

COMMIT;

PRAGMA foreign_keys =ON;

-- ============================================================================
-- End of Migration
-- ============================================================================