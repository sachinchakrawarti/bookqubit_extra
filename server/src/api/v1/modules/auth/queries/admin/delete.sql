-- Soft delete a auth
UPDATE auth SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;