-- Get a publications by ID
SELECT * FROM publications WHERE id = ? AND deleted_at IS NULL;