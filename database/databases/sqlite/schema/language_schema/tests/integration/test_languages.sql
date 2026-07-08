-- ============================================================================
-- File: test_languages.sql
-- Purpose: Integration tests for language_schema
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- Test 1 : Languages table exists
-- ============================================================================

SELECT
    'languages table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'languages';

-- ============================================================================
-- Test 2 : Scripts table exists
-- ============================================================================

SELECT
    'scripts table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'scripts';

-- ============================================================================
-- Test 3 : Language Names table exists
-- ============================================================================

SELECT
    'language_names table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'language_names';

-- ============================================================================
-- Test 4 : Language Regions table exists
-- ============================================================================

SELECT
    'language_regions table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'language_regions';

-- ============================================================================
-- Test 5 : Language Aliases table exists
-- ============================================================================

SELECT
    'language_aliases table exists' AS test,
    COUNT(*) > 0 AS passed
FROM sqlite_master
WHERE type = 'table'
  AND name = 'language_aliases';

-- ============================================================================
-- Test 6 : Scripts seeded
-- ============================================================================

SELECT
    'scripts seeded' AS test,
    COUNT(*) >= 10 AS passed,
    COUNT(*) AS total_scripts
FROM scripts;

-- ============================================================================
-- Test 7 : Languages seeded
-- ============================================================================

SELECT
    'languages seeded' AS test,
    COUNT(*) >= 10 AS passed,
    COUNT(*) AS total_languages
FROM languages;

-- ============================================================================
-- Test 8 : Default language exists
-- ============================================================================

SELECT
    'default language exists' AS test,
    COUNT(*) = 1 AS passed
FROM languages
WHERE is_default = 1;

-- ============================================================================
-- Test 9 : Every language has a valid script
-- ============================================================================

SELECT
    'valid default scripts' AS test,
    COUNT(*) = 0 AS passed
FROM languages l
LEFT JOIN scripts s
ON l.default_script_id = s.script_id
WHERE s.script_id IS NULL;

-- ============================================================================
-- Test 10 : Language names exist
-- ============================================================================

SELECT
    'language names seeded' AS test,
    COUNT(*) > 0 AS passed,
    COUNT(*) AS total_rows
FROM language_names;

-- ============================================================================
-- Test 11 : Every language has at least one display name
-- ============================================================================

SELECT
    'every language has display name' AS test,
    COUNT(*) = 0 AS passed
FROM languages l
LEFT JOIN language_names ln
ON l.language_id = ln.language_id
WHERE ln.language_name_id IS NULL;

-- ============================================================================
-- Test 12 : Regions seeded
-- ============================================================================

SELECT
    'language regions seeded' AS test,
    COUNT(*) > 0 AS passed,
    COUNT(*) AS total_regions
FROM language_regions;

-- ============================================================================
-- Test 13 : Region references valid language
-- ============================================================================

SELECT
    'valid language regions' AS test,
    COUNT(*) = 0 AS passed
FROM language_regions r
LEFT JOIN languages l
ON r.language_id = l.language_id
WHERE l.language_id IS NULL;

-- ============================================================================
-- Test 14 : Alias table operational
-- ============================================================================

INSERT INTO language_aliases
(
    language_id,
    alias_name,
    alias_type,
    is_searchable
)
VALUES
(
    1,
    'Modern English',
    'alternative',
    1
);

SELECT
    'language alias inserted' AS test,
    COUNT(*) = 1 AS passed
FROM language_aliases
WHERE alias_name = 'Modern English';

DELETE FROM language_aliases
WHERE alias_name = 'Modern English';

-- ============================================================================
-- Test 15 : ISO639-1 uniqueness
-- ============================================================================

SELECT
    'unique iso639-1' AS test,
    COUNT(*) = COUNT(DISTINCT iso_639_1) AS passed
FROM languages;

-- ============================================================================
-- Test 16 : Language code uniqueness
-- ============================================================================

SELECT
    'unique language codes' AS test,
    COUNT(*) = COUNT(DISTINCT language_code) AS passed
FROM languages;

-- ============================================================================
-- Test 17 : Active languages
-- ============================================================================

SELECT
    'active languages available' AS test,
    COUNT(*) > 0 AS passed
FROM languages
WHERE is_active = 1;

-- ============================================================================
-- Test 18 : LTR / RTL validation
-- ============================================================================

SELECT
    'valid directions' AS test,
    COUNT(*) = 0 AS passed
FROM languages
WHERE direction NOT IN ('LTR','RTL');

-- ============================================================================
-- Test 19 : Preferred names
-- ============================================================================

SELECT
    'preferred language names' AS test,
    COUNT(*) > 0 AS passed
FROM language_names
WHERE is_preferred = 1;

-- ============================================================================
-- Test 20 : Summary
-- ============================================================================

SELECT
    (SELECT COUNT(*) FROM scripts)            AS scripts,
    (SELECT COUNT(*) FROM languages)          AS languages,
    (SELECT COUNT(*) FROM language_names)     AS language_names,
    (SELECT COUNT(*) FROM language_regions)   AS language_regions,
    (SELECT COUNT(*) FROM language_aliases)   AS language_aliases;