-- Common search condition

AND
(
    :search IS NULL

    OR bt.tag_code LIKE '%' || :search || '%'

    OR bt.slug LIKE '%' || :search || '%'

    OR btt.tag_name LIKE '%' || :search || '%'

    OR btt.short_name LIKE '%' || :search || '%'

    OR btt.description LIKE '%' || :search || '%'
)