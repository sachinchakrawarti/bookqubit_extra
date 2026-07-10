-- Soft delete a authors
UPDATE authors SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;