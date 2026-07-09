-- ============================================================================
-- File: 01.languages.sample.sql
-- Schema: language_schema
-- Purpose: Sample queries for languages table
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- 1. List all active languages
-- ============================================================================

SELECT
    language_id,
    language_code,
    language_name,
    native_name,
    iso_639_1,
    locale_code
FROM languages
WHERE is_active = 1
ORDER BY sort_order, language_name;

-- ============================================================================
-- 2. Find language by code
-- ============================================================================

SELECT *
FROM languages
WHERE language_code = 'en';

-- ============================================================================
-- 3. Find language by ISO-639-1
-- ============================================================================

SELECT *
FROM languages
WHERE iso_639_1 = 'hi';

-- ============================================================================
-- 4. Find language by locale
-- ============================================================================

SELECT *
FROM languages
WHERE locale_code = 'en-US';

-- ============================================================================
-- 5. Search language by name
-- ============================================================================

SELECT
    language_id,
    language_name,
    native_name
FROM languages
WHERE language_name LIKE '%English%'
   OR native_name LIKE '%English%';

-- ============================================================================
-- 6. Languages using a script
-- ============================================================================

SELECT
    language_name,
    native_name,
    default_script_id
FROM languages
WHERE default_script_id = 1;

-- ============================================================================
-- 7. RTL Languages
-- ============================================================================

SELECT
    language_name,
    native_name
FROM languages
WHERE direction = 'RTL';

-- ============================================================================
-- 8. Default language
-- ============================================================================

SELECT *
FROM languages
WHERE is_default = 1;

-- ============================================================================
-- 9. Active language count
-- ============================================================================

SELECT
    COUNT(*) AS total_languages
FROM languages
WHERE is_active = 1;

-- ============================================================================
-- 10. Recently added languages
-- ============================================================================

SELECT
    language_id,
    language_name,
    created_at
FROM languages
ORDER BY created_at DESC
LIMIT 10;

-- ============================================================================
-- 11. Alphabetical list
-- ============================================================================

SELECT
    language_name,
    native_name
FROM languages
ORDER BY language_name;

-- ============================================================================
-- 12. Languages with locale and ISO codes
-- ============================================================================

SELECT
    language_name,
    locale_code,
    iso_639_1,
    iso_639_2,
    iso_639_3
FROM languages
ORDER BY language_name;

-- ============================================================================
-- End of File
-- ============================================================================