SELECT
    bt.tag_id,
    bt.tag_code,
    bt.slug,
    bt.icon,
    bt.color,
    bt.sort_order,
    bt.is_system,
    bt.is_featured,
    bt.is_active,

    btt.language_id,
    btt.tag_name

FROM book_tags bt

LEFT JOIN book_tags_translations btt
    ON bt.tag_id = btt.tag_id

ORDER BY
    bt.sort_order ASC,
    bt.tag_name ASC;