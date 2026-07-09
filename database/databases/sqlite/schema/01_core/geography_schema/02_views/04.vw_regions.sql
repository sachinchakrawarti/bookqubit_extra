-- =============================================
-- View: vw_regions
-- Description: Complete region information with continent and translations
-- =============================================

CREATE VIEW IF NOT EXISTS vw_regions AS
SELECT 
    r.id,
    r.code,
    r.name,
    r.name_native,
    r.continent_id,
    cont.code AS continent_code,
    cont.name AS continent_name,
    r.description,
    r.is_active,
    r.sort_order,
    r.created_at,
    r.updated_at,
    -- Translations
    gt.name AS translated_name,
    gt.description AS translated_description,
    -- Statistics
    (SELECT COUNT(*) FROM countries WHERE region_id = r.id AND is_active = 1) AS country_count,
    -- Status
    CASE 
        WHEN r.is_active = 1 THEN 'Active'
        ELSE 'Inactive'
    END AS status_text
FROM regions r
LEFT JOIN continents cont ON r.continent_id = cont.id
LEFT JOIN geo_translations gt ON r.id = gt.entity_id 
    AND gt.entity_type = 'region'
    AND gt.language_id = 1  -- Default language
WHERE r.is_active = 1
ORDER BY r.sort_order, r.name;