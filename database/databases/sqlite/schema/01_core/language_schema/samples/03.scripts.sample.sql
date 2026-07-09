-- ============================================================================
-- File: 03.scripts.sample.sql
-- Schema: language_schema
-- Purpose: Sample queries for scripts table
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- 1. List all scripts
-- ============================================================================

SELECT
    script_id,
    script_code,
    iso15924_code,
    script_name,
    native_name,
    direction
FROM scripts
ORDER BY sort_order, script_name;

-- ============================================================================
-- 2. List active scripts
-- ============================================================================

SELECT
    script_id,
    script_name,
    iso15924_code
FROM scripts
WHERE is_active = 1
ORDER BY script_name;

-- ============================================================================
-- 3. Find script by ISO 15924 code
-- ============================================================================

SELECT *
FROM scripts
WHERE iso15924_code = 'Latn';

-- ============================================================================
-- 4. Find script by script code
-- ============================================================================

SELECT *
FROM scripts
WHERE script_code = 'latin';

-- ============================================================================
-- 5. Search script by name
-- ============================================================================

SELECT *
FROM scripts
WHERE script_name LIKE '%Arabic%';

-- ============================================================================
-- 6. Search by native name
-- ============================================================================

SELECT *
FROM scripts
WHERE native_name LIKE '%العربية%';

-- ============================================================================
-- 7. List RTL scripts
-- ============================================================================

SELECT
    script_name,
    iso15924_code
FROM scripts
WHERE direction = 'RTL'
ORDER BY script_name;

-- ============================================================================
-- 8. List LTR scripts
-- ============================================================================

SELECT
    script_name,
    iso15924_code
FROM scripts
WHERE direction = 'LTR'
ORDER BY script_name;

-- ============================================================================
-- 9. Count scripts
-- ============================================================================

SELECT
    COUNT(*) AS total_scripts
FROM scripts;

-- ============================================================================
-- 10. Scripts by writing direction
-- ============================================================================

SELECT
    direction,
    COUNT(*) AS total
FROM scripts
GROUP BY direction
ORDER BY direction;

-- ============================================================================
-- 11. Recently added scripts
-- ============================================================================

SELECT
    script_name,
    created_at
FROM scripts
ORDER BY created_at DESC
LIMIT 10;

-- ============================================================================
-- 12. Languages with their default script
-- ============================================================================

SELECT
    l.language_name,
    s.script_name,
    s.iso15924_code
FROM languages l
JOIN scripts s
    ON l.default_script_id = s.script_id
ORDER BY l.language_name;

-- ============================================================================
-- 13. Unicode range lookup
-- ============================================================================

SELECT
    script_name,
    unicode_range
FROM scripts
ORDER BY script_name;

-- ============================================================================
-- 14. Alphabetical listing
-- ============================================================================

SELECT
    script_name,
    native_name
FROM scripts
ORDER BY script_name;

-- ============================================================================
-- End of File
-- ============================================================================