-- Count languages
SELECT COUNT(*) FROM languages;

-- View first 10 languages
SELECT *
FROM languages
LIMIT 10;

-- View selected language columns
SELECT
    id,
    code,
    name,
    native_name,
    script,
    direction,
    locale,
    enabled
FROM languages
LIMIT 10;

-- Count transliterations
SELECT COUNT(*) FROM language_transliterations;

-- View first 10 transliterations
SELECT *
FROM language_transliterations
LIMIT 10;

-- Show transliterations with language names
SELECT
    lt.id,
    l1.name AS language,
    l2.name AS transliteration_language,
    lt.transliterated_name
FROM language_transliterations lt
JOIN languages l1
    ON lt.language_id = l1.id
JOIN languages l2
    ON lt.transliteration_language_id = l2.id
ORDER BY l1.name, l2.name
LIMIT 20;

-- Show all transliterations for English
SELECT
    l2.name AS language,
    lt.transliterated_name
FROM language_transliterations lt
JOIN languages l2
    ON lt.transliteration_language_id = l2.id
WHERE lt.language_id = (
    SELECT id
    FROM languages
    WHERE code = 'en'
)
ORDER BY l2.name;

-- Show all transliterations for Hindi
SELECT
    l2.name AS language,
    lt.transliterated_name
FROM language_transliterations lt
JOIN languages l2
    ON lt.transliteration_language_id = l2.id
WHERE lt.language_id = (
    SELECT id
    FROM languages
    WHERE code = 'hi'
)
ORDER BY l2.name;