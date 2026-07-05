-- ============================================
-- BOOKQUBIT DATABASE - COMPLETE WORKING SCHEMA
-- ============================================

PRAGMA foreign_keys = OFF;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;

-- ============================================
-- DROP ALL TABLES (Clean start)
-- ============================================
DROP TABLE IF EXISTS author_aliases;
DROP TABLE IF EXISTS author_languages;
DROP TABLE IF EXISTS author_translations;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS languages;

-- ============================================
-- 1. LANGUAGES TABLE
-- ============================================
CREATE TABLE languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    native_name VARCHAR(100),
    flag_emoji VARCHAR(10),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Languages
INSERT OR IGNORE INTO languages (code, name, native_name, flag_emoji) VALUES
('english', 'English', 'English', '🇬🇧'),
('hindi', 'Hindi', 'हिन्दी', '🇮🇳'),
('urdu', 'Urdu', 'اردو', '🇵🇰'),
('arabic', 'Arabic', 'العربية', '🇸🇦'),
('bangla', 'Bangla', 'বাংলা', '🇧🇩'),
('chinese', 'Chinese', '中文', '🇨🇳'),
('french', 'French', 'Français', '🇫🇷'),
('german', 'German', 'Deutsch', '🇩🇪'),
('italian', 'Italian', 'Italiano', '🇮🇹'),
('japanese', 'Japanese', '日本語', '🇯🇵'),
('kannada', 'Kannada', 'ಕನ್ನಡ', '🇮🇳'),
('korean', 'Korean', '한국어', '🇰🇷'),
('malayalam', 'Malayalam', 'മലയാളം', '🇮🇳'),
('marathi', 'Marathi', 'मराठी', '🇮🇳'),
('pashto', 'Pashto', 'پښتو', '🇦🇫'),
('persian', 'Persian', 'فارسی', '🇮🇷'),
('russian', 'Russian', 'Русский', '🇷🇺'),
('spanish', 'Spanish', 'Español', '🇪🇸'),
('tamil', 'Tamil', 'தமிழ்', '🇮🇳'),
('telugu', 'Telugu', 'తెలుగు', '🇮🇳');

-- ============================================
-- 2. AUTHORS TABLE
-- ============================================
CREATE TABLE authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    bio TEXT,
    birth_date DATE,
    death_date DATE,
    nationality VARCHAR(100),
    language_code VARCHAR(20),
    image_url TEXT,
    cover_image TEXT,
    website VARCHAR(255),
    wikipedia_url VARCHAR(255),
    social_links TEXT,
    total_books INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    views INTEGER DEFAULT 0,
    followers INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    is_featured BOOLEAN DEFAULT 0,
    is_verified BOOLEAN DEFAULT 0,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

CREATE INDEX idx_authors_name ON authors(name);
CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_authors_language_code ON authors(language_code);
CREATE INDEX idx_authors_is_active ON authors(is_active);
CREATE INDEX idx_authors_rating ON authors(rating);

-- Seed 5 Authors
INSERT OR IGNORE INTO authors (
    uuid, name, slug, bio, birth_date, death_date,
    nationality, language_code, image_url,
    total_books, rating, is_featured, is_verified
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Bhagat Singh',
    'bhagat-singh',
    'Bhagat Singh was an Indian revolutionary and freedom fighter. He wrote "Why I Am an Atheist" from Lahore Central Jail.',
    '1907-09-28',
    '1931-03-23',
    'Indian',
    'english',
    'https://example.com/authors/bhagat-singh.jpg',
    5,
    4.8,
    1,
    1
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Yuval Noah Harari',
    'yuval-noah-harari',
    'Israeli historian and author of "Sapiens", "Homo Deus", and "Nexus". Professor at Hebrew University.',
    '1976-02-24',
    NULL,
    'Israeli',
    'english',
    'https://example.com/authors/yuval-harari.jpg',
    8,
    4.7,
    1,
    1
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'Bhimrao Ramji Ambedkar',
    'b-r-ambedkar',
    'Indian jurist, economist, and social reformer. Drafted the Indian Constitution. Wrote "Annihilation of Caste".',
    '1891-04-14',
    '1956-12-06',
    'Indian',
    'english',
    'https://example.com/authors/ambedkar.jpg',
    12,
    4.9,
    1,
    1
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'Osho',
    'osho',
    'Indian spiritual teacher and philosopher. Known for teachings on meditation, love, and consciousness.',
    '1931-12-11',
    '1990-01-19',
    'Indian',
    'english',
    'https://example.com/authors/osho.jpg',
    20,
    4.6,
    1,
    1
),
(
    '550e8400-e29b-41d4-a716-446655440005',
    'Jared Mason Diamond',
    'jared-diamond',
    'American historian, geographer, and author of "Guns, Germs, and Steel".',
    '1937-09-10',
    NULL,
    'American',
    'english',
    'https://example.com/authors/jared-diamond.jpg',
    6,
    4.7,
    1,
    1
);

-- ============================================
-- 3. AUTHOR TRANSLATIONS TABLE
-- ============================================
CREATE TABLE author_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    language_code VARCHAR(20) NOT NULL,
    name VARCHAR(200) NOT NULL,
    bio TEXT,
    nationality VARCHAR(100),
    is_primary BOOLEAN DEFAULT 0,
    is_auto_translated BOOLEAN DEFAULT 0,
    translation_source VARCHAR(50),
    translation_quality INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE(author_id, language_code)
);

CREATE INDEX idx_author_translations_author_id ON author_translations(author_id);
CREATE INDEX idx_author_translations_language_code ON author_translations(language_code);

-- Seed Hindi Translations
INSERT OR IGNORE INTO author_translations (author_id, language_code, name, bio, nationality, is_primary)
SELECT id, 'hindi',
    CASE name
        WHEN 'Bhagat Singh' THEN 'भगत सिंह'
        WHEN 'Yuval Noah Harari' THEN 'युवाल नोआ हरारी'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'डॉ. भीमराव रामजी आंबेडकर'
        WHEN 'Osho' THEN 'ओशो'
        WHEN 'Jared Mason Diamond' THEN 'जेरेड डायमंड'
    END,
    CASE name
        WHEN 'Bhagat Singh' THEN 'भारतीय क्रांतिकारी और स्वतंत्रता सेनानी। "मैं नास्तिक क्यों हूँ" के लेखक।'
        WHEN 'Yuval Noah Harari' THEN 'इज़राइली इतिहासकार और लेखक। "सेपियन्स", "होमो ड्यूस" और "नेक्सस" के लेखक।'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'भारतीय विधिवेत्ता, अर्थशास्त्री और समाज सुधारक। भारतीय संविधान के निर्माता।'
        WHEN 'Osho' THEN 'भारतीय आध्यात्मिक गुरु और दार्शनिक। ध्यान, प्रेम और चेतना पर प्रवचन।'
        WHEN 'Jared Mason Diamond' THEN 'अमेरिकी इतिहासकार, भूगोलवेत्ता और लेखक। "गन्स, जर्म्स एंड स्टील" के लेखक।'
    END,
    CASE name
        WHEN 'Bhagat Singh' THEN 'भारतीय'
        WHEN 'Yuval Noah Harari' THEN 'इज़राइली'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'भारतीय'
        WHEN 'Osho' THEN 'भारतीय'
        WHEN 'Jared Mason Diamond' THEN 'अमेरिकी'
    END,
    1
FROM authors
WHERE name IN ('Bhagat Singh', 'Yuval Noah Harari', 'Bhimrao Ramji Ambedkar', 'Osho', 'Jared Mason Diamond');

-- Seed Urdu Translations
INSERT OR IGNORE INTO author_translations (author_id, language_code, name, bio, nationality, is_primary)
SELECT id, 'urdu',
    CASE name
        WHEN 'Bhagat Singh' THEN 'بھگت سنگھ'
        WHEN 'Yuval Noah Harari' THEN 'یووال نوح ہراری'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'ڈاکٹر بھیم راؤ رام جی امبیڈکر'
        WHEN 'Osho' THEN 'اوشو'
        WHEN 'Jared Mason Diamond' THEN 'جارڈ ڈائمنڈ'
    END,
    CASE name
        WHEN 'Bhagat Singh' THEN 'بھارتی انقلابی اور آزادی پسند۔ "میں ملحد کیوں ہوں" کے مصنف۔'
        WHEN 'Yuval Noah Harari' THEN 'اسرائیلی مورخ اور مصنف۔ "سیپیئنز"، "ہومو ڈیوس" اور "نیکسس" کے مصنف۔'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'بھارتی قانون دان، ماہر معاشیات اور سماجی مصلح۔ بھارتی آئین کے معمار۔'
        WHEN 'Osho' THEN 'بھارتی روحانی رہنما اور فلسفی۔ مراقبہ، محبت اور شعور پر تعلیمات۔'
        WHEN 'Jared Mason Diamond' THEN 'امریکی مورخ، ماہر جغرافیہ اور مصنف۔ "گنز، جرمنز اینڈ سٹیل" کے مصنف۔'
    END,
    CASE name
        WHEN 'Bhagat Singh' THEN 'بھارتی'
        WHEN 'Yuval Noah Harari' THEN 'اسرائیلی'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'بھارتی'
        WHEN 'Osho' THEN 'بھارتی'
        WHEN 'Jared Mason Diamond' THEN 'امریکی'
    END,
    1
FROM authors
WHERE name IN ('Bhagat Singh', 'Yuval Noah Harari', 'Bhimrao Ramji Ambedkar', 'Osho', 'Jared Mason Diamond');

-- ============================================
-- 4. AUTHOR ALIASES TABLE
-- ============================================
CREATE TABLE author_aliases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    alias_name VARCHAR(200) NOT NULL,
    alias_type VARCHAR(50) DEFAULT 'pen_name',
    language_code VARCHAR(20),
    is_primary BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE(author_id, alias_name, language_code)
);

CREATE INDEX idx_author_aliases_author_id ON author_aliases(author_id);
CREATE INDEX idx_author_aliases_alias_name ON author_aliases(alias_name);

-- Seed Author Aliases (English)
INSERT OR IGNORE INTO author_aliases (author_id, alias_name, alias_type, language_code, is_primary)
SELECT id, name, 'pen_name', 'english', 1
FROM authors;

-- Seed Author Aliases (Hindi)
INSERT OR IGNORE INTO author_aliases (author_id, alias_name, alias_type, language_code, is_primary)
SELECT id,
    CASE name
        WHEN 'Bhagat Singh' THEN 'भगत सिंह'
        WHEN 'Yuval Noah Harari' THEN 'युवाल नोआ हरारी'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'डॉ. भीमराव आंबेडकर'
        WHEN 'Osho' THEN 'ओशो'
        WHEN 'Jared Mason Diamond' THEN 'जेरेड डायमंड'
    END,
    'pen_name', 'hindi', 1
FROM authors;

-- Seed Author Aliases (Urdu)
INSERT OR IGNORE INTO author_aliases (author_id, alias_name, alias_type, language_code, is_primary)
SELECT id,
    CASE name
        WHEN 'Bhagat Singh' THEN 'بھگت سنگھ'
        WHEN 'Yuval Noah Harari' THEN 'یووال نوح ہراری'
        WHEN 'Bhimrao Ramji Ambedkar' THEN 'باباصاحب امبیڈکر'
        WHEN 'Osho' THEN 'اوشو'
        WHEN 'Jared Mason Diamond' THEN 'جارڈ ڈائمنڈ'
    END,
    'pen_name', 'urdu', 1
FROM authors;

-- ============================================
-- 5. AUTHOR LANGUAGES TABLE
-- ============================================
CREATE TABLE author_languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    language_code VARCHAR(20) NOT NULL,
    language_type VARCHAR(50) DEFAULT 'native',
    proficiency_level INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT 0,
    is_verified BOOLEAN DEFAULT 0,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE(author_id, language_code)
);

CREATE INDEX idx_author_languages_author_id ON author_languages(author_id);
CREATE INDEX idx_author_languages_language_code ON author_languages(language_code);

-- Seed Author Languages
INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'english', 'writing', 10, 1 FROM authors;

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'hindi', 'native', 10, 1 FROM authors WHERE name = 'Bhagat Singh';

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'urdu', 'fluent', 8, 0 FROM authors WHERE name = 'Bhagat Singh';

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'hebrew', 'native', 10, 1 FROM authors WHERE name = 'Yuval Noah Harari';

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'marathi', 'native', 10, 1 FROM authors WHERE name = 'Bhimrao Ramji Ambedkar';

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'sanskrit', 'fluent', 8, 0 FROM authors WHERE name = 'Bhimrao Ramji Ambedkar';

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'german', 'fluent', 8, 0 FROM authors WHERE name = 'Jared Mason Diamond';

INSERT OR IGNORE INTO author_languages (author_id, language_code, language_type, proficiency_level, is_primary)
SELECT id, 'french', 'fluent', 8, 0 FROM authors WHERE name = 'Jared Mason Diamond';

-- ============================================
-- TURN FOREIGN KEYS BACK ON
-- ============================================
PRAGMA foreign_keys = ON;

-- ============================================
-- VERIFY DATABASE
-- ============================================
SELECT '========================================' AS '';
SELECT 'BOOKQUBIT DATABASE CREATED' AS '';
SELECT '========================================' AS '';
SELECT 'Languages: ' || (SELECT COUNT(*) FROM languages) AS '';
SELECT 'Authors: ' || (SELECT COUNT(*) FROM authors) AS '';
SELECT 'Author Translations: ' || (SELECT COUNT(*) FROM author_translations) AS '';
SELECT 'Author Aliases: ' || (SELECT COUNT(*) FROM author_aliases) AS '';
SELECT 'Author Languages: ' || (SELECT COUNT(*) FROM author_languages) AS '';
SELECT '========================================' AS '';
SELECT 'DATABASE READY FOR USE!' AS '';
SELECT '========================================' AS '';