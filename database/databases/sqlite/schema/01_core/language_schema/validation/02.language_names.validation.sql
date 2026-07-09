-- ============================================================================
-- File: 02.language_names.validation.sql
-- Schema: language_schema
-- Purpose: Validate language_names table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- 1. Duplicate language/display combinations
-- ============================================================================

SELECT
    language_id,
    display_language_id,
    COUNT(*) AS duplicate_count
FROM language_names
GROUP BY language_id, display_language_id
HAVING COUNT(*) > 1;

-- ============================================================================
-- 2. Missing language reference
-- ============================================================================

SELECT
    ln.*
FROM language_names ln
LEFT JOIN languages l
ON ln.language_id = l.language_id
WHERE l.language_id IS NULL;

-- ============================================================================
-- 3. Missing display language reference
-- ============================================================================

SELECT
    ln.*
FROM language_names ln
LEFT JOIN languages l
ON ln.display_language_id = l.language_id
WHERE l.language_id IS NULL;

-- ============================================================================
-- 4. Empty language_name
-- ============================================================================

SELECT *
FROM language_names
WHERE language_name IS NULL
   OR TRIM(language_name) = '';

-- ============================================================================
-- 5. Empty native_name
-- ============================================================================

SELECT *
FROM language_names
WHERE native_name IS NULL
   OR TRIM(native_name) = '';

-- ============================================================================
-- 6. Empty short_name
-- ============================================================================

SELECT *
FROM language_names
WHERE short_name IS NOT NULL
  AND TRIM(short_name) = '';

-- ============================================================================
-- 7. Invalid boolean values
-- ============================================================================

SELECT *
FROM language_names
WHERE is_preferred NOT IN (0,1)
   OR is_official NOT IN (0,1)
   OR is_active NOT IN (0,1);

-- ============================================================================
-- 8. Languages without any display names
-- ============================================================================

SELECT
    l.language_id,
    l.language_name
FROM languages l
LEFT JOIN language_names ln
ON l.language_id = ln.language_id
WHERE ln.language_name_id IS NULL;

-- ============================================================================
-- 9. Multiple preferred names
-- ============================================================================

SELECT
    language_id,
    display_language_id,
    COUNT(*) AS preferred_count
FROM language_names
WHERE is_preferred = 1
GROUP BY language_id, display_language_id
HAVING COUNT(*) > 1;

-- ============================================================================
-- 10. No preferred name
-- ============================================================================

SELECT
    language_id,
    display_language_id
FROM language_names
GROUP BY language_id, display_language_id
HAVING SUM(is_preferred) = 0;

-- ============================================================================
-- 11. Inactive preferred names
-- ============================================================================

SELECT *
FROM language_names
WHERE is_preferred = 1
  AND is_active = 0;

-- ============================================================================
-- 12. Summary
-- ============================================================================

SELECT
    COUNT(*) AS total_names,
    COUNT(DISTINCT language_id) AS languages,
    COUNT(DISTINCT display_language_id) AS display_languages,
    SUM(is_preferred) AS preferred_names,
    SUM(is_official) AS official_names,
    SUM(is_active) AS active_names
FROM language_names;