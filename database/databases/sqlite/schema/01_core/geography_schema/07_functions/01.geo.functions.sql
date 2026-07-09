-- =============================================
-- Functions for: Geography Tables
-- Description: Reusable functions for geographic operations
-- =============================================

-- =============================================
-- 1. CONTINENT FUNCTIONS
-- =============================================

-- 1.1 Get continent by code
CREATE FUNCTION IF NOT EXISTS get_continent_by_code(p_code TEXT)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT id FROM continents 
        WHERE code = p_code AND is_active = 1
    );
END;

-- 1.2 Get continent details as JSON
CREATE FUNCTION IF NOT EXISTS get_continent_details(p_continent_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'id', c.id,
            'code', c.code,
            'name', c.name,
            'name_native', c.name_native,
            'population', c.population,
            'area_sq_km', c.area_sq_km,
            'country_count', (SELECT COUNT(*) FROM countries WHERE continent_id = c.id AND is_active = 1),
            'is_active', c.is_active,
            'sort_order', c.sort_order,
            'created_at', c.created_at,
            'updated_at', c.updated_at,
            'translations', (
                SELECT json_group_array(
                    json_object(
                        'language_id', gt.language_id,
                        'name', gt.name,
                        'description', gt.description
                    )
                )
                FROM geo_translations gt
                WHERE gt.entity_type = 'continent' AND gt.entity_id = c.id
            )
        )
        FROM continents c
        WHERE c.id = p_continent_id
    );
END;

-- 1.3 Get all continents as JSON array
CREATE FUNCTION IF NOT EXISTS get_all_continents()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', id,
                'code', code,
                'name', name,
                'name_native', name_native,
                'population', population,
                'country_count', (
                    SELECT COUNT(*) FROM countries WHERE continent_id = continents.id AND is_active = 1
                )
            )
        )
        FROM continents
        WHERE is_active = 1
        ORDER BY sort_order, name
    );
END;

-- 1.4 Get continent statistics
CREATE FUNCTION IF NOT EXISTS get_continent_statistics()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'total_continents', (SELECT COUNT(*) FROM continents WHERE is_active = 1),
            'total_population', (SELECT SUM(population) FROM continents WHERE is_active = 1),
            'total_area', (SELECT SUM(area_sq_km) FROM continents WHERE is_active = 1),
            'largest_continent', (
                SELECT json_object(
                    'name', name,
                    'population', population,
                    'area_sq_km', area_sq_km
                )
                FROM continents
                WHERE is_active = 1
                ORDER BY population DESC
                LIMIT 1
            ),
            'smallest_continent', (
                SELECT json_object(
                    'name', name,
                    'population', population,
                    'area_sq_km', area_sq_km
                )
                FROM continents
                WHERE is_active = 1
                ORDER BY population ASC
                LIMIT 1
            )
        )
    );
END;

-- =============================================
-- 2. COUNTRY FUNCTIONS
-- =============================================

-- 2.1 Get country by code
CREATE FUNCTION IF NOT EXISTS get_country_by_code(p_code TEXT)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT id FROM countries 
        WHERE code = p_code AND is_active = 1
    );
END;

-- 2.2 Get country by code3
CREATE FUNCTION IF NOT EXISTS get_country_by_code3(p_code3 TEXT)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT id FROM countries 
        WHERE code3 = p_code3 AND is_active = 1
    );
END;

-- 2.3 Get country details as JSON
CREATE FUNCTION IF NOT EXISTS get_country_details(p_country_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'id', c.id,
            'code', c.code,
            'code3', c.code3,
            'name', c.name,
            'name_native', c.name_native,
            'capital', c.capital,
            'continent_id', c.continent_id,
            'continent_name', (SELECT name FROM continents WHERE id = c.continent_id),
            'region_id', c.region_id,
            'region_name', (SELECT name FROM regions WHERE id = c.region_id),
            'population', c.population,
            'area_sq_km', c.area_sq_km,
            'phone_code', c.phone_code,
            'currency_code', c.currency_code,
            'currency_name', c.currency_name,
            'state_count', (SELECT COUNT(*) FROM states WHERE country_id = c.id AND is_active = 1),
            'is_active', c.is_active,
            'sort_order', c.sort_order,
            'created_at', c.created_at,
            'updated_at', c.updated_at,
            'translations', (
                SELECT json_group_array(
                    json_object(
                        'language_id', gt.language_id,
                        'name', gt.name,
                        'description', gt.description
                    )
                )
                FROM geo_translations gt
                WHERE gt.entity_type = 'country' AND gt.entity_id = c.id
            )
        )
        FROM countries c
        WHERE c.id = p_country_id
    );
END;

-- 2.4 Get countries by continent
CREATE FUNCTION IF NOT EXISTS get_countries_by_continent(p_continent_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', id,
                'code', code,
                'name', name,
                'capital', capital,
                'population', population,
                'state_count', (SELECT COUNT(*) FROM states WHERE country_id = countries.id AND is_active = 1)
            )
        )
        FROM countries
        WHERE continent_id = p_continent_id AND is_active = 1
        ORDER BY sort_order, name
    );
END;

-- 2.5 Get country statistics
CREATE FUNCTION IF NOT EXISTS get_country_statistics()
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'total_countries', (SELECT COUNT(*) FROM countries WHERE is_active = 1),
            'total_population', (SELECT SUM(population) FROM countries WHERE is_active = 1),
            'total_area', (SELECT SUM(area_sq_km) FROM countries WHERE is_active = 1),
            'most_populous', (
                SELECT json_object(
                    'name', name,
                    'population', population,
                    'continent_name', (SELECT name FROM continents WHERE id = continent_id)
                )
                FROM countries
                WHERE is_active = 1
                ORDER BY population DESC
                LIMIT 1
            ),
            'largest_area', (
                SELECT json_object(
                    'name', name,
                    'area_sq_km', area_sq_km,
                    'continent_name', (SELECT name FROM continents WHERE id = continent_id)
                )
                FROM countries
                WHERE is_active = 1
                ORDER BY area_sq_km DESC
                LIMIT 1
            )
        )
    );
END;

-- =============================================
-- 3. STATE FUNCTIONS
-- =============================================

-- 3.1 Get states by country
CREATE FUNCTION IF NOT EXISTS get_states_by_country(p_country_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', id,
                'code', code,
                'name', name,
                'name_native', name_native,
                'capital', capital,
                'population', population,
                'area_sq_km', area_sq_km
            )
        )
        FROM states
        WHERE country_id = p_country_id AND is_active = 1
        ORDER BY sort_order, name
    );
END;

-- 3.2 Get state details as JSON
CREATE FUNCTION IF NOT EXISTS get_state_details(p_state_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'id', s.id,
            'code', s.code,
            'name', s.name,
            'name_native', s.name_native,
            'country_id', s.country_id,
            'country_name', (SELECT name FROM countries WHERE id = s.country_id),
            'country_code', (SELECT code FROM countries WHERE id = s.country_id),
            'region_id', s.region_id,
            'region_name', (SELECT name FROM regions WHERE id = s.region_id),
            'capital', s.capital,
            'population', s.population,
            'area_sq_km', s.area_sq_km,
            'is_active', s.is_active,
            'sort_order', s.sort_order,
            'created_at', s.created_at,
            'updated_at', s.updated_at
        )
        FROM states s
        WHERE s.id = p_state_id
    );
END;

-- 3.3 Get state statistics by country
CREATE FUNCTION IF NOT EXISTS get_state_statistics(p_country_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'total_states', (SELECT COUNT(*) FROM states WHERE country_id = p_country_id AND is_active = 1),
            'total_population', (SELECT SUM(population) FROM states WHERE country_id = p_country_id AND is_active = 1),
            'total_area', (SELECT SUM(area_sq_km) FROM states WHERE country_id = p_country_id AND is_active = 1),
            'largest_state', (
                SELECT json_object(
                    'name', name,
                    'population', population,
                    'area_sq_km', area_sq_km
                )
                FROM states
                WHERE country_id = p_country_id AND is_active = 1
                ORDER BY population DESC
                LIMIT 1
            )
        )
    );
END;

-- =============================================
-- 4. REGION FUNCTIONS
-- =============================================

-- 4.1 Get region by code
CREATE FUNCTION IF NOT EXISTS get_region_by_code(p_code TEXT)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT id FROM regions 
        WHERE code = p_code AND is_active = 1
    );
END;

-- 4.2 Get region details as JSON
CREATE FUNCTION IF NOT EXISTS get_region_details(p_region_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'id', r.id,
            'code', r.code,
            'name', r.name,
            'name_native', r.name_native,
            'continent_id', r.continent_id,
            'continent_name', (SELECT name FROM continents WHERE id = r.continent_id),
            'description', r.description,
            'country_count', (SELECT COUNT(*) FROM countries WHERE region_id = r.id AND is_active = 1),
            'is_active', r.is_active,
            'sort_order', r.sort_order,
            'created_at', r.created_at,
            'updated_at', r.updated_at
        )
        FROM regions r
        WHERE r.id = p_region_id
    );
END;

-- 4.3 Get regions by continent
CREATE FUNCTION IF NOT EXISTS get_regions_by_continent(p_continent_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'id', id,
                'code', code,
                'name', name,
                'country_count', (SELECT COUNT(*) FROM countries WHERE region_id = regions.id AND is_active = 1)
            )
        )
        FROM regions
        WHERE continent_id = p_continent_id AND is_active = 1
        ORDER BY sort_order, name
    );
END;