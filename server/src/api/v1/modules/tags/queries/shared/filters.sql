-- Common WHERE clause filters

WHERE
    (:is_active IS NULL OR bt.is_active = :is_active)
AND
    (:is_featured IS NULL OR bt.is_featured = :is_featured)
AND
    (:is_system IS NULL OR bt.is_system = :is_system)
AND
    (:language_id IS NULL OR btt.language_id = :language_id)
AND
(
    :keyword IS NULL
    OR bt.tag_code LIKE '%' || :keyword || '%'
    OR bt.slug LIKE '%' || :keyword || '%'
    OR btt.tag_name LIKE '%' || :keyword || '%'
    OR btt.short_name LIKE '%' || :keyword || '%'
)