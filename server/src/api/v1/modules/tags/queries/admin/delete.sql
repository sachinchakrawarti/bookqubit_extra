-- Soft delete a tags
UPDATE tags SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;