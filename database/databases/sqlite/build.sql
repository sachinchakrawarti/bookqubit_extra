-- ============================================================================
-- BookQubit SQLite Build Script
-- File: build.sql
-- Purpose: Build complete Language Schema
-- ============================================================================

PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

-- ============================================================================
-- TABLES
-- ============================================================================

.read schema/language_schema/tables/02.scripts.sql
.read schema/language_schema/tables/01.languages.sql
.read schema/language_schema/tables/03.language_names.sql
.read schema/language_schema/tables/04.language_regions.sql
.read schema/language_schema/tables/05.language_aliases.sql

-- ============================================================================
-- CONSTRAINTS
-- ============================================================================

.read schema/language_schema/constraints/01.languages.constraints.sql
.read schema/language_schema/constraints/02.scripts.constraints.sql
.read schema/language_schema/constraints/03.language_names.constraints.sql
.read schema/language_schema/constraints/04.language_regions.constraints.sql

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

.read schema/language_schema/foreign_keys/01.languages.foreign_keys.sql
.read schema/language_schema/foreign_keys/02.language_names.foreign_keys.sql
.read schema/language_schema/foreign_keys/03.language_regions.foreign_keys.sql
.read schema/language_schema/foreign_keys/04.scripts.foreign_keys.sql

-- ============================================================================
-- INDEXES
-- ============================================================================

.read schema/language_schema/indexes/01.languages.indexes.sql
.read schema/language_schema/indexes/02.language_names.indexes.sql
.read schema/language_schema/indexes/03.language_regions.indexes.sql
.read schema/language_schema/indexes/04.scripts.indexes.sql

-- ============================================================================
-- TRIGGERS
-- ============================================================================

.read schema/language_schema/triggers/01.languages.triggers.sql
.read schema/language_schema/triggers/02.language_names.triggers.sql
.read schema/language_schema/triggers/03.scripts.triggers.sql

-- ============================================================================
-- VIEWS
-- ============================================================================

.read schema/language_schema/views/01.languages.views.sql
.read schema/language_schema/views/02.language_names.views.sql
.read schema/language_schema/views/03.language_lookup.views.sql

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

.read schema/language_schema/samples/01.languages.sample.sql
.read schema/language_schema/samples/02.language_names.sample.sql
.read schema/language_schema/samples/03.scripts.sample.sql

-- ============================================================================
-- SEED DATA
-- ============================================================================

.read schema/language_schema/seed/01.languages.seed.sql
.read schema/language_schema/seed/02.scripts.seed.sql
.read schema/language_schema/seed/03.regions.seed.sql
.read schema/language_schema/seed/04.language_names.seed.sql

-- ============================================================================
-- VALIDATION
-- ============================================================================

.read schema/language_schema/validation/01.languages.validation.sql
.read schema/language_schema/validation/02.language_names.validation.sql

COMMIT;

PRAGMA foreign_keys = ON;