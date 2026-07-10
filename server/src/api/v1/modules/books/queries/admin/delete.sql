-- Soft delete a books
UPDATE books SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;