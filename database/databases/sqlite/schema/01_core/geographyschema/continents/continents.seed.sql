-- ============================================================
-- BookQubit Database
-- Schema      : Geography
-- Module      : Continents
-- File        : continents.seed.sql
-- Description : Seed data for continents
-- Version     : 1.0.0
-- ============================================================

PRAGMA foreign_keys = ON;

INSERT INTO continents
(
    code,
    name,
    official_name,
    sort_order,
    area_sq_km,
    population,
    country_count,
    latitude,
    longitude,
    is_active
)
VALUES

(
    'AF',
    'Africa',
    'Africa',
    1,
    30370000,
    1460000000,
    54,
    1.6508,
    17.6791,
    1
),

(
    'AN',
    'Antarctica',
    'Antarctica',
    2,
    14000000,
    0,
    0,
    -82.8628,
    135.0000,
    1
),

(
    'AS',
    'Asia',
    'Asia',
    3,
    44579000,
    4780000000,
    49,
    34.0479,
    100.6197,
    1
),

(
    'EU',
    'Europe',
    'Europe',
    4,
    10180000,
    745000000,
    44,
    54.5260,
    15.2551,
    1
),

(
    'NA',
    'North America',
    'North America',
    5,
    24709000,
    604000000,
    23,
    54.5260,
    -105.2551,
    1
),

(
    'OC',
    'Oceania',
    'Oceania',
    6,
    8525989,
    46000000,
    14,
    -22.7359,
    140.0188,
    1
),

(
    'SA',
    'South America',
    'South America',
    7,
    17840000,
    439000000,
    12,
    -8.7832,
    -55.4915,
    1
);

-- ============================================================
-- Total Continents : 7
--
-- AF = Africa
-- AN = Antarctica
-- AS = Asia
-- EU = Europe
-- NA = North America
-- OC = Oceania
-- SA = South America
-- ============================================================