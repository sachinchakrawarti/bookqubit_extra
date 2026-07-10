-- List all publicationss with pagination
SELECT * FROM publications WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;