# Language Schema Data Types

## Overview

This document describes the data types, naming conventions, constraints, and storage guidelines used throughout the Language Schema.

The schema is designed primarily for **SQLite** while remaining portable to PostgreSQL, MySQL, SQL Server, and other relational databases with minimal changes.

---

# Design Principles

- Consistent data types
- Human-readable schema
- ISO compliant
- Unicode support
- Portable SQL
- Future-proof design

---

# Primary Keys

Every table uses an auto-incrementing integer primary key.

| Type | SQLite |
|------|---------|
| Primary Key | INTEGER PRIMARY KEY AUTOINCREMENT |

Example

```sql
language_id INTEGER PRIMARY KEY AUTOINCREMENT
```

---

# Foreign Keys

Foreign keys always use the same type as the referenced primary key.

Example

```sql
language_id INTEGER NOT NULL
```

---

# Text

SQLite stores text using the `TEXT` data type.

Used for

- language names
- ISO codes
- locale codes
- aliases
- Unicode strings
- script names

Example

```sql
language_name TEXT NOT NULL
```

---

# Integer

Used for

- IDs
- ordering
- counters
- populations

Example

```sql
sort_order INTEGER
```

---

# Boolean

SQLite has no native Boolean type.

The schema stores Boolean values as integers.

| Value | Meaning |
|--------|---------|
| 0 | False |
| 1 | True |

Example

```sql
is_active INTEGER NOT NULL DEFAULT 1
CHECK(is_active IN (0,1))
```

---

# Decimal Numbers

Used for percentages and numeric values requiring decimals.

SQLite type

```sql
REAL
```

Example

```sql
literacy_rate REAL
```

---

# Date and Time

SQLite stores timestamps as text.

Format

```
YYYY-MM-DD HH:MM:SS
```

Example

```sql
created_at TEXT DEFAULT CURRENT_TIMESTAMP
```

---

# Unicode

SQLite TEXT supports Unicode.

Examples

English

```
English
```

Hindi

```
हिन्दी
```

Arabic

```
العربية
```

Japanese

```
日本語
```

Chinese

```
中文
```

---

# ISO Codes

## ISO 639-1

Length

```
2
```

Examples

```
en
hi
fr
ja
```

SQLite type

```sql
TEXT
```

---

## ISO 639-2

Length

```
3
```

Examples

```
eng
hin
fra
jpn
```

SQLite type

```sql
TEXT
```

---

## ISO 639-3

Length

```
3
```

Examples

```
eng
hin
arb
tam
```

SQLite type

```sql
TEXT
```

---

# ISO 15924

Script identifiers.

Length

```
4
```

Examples

```
Latn
Deva
Arab
Cyrl
Hani
```

SQLite type

```sql
TEXT
```

---

# Locale Codes

Examples

```
en-US
hi-IN
fr-FR
ja-JP
```

SQLite type

```sql
TEXT
```

Recommended format

```
language-COUNTRY
```

---

# Direction

Allowed values

```
LTR
RTL
```

SQLite type

```sql
TEXT
```

Constraint

```sql
CHECK(direction IN ('LTR','RTL'))
```

---

# Unicode Range

Stores the Unicode block supported by a script.

Example

```
U+0900-U+097F
```

SQLite type

```sql
TEXT
```

---

# Alias Type

Stored as text with a CHECK constraint.

Supported values

- alternative
- native
- historical
- abbreviation
- iso
- transliteration
- romanized
- common
- short

SQLite type

```sql
TEXT
```

---

# Nullable Columns

Some fields are optional.

Examples

- short_name
- native_name
- unicode_range
- notes
- locale_code
- iso_639_1
- iso_639_2
- iso_639_3

---

# Naming Convention

## Primary Keys

```
language_id
script_id
language_name_id
language_region_id
language_alias_id
```

---

## Foreign Keys

```
language_id
script_id
display_language_id
default_script_id
country_id
```

---

## Boolean Fields

Always begin with

```
is_
```

Examples

```
is_active
is_default
is_official
is_primary
is_preferred
is_searchable
```

---

## Timestamp Fields

```
created_at
updated_at
```

---

## Code Fields

Examples

```
language_code
script_code
locale_code
iso_639_1
iso_639_2
iso_639_3
iso15924_code
```

---

# Recommended Limits

| Field | Recommended Length |
|--------|-------------------:|
| language_code | 2–10 characters |
| script_code | 2–30 characters |
| iso_639_1 | 2 characters |
| iso_639_2 | 3 characters |
| iso_639_3 | 3 characters |
| iso15924_code | 4 characters |
| locale_code | 5–10 characters |
| language_name | up to 255 characters |
| script_name | up to 255 characters |
| alias_name | up to 255 characters |

> SQLite does not enforce the length of `TEXT` values. These limits are recommended for application-level validation and portability.

---

# Data Type Summary

| Data | SQLite Type | Example |
|------|-------------|---------|
| Primary Key | INTEGER | 1 |
| Foreign Key | INTEGER | 25 |
| Name | TEXT | English |
| Native Name | TEXT | हिन्दी |
| ISO Code | TEXT | eng |
| Locale | TEXT | en-US |
| Script | TEXT | Latin |
| Boolean | INTEGER | 0 / 1 |
| Decimal | REAL | 95.6 |
| Timestamp | TEXT | 2026-07-08 10:30:00 |

---

# Portability

| SQLite | PostgreSQL | MySQL |
|---------|------------|--------|
| INTEGER | INTEGER | INT |
| TEXT | TEXT | VARCHAR/TEXT |
| REAL | REAL | DOUBLE |
| CURRENT_TIMESTAMP | CURRENT_TIMESTAMP | CURRENT_TIMESTAMP |
| INTEGER (Boolean) | BOOLEAN | BOOLEAN/TINYINT(1) |

The schema intentionally uses SQLite-compatible types that map cleanly to other major relational database systems.