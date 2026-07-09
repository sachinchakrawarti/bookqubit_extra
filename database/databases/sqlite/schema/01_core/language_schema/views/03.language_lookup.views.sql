-- ============================================================================
-- File: 03.language_lookup.views.sql
-- Schema: language_schema
-- Views: Language Lookup
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- View: vw_language_lookup
-- Universal language lookup (English + Native + Display Name)
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_lookup AS
SELECT
    l.language_id,
    l.language_code,

    l.language_name,
    l.english_name,
    l.native_name,

    ln.display_language_id,
    dl.language_code AS display_language_code,
    dl.english_name AS display_language,

    ln.language_name AS display_name,
    ln.short_name,

    s.script_code,
    s.script_name,
    s.direction,

    l.locale_code,
    l.is_default,
    l.is_active

FROM languages l

LEFT JOIN language_names ln
       ON l.language_id = ln.language_id
      AND ln.is_preferred = 1

LEFT JOIN languages dl
       ON ln.display_language_id = dl.language_id

LEFT JOIN scripts s
       ON l.default_script_id = s.script_id;

-- ============================================================================
-- View: vw_language_search
-- Optimized for search/autocomplete
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_search AS
SELECT
    language_id,
    language_code,

    english_name,

    native_name,

    language_name,

    display_name,

    short_name,

    locale_code,

    script_name,

    direction

FROM vw_language_lookup
WHERE is_active = 1;

-- ============================================================================
-- View: vw_language_dropdown
-- Small dataset for dropdowns
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_dropdown AS
SELECT
    language_id,
    language_code,
    display_name AS language_name
FROM vw_language_lookup
WHERE is_active = 1
  AND display_language_code = 'en'
ORDER BY display_name;

-- ============================================================================
-- View: vw_language_dropdown_native
-- Native-language dropdown
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_dropdown_native AS
SELECT
    language_id,
    language_code,
    native_name AS language_name
FROM languages
WHERE is_active = 1
ORDER BY native_name;

-- ============================================================================
-- View: vw_language_codes
-- ISO lookup
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_codes AS
SELECT
    language_id,
    language_code,
    iso_639_1,
    iso_639_2,
    iso_639_3,
    locale_code
FROM languages;

-- ============================================================================
-- View: vw_language_scripts
-- Language → Script mapping
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_scripts AS
SELECT
    l.language_id,
    l.language_code,
    l.english_name,

    s.script_id,
    s.script_code,
    s.iso15924_code,
    s.script_name,
    s.direction

FROM languages l
LEFT JOIN scripts s
       ON l.default_script_id = s.script_id;