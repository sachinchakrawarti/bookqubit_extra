-- =============================================
-- View: vw_continents
-- Description: Complete continent information with translations
-- =============================================

CREATE VIEW IF NOT EXISTS vw_continents AS
SELECT 
    c.id,
    c.code,
    c.name,
    c.name_native,
    c.population,
    c.area_sq_km,
    c.is_active,
    c.sort_order,
    c.created_at,
    c.updated_at,
    -- Translation
    gt.name AS translated_name,
    gt.description AS translated_description,
    -- Statistics
    (SELECT COUNT(*) FROM countries WHERE continent_id = c.id AND is_active = 1) AS country_count,
    (SELECT SUM(population) FROM countries WHERE continent_id = c.id AND is_active = 1) AS total_population,
    -- Status
    CASE 
        WHEN c.is_active = 1 THEN 'Active'
        ELSE 'Inactive'
    END AS status_text
FROM continents c
LEFT JOIN geo_translations gt ON c.id = gt.entity_id 
    AND gt.entity_type = 'continent'
    AND gt.language_id = 1  -- Default language
WHERE c.is_active = 1
ORDER BY c.sort_order, c.name;