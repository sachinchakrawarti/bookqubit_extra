-- ============================================================================
-- File: 02.scripts.seed.sql
-- Schema: language_schema
-- Purpose: Seed data for scripts table
-- Database: SQLite
-- ============================================================================

INSERT INTO scripts
(
    script_code,
    iso15924_code,
    script_name,
    native_name,
    direction,
    unicode_range,
    sort_order,
    is_active
)
VALUES

-- Latin
(
    'latin',
    'Latn',
    'Latin',
    'Latin',
    'LTR',
    'U+0000–U+024F',
    1,
    1
),

-- Devanagari
(
    'devanagari',
    'Deva',
    'Devanagari',
    'देवनागरी',
    'LTR',
    'U+0900–U+097F',
    2,
    1
),

-- Bengali
(
    'bengali',
    'Beng',
    'Bengali',
    'বাংলা',
    'LTR',
    'U+0980–U+09FF',
    3,
    1
),

-- Tamil
(
    'tamil',
    'Taml',
    'Tamil',
    'தமிழ்',
    'LTR',
    'U+0B80–U+0BFF',
    4,
    1
),

-- Telugu
(
    'telugu',
    'Telu',
    'Telugu',
    'తెలుగు',
    'LTR',
    'U+0C00–U+0C7F',
    5,
    1
),

-- Arabic
(
    'arabic',
    'Arab',
    'Arabic',
    'العربية',
    'RTL',
    'U+0600–U+06FF',
    6,
    1
),

-- Cyrillic
(
    'cyrillic',
    'Cyrl',
    'Cyrillic',
    'Кириллица',
    'LTR',
    'U+0400–U+04FF',
    7,
    1
),

-- Han (Chinese)
(
    'han',
    'Hani',
    'Han',
    '汉字',
    'LTR',
    'U+4E00–U+9FFF',
    8,
    1
),

-- Hiragana
(
    'hiragana',
    'Hira',
    'Hiragana',
    'ひらがな',
    'LTR',
    'U+3040–U+309F',
    9,
    1
),

-- Katakana
(
    'katakana',
    'Kana',
    'Katakana',
    'カタカナ',
    'LTR',
    'U+30A0–U+30FF',
    10,
    1
),

-- Hangul
(
    'hangul',
    'Hang',
    'Hangul',
    '한글',
    'LTR',
    'U+AC00–U+D7AF',
    11,
    1
),

-- Greek
(
    'greek',
    'Grek',
    'Greek',
    'Ελληνικά',
    'LTR',
    'U+0370–U+03FF',
    12,
    1
),

-- Hebrew
(
    'hebrew',
    'Hebr',
    'Hebrew',
    'עברית',
    'RTL',
    'U+0590–U+05FF',
    13,
    1
),

-- Thai
(
    'thai',
    'Thai',
    'Thai',
    'ไทย',
    'LTR',
    'U+0E00–U+0E7F',
    14,
    1
),

-- Gujarati
(
    'gujarati',
    'Gujr',
    'Gujarati',
    'ગુજરાતી',
    'LTR',
    'U+0A80–U+0AFF',
    15,
    1
),

-- Gurmukhi
(
    'gurmukhi',
    'Guru',
    'Gurmukhi',
    'ਗੁਰਮੁਖੀ',
    'LTR',
    'U+0A00–U+0A7F',
    16,
    1
),

-- Kannada
(
    'kannada',
    'Knda',
    'Kannada',
    'ಕನ್ನಡ',
    'LTR',
    'U+0C80–U+0CFF',
    17,
    1
),

-- Malayalam
(
    'malayalam',
    'Mlym',
    'Malayalam',
    'മലയാളം',
    'LTR',
    'U+0D00–U+0D7F',
    18,
    1
),

-- Odia
(
    'odia',
    'Orya',
    'Odia',
    'ଓଡ଼ିଆ',
    'LTR',
    'U+0B00–U+0B7F',
    19,
    1
),

-- Sinhala
(
    'sinhala',
    'Sinh',
    'Sinhala',
    'සිංහල',
    'LTR',
    'U+0D80–U+0DFF',
    20,
    1
);

-- ============================================================================
-- End of File
-- ============================================================================