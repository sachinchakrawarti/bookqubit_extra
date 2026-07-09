-- =============================================
-- Constraints for: geo_translations Table
-- Description: Data integrity rules for translations
-- =============================================

-- =============================================
-- 1. NOT NULL CONSTRAINTS
-- =============================================

ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_entity_type_not_null 
    CHECK (entity_type IS NOT NULL AND length(trim(entity_type)) > 0);

ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_entity_id_not_null 
    CHECK (entity_id IS NOT NULL);

ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_language_id_not_null 
    CHECK (language_id IS NOT NULL);

ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- =============================================
-- 2. CHECK CONSTRAINTS FOR DATA VALIDATION
-- =============================================

-- 2.1 Entity type must be one of the valid types
ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_entity_type_valid 
    CHECK (entity_type IN ('continent', 'country', 'state', 'region'));

-- 2.2 Name must be at least 2 characters
ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- 2.3 Description length constraint
ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_description_length 
    CHECK (description IS NULL OR length(description) <= 5000);

-- =============================================
-- 3. REFERENTIAL INTEGRITY CONSTRAINTS (Triggers)
-- =============================================

-- 3.1 Ensure entity exists for the given type
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_entity_exists
BEFORE INSERT ON geo_translations
BEGIN
    SELECT CASE
        WHEN NEW.entity_type = 'continent' AND 
             NOT EXISTS (SELECT 1 FROM continents WHERE id = NEW.entity_id)
        THEN RAISE(ABORT, 'Continent does not exist')
        
        WHEN NEW.entity_type = 'country' AND 
             NOT EXISTS (SELECT 1 FROM countries WHERE id = NEW.entity_id)
        THEN RAISE(ABORT, 'Country does not exist')
        
        WHEN NEW.entity_type = 'state' AND 
             NOT EXISTS (SELECT 1 FROM states WHERE id = NEW.entity_id)
        THEN RAISE(ABORT, 'State does not exist')
        
        WHEN NEW.entity_type = 'region' AND 
             NOT EXISTS (SELECT 1 FROM regions WHERE id = NEW.entity_id)
        THEN RAISE(ABORT, 'Region does not exist')
    END;
END;

-- 3.2 Ensure entity is active
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_entity_active
BEFORE INSERT ON geo_translations
BEGIN
    SELECT CASE
        WHEN NEW.entity_type = 'continent' AND 
             (SELECT is_active FROM continents WHERE id = NEW.entity_id) = 0
        THEN RAISE(ABORT, 'Continent is inactive')
        
        WHEN NEW.entity_type = 'country' AND 
             (SELECT is_active FROM countries WHERE id = NEW.entity_id) = 0
        THEN RAISE(ABORT, 'Country is inactive')
        
        WHEN NEW.entity_type = 'state' AND 
             (SELECT is_active FROM states WHERE id = NEW.entity_id) = 0
        THEN RAISE(ABORT, 'State is inactive')
        
        WHEN NEW.entity_type = 'region' AND 
             (SELECT is_active FROM regions WHERE id = NEW.entity_id) = 0
        THEN RAISE(ABORT, 'Region is inactive')
    END;
END;

-- 3.3 Ensure language exists
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_language_exists
BEFORE INSERT ON geo_translations
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (SELECT 1 FROM languages WHERE id = NEW.language_id)
        THEN RAISE(ABORT, 'Language does not exist')
    END;
END;

-- =============================================
-- 4. UNIQUE CONSTRAINT
-- =============================================

-- Unique constraint is already defined in table creation:
-- UNIQUE(entity_type, entity_id, language_id)

-- Additional unique constraints
ALTER TABLE geo_translations ADD CONSTRAINT ck_geo_translations_unique_name 
    CHECK (NOT EXISTS (
        SELECT 1 FROM geo_translations t2 
        WHERE t2.entity_type = entity_type 
          AND t2.entity_id = entity_id 
          AND t2.language_id = language_id 
          AND t2.id != id
    ));

-- =============================================
-- 5. CASCADE CONSTRAINTS (Triggers)
-- =============================================

-- 5.1 Delete translations when entity is deleted
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_continent
AFTER DELETE ON continents
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'continent' AND entity_id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_country
AFTER DELETE ON countries
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'country' AND entity_id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_state
AFTER DELETE ON states
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'state' AND entity_id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_region
AFTER DELETE ON regions
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'region' AND entity_id = OLD.id;
END;

-- 5.2 Update translations when entity is deactivated
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_inactivate_continent
AFTER UPDATE ON continents
WHEN NEW.is_active = 0
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'continent' AND entity_id = NEW.id;
END;

-- =============================================
-- 6. VALIDATION FUNCTIONS
-- =============================================

-- 6.1 Function to validate entity type
CREATE FUNCTION IF NOT EXISTS is_valid_entity_type(entity_type TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN entity_type IN ('continent', 'country', 'state', 'region');
END;

-- 6.2 Function to get entity table name from type
CREATE FUNCTION IF NOT EXISTS get_entity_table(entity_type TEXT)
RETURNS TEXT
BEGIN
    RETURN CASE entity_type
        WHEN 'continent' THEN 'continents'
        WHEN 'country' THEN 'countries'
        WHEN 'state' THEN 'states'
        WHEN 'region' THEN 'regions'
        ELSE NULL
    END;
END;

-- 6.3 Function to check if entity exists
CREATE FUNCTION IF NOT EXISTS entity_exists(entity_type TEXT, entity_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN CASE entity_type
        WHEN 'continent' THEN EXISTS (SELECT 1 FROM continents WHERE id = entity_id)
        WHEN 'country' THEN EXISTS (SELECT 1 FROM countries WHERE id = entity_id)
        WHEN 'state' THEN EXISTS (SELECT 1 FROM states WHERE id = entity_id)
        WHEN 'region' THEN EXISTS (SELECT 1 FROM regions WHERE id = entity_id)
        ELSE 0
    END;
END;

-- 6.4 Function to get translation count for entity
CREATE FUNCTION IF NOT EXISTS get_translation_count(entity_type TEXT, entity_id INTEGER, language_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COUNT(*) 
        FROM geo_translations 
        WHERE entity_type = entity_type 
          AND entity_id = entity_id 
          AND (language_id IS NULL OR language_id = language_id)
    );
END;

-- 6.5 Function to check if translation exists
CREATE FUNCTION IF NOT EXISTS translation_exists(entity_type TEXT, entity_id INTEGER, language_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM geo_translations 
        WHERE entity_type = entity_type 
          AND entity_id = entity_id 
          AND language_id = language_id
    );
END;