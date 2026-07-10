-- Get a tags by ID
SELECT * FROM tags WHERE id = ? AND deleted_at IS NULL;