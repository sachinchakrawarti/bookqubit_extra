-- Search user-dashboards
SELECT * FROM user-dashboard WHERE deleted_at IS NULL 
AND (name LIKE ? OR description LIKE ?) ORDER BY created_at DESC;