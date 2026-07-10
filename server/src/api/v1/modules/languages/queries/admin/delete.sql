-- Soft delete a languages
UPDATE languages SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;