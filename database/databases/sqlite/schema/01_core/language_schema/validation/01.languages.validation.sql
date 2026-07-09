-- ============================================================================
-- File: 01.languages.validation.sql
-- Schema: language_schema
-- Purpose: Validate languages table data
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- 1. Duplicate language_code
-- ============================================================================

SELECT
    language_code,
    COUNT(*) AS duplicate_count
FROM languages
GROUP BY language_code
HAVING COUNT(*) > 1;

-- ============================================================================
-- 2. Duplicate ISO639-1
-- ============================================================================

SELECT
    iso_639_1,
    COUNT(*) AS duplicate_count
FROM languages
WHERE iso_639_1 IS NOT NULL
GROUP BY iso_639_1
HAVING COUNT(*) > 1;

-- ============================================================================
-- 3. Duplicate ISO639-2
-- ============================================================================

SELECT
    iso_639_2,
    COUNT(*) AS duplicate_count
FROM languages
WHERE iso_639_2 IS NOT NULL
GROUP BY iso_639_2
HAVING COUNT(*) > 1;

-- ============================================================================
-- 4. Duplicate ISO639-3
-- ============================================================================

SELECT
    iso_639_3,
    COUNT(*) AS duplicate_count
FROM languages
WHERE iso_639_3 IS NOT NULL
GROUP BY iso_639_3
HAVING COUNT(*) > 1;

-- ============================================================================
-- 5. Missing language names
-- ============================================================================

SELECT *
FROM languages
WHERE TRIM(language_name) = ''
   OR TRIM(english_name) = ''
   OR TRIM(native_name) = '';

-- ============================================================================
-- 6. Invalid direction
-- ============================================================================

SELECT *
FROM languages
WHERE direction NOT IN ('LTR','RTL');

-- ============================================================================
-- 7. Invalid locale_code format
-- ============================================================================

SELECT *
FROM languages
WHERE locale_code IS NOT NULL
  AND locale_code NOT GLOB '[a-z][a-z]-[A-Z][A-Z]';

-- ============================================================================
-- 8. Missing script reference
-- ============================================================================

SELECT
    l.language_id,
    l.language_name,
    l.default_script_id
FROM languages l
LEFT JOIN scripts s
ON l.default_script_id = s.script_id
WHERE s.script_id IS NULL;

-- ============================================================================
-- 9. More than one default language
-- ============================================================================

SELECT
    COUNT(*) AS default_languages
FROM languages
WHERE is_default = 1
HAVING COUNT(*) <> 1;

-- ============================================================================
-- 10. Invalid boolean values
-- ============================================================================

SELECT *
FROM languages
WHERE is_default NOT IN (0,1)
   OR is_active NOT IN (0,1);

-- ============================================================================
-- 11. Invalid sort_order
-- ============================================================================

SELECT *
FROM languages
WHERE sort_order < 0;

-- ============================================================================
-- 12. Summary
-- ============================================================================

SELECT
    COUNT(*) AS total_languages,
    SUM(is_active) AS active_languages,
    SUM(is_default) AS default_languages,
    SUM(direction='LTR') AS ltr_languages,
    SUM(direction='RTL') AS rtl_languages
FROM languages;