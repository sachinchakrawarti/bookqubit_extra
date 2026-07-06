UPDATE book_tags_translations
SET
    tag_name        = ?,
    short_name      = ?,
    description     = ?,
    seo_title       = ?,
    seo_description = ?,
    updated_at      = CURRENT_TIMESTAMP
WHERE
    tag_id = ?
    AND language_id = ?;