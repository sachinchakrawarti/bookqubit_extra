-- =============================================
-- Functions for: Geographic Search
-- Description: Search and lookup functions
-- =============================================

-- =============================================
-- 1. GENERAL SEARCH FUNCTIONS
-- =============================================

-- 1.1 Search all geographic entities by name
CREATE FUNCTION IF NOT EXISTS search_geo_by_name(p_search_term TEXT, p_limit INTEGER DEFAULT 20)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'entity_type', 'continent',
                'id', id,
                'name', name,
                'code', code,
                'relevance', 
                    CASE 
                        WHEN LOWER(name) = LOWER(p_search_term) THEN 100
                        WHEN LOWER(name) LIKE LOWER('%' || p_search_term || '%') THEN 50
                        WHEN LOWER(code) = LOWER(p_search_term) THEN 90
                        ELSE 10
                    END
            )
        )
        FROM continents
        WHERE is_active = 1
        AND (LOWER(name) LIKE LOWER('%' || p_search_term || '%') OR LOWER(code) LIKE LOWER('%' || p_search_term || '%'))
        
        UNION ALL
        
        SELECT json_group_array(
            json_object(
                'entity_type', 'country',
                'id', id,
                'name', name,
                'code', code,
                'relevance', 
                    CASE 
                        WHEN LOWER(name) = LOWER(p_search_term) THEN 100
                        WHEN LOWER(name) LIKE LOWER('%' || p_search_term || '%') THEN 50
                        WHEN LOWER(code) = LOWER(p_search_term) THEN 90
                        WHEN LOWER(code3) = LOWER(p_search_term) THEN 85
                        ELSE 10
                    END
            )
        )
        FROM countries
        WHERE is_active = 1
        AND (LOWER(name) LIKE LOWER('%' || p_search_term || '%') OR LOWER(code) LIKE LOWER('%' || p_search_term || '%'))
        
        UNION ALL
        
        SELECT json_group_array(
            json_object(
                'entity_type', 'state',
                'id', id,
                'name', name,
                'code', code,
                'relevance', 
                    CASE 
                        WHEN LOWER(name) = LOWER(p_search_term) THEN 100
                        WHEN LOWER(name) LIKE LOWER('%' || p_search_term || '%') THEN 50
                        WHEN LOWER(code) = LOWER(p_search_term) THEN 70
                        ELSE 10
                    END
            )
        )
        FROM states
        WHERE is_active = 1
        AND (LOWER(name) LIKE LOWER('%' || p_search_term || '%') OR LOWER(code) LIKE LOWER('%' || p_search_term || '%'))
        
        ORDER BY relevance DESC
        LIMIT p_limit
    );
END;

-- 1.2 Search with translations
CREATE FUNCTION IF NOT EXISTS search_geo_with_translations(p_search_term TEXT, p_language_id INTEGER, p_limit INTEGER DEFAULT 20)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'entity_type', 'continent',
                'id', c.id,
                'name', c.name,
                'code', c.code,
                'translated_name', gt.name,
                'relevance', 
                    CASE 
                        WHEN LOWER(gt.name) = LOWER(p_search_term) THEN 100
                        WHEN LOWER(c.name) = LOWER(p_search_term) THEN 80
                        WHEN LOWER(gt.name) LIKE LOWER('%' || p_search_term || '%') THEN 50
                        WHEN LOWER(c.name) LIKE LOWER('%' || p_search_term || '%') THEN 30
                        ELSE 10
                    END
            )
        )
        FROM continents c
        LEFT JOIN geo_translations gt ON c.id = gt.entity_id 
            AND gt.entity_type = 'continent' 
            AND gt.language_id = p_language_id
        WHERE c.is_active = 1
        AND (LOWER(c.name) LIKE LOWER('%' || p_search_term || '%') 
             OR LOWER(c.code) LIKE LOWER('%' || p_search_term || '%')
             OR LOWER(gt.name) LIKE LOWER('%' || p_search_term || '%'))
        
        UNION ALL
        
        SELECT json_group_array(
            json_object(
                'entity_type', 'country',
                'id', c.id,
                'name', c.name,
                'code', c.code,
                'translated_name', gt.name,
                'relevance', 
                    CASE 
                        WHEN LOWER(gt.name) = LOWER(p_search_term) THEN 100
                        WHEN LOWER(c.name) = LOWER(p_search_term) THEN 80
                        WHEN LOWER(gt.name) LIKE LOWER('%' || p_search_term || '%') THEN 50
                        WHEN LOWER(c.name) LIKE LOWER('%' || p_search_term || '%') THEN 30
                        ELSE 10
                    END
            )
        )
        FROM countries c
        LEFT JOIN geo_translations gt ON c.id = gt.entity_id 
            AND gt.entity_type = 'country' 
            AND gt.language_id = p_language_id
        WHERE c.is_active = 1
        AND (LOWER(c.name) LIKE LOWER('%' || p_search_term || '%') 
             OR LOWER(c.code) LIKE LOWER('%' || p_search_term || '%')
             OR LOWER(gt.name) LIKE LOWER('%' || p_search_term || '%'))
        
        ORDER BY relevance DESC
        LIMIT p_limit
    );
END;

-- 1.3 Autocomplete search
CREATE FUNCTION IF NOT EXISTS geo_autocomplete(p_prefix TEXT, p_limit INTEGER DEFAULT 10)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_group_array(
            json_object(
                'label', name || ' (' || code || ')',
                'value', name,
                'id', id,
                'type', 'continent',
                'code', code
            )
        )
        FROM continents
        WHERE is_active = 1
        AND (LOWER(name) LIKE LOWER(p_prefix || '%') OR LOWER(code) LIKE LOWER(p_prefix || '%'))
        
        UNION ALL
        
        SELECT json_group_array(
            json_object(
                'label', name || ' (' || code || ')',
                'value', name,
                'id', id,
                'type', 'country',
                'code', code
            )
        )
        FROM countries
        WHERE is_active = 1
        AND (LOWER(name) LIKE LOWER(p_prefix || '%') OR LOWER(code) LIKE LOWER(p_prefix || '%'))
        
        UNION ALL
        
        SELECT json_group_array(
            json_object(
                'label', name || ' (' || code || ')',
                'value', name,
                'id', id,
                'type', 'state',
                'code', code
            )
        )
        FROM states
        WHERE is_active = 1
        AND (LOWER(name) LIKE LOWER(p_prefix || '%') OR LOWER(code) LIKE LOWER(p_prefix || '%'))
        
        LIMIT p_limit
    );
END;

-- =============================================
-- 2. HIERARCHY FUNCTIONS
-- =============================================

-- 2.1 Get geographic hierarchy as JSON
CREATE FUNCTION IF NOT EXISTS get_geo_hierarchy(p_continent_id INTEGER, p_country_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN (
        SELECT json_object(
            'continent', json_object(
                'id', c.id,
                'name', c.name,
                'code', c.code,
                'countries', (
                    SELECT json_group_array(
                        json_object(
                            'id', co.id,
                            'name', co.name,
                            'code', co.code,
                            'capital', co.capital,
                            'states', (
                                SELECT json_group_array(
                                    json_object(
                                        'id', s.id,
                                        'name', s.name,
                                        'code', s.code,
                                        'capital', s.capital
                                    )
                                )
                                FROM states s
                                WHERE s.country_id = co.id AND s.is_active = 1
                                ORDER BY s.sort_order, s.name
                            )
                        )
                    )
                    FROM countries co
                    WHERE co.continent_id = c.id AND co.is_active = 1
                    ORDER BY co.sort_order, co.name
                )
            )
        )
        FROM continents c
        WHERE c.id = p_continent_id
    );
END;

-- 2.2 Get geographic path
CREATE FUNCTION IF NOT EXISTS get_geo_path(p_entity_type TEXT, p_entity_id INTEGER)
RETURNS TEXT
BEGIN
    RETURN CASE p_entity_type
        WHEN 'continent' THEN (
            SELECT name FROM continents WHERE id = p_entity_id
        )
        WHEN 'country' THEN (
            SELECT c.name || ' → ' || cont.name
            FROM countries c
            JOIN continents cont ON c.continent_id = cont.id
            WHERE c.id = p_entity_id
        )
        WHEN 'state' THEN (
            SELECT s.name || ' → ' || c.name || ' → ' || cont.name
            FROM states s
            JOIN countries c ON s.country_id = c.id
            JOIN continents cont ON c.continent_id = cont.id
            WHERE s.id = p_entity_id
        )
        ELSE NULL
    END;
END;

-- =============================================
-- 3. VALIDATION FUNCTIONS
-- =============================================

-- 3.1 Validate country code
CREATE FUNCTION IF NOT EXISTS is_valid_country_code(p_code TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN p_code IS NOT NULL 
        AND length(trim(p_code)) = 2 
        AND p_code GLOB '[A-Z]*';
END;

-- 3.2 Validate country code3
CREATE FUNCTION IF NOT EXISTS is_valid_country_code3(p_code3 TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN p_code3 IS NOT NULL 
        AND length(trim(p_code3)) = 3 
        AND p_code3 GLOB '[A-Z]*';
END;

-- 3.3 Validate continent code
CREATE FUNCTION IF NOT EXISTS is_valid_continent_code(p_code TEXT)
RETURNS BOOLEAN
BEGIN
    RETURN p_code IS NOT NULL 
        AND length(trim(p_code)) = 2 
        AND p_code GLOB '[A-Z]*';
END;

-- 3.4 Check if country exists
CREATE FUNCTION IF NOT EXISTS country_exists(p_country_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM countries WHERE id = p_country_id AND is_active = 1);
END;

-- 3.5 Check if continent exists
CREATE FUNCTION IF NOT EXISTS continent_exists(p_continent_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM continents WHERE id = p_continent_id AND is_active = 1);
END;

-- 3.6 Check if state exists
CREATE FUNCTION IF NOT EXISTS state_exists(p_state_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM states WHERE id = p_state_id AND is_active = 1);
END;

-- 3.7 Check if region exists
CREATE FUNCTION IF NOT EXISTS region_exists(p_region_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM regions WHERE id = p_region_id AND is_active = 1);
END;

-- 3.8 Check if country belongs to continent
CREATE FUNCTION IF NOT EXISTS country_belongs_to_continent(p_country_id INTEGER, p_continent_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM countries 
        WHERE id = p_country_id 
        AND continent_id = p_continent_id 
        AND is_active = 1
    );
END;

-- 3.9 Check if state belongs to country
CREATE FUNCTION IF NOT EXISTS state_belongs_to_country(p_state_id INTEGER, p_country_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM states 
        WHERE id = p_state_id 
        AND country_id = p_country_id 
        AND is_active = 1
    );
END;

-- =============================================
-- 4. STATISTICS FUNCTIONS
-- =============================================

-- 4.1 Get country count by continent
CREATE FUNCTION IF NOT EXISTS get_country_count_by_continent(p_continent_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COUNT(*) 
        FROM countries 
        WHERE continent_id = p_continent_id AND is_active = 1
    );
END;

-- 4.2 Get state count by country
CREATE FUNCTION IF NOT EXISTS get_state_count_by_country(p_country_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COUNT(*) 
        FROM states 
        WHERE country_id = p_country_id AND is_active = 1
    );
END;

-- 4.3 Get total population by continent
CREATE FUNCTION IF NOT EXISTS get_continent_population(p_continent_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COALESCE(SUM(population), 0) 
        FROM countries 
        WHERE continent_id = p_continent_id AND is_active = 1
    );
END;

-- 4.4 Get total population by country
CREATE FUNCTION IF NOT EXISTS get_country_population(p_country_id INTEGER)
RETURNS INTEGER
BEGIN
    RETURN (
        SELECT COALESCE(SUM(population), 0) 
        FROM states 
        WHERE country_id = p_country_id AND is_active = 1
    );
END;