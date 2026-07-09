-- =============================================
-- Procedures for: Geography Tables
-- Description: Complex geographic operations
-- =============================================

-- =============================================
-- 1. BULK INSERT PROCEDURES
-- =============================================

-- 1.1 Bulk insert continents
CREATE PROCEDURE bulk_insert_continents(
    p_continents TEXT  -- JSON array of continents
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_continent JSON;
    
    -- Validate JSON
    IF NOT json_valid(p_continents) THEN
        SELECT 'Invalid JSON format' AS error;
        RETURN;
    END IF;
    
    SET v_total = json_array_length(p_continents);
    
    WHILE v_counter < v_total DO
        SET v_continent = json_extract(p_continents, '$[' || v_counter || ']');
        
        INSERT INTO continents (
            code,
            name,
            name_native,
            population,
            area_sq_km,
            sort_order
        ) VALUES (
            json_extract(v_continent, '$.code'),
            json_extract(v_continent, '$.name'),
            json_extract(v_continent, '$.name_native'),
            json_extract(v_continent, '$.population'),
            json_extract(v_continent, '$.area_sq_km'),
            COALESCE(json_extract(v_continent, '$.sort_order'), 0)
        );
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_counter AS continents_inserted;
END;

-- 1.2 Bulk insert countries
CREATE PROCEDURE bulk_insert_countries(
    p_countries TEXT  -- JSON array of countries
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_country JSON;
    
    IF NOT json_valid(p_countries) THEN
        SELECT 'Invalid JSON format' AS error;
        RETURN;
    END IF;
    
    SET v_total = json_array_length(p_countries);
    
    WHILE v_counter < v_total DO
        SET v_country = json_extract(p_countries, '$[' || v_counter || ']');
        
        INSERT INTO countries (
            code,
            code3,
            name,
            name_native,
            capital,
            continent_id,
            region_id,
            population,
            area_sq_km,
            phone_code,
            currency_code,
            currency_name,
            iso_numeric,
            sort_order
        ) VALUES (
            json_extract(v_country, '$.code'),
            json_extract(v_country, '$.code3'),
            json_extract(v_country, '$.name'),
            json_extract(v_country, '$.name_native'),
            json_extract(v_country, '$.capital'),
            json_extract(v_country, '$.continent_id'),
            json_extract(v_country, '$.region_id'),
            json_extract(v_country, '$.population'),
            json_extract(v_country, '$.area_sq_km'),
            json_extract(v_country, '$.phone_code'),
            json_extract(v_country, '$.currency_code'),
            json_extract(v_country, '$.currency_name'),
            json_extract(v_country, '$.iso_numeric'),
            COALESCE(json_extract(v_country, '$.sort_order'), 0)
        );
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_counter AS countries_inserted;
END;

-- 1.3 Bulk insert states
CREATE PROCEDURE bulk_insert_states(
    p_states TEXT  -- JSON array of states
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_state JSON;
    
    IF NOT json_valid(p_states) THEN
        SELECT 'Invalid JSON format' AS error;
        RETURN;
    END IF;
    
    SET v_total = json_array_length(p_states);
    
    WHILE v_counter < v_total DO
        SET v_state = json_extract(p_states, '$[' || v_counter || ']');
        
        INSERT INTO states (
            code,
            name,
            name_native,
            country_id,
            region_id,
            capital,
            population,
            area_sq_km,
            sort_order
        ) VALUES (
            json_extract(v_state, '$.code'),
            json_extract(v_state, '$.name'),
            json_extract(v_state, '$.name_native'),
            json_extract(v_state, '$.country_id'),
            json_extract(v_state, '$.region_id'),
            json_extract(v_state, '$.capital'),
            json_extract(v_state, '$.population'),
            json_extract(v_state, '$.area_sq_km'),
            COALESCE(json_extract(v_state, '$.sort_order'), 0)
        );
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_counter AS states_inserted;
END;

-- =============================================
-- 2. DATA IMPORT PROCEDURES
-- =============================================

-- 2.1 Import country data from CSV (JSON format)
CREATE PROCEDURE import_countries_from_json(
    p_json_data TEXT
)
BEGIN
    DECLARE v_counter INTEGER DEFAULT 0;
    DECLARE v_total INTEGER;
    DECLARE v_item JSON;
    
    IF NOT json_valid(p_json_data) THEN
        SELECT 'Invalid JSON format' AS error;
        RETURN;
    END IF;
    
    SET v_total = json_array_length(p_json_data);
    
    WHILE v_counter < v_total DO
        SET v_item = json_extract(p_json_data, '$[' || v_counter || ']');
        
        BEGIN TRANSACTION;
        
        -- Insert or update continent if provided
        IF json_extract(v_item, '$.continent_code') IS NOT NULL THEN
            INSERT OR IGNORE INTO continents (code, name)
            VALUES (
                json_extract(v_item, '$.continent_code'),
                json_extract(v_item, '$.continent_name')
            );
        END IF;
        
        -- Insert or update country
        INSERT OR REPLACE INTO countries (
            code,
            code3,
            name,
            name_native,
            capital,
            continent_id,
            population,
            area_sq_km,
            phone_code,
            currency_code
        ) VALUES (
            json_extract(v_item, '$.code'),
            json_extract(v_item, '$.code3'),
            json_extract(v_item, '$.name'),
            json_extract(v_item, '$.name_native'),
            json_extract(v_item, '$.capital'),
            (SELECT id FROM continents WHERE code = json_extract(v_item, '$.continent_code')),
            json_extract(v_item, '$.population'),
            json_extract(v_item, '$.area_sq_km'),
            json_extract(v_item, '$.phone_code'),
            json_extract(v_item, '$.currency_code')
        );
        
        COMMIT;
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT v_counter AS countries_imported;
END;

-- =============================================
-- 3. DATA SYNCHRONIZATION PROCEDURES
-- =============================================

-- 3.1 Sync country populations
CREATE PROCEDURE sync_country_populations()
BEGIN
    UPDATE countries
    SET population = (
        SELECT COALESCE(SUM(population), 0)
        FROM states
        WHERE country_id = countries.id
        AND is_active = 1
    )
    WHERE is_active = 1;
    
    SELECT CHANGES() AS countries_updated;
END;

-- 3.2 Sync continent populations
CREATE PROCEDURE sync_continent_populations()
BEGIN
    UPDATE continents
    SET population = (
        SELECT COALESCE(SUM(population), 0)
        FROM countries
        WHERE continent_id = continents.id
        AND is_active = 1
    )
    WHERE is_active = 1;
    
    SELECT CHANGES() AS continents_updated;
END;

-- 3.3 Sync all populations (cascade)
CREATE PROCEDURE sync_all_populations()
BEGIN
    -- Sync states to countries
    UPDATE countries
    SET population = (
        SELECT COALESCE(SUM(population), 0)
        FROM states
        WHERE country_id = countries.id
        AND is_active = 1
    )
    WHERE is_active = 1;
    
    -- Sync countries to continents
    UPDATE continents
    SET population = (
        SELECT COALESCE(SUM(population), 0)
        FROM countries
        WHERE continent_id = continents.id
        AND is_active = 1
    )
    WHERE is_active = 1;
    
    SELECT 'Populations synchronized' AS status;
END;

-- =============================================
-- 4. DATA EXPORT PROCEDURES
-- =============================================

-- 4.1 Export country data as JSON
CREATE PROCEDURE export_countries_as_json()
BEGIN
    SELECT json_group_array(
        json_object(
            'id', id,
            'code', code,
            'code3', code3,
            'name', name,
            'name_native', name_native,
            'capital', capital,
            'continent', (SELECT name FROM continents WHERE id = continent_id),
            'population', population,
            'area_sq_km', area_sq_km,
            'phone_code', phone_code,
            'currency_code', currency_code,
            'currency_name', currency_name,
            'state_count', (SELECT COUNT(*) FROM states WHERE country_id = countries.id AND is_active = 1)
        )
    ) AS countries_json
    FROM countries
    WHERE is_active = 1
    ORDER BY sort_order, name;
END;

-- 4.2 Export full geographic data as JSON
CREATE PROCEDURE export_full_geography_as_json()
BEGIN
    SELECT json_object(
        'continents', (
            SELECT json_group_array(
                json_object(
                    'id', id,
                    'code', code,
                    'name', name,
                    'name_native', name_native,
                    'population', population,
                    'area_sq_km', area_sq_km,
                    'countries', (
                        SELECT json_group_array(
                            json_object(
                                'id', co.id,
                                'code', co.code,
                                'name', co.name,
                                'capital', co.capital,
                                'population', co.population,
                                'states', (
                                    SELECT json_group_array(
                                        json_object(
                                            'id', s.id,
                                            'name', s.name,
                                            'code', s.code,
                                            'capital', s.capital,
                                            'population', s.population
                                        )
                                    )
                                    FROM states s
                                    WHERE s.country_id = co.id AND s.is_active = 1
                                )
                            )
                        )
                        FROM countries co
                        WHERE co.continent_id = continents.id AND co.is_active = 1
                    )
                )
            )
            FROM continents
            WHERE is_active = 1
        )
    ) AS full_geography_json;
END;

-- =============================================
-- 5. DATA VALIDATION PROCEDURES
-- =============================================

-- 5.1 Validate country codes
CREATE PROCEDURE validate_country_codes()
BEGIN
    SELECT 
        id,
        code,
        code3,
        CASE 
            WHEN length(code) != 2 THEN 'Invalid code length'
            WHEN code NOT GLOB '[A-Z]*' THEN 'Invalid code format'
            WHEN length(code3) != 3 THEN 'Invalid code3 length'
            WHEN code3 NOT GLOB '[A-Z]*' THEN 'Invalid code3 format'
            ELSE 'Valid'
        END AS validation_status
    FROM countries
    WHERE is_active = 1
    AND (
        length(code) != 2 
        OR code NOT GLOB '[A-Z]*'
        OR length(code3) != 3
        OR code3 NOT GLOB '[A-Z]*'
    );
END;

-- 5.2 Check duplicate codes
CREATE PROCEDURE check_duplicate_codes()
BEGIN
    SELECT 
        'Duplicate country codes' AS check_type,
        code,
        COUNT(*) AS duplicate_count,
        GROUP_CONCAT(id) AS ids
    FROM countries
    GROUP BY code
    HAVING COUNT(*) > 1
    UNION ALL
    SELECT 
        'Duplicate country code3',
        code3,
        COUNT(*),
        GROUP_CONCAT(id)
    FROM countries
    GROUP BY code3
    HAVING COUNT(*) > 1
    UNION ALL
    SELECT 
        'Duplicate continent codes',
        code,
        COUNT(*),
        GROUP_CONCAT(id)
    FROM continents
    GROUP BY code
    HAVING COUNT(*) > 1;
END;

-- =============================================
-- 6. DATA FIX PROCEDURES
-- =============================================

-- 6.1 Fix invalid country codes
CREATE PROCEDURE fix_invalid_codes()
BEGIN
    -- Update codes to uppercase
    UPDATE countries 
    SET code = UPPER(code), 
        code3 = UPPER(code3)
    WHERE code != UPPER(code) 
       OR code3 != UPPER(code3);
    
    SELECT CHANGES() AS codes_fixed;
END;

-- 6.2 Fix orphaned records
CREATE PROCEDURE fix_orphaned_records()
BEGIN
    -- Fix countries without continent
    UPDATE countries 
    SET continent_id = (SELECT id FROM continents WHERE code = 'UNKNOWN')
    WHERE continent_id IS NOT NULL 
    AND NOT EXISTS (SELECT 1 FROM continents WHERE id = continent_id);
    
    -- Fix states without country
    UPDATE states 
    SET is_active = 0
    WHERE NOT EXISTS (SELECT 1 FROM countries WHERE id = country_id);
    
    SELECT 'Orphaned records fixed' AS status;
END;