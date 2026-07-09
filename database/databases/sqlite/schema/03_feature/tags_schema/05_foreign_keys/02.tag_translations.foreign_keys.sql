-- =============================================
-- Foreign Keys for: tag_translations table
-- Purpose: Define relationships with tags and languages
-- =============================================

-- 1. Foreign key to tags table
-- tag_translations.tag_id → tags.id
ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_tag_id 
    FOREIGN KEY (tag_id) 
    REFERENCES tags(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 2. Foreign key to languages table (from language_schema)
-- tag_translations.language_id → languages.id
ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_language_id 
    FOREIGN KEY (language_id) 
    REFERENCES languages(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 3. Foreign key to users table (creator)
-- tag_translations.created_by → users.id
ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_created_by 
    FOREIGN KEY (created_by) 
    REFERENCES users(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 4. Foreign key to users table (updater)
-- tag_translations.updated_by → users.id
ALTER TABLE tag_translations ADD CONSTRAINT fk_tag_translations_updated_by 
    FOREIGN KEY (updated_by) 
    REFERENCES users(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;