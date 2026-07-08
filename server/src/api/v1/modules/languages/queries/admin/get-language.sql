-- src/api/v1/modules/languages/queries/admin/get-language.sql

SELECT
    language_id,
    language_code,
    language_name,
    english_name,
    native_name,
    iso_639_1,
    iso_639_2,
    iso_639_3,
    locale_code,
    default_script_id,
    direction,
    sort_order,
    is_default,
    is_active,
    created_at,
    updated_at
FROM languages
WHERE language_id = ?;