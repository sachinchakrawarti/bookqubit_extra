-- =============================================
-- Foreign Keys for: tags table
-- Purpose: Define relationships with other tables
-- =============================================

-- 1. Self-referencing foreign key for hierarchy
-- tags.parent_id → tags.id
ALTER TABLE tags ADD CONSTRAINT fk_tags_parent_id 
    FOREIGN KEY (parent_id) 
    REFERENCES tags(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 2. Foreign key to languages table (from language_schema)
-- tags.language_id → languages.id
ALTER TABLE tags ADD CONSTRAINT fk_tags_language_id 
    FOREIGN KEY (language_id) 
    REFERENCES languages(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 3. Foreign key to users table (creator)
-- tags.created_by → users.id
ALTER TABLE tags ADD CONSTRAINT fk_tags_created_by 
    FOREIGN KEY (created_by) 
    REFERENCES users(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 4. Foreign key to users table (updater)
-- tags.updated_by → users.id
ALTER TABLE tags ADD CONSTRAINT fk_tags_updated_by 
    FOREIGN KEY (updated_by) 
    REFERENCES users(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 5. Foreign key to tags table for slug uniqueness
-- This is handled by unique constraint, not foreign key