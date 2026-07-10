-- Get a comics by ID
SELECT *
FROM comics
WHERE id = ?
  AND deleted_at IS NULL;