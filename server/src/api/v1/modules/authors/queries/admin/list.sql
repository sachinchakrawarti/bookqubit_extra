-- List all authorss with pagination
SELECT * FROM authors WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;