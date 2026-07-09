-- =============================================
-- tags_schema - Schema Order
-- Version: 1.2.0
-- Description: Execution order for all schema objects
-- Dependencies: language_schema, book_schema
-- =============================================

-- =============================================
-- IMPORTANT: Enable foreign key constraints
-- =============================================
PRAGMA foreign_keys = ON;

-- =============================================
-- PHASE 1: TABLES
-- =============================================
-- Tables must be created first
-- Order matters for foreign key references

\include 01_tables/01.tags.sql
\include 01_tables/02.tag_translations.sql
\include 01_tables/03.book_tags.sql
\include 01_tables/04.tag_hierarchy.sql

-- =============================================
-- PHASE 2: INDEXES
-- =============================================
-- Create indexes after tables exist

\include 03_indexes/01.tags.indexes.sql
\include 03_indexes/02.tag_translations.indexes.sql
\include 03_indexes/03.book_tags.indexes.sql
\include 03_indexes/04.tag_hierarchy.indexes.sql

-- =============================================
-- PHASE 3: FOREIGN KEYS
-- =============================================
-- Add foreign key constraints after tables and indexes

\include 05_foreign_keys/01.tags.foreign_keys.sql
\include 05_foreign_keys/02.tag_translations.foreign_keys.sql
\include 05_foreign_keys/03.book_tags.foreign_keys.sql
-- Note: tag_hierarchy foreign keys are included in 01.tags.foreign_keys.sql

-- =============================================
-- PHASE 4: CONSTRAINTS
-- =============================================
-- Add check constraints after foreign keys

\include 04_constraints/01.tags.constraints.sql
\include 04_constraints/02.tag_translations.constraints.sql
\include 04_constraints/03.book_tags.constraints.sql

-- =============================================
-- PHASE 5: VIEWS
-- =============================================
-- Create views after tables and constraints

\include 02_views/01.vw_tags.sql
\include 02_views/02.vw_tag_hierarchy.sql
\include 02_views/03.vw_tag_popularity.sql
\include 02_views/04.vw_tag_usage.sql

-- =============================================
-- PHASE 6: TRIGGERS
-- =============================================
-- Create triggers after tables and views

\include 06_triggers/01.tags.triggers.sql
\include 06_triggers/02.tag_hierarchy.triggers.sql

-- =============================================
-- PHASE 7: FUNCTIONS
-- =============================================
-- Create functions after tables

\include 07_functions/01.tag.functions.sql
\include 07_functions/02.tag_hierarchy.functions.sql

-- =============================================
-- PHASE 8: PROCEDURES
-- =============================================
-- Create procedures after functions

\include 08_procedures/01.tag.procedures.sql
\include 08_procedures/02.tag_cleanup.procedures.sql

-- =============================================
-- PHASE 9: SEED DATA
-- =============================================
-- Insert seed data after all objects are created

\include 09_seed/01.tags.seed.sql
\include 09_seed/02.tag_translations.seed.sql

-- =============================================
-- PHASE 10: VERIFICATION
-- =============================================
-- Verify all objects are created successfully

SELECT '===== TAGS SCHEMA VERIFICATION =====' AS status;

-- Check tables
SELECT 'TABLES' AS object_type, name 
FROM sqlite_master 
WHERE type = 'table' 
AND name LIKE '%tag%' 
ORDER BY name;

-- Check views
SELECT 'VIEWS' AS object_type, name 
FROM sqlite_master 
WHERE type = 'view' 
AND name LIKE '%tag%' 
ORDER BY name;

-- Check indexes
SELECT 'INDEXES' AS object_type, name 
FROM sqlite_master 
WHERE type = 'index' 
AND name LIKE '%tag%' 
ORDER BY name;

-- Check triggers
SELECT 'TRIGGERS' AS object_type, name 
FROM sqlite_master 
WHERE type = 'trigger' 
AND name LIKE '%tag%' 
ORDER BY name;

-- Check data counts
SELECT 
    (SELECT COUNT(*) FROM tags) AS tag_count,
    (SELECT COUNT(*) FROM tag_translations) AS translation_count,
    (SELECT COUNT(*) FROM book_tags) AS book_tag_count,
    (SELECT COUNT(*) FROM tag_hierarchy) AS hierarchy_count;

-- Check seed data
SELECT 'SEED DATA' AS status;
SELECT * FROM tags WHERE id <= 20 ORDER BY id;
SELECT * FROM tag_translations WHERE tag_id <= 20 ORDER BY tag_id, language_id;

-- Final status
SELECT '✅ tags_schema completed successfully!' AS status;
SELECT 'Version: 1.2.0' AS version;
SELECT 'Date: ' || datetime('now') AS completion_date;