-- Update a category
UPDATE category SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ? AND deleted_at IS NULL;