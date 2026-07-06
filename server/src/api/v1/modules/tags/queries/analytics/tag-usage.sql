-- Tag Usage Analytics
-- Shows how many translations exist for each tag.

SELECT
    bt.tag_id,
    bt.tag_code,
    bt.slug,
    bt.icon,
    bt.color,

    COUNT(btt.translation_id) AS translation_count,

    bt.is_system,
    bt.is_featured,
    bt.is_active,

    bt.created_at

FROM book_tags AS bt

LEFT JOIN book_tags_translations AS btt
    ON bt.tag_id = btt.tag_id

GROUP BY
    bt.tag_id,
    bt.tag_code,
    bt.slug,
    bt.icon,
    bt.color,
    bt.is_system,
    bt.is_featured,
    bt.is_active,
    bt.created_at

ORDER BY
    translation_count DESC,
    bt.sort_order ASC;