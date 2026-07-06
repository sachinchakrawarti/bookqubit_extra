-- Popular Tags
-- Currently ranked using featured status and sort order.
-- Can later be replaced with actual usage statistics.

SELECT
    bt.tag_id,
    bt.tag_code,
    bt.slug,
    bt.icon,
    bt.color,

    btt.language_id,
    btt.tag_name,

    bt.is_featured,
    bt.sort_order,

    bt.created_at

FROM book_tags AS bt

LEFT JOIN book_tags_translations AS btt
    ON bt.tag_id = btt.tag_id

WHERE
    bt.is_active = 1

ORDER BY
    bt.is_featured DESC,
    bt.sort_order ASC,
    btt.tag_name ASC

LIMIT 20;