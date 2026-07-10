-- Search tagss
SELECT * FROM tags WHERE deleted_at IS NULL 
AND (name LIKE ? OR description LIKE ?) ORDER BY created_at DESC;