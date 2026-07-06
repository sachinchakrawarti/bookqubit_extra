-- Common CTE

WITH tag_data AS
(
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
        bt.created_at,
        bt.updated_at,

        btt.translation_id,
        btt.language_id,
        btt.tag_name,
        btt.short_name,
        btt.description,
        btt.seo_title,
        btt.seo_description

    FROM book_tags AS bt

    LEFT JOIN book_tags_translations AS btt
        ON bt.tag_id = btt.tag_id
)