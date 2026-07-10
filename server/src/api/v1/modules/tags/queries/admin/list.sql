-- List all tagss with pagination
SELECT * FROM tags WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;