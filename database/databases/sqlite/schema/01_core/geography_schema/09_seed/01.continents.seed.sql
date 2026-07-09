-- =============================================
-- Seed Data: continents
-- Description: Insert continent data
-- =============================================

INSERT OR IGNORE INTO continents (
    id,
    code,
    name,
    name_native,
    population,
    area_sq_km,
    is_active,
    sort_order,
    created_at,
    updated_at
) VALUES
    (1, 'AF', 'Africa', 'Africa', 1373000000, 30370000, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'AN', 'Antarctica', 'Antarctica', 0, 14000000, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'AS', 'Asia', 'Asia', 4641000000, 44579000, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'EU', 'Europe', 'Europe', 746000000, 10180000, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'NA', 'North America', 'North America', 592000000, 24709000, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'OC', 'Oceania', 'Oceania', 43000000, 8600000, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'SA', 'South America', 'South America', 430000000, 17840000, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify seed
SELECT 'Continents seeded: ' || COUNT(*) FROM continents;