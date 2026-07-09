-- ============================================================================
-- File: 02.language_names.views.sql
-- Schema: language_schema
-- Views: language_names
-- Database: SQLite
-- ============================================================================

-- ============================================================================
-- View: vw_language_names
-- Complete language names with language information
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_names AS
SELECT
    ln.language_name_id,

    ln.language_id,
    l.language_code,

    l.english_name,
    l.native_name AS language_native_name,

    ln.display_language_id,
    dl.language_code AS display_language_code,
    dl.english_name AS display_language,

    ln.language_name,
    ln.native_name,
    ln.short_name,

    ln.is_preferred,
    ln.is_official,
    ln.is_active,

    ln.created_at,
    ln.updated_at

FROM language_names ln
JOIN languages l
     ON ln.language_id = l.language_id
JOIN languages dl
     ON ln.display_language_id = dl.language_id;

-- ============================================================================
-- View: vw_preferred_language_names
-- Preferred language names only
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_preferred_language_names AS
SELECT *
FROM vw_language_names
WHERE is_preferred = 1
ORDER BY language_name;

-- ============================================================================
-- View: vw_active_language_names
-- Active language names
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_active_language_names AS
SELECT *
FROM vw_language_names
WHERE is_active = 1
ORDER BY language_name;

-- ============================================================================
-- View: vw_language_names_english
-- Language names displayed in English
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_names_english AS
SELECT *
FROM vw_language_names
WHERE display_language_code = 'en'
ORDER BY language_name;

-- ============================================================================
-- View: vw_language_names_hindi
-- Language names displayed in Hindi
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_names_hindi AS
SELECT *
FROM vw_language_names
WHERE display_language_code = 'hi'
ORDER BY language_name;

-- ============================================================================
-- View: vw_language_name_statistics
-- Statistics for language names
-- ============================================================================

CREATE VIEW IF NOT EXISTS vw_language_name_statistics AS
SELECT
    COUNT(*) AS total_names,
    COUNT(DISTINCT language_id) AS total_languages,
    COUNT(DISTINCT display_language_id) AS display_languages,
    SUM(is_preferred) AS preferred_names,
    SUM(is_official) AS official_names,
    SUM(is_active) AS active_names
FROM language_names;