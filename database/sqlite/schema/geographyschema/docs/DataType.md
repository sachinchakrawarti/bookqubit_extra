# Data Types Guide

## BookQubit Database

**Schema:** Geography

**Document:** DataType.md

**Version:** 1.0.0

---

# Overview

This document defines the standard SQLite data types used throughout the **BookQubit Geography Schema**.

Using consistent data types improves:

- Data integrity
- Query performance
- Maintainability
- Consistency across all schemas
- Future migration to PostgreSQL/MySQL

---

# SQLite Storage Classes

SQLite supports five storage classes.

| SQLite Type | Description | Example |
|--------------|------------|---------|
| INTEGER | Whole numbers | 1, 100, -25 |
| REAL | Decimal numbers | 19.99, 28.6139 |
| TEXT | Strings | India |
| BLOB | Binary data | Images, files |
| NULL | Empty value | NULL |

---

# Standard Data Types

## Primary Keys

| Type | Usage |
|------|------|
| INTEGER | Primary Key |
| INTEGER AUTOINCREMENT | Auto Increment IDs |

Example

```sql
country_id INTEGER PRIMARY KEY AUTOINCREMENT
```

---

## Foreign Keys

Always use

```sql
INTEGER
```

Example

```sql
continent_id INTEGER NOT NULL
```

---

## Names

Store all names using

```sql
TEXT
```

Example

```sql
name TEXT NOT NULL

official_name TEXT

native_name TEXT

common_name TEXT
```

---

## Translation Fields

Use

```sql
TEXT
```

Example

```sql
romanized_name TEXT

romanized_official_name TEXT

slug TEXT
```

---

## Geographic Coordinates

Latitude

```sql
REAL
```

Longitude

```sql
REAL
```

Example

```sql
latitude REAL

longitude REAL
```

Example values

```
28.6139

77.2090
```

---

## Area

Use

```sql
REAL
```

Example

```sql
area_sq_km REAL
```

Example

```
3287263.0
```

---

## Population

Use

```sql
INTEGER
```

Example

```sql
population INTEGER
```

Example

```
1428627663
```

---

## Codes

Store all ISO codes as

```sql
TEXT
```

Examples

```sql
iso2 TEXT

iso3 TEXT

numeric_code TEXT

calling_code TEXT

currency_code TEXT

language_code TEXT
```

---

## URLs

Always use

```sql
TEXT
```

Example

```sql
flag_url TEXT

map_url TEXT

website TEXT
```

---

## Email

```sql
TEXT
```

---

## Phone Number

```sql
TEXT
```

Never use INTEGER.

Example

```
+91 9876543210
```

---

## Currency

Store

```sql
TEXT
```

for codes

Example

```sql
currency_code TEXT

currency_symbol TEXT
```

Exchange Rate

```sql
REAL
```

---

## Boolean

SQLite has no BOOLEAN type.

Use

```sql
INTEGER
```

Values

| Value | Meaning |
|---------|----------|
| 1 | TRUE |
| 0 | FALSE |

Example

```sql
is_active INTEGER DEFAULT 1

is_verified INTEGER DEFAULT 0
```

---

## Date

Store as

```sql
TEXT
```

ISO 8601 format

Example

```
2026-07-02
```

---

## DateTime

Store as

```sql
DATETIME
```

Example

```sql
created_at DATETIME DEFAULT CURRENT_TIMESTAMP

updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

---

## Time

Store

```sql
TEXT
```

Example

```
18:45:20
```

---

## JSON

SQLite stores JSON as

```sql
TEXT
```

Example

```sql
metadata TEXT

settings TEXT
```

---

## UUID

Store

```sql
TEXT
```

Example

```
8e4c1f1d-6db5-4fd8-a2fa-5d56bdfdc6c4
```

---

## Enum

SQLite has no ENUM.

Use

```sql
TEXT
```

with

```sql
CHECK()
```

Example

```sql
status TEXT
CHECK(
status IN
(
'active',
'inactive',
'draft'
)
)
```

---

## Decimal Numbers

Use

```sql
REAL
```

Examples

```sql
price REAL

rating REAL

score REAL
```

---

## Binary Data

Use

```sql
BLOB
```

Example

```sql
thumbnail BLOB
```

Normally BookQubit stores images externally.

---

# Recommended Lengths

| Data | Type |
|-------|------|
| Name | TEXT |
| Slug | TEXT |
| Description | TEXT |
| ISO Code | TEXT |
| URL | TEXT |
| Email | TEXT |
| Phone | TEXT |

SQLite ignores VARCHAR length.

Use TEXT.

---

# BookQubit Standard Types

| Field | SQLite Type |
|--------|-------------|
| id | INTEGER |
| name | TEXT |
| slug | TEXT |
| description | TEXT |
| latitude | REAL |
| longitude | REAL |
| area_sq_km | REAL |
| population | INTEGER |
| created_at | DATETIME |
| updated_at | DATETIME |
| is_active | INTEGER |
| sort_order | INTEGER |
| metadata | TEXT |

---

# Example Table

```sql
CREATE TABLE countries(

country_id INTEGER PRIMARY KEY AUTOINCREMENT,

continent_id INTEGER,

name TEXT NOT NULL,

official_name TEXT,

slug TEXT,

iso2 TEXT,

iso3 TEXT,

latitude REAL,

longitude REAL,

population INTEGER,

area_sq_km REAL,

is_active INTEGER DEFAULT 1,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);
```

---

# Best Practices

✔ Always use INTEGER for IDs.

✔ Always use REAL for coordinates.

✔ Always use TEXT for names.

✔ Store dates in ISO 8601 format.

✔ Store timestamps in UTC.

✔ Use INTEGER (0/1) for Boolean values.

✔ Never use VARCHAR(n) in SQLite.

✔ Use CHECK constraints instead of ENUM.

✔ Store images as URLs instead of BLOB whenever possible.

✔ Keep data types consistent across all BookQubit schemas.

---

# Related Documentation

- README.md
- TABLES.md
- DATA_FIELDS.md
- RELATIONSHIPS.md
- API_GUIDE.md
- SEED_GUIDE.md
- MIGRATION_GUIDE.md
- ROMANIZATION_GUIDE.md
- TRANSLITERATION_GUIDE.md
- TRANSLATION_GUIDE.md

---

© BookQubit Database Documentation

Version 1.0.0