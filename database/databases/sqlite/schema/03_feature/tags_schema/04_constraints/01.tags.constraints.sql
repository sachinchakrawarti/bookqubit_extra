-- =============================================
-- Constraints for: tags table
-- Purpose: Data integrity rules for tag definitions
-- =============================================

-- 1. Primary Key constraint (automatically created with INTEGER PRIMARY KEY)
-- PRIMARY KEY (id)

-- 2. NOT NULL constraints
ALTER TABLE tags ADD CONSTRAINT ck_tags_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

ALTER TABLE tags ADD CONSTRAINT ck_tags_slug_not_null 
    CHECK (slug IS NOT NULL AND length(trim(slug)) > 0);

-- 3. Unique constraints (already defined in table)
-- UNIQUE(slug)

-- 4. Check constraints for data validation

-- 4.1. Name must be at least 2 characters and not exceed 100
ALTER TABLE tags ADD CONSTRAINT ck_tags_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- 4.2. Slug must be at least 2 characters and not exceed 100
ALTER TABLE tags ADD CONSTRAINT ck_tags_slug_length 
    CHECK (length(trim(slug)) >= 2 AND length(trim(slug)) <= 100);

-- 4.3. Slug must only contain lowercase letters, numbers, and hyphens
ALTER TABLE tags ADD CONSTRAINT ck_tags_slug_format 
    CHECK (slug GLOB '[a-z0-9-]*' AND slug NOT LIKE '%-%' AND slug NOT LIKE '%--%');

-- 4.4. Sort_order must be non-negative
ALTER TABLE tags ADD CONSTRAINT ck_tags_sort_order_non_negative 
    CHECK (sort_order >= 0);

-- 4.5. Usage_count must be non-negative
ALTER TABLE tags ADD CONSTRAINT ck_tags_usage_count_non_negative 
    CHECK (usage_count >= 0);

-- 4.6. Parent_id cannot reference itself
ALTER TABLE tags ADD CONSTRAINT ck_tags_parent_not_self 
    CHECK (parent_id IS NULL OR parent_id != id);

-- 4.7. Check if parent tag exists and is active (handled by foreign key)
-- FOREIGN KEY (parent_id) REFERENCES tags(id)

-- 4.8. Language reference (handled by foreign key)
-- FOREIGN KEY (language_id) REFERENCES languages(id)

-- 4.9. Description length constraint (optional)
ALTER TABLE tags ADD CONSTRAINT ck_tags_description_length 
    CHECK (description IS NULL OR length(description) <= 5000);

-- 4.10. Prevent circular references in hierarchy (use trigger or application logic)
-- This is enforced at application level or by triggers