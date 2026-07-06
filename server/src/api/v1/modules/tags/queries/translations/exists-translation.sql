SELECT EXISTS
(
    SELECT 1
    FROM book_tags_translations
    WHERE
        tag_id = ?
        AND language_id = ?
) AS translation_exists;