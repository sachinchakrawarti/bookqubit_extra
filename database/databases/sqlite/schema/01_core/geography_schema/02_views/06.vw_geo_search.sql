-- =============================================
-- View: vw_geo_search
-- Description: Unified search across all geographic entities
-- =============================================

CREATE VIEW IF NOT EXISTS vw_geo_search AS

-- Continents
SELECT 
    'continent' AS entity_type,
    id AS entity_id,
    name,
    name_native,
    code AS entity_code,
    population,
    area_sq_km,
    NULL AS parent_name,
    NULL AS parent_code,
    is_active,
    sort_order,
    created_at,
    updated_at
FROM continents
WHERE is_active = 1

UNION ALL

-- Countries
SELECT 
    'country' AS entity_type,
    c.id AS entity_id,
    c.name,
    c.name_native,
    c.code AS entity_code,
    c.population,
    c.area_sq_km,
    cont.name AS parent_name,
    cont.code AS parent_code,
    c.is_active,
    c.sort_order,
    c.created_at,
    c.updated_at
FROM countries c
LEFT JOIN continents cont ON c.continent_id = cont.id
WHERE c.is_active = 1

UNION ALL

-- States
SELECT 
    'state' AS entity_type,
    s.id AS entity_id,
    s.name,
    s.name_native,
    s.code AS entity_code,
    s.population,
    s.area_sq_km,
    c.name AS parent_name,
    c.code AS parent_code,
    s.is_active,
    s.sort_order,
    s.created_at,
    s.updated_at
FROM states s
LEFT JOIN countries c ON s.country_id = c.id
WHERE s.is_active = 1

UNION ALL

-- Regions
SELECT 
    'region' AS entity_type,
    r.id AS entity_id,
    r.name,
    r.name_native,
    r.code AS entity_code,
    NULL AS population,
    NULL AS area_sq_km,
    cont.name AS parent_name,
    cont.code AS parent_code,
    r.is_active,
    r.sort_order,
    r.created_at,
    r.updated_at
FROM regions r
LEFT JOIN continents cont ON r.continent_id = cont.id
WHERE r.is_active = 1

ORDER BY entity_type, sort_order, name;