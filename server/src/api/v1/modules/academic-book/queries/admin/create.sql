-- Create a new academic-book
INSERT INTO academic-book (name, description, created_at, updated_at) 
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);