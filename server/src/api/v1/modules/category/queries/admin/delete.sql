-- Soft delete a category
UPDATE category SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;