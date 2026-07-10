-- Create a new languages
INSERT INTO languages (name, description, created_at, updated_at) 
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);