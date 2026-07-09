-- ============================================================================
-- File: test_language_codes.sql
-- Purpose: Unit tests for language codes and ISO standards
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- Test 1 : language_code should not be NULL
-- ============================================================================

SELECT
    'language_code NOT NULL' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE language_code IS NULL;

-- ============================================================================
-- Test 2 : language_code unique
-- ============================================================================

SELECT
    'language_code UNIQUE' AS test,
    COUNT(*) = COUNT(DISTINCT language_code) AS passed
FROM languages;

-- ============================================================================
-- Test 3 : ISO639-1 unique
-- ============================================================================

SELECT
    'iso_639_1 UNIQUE' AS test,
    COUNT(*) = COUNT(DISTINCT iso_639_1) AS passed
FROM languages
WHERE iso_639_1 IS NOT NULL;

-- ============================================================================
-- Test 4 : ISO639-2 unique
-- ============================================================================

SELECT
    'iso_639_2 UNIQUE' AS test,
    COUNT(*) = COUNT(DISTINCT iso_639_2) AS passed
FROM languages
WHERE iso_639_2 IS NOT NULL;

-- ============================================================================
-- Test 5 : ISO639-3 unique
-- ============================================================================

SELECT
    'iso_639_3 UNIQUE' AS test,
    COUNT(*) = COUNT(DISTINCT iso_639_3) AS passed
FROM languages
WHERE iso_639_3 IS NOT NULL;

-- ============================================================================
-- Test 6 : language_code length
-- ============================================================================

SELECT
    'language_code length valid' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE LENGTH(language_code) < 2
   OR LENGTH(language_code) > 10;

-- ============================================================================
-- Test 7 : ISO639-1 length
-- ============================================================================

SELECT
    'iso_639_1 length = 2' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE iso_639_1 IS NOT NULL
  AND LENGTH(iso_639_1) <> 2;

-- ============================================================================
-- Test 8 : ISO639-2 length
-- ============================================================================

SELECT
    'iso_639_2 length = 3' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE iso_639_2 IS NOT NULL
  AND LENGTH(iso_639_2) <> 3;

-- ============================================================================
-- Test 9 : ISO639-3 length
-- ============================================================================

SELECT
    'iso_639_3 length = 3' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE iso_639_3 IS NOT NULL
  AND LENGTH(iso_639_3) <> 3;

-- ============================================================================
-- Test 10 : locale_code format
-- ============================================================================

SELECT
    'locale_code format' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE locale_code IS NOT NULL
  AND locale_code NOT GLOB '[a-z][a-z]-[A-Z][A-Z]';

-- ============================================================================
-- Test 11 : lowercase language_code
-- ============================================================================

SELECT
    'language_code lowercase' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE language_code <> LOWER(language_code);

-- ============================================================================
-- Test 12 : lowercase ISO codes
-- ============================================================================

SELECT
    'ISO codes lowercase' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE iso_639_1 <> LOWER(iso_639_1)
   OR iso_639_2 <> LOWER(iso_639_2)
   OR iso_639_3 <> LOWER(iso_639_3);

-- ============================================================================
-- Test 13 : locale_code exists
-- ============================================================================

SELECT
    'locale_code available' AS test,
    COUNT(*) > 0 AS passed
FROM languages
WHERE locale_code IS NOT NULL;

-- ============================================================================
-- Test 14 : No duplicate locale_code
-- ============================================================================

SELECT
    'locale_code UNIQUE' AS test,
    COUNT(*) = COUNT(DISTINCT locale_code) AS passed
FROM languages
WHERE locale_code IS NOT NULL;

-- ============================================================================
-- Test 15 : Summary
-- ============================================================================

SELECT
    COUNT(*) AS total_languages,
    COUNT(DISTINCT language_code) AS unique_codes,
    COUNT(DISTINCT iso_639_1) AS iso639_1_codes,
    COUNT(DISTINCT iso_639_2) AS iso639_2_codes,
    COUNT(DISTINCT iso_639_3) AS iso639_3_codes,
    COUNT(DISTINCT locale_code) AS locale_codes
FROM languages;