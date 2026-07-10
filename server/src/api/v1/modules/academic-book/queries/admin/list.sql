-- List all academic-books with pagination
SELECT * FROM academic-book WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;