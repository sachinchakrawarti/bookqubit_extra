-- Update a tags
UPDATE tags SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ? AND deleted_at IS NULL;