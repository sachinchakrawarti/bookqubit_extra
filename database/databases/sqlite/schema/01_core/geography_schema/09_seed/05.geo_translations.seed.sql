-- =============================================
-- Seed Data: geo_translations
-- Description: Insert geographic translations
-- =============================================

INSERT OR IGNORE INTO geo_translations (
    entity_type,
    entity_id,
    language_id,
    name,
    description,
    created_at,
    updated_at
) VALUES
    -- Continents translations (Hindi - language_id = 2)
    ('continent', 1, 2, 'अफ्रीका', 'अफ्रीका महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 3, 2, 'एशिया', 'एशिया महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 4, 2, 'यूरोप', 'यूरोप महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 5, 2, 'उत्तरी अमेरिका', 'उत्तरी अमेरिका महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 7, 2, 'दक्षिण अमेरिका', 'दक्षिण अमेरिका महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 6, 2, 'ओशिनिया', 'ओशिनिया महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 2, 2, 'अंटार्कटिका', 'अंटार्कटिका महाद्वीप', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Countries translations (Hindi - language_id = 2)
    ('country', 1, 2, 'भारत', 'भारत देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 2, 2, 'जापान', 'जापान देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 3, 2, 'चीन', 'चीन देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 4, 2, 'दक्षिण कोरिया', 'दक्षिण कोरिया देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 5, 2, 'यूनाइटेड किंगडम', 'यूनाइटेड किंगडम देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 6, 2, 'जर्मनी', 'जर्मनी देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 7, 2, 'फ्रांस', 'फ्रांस देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 8, 2, 'इटली', 'इटली देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 9, 2, 'संयुक्त राज्य अमेरिका', 'संयुक्त राज्य अमेरिका', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 10, 2, 'कनाडा', 'कनाडा देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 12, 2, 'ब्राजील', 'ब्राजील देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 14, 2, 'ऑस्ट्रेलिया', 'ऑस्ट्रेलिया देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 16, 2, 'दक्षिण अफ्रीका', 'दक्षिण अफ्रीका देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 17, 2, 'नाइजीरिया', 'नाइजीरिया देश', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Continents translations (Spanish - language_id = 3)
    ('continent', 1, 3, 'África', 'Continente africano', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 3, 3, 'Asia', 'Continente asiático', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 4, 3, 'Europa', 'Continente europeo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 5, 3, 'América del Norte', 'Continente norteamericano', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 7, 3, 'América del Sur', 'Continente sudamericano', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 6, 3, 'Oceanía', 'Continente oceánico', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 2, 3, 'Antártida', 'Continente antártico', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Countries translations (Spanish - language_id = 3)
    ('country', 1, 3, 'India', 'País de la India', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 2, 3, 'Japón', 'País de Japón', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 3, 3, 'China', 'País de China', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 5, 3, 'Reino Unido', 'Reino Unido de Gran Bretaña', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 6, 3, 'Alemania', 'República Federal de Alemania', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 7, 3, 'Francia', 'República Francesa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 8, 3, 'Italia', 'República Italiana', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 9, 3, 'Estados Unidos', 'Estados Unidos de América', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 10, 3, 'Canadá', 'Canadá', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 12, 3, 'Brasil', 'República Federativa de Brasil', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 14, 3, 'Australia', 'Mancomunidad de Australia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Continents translations (French - language_id = 4)
    ('continent', 1, 4, 'Afrique', 'Continent africain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 3, 4, 'Asie', 'Continent asiatique', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 4, 4, 'Europe', 'Continent européen', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 5, 4, 'Amérique du Nord', 'Continent nord-américain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('continent', 7, 4, 'Amérique du Sud', 'Continent sud-américain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Countries translations (French - language_id = 4)
    ('country', 1, 4, 'Inde', 'République de l\'Inde', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 2, 4, 'Japon', 'Japon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 3, 4, 'Chine', 'République populaire de Chine', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 5, 4, 'Royaume-Uni', 'Royaume-Uni de Grande-Bretagne', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 6, 4, 'Allemagne', 'République fédérale d\'Allemagne', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 7, 4, 'France', 'République française', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 8, 4, 'Italie', 'République italienne', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('country', 9, 4, 'États-Unis', 'États-Unis d\'Amérique', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify seed
SELECT 'Translations seeded: ' || COUNT(*) FROM geo_translations;