-- ============================================================
-- BookQubit Database
-- Schema      : Geography
-- Module      : Continents
-- File        : continent_translations.index.sql
-- Description : Indexes for continent_translations
-- Version     : 1.0.0
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============================================================
-- PRIMARY LOOKUP INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continent_translations_continent
ON continent_translations(continent_id);

CREATE INDEX IF NOT EXISTS idx_continent_translations_language
ON continent_translations(language_id);

-- ============================================================
-- NAME SEARCH
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continent_translations_official_name
ON continent_translations(official_name);

CREATE INDEX IF NOT EXISTS idx_continent_translations_common_name
ON continent_translations(common_name);

CREATE INDEX IF NOT EXISTS idx_continent_translations_native_name
ON continent_translations(native_name);

CREATE INDEX IF NOT EXISTS idx_continent_translations_short_name
ON continent_translations(short_name);

-- ============================================================
-- ROMANIZATION
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continent_translations_romanized_name
ON continent_translations(romanized_name);

CREATE INDEX IF NOT EXISTS idx_continent_translations_romanized_official_name
ON continent_translations(romanized_official_name);

-- ============================================================
-- SEO
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continent_translations_slug
ON continent_translations(slug);

-- ============================================================
-- LOCALIZATION
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continent_translations_locale
ON continent_translations(locale);

CREATE INDEX IF NOT EXISTS idx_continent_translations_script
ON continent_translations(script);

CREATE INDEX IF NOT EXISTS idx_continent_translations_text_direction
ON continent_translations(text_direction);

-- ============================================================
-- STATUS
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_continent_translations_default
ON continent_translations(is_default);

CREATE INDEX IF NOT EXISTS idx_continent_translations_official
ON continent_translations(is_official);

CREATE INDEX IF NOT EXISTS idx_continent_translations_verified
ON continent_translations(is_verified);

CREATE INDEX IF NOT EXISTS idx_continent_translations_active
ON continent_translations(is_active);

-- ============================================================
-- COMPOSITE INDEXES
-- ============================================================

-- Fast lookup of a continent in a specific language
CREATE INDEX IF NOT EXISTS idx_continent_language
ON continent_translations(
    continent_id,
    language_id
);

-- Get all translations of one language
CREATE INDEX IF NOT EXISTS idx_language_continent
ON continent_translations(
    language_id,
    continent_id
);

-- Fast localized search
CREATE INDEX IF NOT EXISTS idx_language_official_name
ON continent_translations(
    language_id,
    official_name
);

CREATE INDEX IF NOT EXISTS idx_language_common_name
ON continent_translations(
    language_id,
    common_name
);

CREATE INDEX IF NOT EXISTS idx_language_slug
ON continent_translations(
    language_id,
    slug
);

-- ============================================================
-- ADMIN
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_translation_source
ON continent_translations(translation_source);

CREATE INDEX IF NOT EXISTS idx_translator
ON continent_translations(translator);

CREATE INDEX IF NOT EXISTS idx_translation_version
ON continent_translations(translation_version);

-- ============================================================
-- AUDIT
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_created_at
ON continent_translations(created_at);

CREATE INDEX IF NOT EXISTS idx_updated_at
ON continent_translations(updated_at);

-- ============================================================
-- NOTES
-- ============================================================
--
-- Optimized for:
--
-- ✔ Get continent by language
-- ✔ Get all translations of a continent
-- ✔ Search by native name
-- ✔ Search by romanized name
-- ✔ Search by slug
-- ✔ RTL/LTR filtering
-- ✔ Admin translation management
-- ✔ Fast multilingual BookQubit APIs
--
-- Example Queries:
--
-- SELECT * FROM continent_translations
-- WHERE continent_id = 3
--   AND language_id = 1;
--
-- SELECT *
-- FROM continent_translations
-- WHERE slug = 'asia';
--
-- SELECT *
-- FROM continent_translations
-- WHERE native_name = '亚洲';
--
-- SELECT *
-- FROM continent_translations
-- WHERE romanized_name = 'Ajia';
--
-- SELECT *
-- FROM continent_translations
-- WHERE language_id = 2;
--
-- ============================================================