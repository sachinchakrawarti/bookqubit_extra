-- Create a new books
INSERT INTO books (name, description, created_at, updated_at) 
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);