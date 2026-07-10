-- Search trends-dashboards
SELECT * FROM trends-dashboard WHERE deleted_at IS NULL 
AND (name LIKE ? OR description LIKE ?) ORDER BY created_at DESC;