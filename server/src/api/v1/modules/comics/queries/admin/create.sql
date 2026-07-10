-- Create a new comics
INSERT INTO comics (
  name,
  description,
  created_at,
  updated_at
) VALUES (
  ?,
  ?,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);