-- src/api/v1/modules/languages/queries/shared/sorting.sql
--
-- Reusable ORDER BY fragment for language queries.

ORDER BY
    l.sort_order ASC,
    l.english_name ASC