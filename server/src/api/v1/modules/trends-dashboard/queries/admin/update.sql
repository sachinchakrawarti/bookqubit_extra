-- Update a trends-dashboard
UPDATE trends-dashboard SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ? AND deleted_at IS NULL;