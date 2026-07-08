# Language Schema Query Examples

## Overview

This document contains common SQL queries for working with the **Language Schema**. These examples can be used directly in SQLite or adapted for PostgreSQL, MySQL, and SQL Server.

---

# Get All Languages

```sql
SELECT *
FROM languages
ORDER BY english_name;
```

---

# Get Active Languages

```sql
SELECT *
FROM languages
WHERE is_active = 1
ORDER BY sort_order,
         english_name;
```

---

# Get Default Language

```sql
SELECT *
FROM languages
WHERE is_default = 1;
```

---

# Find Language by ISO 639-1

```sql
SELECT *
FROM languages
WHERE iso_639_1 = 'en';
```

---

# Find Language by ISO 639-2

```sql
SELECT *
FROM languages
WHERE iso_639_2 = 'eng';
```

---

# Find Language by ISO 639-3

```sql
SELECT *
FROM languages
WHERE iso_639_3 = 'eng';
```

---

# Find Language by Locale

```sql
SELECT *
FROM languages
WHERE locale_code = 'en-US';
```

---

# Get Languages Using a Specific Script

```sql
SELECT
    l.language_name,
    s.script_name
FROM languages l
JOIN scripts s
ON l.default_script_id = s.script_id
WHERE s.script_name = 'Latin';
```

---

# Get RTL Languages

```sql
SELECT
    language_name,
    language_code
FROM languages
WHERE direction = 'RTL';
```

---

# Get LTR Languages

```sql
SELECT
    language_name,
    language_code
FROM languages
WHERE direction = 'LTR';
```

---

# List All Scripts

```sql
SELECT *
FROM scripts
ORDER BY script_name;
```

---

# Find Script by ISO 15924

```sql
SELECT *
FROM scripts
WHERE iso15924_code = 'Latn';
```

---

# Get Language Names in English

```sql
SELECT
    l.language_code,
    ln.language_name
FROM language_names ln
JOIN languages l
ON ln.language_id = l.language_id
JOIN languages d
ON ln.display_language_id = d.language_id
WHERE d.language_code = 'en';
```

---

# Get Language Names in Hindi

```sql
SELECT
    l.language_code,
    ln.language_name
FROM language_names ln
JOIN languages l
ON ln.language_id = l.language_id
JOIN languages d
ON ln.display_language_id = d.language_id
WHERE d.language_code = 'hi';
```

---

# Get Preferred Names

```sql
SELECT *
FROM language_names
WHERE is_preferred = 1;
```

---

# Search Languages

```sql
SELECT *
FROM languages
WHERE english_name LIKE '%Hindi%'
   OR native_name LIKE '%हिन्दी%'
   OR language_name LIKE '%Hindi%';
```

---

# Search Localized Names

```sql
SELECT *
FROM language_names
WHERE language_name LIKE '%English%';
```

---

# Get Language with Script

```sql
SELECT
    l.language_name,
    s.script_name,
    s.direction
FROM languages l
LEFT JOIN scripts s
ON l.default_script_id = s.script_id;
```

---

# Get Language Regions

```sql
SELECT
    language_id,
    country_id,
    is_official,
    is_primary
FROM language_regions
ORDER BY language_id;
```

---

# Languages Spoken in a Country

```sql
SELECT
    l.language_name,
    lr.is_official,
    lr.is_primary
FROM language_regions lr
JOIN languages l
ON lr.language_id = l.language_id
WHERE lr.country_id = 356;
```

> Example: `356` is the ISO numeric code for India if your Geography Schema uses ISO numeric identifiers.

---

# Get Language Aliases

```sql
SELECT
    l.language_name,
    a.alias_name,
    a.alias_type
FROM language_aliases a
JOIN languages l
ON a.language_id = l.language_id;
```

---

# Search by Alias

```sql
SELECT
    l.language_name,
    a.alias_name
FROM language_aliases a
JOIN languages l
ON a.language_id = l.language_id
WHERE a.alias_name LIKE '%Hindustani%';
```

---

# Count Languages

```sql
SELECT COUNT(*) AS total_languages
FROM languages;
```

---

# Count Active Languages

```sql
SELECT COUNT(*) AS active_languages
FROM languages
WHERE is_active = 1;
```

---

# Count Scripts

```sql
SELECT COUNT(*) AS total_scripts
FROM scripts;
```

---

# Count Languages by Direction

```sql
SELECT
    direction,
    COUNT(*) AS total
FROM languages
GROUP BY direction;
```

---

# Count Languages per Script

```sql
SELECT
    s.script_name,
    COUNT(*) AS total_languages
FROM scripts s
LEFT JOIN languages l
ON s.script_id = l.default_script_id
GROUP BY s.script_name
ORDER BY total_languages DESC;
```

---

# Find Languages Without Scripts

```sql
SELECT *
FROM languages
WHERE default_script_id IS NULL;
```

---

# Languages Without Localized Names

```sql
SELECT
    l.language_name
FROM languages l
LEFT JOIN language_names ln
ON l.language_id = ln.language_id
WHERE ln.language_id IS NULL;
```

---

# Use the Lookup View

```sql
SELECT *
FROM vw_language_lookup;
```

---

# Search Using Lookup View

```sql
SELECT *
FROM vw_language_lookup
WHERE display_name LIKE '%English%';
```

---

# Populate a Language Dropdown

```sql
SELECT
    language_id,
    language_name
FROM vw_language_dropdown;
```

---

# Native Language Dropdown

```sql
SELECT
    language_id,
    language_name
FROM vw_language_dropdown_native;
```

---

# Active Languages View

```sql
SELECT *
FROM vw_active_languages;
```

---

# Preferred Language Names View

```sql
SELECT *
FROM vw_preferred_language_names;
```

---

# Language Statistics View

```sql
SELECT *
FROM vw_language_statistics;
```

---

# Language Name Statistics View

```sql
SELECT *
FROM vw_language_name_statistics;
```

---

# Best Practices

- Filter inactive records using `is_active = 1` where appropriate.
- Use indexed columns (`language_code`, `iso_639_1`, `iso_639_2`, `iso_639_3`, `locale_code`) for fast lookups.
- Prefer views such as `vw_language_lookup` and `vw_language_dropdown` for application queries.
- Use parameterized queries in application code to prevent SQL injection.
- Join against `language_names` when displaying translated language names instead of relying only on the master `languages` table.

---

# Common Use Cases

- Language selector dropdowns
- User locale preferences
- Translation management
- Search and autocomplete
- ISO code lookups
- Script detection
- Regional language mapping
- Reporting and analytics
- Multilingual UI rendering
- Localization services