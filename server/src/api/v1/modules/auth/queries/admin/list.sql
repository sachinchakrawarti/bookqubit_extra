-- List all auths with pagination
SELECT * FROM auth WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;