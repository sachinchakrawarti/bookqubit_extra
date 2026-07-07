-- ============================================================================
-- File: 02.language_names.sample.sql
-- Schema: language_schema
-- Purpose: Sample queries for language_names table
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- 1. List all language names
-- ============================================================================

SELECT
    language_name_id,
    language_id,
    display_language_id,
    language_name,
    native_name,
    short_name
FROM language_names
ORDER BY language_name;

-- ============================================================================
-- 2. Names of a specific language
-- ============================================================================

SELECT
    language_name,
    native_name
FROM language_names
WHERE language_id = 1;

-- ============================================================================
-- 3. Language names in a specific display language
-- ============================================================================

SELECT
    language_name,
    native_name
FROM language_names
WHERE display_language_id = 1;

-- ============================================================================
-- 4. Preferred names
-- ============================================================================

SELECT
    language_name,
    native_name
FROM language_names
WHERE is_preferred = 1;

-- ============================================================================
-- 5. Official names
-- ============================================================================

SELECT
    language_name,
    native_name
FROM language_names
WHERE is_official = 1;

-- ============================================================================
-- 6. Active language names
-- ============================================================================

SELECT
    language_name,
    native_name
FROM language_names
WHERE is_active = 1;

-- ============================================================================
-- 7. Search by language name
-- ============================================================================

SELECT *
FROM language_names
WHERE language_name LIKE '%Hindi%';

-- ============================================================================
-- 8. Search by native name
-- ============================================================================

SELECT *
FROM language_names
WHERE native_name LIKE '%हिन्दी%';

-- ============================================================================
-- 9. Get all translations of a language
-- ============================================================================

SELECT
    display_language_id,
    language_name,
    native_name
FROM language_names
WHERE language_id = 2
ORDER BY display_language_id;

-- ============================================================================
-- 10. Count translations per language
-- ============================================================================

SELECT
    language_id,
    COUNT(*) AS total_translations
FROM language_names
GROUP BY language_id
ORDER BY total_translations DESC;

-- ============================================================================
-- 11. Duplicate check
-- ============================================================================

SELECT
    language_id,
    display_language_id,
    COUNT(*) AS duplicate_count
FROM language_names
GROUP BY language_id, display_language_id
HAVING COUNT(*) > 1;

-- ============================================================================
-- 12. Recently added language names
-- ============================================================================

SELECT
    language_name,
    created_at
FROM language_names
ORDER BY created_at DESC
LIMIT 10;

-- ============================================================================
-- 13. Language with display language
-- ============================================================================

SELECT
    ln.language_name,
    l1.language_name AS target_language,
    l2.language_name AS display_language
FROM language_names ln
JOIN languages l1
    ON ln.language_id = l1.language_id
JOIN languages l2
    ON ln.display_language_id = l2.language_id
ORDER BY l1.language_name;

-- ============================================================================
-- 14. Alphabetical listing
-- ============================================================================

SELECT
    language_name,
    native_name
FROM language_names
ORDER BY language_name;

-- ============================================================================
-- End of File
-- ============================================================================