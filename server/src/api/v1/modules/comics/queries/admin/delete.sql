-- Soft delete a comics
UPDATE comics
SET
  deleted_at = CURRENT_TIMESTAMP
WHERE id = ?;