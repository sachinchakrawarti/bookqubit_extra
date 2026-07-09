-- =============================================
-- Seed Data: regions
-- Description: Insert region data
-- =============================================

INSERT OR IGNORE INTO regions (
    id,
    code,
    name,
    name_native,
    continent_id,
    description,
    is_active,
    sort_order,
    created_at,
    updated_at
) VALUES
    -- Asia regions (continent_id = 3)
    (1, 'SA', 'South Asia', 'South Asia', 3, 'Countries in South Asia including India, Pakistan, Bangladesh', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'EA', 'East Asia', 'East Asia', 3, 'Countries in East Asia including China, Japan, South Korea', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'SEA', 'Southeast Asia', 'Southeast Asia', 3, 'Countries in Southeast Asia including Indonesia, Thailand, Vietnam', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'CA', 'Central Asia', 'Central Asia', 3, 'Countries in Central Asia including Kazakhstan, Uzbekistan', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'WA', 'West Asia', 'West Asia', 3, 'Countries in West Asia including Saudi Arabia, UAE, Israel', 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- North America regions (continent_id = 5)
    (6, 'NA', 'North America', 'North America', 5, 'Countries in North America including USA, Canada, Mexico', 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'CA', 'Central America', 'Central America', 5, 'Countries in Central America including Guatemala, Costa Rica', 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'CA', 'Caribbean', 'Caribbean', 5, 'Caribbean islands including Cuba, Jamaica, Bahamas', 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- South America regions (continent_id = 7)
    (9, 'SA', 'South America', 'South America', 7, 'Countries in South America', 1, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'AN', 'Andean States', 'Andean States', 7, 'Andean countries including Peru, Colombia, Ecuador', 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Europe regions (continent_id = 4)
    (11, 'EU', 'Western Europe', 'Western Europe', 4, 'Western European countries including UK, France, Germany', 1, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 'EE', 'Eastern Europe', 'Eastern Europe', 4, 'Eastern European countries including Poland, Russia, Ukraine', 1, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 'SE', 'Southern Europe', 'Southern Europe', 4, 'Southern European countries including Italy, Spain, Greece', 1, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 'NE', 'Northern Europe', 'Northern Europe', 4, 'Northern European countries including Sweden, Norway, Denmark', 1, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Oceania regions (continent_id = 6)
    (15, 'AU', 'Australia and New Zealand', 'Australia and New Zealand', 6, 'Australia, New Zealand and surrounding islands', 1, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (16, 'PI', 'Pacific Islands', 'Pacific Islands', 6, 'Pacific Island nations including Fiji, Samoa, Tonga', 1, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Africa regions (continent_id = 1)
    (17, 'SA', 'Southern Africa', 'Southern Africa', 1, 'Southern African countries including South Africa, Botswana', 1, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (18, 'WE', 'West Africa', 'West Africa', 1, 'West African countries including Nigeria, Ghana, Senegal', 1, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (19, 'EA', 'East Africa', 'East Africa', 1, 'East African countries including Kenya, Ethiopia, Tanzania', 1, 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (20, 'NA', 'North Africa', 'North Africa', 1, 'North African countries including Egypt, Morocco, Algeria', 1, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify seed
SELECT 'Regions seeded: ' || COUNT(*) FROM regions;