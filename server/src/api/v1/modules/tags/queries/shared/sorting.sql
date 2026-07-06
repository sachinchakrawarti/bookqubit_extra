-- Sorting

ORDER BY

CASE
    WHEN :sort_by = 'tag_name'
    THEN btt.tag_name
END COLLATE NOCASE ASC,

CASE
    WHEN :sort_by = 'tag_code'
    THEN bt.tag_code
END COLLATE NOCASE ASC,

CASE
    WHEN :sort_by = 'sort_order'
    THEN bt.sort_order
END ASC,

CASE
    WHEN :sort_by = 'created_at'
    THEN bt.created_at
END DESC,

bt.tag_id ASC;