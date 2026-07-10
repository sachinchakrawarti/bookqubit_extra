-- Create a new user-dashboard
INSERT INTO user-dashboard (name, description, created_at, updated_at) 
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);