-- Create a new trends-dashboard
INSERT INTO trends-dashboard (name, description, created_at, updated_at) 
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);