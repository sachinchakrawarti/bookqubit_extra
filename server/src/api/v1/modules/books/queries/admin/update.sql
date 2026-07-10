-- Update a books
UPDATE books SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ? AND deleted_at IS NULL;