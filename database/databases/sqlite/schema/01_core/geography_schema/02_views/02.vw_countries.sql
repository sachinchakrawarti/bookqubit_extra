-- =============================================
-- View: vw_countries
-- Description: Complete country information with continent, region, and translations
-- =============================================

CREATE VIEW IF NOT EXISTS vw_countries AS
SELECT 
    c.id,
    c.code,
    c.code3,
    c.name,
    c.name_native,
    c.capital,
    c.continent_id,
    cont.code AS continent_code,
    cont.name AS continent_name,
    c.region_id,
    r.code AS region_code,
    r.name AS region_name,
    c.population,
    c.area_sq_km,
    c.phone_code,
    c.currency_code,
    c.currency_name,
    c.iso_numeric,
    c.is_active,
    c.sort_order,
    c.created_at,
    c.updated_at,
    -- Translations
    gt.name AS translated_name,
    gt.description AS translated_description,
    -- Statistics
    (SELECT COUNT(*) FROM states WHERE country_id = c.id AND is_active = 1) AS state_count,
    -- Status
    CASE 
        WHEN c.is_active = 1 THEN 'Active'
        ELSE 'Inactive'
    END AS status_text
FROM countries c
LEFT JOIN continents cont ON c.continent_id = cont.id
LEFT JOIN regions r ON c.region_id = r.id
LEFT JOIN geo_translations gt ON c.id = gt.entity_id 
    AND gt.entity_type = 'country'
    AND gt.language_id = 1  -- Default language
WHERE c.is_active = 1
ORDER BY c.sort_order, c.name;