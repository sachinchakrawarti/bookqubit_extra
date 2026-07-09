-- ============================================================================
-- File: 01.languages.views.sql
-- Schema: language_schema
-- Views: languages
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- View: vw_languages
-- Complete language information with script details
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_languages AS
SELECT
    l.language_id,
    l.language_code,
    l.language_name,
    l.english_name,
    l.native_name,

    l.iso_639_1,
    l.iso_639_2,
    l.iso_639_3,

    l.locale_code,

    l.direction,

    s.script_id,
    s.script_code,
    s.iso15924_code,
    s.script_name,
    s.native_name AS script_native_name,

    l.sort_order,
    l.is_default,
    l.is_active,

    l.created_at,
    l.updated_at

FROM languages l
LEFT JOIN scripts s
       ON l.default_script_id = s.script_id;

-- ============================================================================
-- View: vw_active_languages
-- Active languages only
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_active_languages AS
SELECT *
FROM vw_languages
WHERE is_active = 1
ORDER BY sort_order, english_name;

-- ============================================================================
-- View: vw_default_language
-- Default application language
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_default_language AS
SELECT *
FROM vw_languages
WHERE is_default = 1;

-- ============================================================================
-- View: vw_rtl_languages
-- Right-to-left languages
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_rtl_languages AS
SELECT *
FROM vw_languages
WHERE direction = 'RTL';

-- ============================================================================
-- View: vw_ltr_languages
-- Left-to-right languages
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_ltr_languages AS
SELECT *
FROM vw_languages
WHERE direction = 'LTR';

-- ============================================================================
-- View: vw_language_statistics
-- Language summary
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_statistics AS
SELECT
    COUNT(*) AS total_languages,
    SUM(is_active) AS active_languages,
    SUM(is_default) AS default_languages,
    SUM(direction = 'LTR') AS ltr_languages,
    SUM(direction = 'RTL') AS rtl_languages
FROM languages;