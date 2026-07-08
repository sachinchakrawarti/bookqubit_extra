-- ============================================================================
-- File: test_scripts.sql
-- Purpose: Integration tests for scripts table
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys =ON;

-- ============================================================================
-- Test 1 : Scripts table exists
-- ============================================================================

SELECT
    'scripts table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'scripts';

-- ============================================================================
-- Test 2 : Script count
-- ============================================================================

SELECT
    'scripts seeded' AS test,
    COUNT(*) >= 10 AS passed,
    COUNT(*) AS total_scripts
FROM scripts;

-- ============================================================================
-- Test 3 : ISO15924 codes are unique
-- ============================================================================

SELECT
    'unique ISO15924 codes' AS test,
    COUNT(*) = COUNT(DISTINCT iso15924_code) AS passed
FROM scripts;

-- ============================================================================
-- Test 4 : Script codes are unique
-- ============================================================================

SELECT
    'unique script codes' AS test,
    COUNT(*) = COUNT(DISTINCT script_code) AS passed
FROM scripts;

-- ============================================================================
-- Test 5 : Script names are unique
-- ============================================================================

SELECT
    'unique script names' AS test,
    COUNT(*) = COUNT(DISTINCT script_name) AS passed
FROM scripts;

-- ============================================================================
-- Test 6 : Direction values
-- ============================================================================

SELECT
    'valid directions' AS test,
    COUNT(*) = 0 AS passed
FROM scripts
WHERE direction NOT IN ('LTR','RTL');

-- ============================================================================
-- Test 7 : Active scripts
-- ============================================================================

SELECT
    'active scripts exist' AS test,
    COUNT(*) > 0 AS passed
FROM scripts
WHERE is_active = 1;

-- ============================================================================
-- Test 8 : Sort order unique
-- ============================================================================

SELECT
    'unique sort order' AS test,
    COUNT(*) = COUNT(DISTINCT sort_order) AS passed
FROM scripts;

-- ============================================================================
-- Test 9 : Unicode range present
-- ============================================================================

SELECT
    'unicode ranges populated' AS test,
    COUNT(*) = 0 AS passed
FROM scripts
WHERE unicode_range IS NULL
   OR TRIM(unicode_range) = '';

-- ============================================================================
-- Test 10 : Languages reference valid scripts
-- ============================================================================

SELECT
    'languages reference valid scripts' AS test,
    COUNT(*) = 0 AS passed
FROM languages l
LEFT JOIN scripts s
ON l.default_script_id = s.script_id
WHERE s.script_id IS NULL;

-- ============================================================================
-- Test 11 : Insert test
-- ============================================================================

INSERT INTO scripts
(
    script_code,
    iso15924_code,
    script_name,
    native_name,
    direction,
    unicode_range,
    sort_order
)
VALUES
(
    'testscript',
    'Tst1',
    'Test Script',
    'Test',
    'LTR',
    'U+0000-U+000F',
    999
);

SELECT
    'insert script' AS test,
    COUNT(*) = 1 AS passed
FROM scripts
WHERE script_code = 'testscript';

DELETE FROM scripts
WHERE script_code = 'testscript';

-- ============================================================================
-- Test 12 : Summary
-- ============================================================================

SELECT
    COUNT(*) AS total_scripts,
    SUM(is_active) AS active_scripts,
    SUM(direction='LTR') AS ltr_scripts,
    SUM(direction='RTL') AS rtl_scripts
FROM scripts;