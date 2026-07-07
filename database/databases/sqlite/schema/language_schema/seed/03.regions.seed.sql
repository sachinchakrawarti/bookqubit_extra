-- ============================================================================
-- File: 03.language_regions.seed.sql
-- Schema: language_schema
-- Purpose: Seed data for language_regions
-- Database: SQLite
-- ============================================================================

INSERT INTO language_regions
(
    language_id,
    country_id,
    is_official,
    is_primary,
    speaker_population,
    literacy_rate,
    notes
)
VALUES

-- English
(1, 233, 1, 1, 1600000000, 99.0, 'Primary language of the United States'),
(1, 39, 1, 1,   68000000, 99.0, 'Primary language of the United Kingdom'),
(1, 38, 1, 1,   40000000, 99.0, 'Official language of Canada'),

-- Hindi
(2, 101, 1, 1, 600000000, 77.7, 'One of the official languages of India'),

-- Bengali
(3, 18, 1, 1, 230000000, 75.0, 'Official language of Bangladesh'),
(3, 101, 1, 0,100000000, 77.7, 'Widely spoken in eastern India'),

-- Tamil
(4, 101, 1, 0, 75000000, 82.0, 'Official language in Tamil Nadu'),
(4, 202, 1, 1, 3500000, 92.0, 'One of the official languages of Sri Lanka'),

-- Telugu
(5, 101, 1, 0, 82000000, 74.0, 'Official language in Andhra Pradesh and Telangana'),

-- Urdu
(6, 167, 1, 1, 80000000, 62.3, 'National language of Pakistan'),
(6, 101, 1, 0, 50000000, 77.7, 'Recognized language in India'),

-- Arabic
(7, 184, 1, 1, 35000000, 97.0, 'Official language of Saudi Arabia'),
(7, 2,   1, 1, 44000000, 81.4, 'Official language of Algeria'),

-- Persian
(8, 103, 1, 1, 70000000, 89.0, 'Official language of Iran'),

-- French
(9, 74, 1, 1, 67000000, 99.0, 'Official language of France'),
(9, 38, 1, 0, 10000000, 99.0, 'Official language in Canada'),

-- German
(10, 81, 1, 1, 83000000, 99.0, 'Official language of Germany'),

-- Spanish
(11, 67, 1, 1, 47000000, 98.0, 'Official language of Spain'),
(11, 138, 1, 1,126000000, 95.0, 'Official language of Mexico'),

-- Russian
(12, 182, 1, 1,145000000, 99.0, 'Official language of Russia'),

-- Chinese
(13, 44, 1, 1,1100000000, 97.0, 'Official language of China'),

-- Japanese
(14, 111, 1, 1,125000000, 99.0, 'Official language of Japan'),

-- Korean
(15, 116, 1, 1,51000000, 99.0, 'Official language of South Korea');

-- ============================================================================
-- End of File
-- ============================================================================