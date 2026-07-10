-- Create a new tags
INSERT INTO tags (name, description, created_at, updated_at) 
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);