-- Get a trends-dashboard by ID
SELECT * FROM trends-dashboard WHERE id = ? AND deleted_at IS NULL;