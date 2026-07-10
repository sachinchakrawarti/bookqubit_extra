-- List all categorys with pagination
SELECT * FROM category WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;