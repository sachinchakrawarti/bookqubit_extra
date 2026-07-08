-- src/api/v1/modules/languages/queries/admin/search-languages.sql

SELECT
    language_id,
    language_code,
    language_name,
    english_name,
    native_name,
    iso_639_1,
    locale_code,
    direction,
    is_default,
    is_active
FROM languages
WHERE
    language_code LIKE '%' || ? || '%'
    OR language_name LIKE '%' || ? || '%'
    OR english_name LIKE '%' || ? || '%'
    OR native_name LIKE '%' || ? || '%'
    OR iso_639_1 LIKE '%' || ? || '%'
    OR iso_639_2 LIKE '%' || ? || '%'
    OR iso_639_3 LIKE '%' || ? || '%'
    OR locale_code LIKE '%' || ? || '%'
ORDER BY
    sort_order ASC,
    english_name ASC
LIMIT ? OFFSET ?;