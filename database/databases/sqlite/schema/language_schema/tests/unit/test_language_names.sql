-- ============================================================================
-- File: test_language_names.sql
-- Purpose: Unit tests for language_names table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- Test 1 : language_names table exists
-- ============================================================================

SELECT
    'language_names table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'language_names';

-- ============================================================================
-- Test 2 : Records exist
-- ============================================================================

SELECT
    'language names seeded' AS test,
    COUNT(*) > 0 AS passed,
    COUNT(*) AS total_rows
FROM language_names;

-- ============================================================================
-- Test 3 : Every row references a valid language
-- ============================================================================

SELECT
    'valid language_id' AS test,
    COUNT(*) = 0 AS passed
FROM language_names ln
LEFT JOIN languages l
ON ln.language_id = l.language_id
WHERE l.language_id IS NULL;

-- ============================================================================
-- Test 4 : Every display language exists
-- ============================================================================

SELECT
    'valid display_language_id' AS test,
    COUNT(*) = 0 AS passed
FROM language_names ln
LEFT JOIN languages l
ON ln.display_language_id = l.language_id
WHERE l.language_id IS NULL;

-- ============================================================================
-- Test 5 : language_name NOT NULL
-- ============================================================================

SELECT
    'language_name NOT NULL' AS test,
    COUNT(*) = 0 AS passed
FROM language_names
WHERE language_name IS NULL
   OR TRIM(language_name) = '';

-- ============================================================================
-- Test 6 : native_name NOT NULL
-- ============================================================================

SELECT
    'native_name NOT NULL' AS test,
    COUNT(*) = 0 AS passed
FROM language_names
WHERE native_name IS NULL
   OR TRIM(native_name) = '';

-- ============================================================================
-- Test 7 : Unique language/display pair
-- ============================================================================

SELECT
    'unique language/display pair' AS test,
    COUNT(*) = COUNT(DISTINCT language_id || '-' || display_language_id) AS passed
FROM language_names;

-- ============================================================================
-- Test 8 : Preferred names exist
-- ============================================================================

SELECT
    'preferred names exist' AS test,
    COUNT(*) > 0 AS passed
FROM language_names
WHERE is_preferred = 1;

-- ============================================================================
-- Test 9 : Active names exist
-- ============================================================================

SELECT
    'active names exist' AS test,
    COUNT(*) > 0 AS passed
FROM language_names
WHERE is_active = 1;

-- ============================================================================
-- Test 10 : Official names exist
-- ============================================================================

SELECT
    'official names exist' AS test,
    COUNT(*) > 0 AS passed
FROM language_names
WHERE is_official = 1;

-- ============================================================================
-- Test 11 : Flag values valid
-- ============================================================================

SELECT
    'boolean flags valid' AS test,
    COUNT(*) = 0 AS passed
FROM language_names
WHERE is_preferred NOT IN (0,1)
   OR is_official NOT IN (0,1)
   OR is_active NOT IN (0,1);

-- ============================================================================
-- Test 12 : Every language has at least one name
-- ============================================================================

SELECT
    'every language has name' AS test,
    COUNT(*) = 0 AS passed
FROM languages l
LEFT JOIN language_names ln
ON l.language_id = ln.language_id
WHERE ln.language_name_id IS NULL;

-- ============================================================================
-- Test 13 : English display names exist
-- ============================================================================

SELECT
    'english display names' AS test,
    COUNT(*) > 0 AS passed
FROM language_names
WHERE display_language_id = 1;

-- ============================================================================
-- Test 14 : Hindi display names exist
-- ============================================================================

SELECT
    'hindi display names' AS test,
    COUNT(*) > 0 AS passed
FROM language_names
WHERE display_language_id = 2;

-- ============================================================================
-- Test 15 : Summary
-- ============================================================================

SELECT
    COUNT(*) AS total_names,
    COUNT(DISTINCT language_id) AS languages,
    COUNT(DISTINCT display_language_id) AS display_languages,
    SUM(is_preferred) AS preferred_names,
    SUM(is_official) AS official_names,
    SUM(is_active) AS active_names
FROM language_names;