-- ============================================================================
-- English, Hindi & Urdu Translations
-- ============================================================================

INSERT INTO author_translation (
    author_id,
    language_code,
    name,
    biography,
    nationality,
    birth_place
)
VALUES

------------------------------------------------------------
-- William Shakespeare
------------------------------------------------------------

(
    1001,
    'en',
    'William Shakespeare',
    'English playwright, poet, and actor.',
    'English',
    'Stratford-upon-Avon'
),

(
    1001,
    'hi',
    'विलियम शेक्सपीयर',
    'अंग्रेज़ नाटककार, कवि और अभिनेता।',
    'अंग्रेज़',
    'स्ट्रैटफ़र्ड-अपॉन-एवन'
),

(
    1001,
    'ur',
    'ولیم شیکسپیئر',
    'انگریز ڈرامہ نگار، شاعر اور اداکار۔',
    'انگریز',
    'اسٹریٹفورڈ اپون ایون'
);

------------------------------------------------------------
-- Rabindranath Tagore
------------------------------------------------------------

INSERT INTO author_translation (
    author_id,
    language_code,
    name,
    biography,
    nationality,
    birth_place
)
VALUES

(
    1003,
    'en',
    'Rabindranath Tagore',
    'Poet, philosopher, and Nobel Prize winner.',
    'Indian',
    'Kolkata'
),

(
    1003,
    'hi',
    'रवीन्द्रनाथ ठाकुर',
    'कवि, दार्शनिक और नोबेल पुरस्कार विजेता।',
    'भारतीय',
    'कोलकाता'
),

(
    1003,
    'ur',
    'رابندر ناتھ ٹیگور',
    'شاعر، فلسفی اور نوبیل انعام یافتہ۔',
    'ہندوستانی',
    'کولکاتا'
);