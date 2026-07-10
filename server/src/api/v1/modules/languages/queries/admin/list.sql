-- List all languagess with pagination
SELECT * FROM languages WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;