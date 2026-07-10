-- Soft delete a trends-dashboard
UPDATE trends-dashboard SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;