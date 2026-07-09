-- =============================================
-- View: vw_geo_hierarchy
-- Description: Complete geographic hierarchy from continents to states
-- =============================================

CREATE VIEW IF NOT EXISTS vw_geo_hierarchy AS
SELECT 
    -- Continent level
    cont.id AS continent_id,
    cont.code AS continent_code,
    cont.name AS continent_name,
    cont.name_native AS continent_native_name,
    cont.population AS continent_population,
    cont.area_sq_km AS continent_area,
    
    -- Country level
    c.id AS country_id,
    c.code AS country_code,
    c.code3 AS country_code3,
    c.name AS country_name,
    c.name_native AS country_native_name,
    c.capital AS country_capital,
    c.population AS country_population,
    c.area_sq_km AS country_area,
    c.phone_code AS country_phone_code,
    c.currency_code AS country_currency_code,
    c.currency_name AS country_currency_name,
    
    -- Region level
    r.id AS region_id,
    r.code AS region_code,
    r.name AS region_name,
    r.name_native AS region_native_name,
    r.description AS region_description,
    
    -- State level
    s.id AS state_id,
    s.code AS state_code,
    s.name AS state_name,
    s.name_native AS state_native_name,
    s.capital AS state_capital,
    s.population AS state_population,
    s.area_sq_km AS state_area,
    
    -- Hierarchy level
    CASE 
        WHEN s.id IS NOT NULL THEN 3
        WHEN c.id IS NOT NULL THEN 2
        WHEN cont.id IS NOT NULL THEN 1
    END AS hierarchy_level,
    
    -- Full path
    cont.name || 
    CASE WHEN c.id IS NOT NULL THEN ' → ' || c.name ELSE '' END ||
    CASE WHEN s.id IS NOT NULL THEN ' → ' || s.name ELSE '' END AS full_path,
    
    -- Status flags
    cont.is_active AS continent_active,
    c.is_active AS country_active,
    r.is_active AS region_active,
    s.is_active AS state_active,
    
    -- Sort order
    cont.sort_order AS continent_sort,
    c.sort_order AS country_sort,
    r.sort_order AS region_sort,
    s.sort_order AS state_sort

FROM continents cont
LEFT JOIN countries c ON cont.id = c.continent_id
LEFT JOIN regions r ON c.region_id = r.id
LEFT JOIN states s ON c.id = s.country_id

WHERE cont.is_active = 1
  AND (c.id IS NULL OR c.is_active = 1)
  AND (r.id IS NULL OR r.is_active = 1)
  AND (s.id IS NULL OR s.is_active = 1)

ORDER BY cont.sort_order, c.sort_order, r.sort_order, s.sort_order;