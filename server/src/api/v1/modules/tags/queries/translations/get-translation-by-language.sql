SELECT
    btt.translation_id,
    btt.tag_id,
    btt.language_id,
    btt.tag_name,
    btt.short_name,
    btt.description,
    btt.seo_title,
    btt.seo_description,

    bt.tag_code,
    bt.slug,
    bt.icon,
    bt.color,
    bt.sort_order,
    bt.is_active

FROM book_tags_translations AS btt

INNER JOIN book_tags AS bt
    ON bt.tag_id = btt.tag_id

WHERE
    btt.tag_id = ?
    AND btt.language_id = ?;