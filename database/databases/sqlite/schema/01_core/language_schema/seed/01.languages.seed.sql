-- ============================================================================
-- File: 01.languages.seed.sql
-- Schema: language_schema
-- Purpose: Seed data for languages
-- Database: SQLite
-- ============================================================================

INSERT INTO languages
(
    language_code,
    language_name,
    english_name,
    native_name,

    iso_639_1,
    iso_639_2,
    iso_639_3,

    locale_code,

    default_script_id,

    direction,

    sort_order,

    is_default,
    is_active
)
VALUES

-- English
(
    'en',
    'English',
    'English',
    'English',
    'en',
    'eng',
    'eng',
    'en-US',
    1,
    'LTR',
    1,
    1,
    1
),

-- Hindi
(
    'hi',
    'Hindi',
    'Hindi',
    'हिन्दी',
    'hi',
    'hin',
    'hin',
    'hi-IN',
    2,
    'LTR',
    2,
    0,
    1
),

-- Bengali
(
    'bn',
    'Bengali',
    'Bengali',
    'বাংলা',
    'bn',
    'ben',
    'ben',
    'bn-BD',
    3,
    'LTR',
    3,
    0,
    1
),

-- Tamil
(
    'ta',
    'Tamil',
    'Tamil',
    'தமிழ்',
    'ta',
    'tam',
    'tam',
    'ta-IN',
    4,
    'LTR',
    4,
    0,
    1
),

-- Telugu
(
    'te',
    'Telugu',
    'Telugu',
    'తెలుగు',
    'te',
    'tel',
    'tel',
    'te-IN',
    5,
    'LTR',
    5,
    0,
    1
),

-- Urdu
(
    'ur',
    'Urdu',
    'Urdu',
    'اردو',
    'ur',
    'urd',
    'urd',
    'ur-PK',
    6,
    'RTL',
    6,
    0,
    1
),

-- Arabic
(
    'ar',
    'Arabic',
    'Arabic',
    'العربية',
    'ar',
    'ara',
    'ara',
    'ar-SA',
    6,
    'RTL',
    7,
    0,
    1
),

-- Persian
(
    'fa',
    'Persian',
    'Persian',
    'فارسی',
    'fa',
    'fas',
    'fas',
    'fa-IR',
    6,
    'RTL',
    8,
    0,
    1
),

-- French
(
    'fr',
    'French',
    'French',
    'Français',
    'fr',
    'fra',
    'fra',
    'fr-FR',
    1,
    'LTR',
    9,
    0,
    1
),

-- German
(
    'de',
    'German',
    'German',
    'Deutsch',
    'de',
    'deu',
    'deu',
    'de-DE',
    1,
    'LTR',
    10,
    0,
    1
),

-- Spanish
(
    'es',
    'Spanish',
    'Spanish',
    'Español',
    'es',
    'spa',
    'spa',
    'es-ES',
    1,
    'LTR',
    11,
    0,
    1
),

-- Russian
(
    'ru',
    'Russian',
    'Russian',
    'Русский',
    'ru',
    'rus',
    'rus',
    'ru-RU',
    7,
    'LTR',
    12,
    0,
    1
),

-- Chinese
(
    'zh',
    'Chinese',
    'Chinese',
    '中文',
    'zh',
    'zho',
    'zho',
    'zh-CN',
    8,
    'LTR',
    13,
    0,
    1
),

-- Japanese
(
    'ja',
    'Japanese',
    'Japanese',
    '日本語',
    'ja',
    'jpn',
    'jpn',
    'ja-JP',
    9,
    'LTR',
    14,
    0,
    1
),

-- Korean
(
    'ko',
    'Korean',
    'Korean',
    '한국어',
    'ko',
    'kor',
    'kor',
    'ko-KR',
    10,
    'LTR',
    15,
    0,
    1
);

-- ============================================================================
-- End of File
-- ============================================================================