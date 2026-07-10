-- List all trends-dashboards with pagination
SELECT * FROM trends-dashboard WHERE deleted_at IS NULL 
ORDER BY created_at DESC LIMIT ? OFFSET ?;