-- Get a books by ID
SELECT * FROM books WHERE id = ? AND deleted_at IS NULL;