-- List all user-dashboards with pagination
SELECT * FROM user-dashboard WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;