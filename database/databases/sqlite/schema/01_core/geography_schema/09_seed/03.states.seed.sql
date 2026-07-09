-- =============================================
-- Seed Data: states
-- Description: Insert state/province data
-- =============================================

INSERT OR IGNORE INTO states (
    code,
    name,
    name_native,
    country_id,
    region_id,
    capital,
    population,
    area_sq_km,
    is_active,
    sort_order,
    created_at,
    updated_at
) VALUES
    -- India (country_id = 1)
    ('UP', 'Uttar Pradesh', 'उत्तर प्रदेश', 1, 1, 'Lucknow', 241000000, 243286, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('MH', 'Maharashtra', 'महाराष्ट्र', 1, 1, 'Mumbai', 123000000, 307713, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('BR', 'Bihar', 'बिहार', 1, 1, 'Patna', 124000000, 94163, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('TN', 'Tamil Nadu', 'தமிழ்நாடு', 1, 1, 'Chennai', 76000000, 130058, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('KA', 'Karnataka', 'ಕರ್ನಾಟಕ', 1, 1, 'Bangalore', 68000000, 191791, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('GJ', 'Gujarat', 'ગુજરાત', 1, 1, 'Gandhinagar', 71000000, 196024, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RJ', 'Rajasthan', 'राजस्थान', 1, 1, 'Jaipur', 81000000, 342239, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('AP', 'Andhra Pradesh', 'ఆంధ్రప్రదేశ్', 1, 1, 'Amaravati', 54000000, 162975, 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- United States (country_id = 9)
    ('CA', 'California', 'California', 9, 4, 'Sacramento', 39500000, 423970, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('TX', 'Texas', 'Texas', 9, 4, 'Austin', 29100000, 695662, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('NY', 'New York', 'New York', 9, 4, 'Albany', 19400000, 141297, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('FL', 'Florida', 'Florida', 9, 4, 'Tallahassee', 21500000, 170312, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('IL', 'Illinois', 'Illinois', 9, 4, 'Springfield', 12600000, 149995, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('PA', 'Pennsylvania', 'Pennsylvania', 9, 4, 'Harrisburg', 12800000, 119283, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('OH', 'Ohio', 'Ohio', 9, 4, 'Columbus', 11600000, 116098, 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('GA', 'Georgia', 'Georgia', 9, 4, 'Atlanta', 10700000, 153910, 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Canada (country_id = 10)
    ('ON', 'Ontario', 'Ontario', 10, 4, 'Toronto', 14700000, 1415931, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('QC', 'Quebec', 'Québec', 10, 4, 'Quebec City', 8500000, 1542056, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('BC', 'British Columbia', 'British Columbia', 10, 4, 'Victoria', 5100000, 944735, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('AB', 'Alberta', 'Alberta', 10, 4, 'Edmonton', 4400000, 661848, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('MB', 'Manitoba', 'Manitoba', 10, 4, 'Winnipeg', 1400000, 647797, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('SK', 'Saskatchewan', 'Saskatchewan', 10, 4, 'Regina', 1200000, 651036, 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Australia (country_id = 14)
    ('NSW', 'New South Wales', 'New South Wales', 14, 6, 'Sydney', 8100000, 800642, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('VIC', 'Victoria', 'Victoria', 14, 6, 'Melbourne', 6600000, 227416, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('QLD', 'Queensland', 'Queensland', 14, 6, 'Brisbane', 5200000, 1852642, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('WA', 'Western Australia', 'Western Australia', 14, 6, 'Perth', 2600000, 2529875, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('SA', 'South Australia', 'South Australia', 14, 6, 'Adelaide', 1800000, 1043536, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Brazil (country_id = 12)
    ('SP', 'São Paulo', 'São Paulo', 12, 7, 'São Paulo', 46000000, 248209, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RJ', 'Rio de Janeiro', 'Rio de Janeiro', 12, 7, 'Rio de Janeiro', 17000000, 43696, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('BA', 'Bahia', 'Bahia', 12, 7, 'Salvador', 14900000, 564733, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('PR', 'Paraná', 'Paraná', 12, 7, 'Curitiba', 11500000, 199315, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RS', 'Rio Grande do Sul', 'Rio Grande do Sul', 12, 7, 'Porto Alegre', 11300000, 281731, 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify seed
SELECT 'States seeded: ' || COUNT(*) FROM states;