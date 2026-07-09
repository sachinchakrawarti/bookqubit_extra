-- =============================================
-- View: vw_states
-- Description: Complete state information with country, region, and translations
-- =============================================

CREATE VIEW IF NOT EXISTS vw_states AS
SELECT 
    s.id,
    s.code,
    s.name,
    s.name_native,
    s.country_id,
    c.code AS country_code,
    c.name AS country_name,
    s.region_id,
    r.code AS region_code,
    r.name AS region_name,
    s.capital,
    s.population,
    s.area_sq_km,
    s.is_active,
    s.sort_order,
    s.created_at,
    s.updated_at,
    -- Translations
    gt.name AS translated_name,
    gt.description AS translated_description,
    -- Status
    CASE 
        WHEN s.is_active = 1 THEN 'Active'
        ELSE 'Inactive'
    END AS status_text
FROM states s
LEFT JOIN countries c ON s.country_id = c.id
LEFT JOIN regions r ON s.region_id = r.id
LEFT JOIN geo_translations gt ON s.id = gt.entity_id 
    AND gt.entity_type = 'state'
    AND gt.language_id = 1  -- Default language
WHERE s.is_active = 1
ORDER BY c.name, s.sort_order, s.name;