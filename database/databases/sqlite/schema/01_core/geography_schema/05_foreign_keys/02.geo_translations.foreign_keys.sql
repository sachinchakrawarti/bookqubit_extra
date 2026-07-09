-- =============================================
-- Foreign Keys for: geo_translations Table
-- Description: Define relationships for translations
-- =============================================

-- =============================================
-- 1. FOREIGN KEYS (Direct References)
-- =============================================

-- 1.1 Foreign key from geo_translations to languages
-- When a language is deleted, delete all translations for that language
ALTER TABLE geo_translations ADD CONSTRAINT fk_geo_translations_language_id 
    FOREIGN KEY (language_id) 
    REFERENCES languages(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- =============================================
-- 2. POLYMORPHIC FOREIGN KEYS (via Triggers)
-- =============================================

-- 2.1 Trigger to ensure entity exists for translations
-- This replaces direct foreign keys for polymorphic relationships
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

CREATE TRIGGER IF NOT EXISTS tr_geo_translations_entity_exists_update
BEFORE UPDATE ON geo_translations
WHEN NEW.entity_type != OLD.entity_type OR NEW.entity_id != OLD.entity_id
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

-- 2.2 Trigger to ensure language exists for translations
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_language_exists
BEFORE INSERT ON geo_translations
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (SELECT 1 FROM languages WHERE id = NEW.language_id)
        THEN RAISE(ABORT, 'Language does not exist')
    END;
END;

-- 2.3 Trigger to ensure language is active
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_language_active
BEFORE INSERT ON geo_translations
BEGIN
    SELECT CASE
        WHEN (SELECT is_active FROM languages WHERE id = NEW.language_id) = 0
        THEN RAISE(ABORT, 'Language is inactive')
    END;
END;

-- =============================================
-- 3. CASCADE DELETE TRIGGERS
-- =============================================

-- 3.1 Delete translations when a continent is deleted
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_continent
AFTER DELETE ON continents
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'continent' AND entity_id = OLD.id;
END;

-- 3.2 Delete translations when a country is deleted
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_country
AFTER DELETE ON countries
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'country' AND entity_id = OLD.id;
END;

-- 3.3 Delete translations when a state is deleted
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_state
AFTER DELETE ON states
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'state' AND entity_id = OLD.id;
END;

-- 3.4 Delete translations when a region is deleted
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_region
AFTER DELETE ON regions
BEGIN
    DELETE FROM geo_translations 
    WHERE entity_type = 'region' AND entity_id = OLD.id;
END;

-- 3.5 Delete translations when a language is deleted
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_delete_language
AFTER DELETE ON languages
BEGIN
    DELETE FROM geo_translations 
    WHERE language_id = OLD.id;
END;

-- =============================================
-- 4. UPDATE CASCADE TRIGGERS
-- =============================================

-- 4.1 Update translations when continent ID changes
-- (ID is primary key, so it shouldn't change, but just in case)
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_update_continent
AFTER UPDATE ON continents
WHEN OLD.id != NEW.id
BEGIN
    UPDATE geo_translations 
    SET entity_id = NEW.id 
    WHERE entity_type = 'continent' AND entity_id = OLD.id;
END;

-- 4.2 Update translations when country ID changes
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_update_country
AFTER UPDATE ON countries
WHEN OLD.id != NEW.id
BEGIN
    UPDATE geo_translations 
    SET entity_id = NEW.id 
    WHERE entity_type = 'country' AND entity_id = OLD.id;
END;

-- 4.3 Update translations when state ID changes
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_update_state
AFTER UPDATE ON states
WHEN OLD.id != NEW.id
BEGIN
    UPDATE geo_translations 
    SET entity_id = NEW.id 
    WHERE entity_type = 'state' AND entity_id = OLD.id;
END;

-- 4.4 Update translations when region ID changes
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_update_region
AFTER UPDATE ON regions
WHEN OLD.id != NEW.id
BEGIN
    UPDATE geo_translations 
    SET entity_id = NEW.id 
    WHERE entity_type = 'region' AND entity_id = OLD.id;
END;

-- 4.5 Update translations when language ID changes
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_update_language
AFTER UPDATE ON languages
WHEN OLD.id != NEW.id
BEGIN
    UPDATE geo_translations 
    SET language_id = NEW.id 
    WHERE language_id = OLD.id;
END;

-- =============================================
-- 5. FOREIGN KEY VALIDATION FUNCTIONS
-- =============================================

-- 5.1 Function to check if translation entity exists
CREATE FUNCTION IF NOT EXISTS translation_entity_exists(entity_type TEXT, entity_id INTEGER)
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

-- 5.2 Function to check if translation language exists
CREATE FUNCTION IF NOT EXISTS translation_language_exists(language_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM languages WHERE id = language_id);
END;

-- 5.3 Function to get all translations for an entity
CREATE FUNCTION IF NOT EXISTS get_entity_translations(entity_type TEXT, entity_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'language_id', language_id,
                'name', name,
                'description', description
            )
        )
        FROM geo_translations
        WHERE entity_type = entity_type AND entity_id = entity_id
    );
END;

-- 5.4 Function to get translation in specific language
CREATE FUNCTION IF NOT EXISTS get_entity_translation(entity_type TEXT, entity_id INTEGER, language_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'language_id', language_id,
            'name', name,
            'description', description
        )
        FROM geo_translations
        WHERE entity_type = entity_type 
          AND entity_id = entity_id 
          AND language_id = language_id
    );
END;

-- 5.5 Function to get entity by translation
CREATE FUNCTION IF NOT EXISTS get_entity_by_translation(entity_type TEXT, language_id INTEGER, name TEXT)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT entity_id
        FROM geo_translations
        WHERE entity_type = entity_type 
          AND language_id = language_id 
          AND name = name
        LIMIT 1
    );
END;