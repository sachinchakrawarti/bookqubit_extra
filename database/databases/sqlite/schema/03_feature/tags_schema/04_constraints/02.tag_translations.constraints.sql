-- =============================================
-- Constraints for: tag_translations table
-- Purpose: Data integrity rules for tag translations
-- =============================================

-- 1. Primary Key constraint (automatically created with INTEGER PRIMARY KEY)
-- PRIMARY KEY (id)

-- 2. NOT NULL constraints
ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_tag_id_not_null 
    CHECK (tag_id IS NOT NULL);

ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_language_id_not_null 
    CHECK (language_id IS NOT NULL);

ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- 3. Unique constraints (already defined in table)
-- UNIQUE(tag_id, language_id)

-- 4. Check constraints for data validation

-- 4.1. Name must be at least 2 characters and not exceed 100
ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- 4.2. Description length constraint (optional)
ALTER TABLE tag_translations ADD CONSTRAINT ck_tag_translations_description_length 
    CHECK (description IS NULL OR length(description) <= 5000);

-- 4.3. Language must be active (handled by foreign key with check)
-- FOREIGN KEY (language_id) REFERENCES languages(id)

-- 4.4. Tag must exist and be active (handled by foreign key)
-- FOREIGN KEY (tag_id) REFERENCES tags(id)

-- 4.5. Ensure tag and language combination is unique (already defined)
-- This prevents duplicate translations for the same tag-language pair