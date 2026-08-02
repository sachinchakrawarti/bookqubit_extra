PRAGMA database_list;

-- Active: 1785061887586@@127.0.0.1@3306
FROM sqlite_master
WHERE type = 'table'
ORDER BY name;

PRAGMA table_info(languages);

SELECT *
FROM languages;