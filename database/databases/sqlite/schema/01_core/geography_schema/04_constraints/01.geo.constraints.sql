-- =============================================
-- Constraints for: Geography Tables
-- Description: Data integrity rules for geographic data
-- =============================================

-- =============================================
-- 1. CONTINENTS TABLE CONSTRAINTS
-- =============================================

-- 1.1 NOT NULL constraints
-- Already enforced during table creation
-- ALTER TABLE continents ADD CONSTRAINT ck_continents_code_not_null 
--     CHECK (code IS NOT NULL AND length(trim(code)) > 0);

-- 1.2 Check constraints for data validation

-- Code must be exactly 2 characters
ALTER TABLE continents ADD CONSTRAINT ck_continents_code_length 
    CHECK (length(trim(code)) = 2);

-- Code must be uppercase letters only
ALTER TABLE continents ADD CONSTRAINT ck_continents_code_uppercase 
    CHECK (code GLOB '[A-Z]*');

-- Name must be at least 2 characters
ALTER TABLE continents ADD CONSTRAINT ck_continents_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- Population must be non-negative
ALTER TABLE continents ADD CONSTRAINT ck_continents_population_positive 
    CHECK (population IS NULL OR population >= 0);

-- Area must be non-negative
ALTER TABLE continents ADD CONSTRAINT ck_continents_area_positive 
    CHECK (area_sq_km IS NULL OR area_sq_km >= 0);

-- Sort order must be non-negative
ALTER TABLE continents ADD CONSTRAINT ck_continents_sort_order_positive 
    CHECK (sort_order >= 0);

-- =============================================
-- 2. COUNTRIES TABLE CONSTRAINTS
-- =============================================

-- 2.1 NOT NULL constraints
ALTER TABLE countries ADD CONSTRAINT ck_countries_code_not_null 
    CHECK (code IS NOT NULL AND length(trim(code)) > 0);

ALTER TABLE countries ADD CONSTRAINT ck_countries_code3_not_null 
    CHECK (code3 IS NOT NULL AND length(trim(code3)) > 0);

ALTER TABLE countries ADD CONSTRAINT ck_countries_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- 2.2 Check constraints for data validation

-- Code must be exactly 2 characters
ALTER TABLE countries ADD CONSTRAINT ck_countries_code_length 
    CHECK (length(trim(code)) = 2);

-- Code must be uppercase letters only
ALTER TABLE countries ADD CONSTRAINT ck_countries_code_uppercase 
    CHECK (code GLOB '[A-Z]*');

-- Code3 must be exactly 3 characters
ALTER TABLE countries ADD CONSTRAINT ck_countries_code3_length 
    CHECK (length(trim(code3)) = 3);

-- Code3 must be uppercase letters only
ALTER TABLE countries ADD CONSTRAINT ck_countries_code3_uppercase 
    CHECK (code3 GLOB '[A-Z]*');

-- Name must be at least 2 characters
ALTER TABLE countries ADD CONSTRAINT ck_countries_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- Population must be non-negative
ALTER TABLE countries ADD CONSTRAINT ck_countries_population_positive 
    CHECK (population IS NULL OR population >= 0);

-- Area must be non-negative
ALTER TABLE countries ADD CONSTRAINT ck_countries_area_positive 
    CHECK (area_sq_km IS NULL OR area_sq_km >= 0);

-- Sort order must be non-negative
ALTER TABLE countries ADD CONSTRAINT ck_countries_sort_order_positive 
    CHECK (sort_order >= 0);

-- ISO numeric must be between 0 and 999
ALTER TABLE countries ADD CONSTRAINT ck_countries_iso_numeric_range 
    CHECK (iso_numeric IS NULL OR (iso_numeric >= 0 AND iso_numeric <= 999));

-- Currency code must be exactly 3 characters
ALTER TABLE countries ADD CONSTRAINT ck_countries_currency_code_length 
    CHECK (currency_code IS NULL OR length(trim(currency_code)) = 3);

-- Currency code must be uppercase letters only
ALTER TABLE countries ADD CONSTRAINT ck_countries_currency_code_uppercase 
    CHECK (currency_code IS NULL OR currency_code GLOB '[A-Z]*');

-- Phone code must be at least 2 characters (with + sign)
ALTER TABLE countries ADD CONSTRAINT ck_countries_phone_code_format 
    CHECK (phone_code IS NULL OR phone_code GLOB '+*');

-- =============================================
-- 3. STATES TABLE CONSTRAINTS
-- =============================================

-- 3.1 NOT NULL constraints
ALTER TABLE states ADD CONSTRAINT ck_states_code_not_null 
    CHECK (code IS NOT NULL AND length(trim(code)) > 0);

ALTER TABLE states ADD CONSTRAINT ck_states_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

ALTER TABLE states ADD CONSTRAINT ck_states_country_id_not_null 
    CHECK (country_id IS NOT NULL);

-- 3.2 Check constraints for data validation

-- Name must be at least 2 characters
ALTER TABLE states ADD CONSTRAINT ck_states_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- Code must be at least 1 character
ALTER TABLE states ADD CONSTRAINT ck_states_code_length 
    CHECK (length(trim(code)) >= 1 AND length(trim(code)) <= 10);

-- Population must be non-negative
ALTER TABLE states ADD CONSTRAINT ck_states_population_positive 
    CHECK (population IS NULL OR population >= 0);

-- Area must be non-negative
ALTER TABLE states ADD CONSTRAINT ck_states_area_positive 
    CHECK (area_sq_km IS NULL OR area_sq_km >= 0);

-- Sort order must be non-negative
ALTER TABLE states ADD CONSTRAINT ck_states_sort_order_positive 
    CHECK (sort_order >= 0);

-- =============================================
-- 4. REGIONS TABLE CONSTRAINTS
-- =============================================

-- 4.1 NOT NULL constraints
ALTER TABLE regions ADD CONSTRAINT ck_regions_code_not_null 
    CHECK (code IS NOT NULL AND length(trim(code)) > 0);

ALTER TABLE regions ADD CONSTRAINT ck_regions_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- 4.2 Check constraints for data validation

-- Code must be at least 2 characters
ALTER TABLE regions ADD CONSTRAINT ck_regions_code_length 
    CHECK (length(trim(code)) >= 2 AND length(trim(code)) <= 10);

-- Code must be uppercase letters only
ALTER TABLE regions ADD CONSTRAINT ck_regions_code_uppercase 
    CHECK (code GLOB '[A-Z]*');

-- Name must be at least 2 characters
ALTER TABLE regions ADD CONSTRAINT ck_regions_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 100);

-- Sort order must be non-negative
ALTER TABLE regions ADD CONSTRAINT ck_regions_sort_order_positive 
    CHECK (sort_order >= 0);

-- =============================================
-- 5. REFERENTIAL INTEGRITY CONSTRAINTS
-- =============================================

-- 5.1 Ensure country's continent is active (if continent exists)
CREATE TRIGGER IF NOT EXISTS tr_countries_continent_active
BEFORE INSERT ON countries
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             (SELECT is_active FROM continents WHERE id = NEW.continent_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive continent')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_countries_continent_active_update
BEFORE UPDATE ON countries
WHEN NEW.continent_id != OLD.continent_id
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             (SELECT is_active FROM continents WHERE id = NEW.continent_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive continent')
    END;
END;

-- 5.2 Ensure state's country is active
CREATE TRIGGER IF NOT EXISTS tr_states_country_active
BEFORE INSERT ON states
BEGIN
    SELECT CASE
        WHEN (SELECT is_active FROM countries WHERE id = NEW.country_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive country')
    END;
END;

-- 5.3 Ensure region's continent is active (if continent exists)
CREATE TRIGGER IF NOT EXISTS tr_regions_continent_active
BEFORE INSERT ON regions
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             (SELECT is_active FROM continents WHERE id = NEW.continent_id) = 0
        THEN RAISE(ABORT, 'Cannot assign to inactive continent')
    END;
END;

-- =============================================
-- 6. CASCADE CONSTRAINTS (Enforced via Foreign Keys)
-- =============================================

-- When a continent is deleted:
-- - Countries with that continent_id will have it set to NULL
-- - This is handled by: FOREIGN KEY (continent_id) REFERENCES continents(id) ON DELETE SET NULL

-- When a country is deleted:
-- - States with that country_id will be deleted
-- - This is handled by: FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE

-- =============================================
-- 7. VALIDATION FUNCTIONS
-- =============================================

-- 7.1 Function to validate ISO country code
CREATE FUNCTION IF NOT EXISTS is_valid_country_code(code TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN code IS NOT NULL 
        AND length(trim(code)) = 2 
        AND code GLOB '[A-Z]*';
END;

-- 7.2 Function to validate ISO 3-letter country code
CREATE FUNCTION IF NOT EXISTS is_valid_country_code3(code3 TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN code3 IS NOT NULL 
        AND length(trim(code3)) = 3 
        AND code3 GLOB '[A-Z]*';
END;

-- 7.3 Function to validate continent code
CREATE FUNCTION IF NOT EXISTS is_valid_continent_code(code TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN code IS NOT NULL 
        AND length(trim(code)) = 2 
        AND code GLOB '[A-Z]*';
END;

-- 7.4 Function to check if country exists in continent
CREATE FUNCTION IF NOT EXISTS country_in_continent(country_id INTEGER, continent_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM countries 
        WHERE id = country_id AND continent_id = continent_id
    );
END;

-- 7.5 Function to check if state exists in country
CREATE FUNCTION IF NOT EXISTS state_in_country(state_id INTEGER, country_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM states 
        WHERE id = state_id AND country_id = country_id
    );
END;