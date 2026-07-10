-- List all bookss with pagination
SELECT * FROM books WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;