-- Get a category by ID
SELECT * FROM category WHERE id = ? AND deleted_at IS NULL;