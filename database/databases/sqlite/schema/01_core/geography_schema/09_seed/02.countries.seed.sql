-- =============================================
-- Seed Data: countries
-- Description: Insert country data
-- =============================================

INSERT OR IGNORE INTO countries (
    id,
    code,
    code3,
    name,
    name_native,
    capital,
    continent_id,
    region_id,
    population,
    area_sq_km,
    phone_code,
    currency_code,
    currency_name,
    iso_numeric,
    is_active,
    sort_order,
    created_at,
    updated_at
) VALUES
    -- Asia (continent_id = 3)
    (1, 'IN', 'IND', 'India', 'भारत', 'New Delhi', 3, 1, 1380000000, 3287263, '+91', 'INR', 'Indian Rupee', 356, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'JP', 'JPN', 'Japan', '日本', 'Tokyo', 3, 2, 125800000, 377975, '+81', 'JPY', 'Japanese Yen', 392, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'CN', 'CHN', 'China', '中国', 'Beijing', 3, 2, 1441000000, 9596961, '+86', 'CNY', 'Chinese Yuan', 156, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'KR', 'KOR', 'South Korea', '대한민국', 'Seoul', 3, 2, 51700000, 100210, '+82', 'KRW', 'South Korean Won', 410, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Europe (continent_id = 4)
    (5, 'GB', 'GBR', 'United Kingdom', 'United Kingdom', 'London', 4, 5, 67800000, 243610, '+44', 'GBP', 'British Pound', 826, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'DE', 'DEU', 'Germany', 'Deutschland', 'Berlin', 4, 5, 83100000, 357022, '+49', 'EUR', 'Euro', 276, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'FR', 'FRA', 'France', 'France', 'Paris', 4, 5, 67400000, 640679, '+33', 'EUR', 'Euro', 250, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'IT', 'ITA', 'Italy', 'Italia', 'Rome', 4, 5, 60300000, 301340, '+39', 'EUR', 'Euro', 380, 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- North America (continent_id = 5)
    (9, 'US', 'USA', 'United States', 'United States', 'Washington, D.C.', 5, 4, 331000000, 9833517, '+1', 'USD', 'US Dollar', 840, 1, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'CA', 'CAN', 'Canada', 'Canada', 'Ottawa', 5, 4, 38000000, 9984670, '+1', 'CAD', 'Canadian Dollar', 124, 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, 'MX', 'MEX', 'Mexico', 'México', 'Mexico City', 5, 4, 126000000, 1964375, '+52', 'MXN', 'Mexican Peso', 484, 1, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- South America (continent_id = 7)
    (12, 'BR', 'BRA', 'Brazil', 'Brasil', 'Brasília', 7, 7, 213000000, 8515767, '+55', 'BRL', 'Brazilian Real', 986, 1, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 'AR', 'ARG', 'Argentina', 'Argentina', 'Buenos Aires', 7, 7, 45300000, 2780400, '+54', 'ARS', 'Argentine Peso', 032, 1, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Oceania (continent_id = 6)
    (14, 'AU', 'AUS', 'Australia', 'Australia', 'Canberra', 6, 6, 25700000, 7692024, '+61', 'AUD', 'Australian Dollar', 036, 1, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (15, 'NZ', 'NZL', 'New Zealand', 'New Zealand', 'Wellington', 6, 6, 5100000, 268021, '+64', 'NZD', 'New Zealand Dollar', 554, 1, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Africa (continent_id = 1)
    (16, 'ZA', 'ZAF', 'South Africa', 'South Africa', 'Pretoria', 1, 6, 60000000, 1221037, '+27', 'ZAR', 'South African Rand', 710, 1, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (17, 'NG', 'NGA', 'Nigeria', 'Nigeria', 'Abuja', 1, 6, 206000000, 923768, '+234', 'NGN', 'Nigerian Naira', 566, 1, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (18, 'EG', 'EGY', 'Egypt', 'مصر', 'Cairo', 1, 6, 102000000, 1002450, '+20', 'EGP', 'Egyptian Pound', 818, 1, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify seed
SELECT 'Countries seeded: ' || COUNT(*) FROM countries;