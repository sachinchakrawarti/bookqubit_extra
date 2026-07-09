-- =============================================
-- Triggers for: Geography Tables
-- Description: Data integrity, audit, and automation triggers
-- =============================================

-- =============================================
-- 1. CONTINENTS TABLE TRIGGERS
-- =============================================

-- 1.1 Update timestamp on continent update
CREATE TRIGGER IF NOT EXISTS tr_continents_update_timestamp
AFTER UPDATE ON continents
BEGIN
    UPDATE continents 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 1.2 Validate continent code format
CREATE TRIGGER IF NOT EXISTS tr_continents_validate_code
BEFORE INSERT ON continents
BEGIN
    SELECT CASE
        WHEN NEW.code IS NULL OR length(trim(NEW.code)) != 2
        THEN RAISE(ABORT, 'Continent code must be exactly 2 characters')
    END;
    SELECT CASE
        WHEN NEW.code NOT GLOB '[A-Z]*'
        THEN RAISE(ABORT, 'Continent code must be uppercase letters only')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_continents_validate_code_update
BEFORE UPDATE ON continents
WHEN NEW.code != OLD.code
BEGIN
    SELECT CASE
        WHEN NEW.code IS NULL OR length(trim(NEW.code)) != 2
        THEN RAISE(ABORT, 'Continent code must be exactly 2 characters')
    END;
    SELECT CASE
        WHEN NEW.code NOT GLOB '[A-Z]*'
        THEN RAISE(ABORT, 'Continent code must be uppercase letters only')
    END;
END;

-- 1.3 Prevent deletion of continent with active countries
CREATE TRIGGER IF NOT EXISTS tr_continents_prevent_delete_with_countries
BEFORE DELETE ON continents
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM countries WHERE continent_id = OLD.id AND is_active = 1)
        THEN RAISE(ABORT, 'Cannot delete continent with active countries')
    END;
END;

-- 1.4 Log continent creation
CREATE TRIGGER IF NOT EXISTS tr_continents_audit_insert
AFTER INSERT ON continents
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'continents',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km,
            'is_active', NEW.is_active
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 1.5 Log continent update
CREATE TRIGGER IF NOT EXISTS tr_continents_audit_update
AFTER UPDATE ON continents
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'continents',
        NEW.id,
        'UPDATE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'population', OLD.population,
            'area_sq_km', OLD.area_sq_km,
            'is_active', OLD.is_active
        ),
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km,
            'is_active', NEW.is_active
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 1.6 Log continent deletion
CREATE TRIGGER IF NOT EXISTS tr_continents_audit_delete
AFTER DELETE ON continents
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'continents',
        OLD.id,
        'DELETE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'population', OLD.population,
            'area_sq_km', OLD.area_sq_km,
            'is_active', OLD.is_active
        ),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 2. COUNTRIES TABLE TRIGGERS
-- =============================================

-- 2.1 Update timestamp on country update
CREATE TRIGGER IF NOT EXISTS tr_countries_update_timestamp
AFTER UPDATE ON countries
BEGIN
    UPDATE countries 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 2.2 Validate country code format
CREATE TRIGGER IF NOT EXISTS tr_countries_validate_code
BEFORE INSERT ON countries
BEGIN
    SELECT CASE
        WHEN NEW.code IS NULL OR length(trim(NEW.code)) != 2
        THEN RAISE(ABORT, 'Country code must be exactly 2 characters')
    END;
    SELECT CASE
        WHEN NEW.code NOT GLOB '[A-Z]*'
        THEN RAISE(ABORT, 'Country code must be uppercase letters only')
    END;
END;

-- 2.3 Validate country code3 format
CREATE TRIGGER IF NOT EXISTS tr_countries_validate_code3
BEFORE INSERT ON countries
BEGIN
    SELECT CASE
        WHEN NEW.code3 IS NULL OR length(trim(NEW.code3)) != 3
        THEN RAISE(ABORT, 'Country code3 must be exactly 3 characters')
    END;
    SELECT CASE
        WHEN NEW.code3 NOT GLOB '[A-Z]*'
        THEN RAISE(ABORT, 'Country code3 must be uppercase letters only')
    END;
END;

-- 2.4 Validate continent exists and is active
CREATE TRIGGER IF NOT EXISTS tr_countries_validate_continent
BEFORE INSERT ON countries
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             (SELECT is_active FROM continents WHERE id = NEW.continent_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive continent')
    END;
END;

-- 2.5 Prevent deletion of country with active states
CREATE TRIGGER IF NOT EXISTS tr_countries_prevent_delete_with_states
BEFORE DELETE ON countries
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM states WHERE country_id = OLD.id AND is_active = 1)
        THEN RAISE(ABORT, 'Cannot delete country with active states')
    END;
END;

-- 2.6 Log country creation
CREATE TRIGGER IF NOT EXISTS tr_countries_audit_insert
AFTER INSERT ON countries
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'countries',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'code3', NEW.code3,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'capital', NEW.capital,
            'continent_id', NEW.continent_id,
            'region_id', NEW.region_id,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 2.7 Log country update
CREATE TRIGGER IF NOT EXISTS tr_countries_audit_update
AFTER UPDATE ON countries
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'countries',
        NEW.id,
        'UPDATE',
        json_object(
            'code', OLD.code,
            'code3', OLD.code3,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'capital', OLD.capital,
            'continent_id', OLD.continent_id,
            'region_id', OLD.region_id,
            'population', OLD.population,
            'area_sq_km', OLD.area_sq_km
        ),
        json_object(
            'code', NEW.code,
            'code3', NEW.code3,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'capital', NEW.capital,
            'continent_id', NEW.continent_id,
            'region_id', NEW.region_id,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 2.8 Log country deletion
CREATE TRIGGER IF NOT EXISTS tr_countries_audit_delete
AFTER DELETE ON countries
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'countries',
        OLD.id,
        'DELETE',
        json_object(
            'code', OLD.code,
            'code3', OLD.code3,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'capital', OLD.capital,
            'continent_id', OLD.continent_id,
            'region_id', OLD.region_id,
            'population', OLD.population,
            'area_sq_km', OLD.area_sq_km
        ),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 3. STATES TABLE TRIGGERS
-- =============================================

-- 3.1 Update timestamp on state update
CREATE TRIGGER IF NOT EXISTS tr_states_update_timestamp
AFTER UPDATE ON states
BEGIN
    UPDATE states 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 3.2 Validate country exists and is active
CREATE TRIGGER IF NOT EXISTS tr_states_validate_country
BEFORE INSERT ON states
BEGIN
    SELECT CASE
        WHEN (SELECT is_active FROM countries WHERE id = NEW.country_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive country')
    END;
END;

-- 3.3 Log state creation
CREATE TRIGGER IF NOT EXISTS tr_states_audit_insert
AFTER INSERT ON states
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'states',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'country_id', NEW.country_id,
            'region_id', NEW.region_id,
            'capital', NEW.capital,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 3.4 Log state update
CREATE TRIGGER IF NOT EXISTS tr_states_audit_update
AFTER UPDATE ON states
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'states',
        NEW.id,
        'UPDATE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'country_id', OLD.country_id,
            'region_id', OLD.region_id,
            'capital', OLD.capital,
            'population', OLD.population,
            'area_sq_km', OLD.area_sq_km
        ),
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'country_id', NEW.country_id,
            'region_id', NEW.region_id,
            'capital', NEW.capital,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 3.5 Log state deletion
CREATE TRIGGER IF NOT EXISTS tr_states_audit_delete
AFTER DELETE ON states
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'states',
        OLD.id,
        'DELETE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'country_id', OLD.country_id,
            'region_id', OLD.region_id,
            'capital', OLD.capital,
            'population', OLD.population,
            'area_sq_km', OLD.area_sq_km
        ),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 4. REGIONS TABLE TRIGGERS
-- =============================================

-- 4.1 Update timestamp on region update
CREATE TRIGGER IF NOT EXISTS tr_regions_update_timestamp
AFTER UPDATE ON regions
BEGIN
    UPDATE regions 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id;
END;

-- 4.2 Validate region code format
CREATE TRIGGER IF NOT EXISTS tr_regions_validate_code
BEFORE INSERT ON regions
BEGIN
    SELECT CASE
        WHEN NEW.code IS NULL OR length(trim(NEW.code)) < 2
        THEN RAISE(ABORT, 'Region code must be at least 2 characters')
    END;
    SELECT CASE
        WHEN NEW.code NOT GLOB '[A-Z]*'
        THEN RAISE(ABORT, 'Region code must be uppercase letters only')
    END;
END;

-- 4.3 Validate continent exists and is active
CREATE TRIGGER IF NOT EXISTS tr_regions_validate_continent
BEFORE INSERT ON regions
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             (SELECT is_active FROM continents WHERE id = NEW.continent_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive continent')
    END;
END;

-- 4.4 Log region creation
CREATE TRIGGER IF NOT EXISTS tr_regions_audit_insert
AFTER INSERT ON regions
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'regions',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'continent_id', NEW.continent_id,
            'description', NEW.description
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 4.5 Log region update
CREATE TRIGGER IF NOT EXISTS tr_regions_audit_update
AFTER UPDATE ON regions
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'regions',
        NEW.id,
        'UPDATE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'continent_id', OLD.continent_id,
            'description', OLD.description
        ),
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'continent_id', NEW.continent_id,
            'description', NEW.description
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 4.6 Log region deletion
CREATE TRIGGER IF NOT EXISTS tr_regions_audit_delete
AFTER DELETE ON regions
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'regions',
        OLD.id,
        'DELETE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'name_native', OLD.name_native,
            'continent_id', OLD.continent_id,
            'description', OLD.description
        ),
        CURRENT_TIMESTAMP
    );
END;