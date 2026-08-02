-- ==========================================
-- Insert Language Data
-- ==========================================

PRAGMA foreign_keys = ON;

-- Insert languages
INSERT OR IGNORE INTO languages (code, name, native_name, script, direction, is_active, is_rtl) VALUES
('en', 'English', 'English', 'Latn', 'ltr', 1, 0),
('es', 'Spanish', 'Español', 'Latn', 'ltr', 1, 0),
('fr', 'French', 'Français', 'Latn', 'ltr', 1, 0),
('de', 'German', 'Deutsch', 'Latn', 'ltr', 1, 0),
('it', 'Italian', 'Italiano', 'Latn', 'ltr', 1, 0),
('pt', 'Portuguese', 'Português', 'Latn', 'ltr', 1, 0),
('ru', 'Russian', 'Русский', 'Cyrl', 'ltr', 1, 0),
('zh', 'Chinese', '中文', 'Hans', 'ltr', 1, 0),
('ja', 'Japanese', '日本語', 'Jpan', 'ltr', 1, 0),
('ar', 'Arabic', 'العربية', 'Arab', 'rtl', 1, 1),
('he', 'Hebrew', 'עברית', 'Hebr', 'rtl', 1, 1),
('hi', 'Hindi', 'हिन्दी', 'Deva', 'ltr', 1, 0),
('ko', 'Korean', '한국어', 'Hang', 'ltr', 1, 0),
('nl', 'Dutch', 'Nederlands', 'Latn', 'ltr', 1, 0),
('pl', 'Polish', 'Polski', 'Latn', 'ltr', 1, 0),
('tr', 'Turkish', 'Türkçe', 'Latn', 'ltr', 1, 0),
('vi', 'Vietnamese', 'Tiếng Việt', 'Latn', 'ltr', 1, 0),
('th', 'Thai', 'ไทย', 'Thai', 'ltr', 1, 0),
('sv', 'Swedish', 'Svenska', 'Latn', 'ltr', 1, 0),
('no', 'Norwegian', 'Norsk', 'Latn', 'ltr', 1, 0),
('da', 'Danish', 'Dansk', 'Latn', 'ltr', 1, 0),
('fi', 'Finnish', 'Suomi', 'Latn', 'ltr', 1, 0),
('el', 'Greek', 'Ελληνικά', 'Grek', 'ltr', 1, 0),
('cs', 'Czech', 'Čeština', 'Latn', 'ltr', 1, 0);

-- Insert language codes (ISO-639-1)
INSERT OR IGNORE INTO language_codes (language_id, standard, code, is_preferred) 
SELECT id, 'ISO-639-1', code, 1 FROM languages;

-- Insert language codes (ISO-639-2)
INSERT OR IGNORE INTO language_codes (language_id, standard, code, is_preferred)
SELECT id, 'ISO-639-2', 
    CASE code 
        WHEN 'en' THEN 'eng'
        WHEN 'es' THEN 'spa'
        WHEN 'fr' THEN 'fra'
        WHEN 'de' THEN 'deu'
        WHEN 'it' THEN 'ita'
        WHEN 'pt' THEN 'por'
        WHEN 'ru' THEN 'rus'
        WHEN 'zh' THEN 'zho'
        WHEN 'ja' THEN 'jpn'
        WHEN 'ar' THEN 'ara'
        WHEN 'he' THEN 'heb'
        WHEN 'hi' THEN 'hin'
        WHEN 'ko' THEN 'kor'
        WHEN 'nl' THEN 'nld'
        WHEN 'pl' THEN 'pol'
        WHEN 'tr' THEN 'tur'
        WHEN 'vi' THEN 'vie'
        WHEN 'th' THEN 'tha'
        WHEN 'sv' THEN 'swe'
        WHEN 'no' THEN 'nor'
        WHEN 'da' THEN 'dan'
        WHEN 'fi' THEN 'fin'
        WHEN 'el' THEN 'ell'
        WHEN 'cs' THEN 'ces'
    END, 0 
FROM languages;

-- Insert fallbacks (fallback to English)
INSERT OR IGNORE INTO language_fallbacks (language_id, fallback_language_id, priority)
SELECT 
    l1.id,
    (SELECT id FROM languages WHERE code = 'en'),
    CASE 
        WHEN l1.code = 'es' THEN 2
        WHEN l1.code = 'fr' THEN 3
        WHEN l1.code = 'de' THEN 4
        ELSE 1
    END
FROM languages l1
WHERE l1.code != 'en';

-- Set fallback for Spanish
INSERT OR IGNORE INTO language_fallbacks (language_id, fallback_language_id, priority)
SELECT 
    l1.id,
    l2.id,
    1
FROM languages l1
CROSS JOIN languages l2
WHERE l1.code = 'es' AND l2.code = 'en';

-- Verification
SELECT 'Data inserted successfully!' AS status;
SELECT 'Total languages:' AS info, COUNT(*) AS count FROM languages;
SELECT 'Total language codes:' AS info, COUNT(*) AS count FROM language_codes;
SELECT 'Total fallbacks:' AS info, COUNT(*) AS count FROM language_fallbacks;

-- Show all languages
SELECT code, name, native_name, direction FROM languages ORDER BY code;