-- Check if a tag exists

SELECT EXISTS
(
    SELECT 1
    FROM book_tags
    WHERE tag_id = :tag_id
) AS tag_exists;