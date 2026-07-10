-- Get a languages by ID
SELECT * FROM languages WHERE id = ? AND deleted_at IS NULL;