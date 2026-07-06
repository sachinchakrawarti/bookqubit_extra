SELECT
    btt.translation_id,
    btt.tag_id,
    btt.language_id,
    btt.tag_name,
    btt.short_name,
    btt.description,

    bt.tag_code,
    bt.slug,
    bt.icon,
    bt.color,
    bt.is_active

FROM book_tags_translations AS btt

INNER JOIN book_tags AS bt
    ON bt.tag_id = btt.tag_id

WHERE

    btt.tag_name LIKE '%' || ? || '%'

    OR

    btt.short_name LIKE '%' || ? || '%'

    OR

    bt.tag_code LIKE '%' || ? || '%'

ORDER BY
    bt.sort_order,
    btt.tag_name;