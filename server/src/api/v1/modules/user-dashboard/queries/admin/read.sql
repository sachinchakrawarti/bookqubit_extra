-- Get a user-dashboard by ID
SELECT * FROM user-dashboard WHERE id = ? AND deleted_at IS NULL;