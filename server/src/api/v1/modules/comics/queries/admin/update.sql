-- Update a comics
UPDATE comics
SET
  name = ?,
  description = ?,
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?
  AND deleted_at IS NULL;