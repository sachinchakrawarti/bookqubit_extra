# Data Fields Reference

## BookQubit Database

**Schema:** Geography

**Version:** 1.0.0

---

# Overview

This document describes the standard data fields used throughout the **Geography Schema**.

The goal is to keep all tables consistent and make future development easier.

---

# Primary Key Fields

| Field | Type | Description |
|---------|------|-------------|
| continent_id | INTEGER | Unique continent ID |
| region_id | INTEGER | Unique region ID |
| subregion_id | INTEGER | Unique subregion ID |
| country_id | INTEGER | Unique country ID |
| state_id | INTEGER | Unique state ID |
| city_id | INTEGER | Unique city ID |
| language_id | INTEGER | Language reference |
| currency_id | INTEGER | Currency reference |
| timezone_id | INTEGER | Timezone reference |

---

# Name Fields

| Field | Type | Description |
|---------|------|-------------|
| name | TEXT | Default English name |
| official_name | TEXT | Official name |
| common_name | TEXT | Commonly used name |
| native_name | TEXT | Native script name |
| short_name | TEXT | Short version |
| display_name | TEXT | UI display name |

---

# Translation Fields

| Field | Type | Description |
|---------|------|-------------|
| language_id | INTEGER | Language reference |
| romanized_name | TEXT | Romanized (Latin) name |
| romanized_official_name | TEXT | Romanized official name |
| slug | TEXT | SEO-friendly URL slug |
| locale | TEXT | Locale (en-IN, hi-IN, etc.) |

---

# Geographic Fields

| Field | Type | Description |
|---------|------|-------------|
| latitude | REAL | Latitude |
| longitude | REAL | Longitude |
| elevation | REAL | Elevation above sea level |
| area_sq_km | REAL | Area in square kilometers |
| population | INTEGER | Population |
| population_density | REAL | Population per sq km |

---

# Country Information

| Field | Type | Description |
|---------|------|-------------|
| iso2 | TEXT | ISO 3166-1 Alpha-2 |
| iso3 | TEXT | ISO 3166-1 Alpha-3 |
| numeric_code | TEXT | ISO numeric code |
| calling_code | TEXT | Telephone code |
| internet_tld | TEXT | Internet domain |
| vehicle_code | TEXT | Vehicle registration code |

---

# Administrative Fields

| Field | Type | Description |
|---------|------|-------------|
| capital_city_id | INTEGER | Capital city |
| continent_id | INTEGER | Parent continent |
| region_id | INTEGER | Parent region |
| subregion_id | INTEGER | Parent subregion |

---

# Currency Fields

| Field | Type | Description |
|---------|------|-------------|
| currency_code | TEXT | ISO 4217 |
| currency_symbol | TEXT | Currency symbol |
| currency_name | TEXT | Currency name |

---

# Timezone Fields

| Field | Type | Description |
|---------|------|-------------|
| timezone_name | TEXT | IANA timezone |
| utc_offset | TEXT | UTC Offset |
| dst_supported | INTEGER | Daylight Saving |

---

# Media Fields

| Field | Type | Description |
|---------|------|-------------|
| flag_url | TEXT | Flag image URL |
| flag_svg | TEXT | SVG flag |
| emblem_url | TEXT | National emblem |
| map_url | TEXT | Country map |

---

# Search Fields

| Field | Type | Description |
|---------|------|-------------|
| search_keywords | TEXT | Search keywords |
| alternate_names | TEXT | Alternate names |
| aliases | TEXT | Aliases |

---

# Status Fields

| Field | Type | Description |
|---------|------|-------------|
| is_active | INTEGER | Active record |
| is_default | INTEGER | Default language |
| is_verified | INTEGER | Verified |
| is_official | INTEGER | Official translation |

---

# Sorting Fields

| Field | Type | Description |
|---------|------|-------------|
| sort_order | INTEGER | Display order |
| display_priority | INTEGER | UI priority |

---

# Audit Fields

| Field | Type | Description |
|---------|------|-------------|
| created_at | DATETIME | Created timestamp |
| updated_at | DATETIME | Last updated |
| deleted_at | DATETIME | Soft delete timestamp |
| created_by | INTEGER | User ID |
| updated_by | INTEGER | User ID |

---

# SEO Fields

| Field | Type | Description |
|---------|------|-------------|
| slug | TEXT | URL slug |
| meta_title | TEXT | SEO title |
| meta_description | TEXT | SEO description |
| canonical_url | TEXT | Canonical URL |

---

# Translation Example

| Language | Native | Romanized | Translation |
|-----------|---------|------------|-------------|
| Hindi | भारत | Bharat | India |
| Japanese | 日本 | Nihon | Japan |
| Arabic | الهند | Al-Hind | India |
| Chinese | 中国 | Zhongguo | China |
| Russian | Россия | Rossiya | Russia |

---

# Naming Conventions

## Primary Keys

```
country_id
city_id
continent_id
```

---

## Foreign Keys

```
country_id

language_id

currency_id

timezone_id
```

---

## Boolean Fields

```
is_active

is_verified

is_default

is_official
```

---

## Date Fields

```
created_at

updated_at

deleted_at
```

---

## SEO

```
slug

meta_title

meta_description
```

---

# Recommended Data Types

| SQLite Type | Usage |
|--------------|-------|
| INTEGER | IDs, Counts, Flags |
| TEXT | Names, Codes, URLs |
| REAL | Coordinates, Area |
| DATETIME | Timestamps |
| BLOB | Binary data (rare) |

---

# Best Practices

- Use singular table names for entities.
- Use `_id` suffix for all primary and foreign keys.
- Store multilingual content in translation tables.
- Store Romanized values separately from native text.
- Use ISO standards wherever applicable (ISO 3166, ISO 639, ISO 4217, ISO 15924).
- Keep timestamps in UTC.
- Prefer foreign keys over duplicate text values.
- Create indexes on frequently searched fields.
- Use lowercase, hyphen-separated slugs for SEO.

---

# Related Documentation

- README.md
- TABLES.md
- RELATIONSHIPS.md
- ER_DIAGRAM.md
- API_GUIDE.md
- DATA_SOURCES.md
- ROMANIZATION_GUIDE.md
- TRANSLITERATION_GUIDE.md
- TRANSLATION_GUIDE.md
- SEED_GUIDE.md
- MIGRATION_GUIDE.md

---

© BookQubit Geography Schema Documentation
Version 1.0.0