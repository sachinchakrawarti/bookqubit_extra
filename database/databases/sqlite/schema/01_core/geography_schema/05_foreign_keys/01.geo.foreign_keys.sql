-- =============================================
-- Foreign Keys for: Geography Tables
-- Description: Define relationships between geographic entities
-- =============================================

-- =============================================
-- 1. COUNTRIES FOREIGN KEYS
-- =============================================

-- 1.1 Foreign key from countries to continents
-- When a continent is deleted, set continent_id to NULL
ALTER TABLE countries ADD CONSTRAINT fk_countries_continent_id 
    FOREIGN KEY (continent_id) 
    REFERENCES continents(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 1.2 Foreign key from countries to regions
-- When a region is deleted, set region_id to NULL
ALTER TABLE countries ADD CONSTRAINT fk_countries_region_id 
    FOREIGN KEY (region_id) 
    REFERENCES regions(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- =============================================
-- 2. STATES FOREIGN KEYS
-- =============================================

-- 2.1 Foreign key from states to countries
-- When a country is deleted, delete all its states (CASCADE)
ALTER TABLE states ADD CONSTRAINT fk_states_country_id 
    FOREIGN KEY (country_id) 
    REFERENCES countries(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 2.2 Foreign key from states to regions
-- When a region is deleted, set region_id to NULL
ALTER TABLE states ADD CONSTRAINT fk_states_region_id 
    FOREIGN KEY (region_id) 
    REFERENCES regions(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- =============================================
-- 3. REGIONS FOREIGN KEYS
-- =============================================

-- 3.1 Foreign key from regions to continents
-- When a continent is deleted, set continent_id to NULL
ALTER TABLE regions ADD CONSTRAINT fk_regions_continent_id 
    FOREIGN KEY (continent_id) 
    REFERENCES continents(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- =============================================
-- 4. ADDITIONAL FOREIGN KEY CONSTRAINTS (Optional - for data integrity)
-- =============================================

-- 4.1 Check that country's continent_id references an active continent
-- This is handled by the foreign key above with ON DELETE SET NULL

-- 4.2 Check that state's country_id references an active country
-- This is handled by the foreign key above with ON DELETE CASCADE

-- 4.3 Check that region's continent_id references an active continent
-- This is handled by the foreign key above with ON DELETE SET NULL

-- =============================================
-- 5. FOREIGN KEY VALIDATION FUNCTIONS
-- =============================================

-- 5.1 Function to check if a country exists
CREATE FUNCTION IF NOT EXISTS country_exists(country_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM countries WHERE id = country_id);
END;

-- 5.2 Function to check if a continent exists
CREATE FUNCTION IF NOT EXISTS continent_exists(continent_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM continents WHERE id = continent_id);
END;

-- 5.3 Function to check if a region exists
CREATE FUNCTION IF NOT EXISTS region_exists(region_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM regions WHERE id = region_id);
END;

-- 5.4 Function to check if a state belongs to a country
CREATE FUNCTION IF NOT EXISTS state_belongs_to_country(state_id INTEGER, country_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM states 
        WHERE id = state_id AND country_id = country_id
    );
END;

-- 5.5 Function to check if a country belongs to a continent
CREATE FUNCTION IF NOT EXISTS country_belongs_to_continent(country_id INTEGER, continent_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM countries 
        WHERE id = country_id AND continent_id = continent_id
    );
END;

-- 5.6 Function to check if a country belongs to a region
CREATE FUNCTION IF NOT EXISTS country_belongs_to_region(country_id INTEGER, region_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM countries 
        WHERE id = country_id AND region_id = region_id
    );
END;

-- =============================================
-- 6. FOREIGN KEY VALIDATION TRIGGERS
-- =============================================

-- 6.1 Trigger to ensure country's continent exists
CREATE TRIGGER IF NOT EXISTS tr_countries_continent_exists
BEFORE INSERT ON countries
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM continents WHERE id = NEW.continent_id)
        THEN RAISE(ABORT, 'Continent does not exist')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_countries_continent_exists_update
BEFORE UPDATE ON countries
WHEN NEW.continent_id != OLD.continent_id
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM continents WHERE id = NEW.continent_id)
        THEN RAISE(ABORT, 'Continent does not exist')
    END;
END;

-- 6.2 Trigger to ensure country's region exists
CREATE TRIGGER IF NOT EXISTS tr_countries_region_exists
BEFORE INSERT ON countries
BEGIN
    SELECT CASE
        WHEN NEW.region_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM regions WHERE id = NEW.region_id)
        THEN RAISE(ABORT, 'Region does not exist')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_countries_region_exists_update
BEFORE UPDATE ON countries
WHEN NEW.region_id != OLD.region_id
BEGIN
    SELECT CASE
        WHEN NEW.region_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM regions WHERE id = NEW.region_id)
        THEN RAISE(ABORT, 'Region does not exist')
    END;
END;

-- 6.3 Trigger to ensure state's country exists
CREATE TRIGGER IF NOT EXISTS tr_states_country_exists
BEFORE INSERT ON states
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (SELECT 1 FROM countries WHERE id = NEW.country_id)
        THEN RAISE(ABORT, 'Country does not exist')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_states_country_exists_update
BEFORE UPDATE ON states
WHEN NEW.country_id != OLD.country_id
BEGIN
    SELECT CASE
        WHEN NOT EXISTS (SELECT 1 FROM countries WHERE id = NEW.country_id)
        THEN RAISE(ABORT, 'Country does not exist')
    END;
END;

-- 6.4 Trigger to ensure state's region exists
CREATE TRIGGER IF NOT EXISTS tr_states_region_exists
BEFORE INSERT ON states
BEGIN
    SELECT CASE
        WHEN NEW.region_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM regions WHERE id = NEW.region_id)
        THEN RAISE(ABORT, 'Region does not exist')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_states_region_exists_update
BEFORE UPDATE ON states
WHEN NEW.region_id != OLD.region_id
BEGIN
    SELECT CASE
        WHEN NEW.region_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM regions WHERE id = NEW.region_id)
        THEN RAISE(ABORT, 'Region does not exist')
    END;
END;

-- 6.5 Trigger to ensure region's continent exists
CREATE TRIGGER IF NOT EXISTS tr_regions_continent_exists
BEFORE INSERT ON regions
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM continents WHERE id = NEW.continent_id)
        THEN RAISE(ABORT, 'Continent does not exist')
    END;
END;

CREATE TRIGGER IF NOT EXISTS tr_regions_continent_exists_update
BEFORE UPDATE ON regions
WHEN NEW.continent_id != OLD.continent_id
BEGIN
    SELECT CASE
        WHEN NEW.continent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM continents WHERE id = NEW.continent_id)
        THEN RAISE(ABORT, 'Continent does not exist')
    END;
END;