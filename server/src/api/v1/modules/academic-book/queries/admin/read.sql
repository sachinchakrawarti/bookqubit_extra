-- Get a academic-book by ID
SELECT * FROM academic-book WHERE id = ? AND deleted_at IS NULL;