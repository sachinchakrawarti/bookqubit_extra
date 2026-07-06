-- Common JOINs

FROM book_tags AS bt

LEFT JOIN book_tags_translations AS btt
    ON bt.tag_id = btt.tag_id