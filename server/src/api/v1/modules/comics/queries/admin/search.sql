-- Search comicss
SELECT *
FROM comics
WHERE deleted_at IS NULL
  AND (
    name LIKE ?
    OR description LIKE ?
  )
ORDER BY created_at DESC;