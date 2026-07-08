-- src/api/v1/modules/languages/queries/shared/filters.sql
--
-- Reusable WHERE-clause fragments for language queries.
-- Include only the predicates you need when building SQL dynamically.

-- Active languages only:
--   AND l.is_active = 1

-- By writing direction:
--   AND l.direction = :direction

-- By default language flag:
--   AND l.is_default = :is_default

-- By script:
--   AND l.default_script_id = :script_id

-- By locale:
--   AND l.locale_code = :locale_code

-- Case-insensitive text search:
--   AND (
--         l.language_name LIKE :term
--      OR l.english_name LIKE :term
--      OR l.native_name  LIKE :term
--      OR l.language_code LIKE :term
--   )