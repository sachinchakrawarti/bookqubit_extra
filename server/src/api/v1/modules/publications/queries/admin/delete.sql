-- Soft delete a publications
UPDATE publications SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;