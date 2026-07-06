DELETE FROM book_tags_translations
WHERE
    tag_id = ?
    AND language_id = ?;