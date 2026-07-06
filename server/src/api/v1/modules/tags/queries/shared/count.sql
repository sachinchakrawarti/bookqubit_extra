-- Count records

SELECT
    COUNT(*) AS total_records

FROM book_tags AS bt

LEFT JOIN book_tags_translations AS btt
    ON bt.tag_id = btt.tag_id;