-- Soft delete a user-dashboard
UPDATE user-dashboard SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;