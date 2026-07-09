-- =============================================
-- tags_schema - Schema Order
-- Version: 1.2.0
-- =============================================

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;

-- =============================================
-- PHASE 1: TABLES
-- =============================================
.read schema/03_feature/tags_schema/01_tables/01.tags.sql
.read schema/03_feature/tags_schema/01_tables/02.tag_translations.sql
.read schema/03_feature/tags_schema/01_tables/03.book_tags.sql
.read schema/03_feature/tags_schema/01_tables/04.tag_hierarchy.sql

-- =============================================
-- PHASE 2: INDEXES
-- =============================================
.read schema/03_feature/tags_schema/03_indexes/01.tags.indexes.sql
.read schema/03_feature/tags_schema/03_indexes/02.tag_translations.indexes.sql
.read schema/03_feature/tags_schema/03_indexes/03.book_tags.indexes.sql
.read schema/03_feature/tags_schema/03_indexes/04.tag_hierarchy.indexes.sql

-- =============================================
-- PHASE 3: FOREIGN KEYS
-- =============================================
.read schema/03_feature/tags_schema/05_foreign_keys/01.tags.foreign_keys.sql
.read schema/03_feature/tags_schema/05_foreign_keys/02.tag_translations.foreign_keys.sql
.read schema/03_feature/tags_schema/05_foreign_keys/03.book_tags.foreign_keys.sql

-- =============================================
-- PHASE 4: CONSTRAINTS
-- =============================================
.read schema/03_feature/tags_schema/04_constraints/01.tags.constraints.sql
.read schema/03_feature/tags_schema/04_constraints/02.tag_translations.constraints.sql
.read schema/03_feature/tags_schema/04_constraints/03.book_tags.constraints.sql

-- =============================================
-- PHASE 5: VIEWS
-- =============================================
.read schema/03_feature/tags_schema/02_views/01.vw_tags.sql
.read schema/03_feature/tags_schema/02_views/02.vw_tag_hierarchy.sql
.read schema/03_feature/tags_schema/02_views/03.vw_tag_popularity.sql
.read schema/03_feature/tags_schema/02_views/04.vw_tag_usage.sql

-- =============================================
-- PHASE 6: TRIGGERS
-- =============================================
.read schema/03_feature/tags_schema/06_triggers/01.tags.triggers.sql
.read schema/03_feature/tags_schema/06_triggers/02.tag_hierarchy.triggers.sql

-- =============================================
-- PHASE 7: FUNCTIONS
-- =============================================
.read schema/03_feature/tags_schema/07_functions/01.tag.functions.sql
.read schema/03_feature/tags_schema/07_functions/02.tag_hierarchy.functions.sql

-- =============================================
-- PHASE 8: PROCEDURES
-- =============================================
.read schema/03_feature/tags_schema/08_procedures/01.tag.procedures.sql
.read schema/03_feature/tags_schema/08_procedures/02.tag_cleanup.procedures.sql

-- =============================================
-- PHASE 9: SEED DATA
-- =============================================
.read schema/03_feature/tags_schema/09_seed/01.tags.seed.sql
.read schema/03_feature/tags_schema/09_seed/02.tag_translations.seed.sql

-- =============================================
-- PHASE 10: VERIFICATION
-- =============================================
SELECT '✅ tags_schema completed successfully!' AS status;