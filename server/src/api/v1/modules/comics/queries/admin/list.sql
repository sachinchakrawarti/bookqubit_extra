-- List all comicss with pagination
SELECT *
FROM comics
WHERE deleted_at IS NULL
ORDER BY created_at DESC
LIMIT ? OFFSET ?;