UPDATE book_tags
SET
    tag_code     = ?,
    slug         = ?,
    icon         = ?,
    color        = ?,
    sort_order   = ?,
    is_system    = ?,
    is_featured  = ?,
    is_active    = ?,
    updated_at   = CURRENT_TIMESTAMP
WHERE tag_id = ?;