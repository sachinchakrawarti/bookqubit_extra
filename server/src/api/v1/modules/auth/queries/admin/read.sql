-- Get a auth by ID
SELECT * FROM auth WHERE id = ? AND deleted_at IS NULL;