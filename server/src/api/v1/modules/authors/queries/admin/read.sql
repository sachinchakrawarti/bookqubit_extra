-- Get a authors by ID
SELECT * FROM authors WHERE id = ? AND deleted_at IS NULL;