-- Soft delete a academic-book
UPDATE academic-book SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;