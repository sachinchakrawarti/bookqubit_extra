# Geography Schema Seed Guide

## Overview

This document explains how to populate (seed) the **BookQubit Geography Schema** with initial geographical data.

The seed process creates the complete world geography hierarchy required by all BookQubit modules.

---

# Why Seed Data?

Instead of manually inserting countries, cities, and languages every time, BookQubit uses SQL seed files to populate the database automatically.

Benefits:

- Consistent data
- Faster setup
- Easy database recreation
- Reliable testing
- Repeatable deployments

---

# Seed Order

The order is important because tables depend on each other through foreign keys.

```text
1. Continents
        │
        ▼
2. Regions
        │
        ▼
3. Sub Regions
        │
        ▼
4. Currencies
        │
        ▼
5. Languages
        │
        ▼
6. Countries
        │
        ▼
7. Country Codes
        │
        ▼
8. Country Flags
        │
        ▼
9. States
        │
        ▼
10. Cities
        │
        ▼
11. Timezones
        │
        ▼
12. Country Languages
        │
        ▼
13. Country Translations
        │
        ▼
14. State Translations
        │
        ▼
15. City Translations
```

---

# Folder Structure

```text
seed/

├── continents.seed.sql
├── regions.seed.sql
├── subregions.seed.sql
├── currencies.seed.sql
├── languages.seed.sql
├── countries.seed.sql
├── country_codes.seed.sql
├── country_flags.seed.sql
├── states.seed.sql
├── cities.seed.sql
├── timezones.seed.sql
├── country_languages.seed.sql
├── country_translations.seed.sql
├── state_translations.seed.sql
├── city_translations.seed.sql
└── demo.seed.sql
```

---

# Seed Descriptions

## continents.seed.sql

Creates all continents.

Example

```sql
Africa
Asia
Europe
North America
South America
Oceania
Antarctica
```

Expected Records

```
7
```

---

## regions.seed.sql

Creates UN geographical regions.

Example

```sql
Eastern Asia
Southern Asia
Western Europe
Northern Africa
```

Expected Records

```
25–30
```

---

## subregions.seed.sql

Creates geographical sub-regions.

Example

```sql
Indian Subcontinent
Arabian Peninsula
Caribbean
Scandinavia
```

Expected Records

```
40–60
```

---

## currencies.seed.sql

Creates world currencies.

Example

```text
USD
EUR
INR
JPY
GBP
AUD
CAD
```

Expected Records

```
180+
```

---

## languages.seed.sql

Creates supported world languages.

Example

```text
English
Hindi
Japanese
Arabic
French
Spanish
German
```

Expected Records

```
8000+
```

*(BookQubit may initially import only the most common languages.)*

---

## countries.seed.sql

Creates countries.

Example

```text
India
Japan
France
Germany
Brazil
```

Expected Records

```
249
```

---

## country_codes.seed.sql

Stores

- ISO-2
- ISO-3
- ISO Numeric
- Phone Code
- Internet Domain

Example

```text
IN

IND

356

+91

.in
```

---

## country_flags.seed.sql

Stores

- SVG
- PNG
- Emoji

Example

```text
🇮🇳
🇯🇵
🇺🇸
🇫🇷
```

---

## states.seed.sql

Creates states and provinces.

Example

```text
Madhya Pradesh
California
Queensland
Ontario
```

Expected Records

```
5000+
```

---

## cities.seed.sql

Creates cities.

Example

```text
Bhopal
Delhi
Tokyo
Paris
London
```

Expected Records

```
150000+
```

---

## timezones.seed.sql

Creates IANA timezones.

Example

```text
Asia/Kolkata
Europe/London
Asia/Tokyo
America/New_York
```

Expected Records

```
400+
```

---

## country_languages.seed.sql

Maps official languages to countries.

Example

```text
India → Hindi

India → English

Japan → Japanese
```

---

## country_translations.seed.sql

Stores translated country names.

Example

| Language | Translation |
|----------|-------------|
| English | India |
| Hindi | भारत |
| Japanese | インド |
| Arabic | الهند |

---

## state_translations.seed.sql

Stores translated state names.

---

## city_translations.seed.sql

Stores translated city names.

---

# Demo Seed

`demo.seed.sql` contains a small dataset for development.

Example

```text
3 Continents

5 Regions

10 Countries

25 States

100 Cities
```

Useful for:

- Local development
- Unit tests
- CI/CD
- Tutorials

---

# Production Seed

Production imports the complete datasets.

Approximate size:

| Entity | Records |
|---------|--------:|
| Continents | 7 |
| Regions | 25–30 |
| Sub Regions | 40–60 |
| Countries | 249 |
| States | 5,000+ |
| Cities | 150,000+ |
| Languages | 8,000+ |
| Timezones | 400+ |
| Currencies | 180+ |

---

# Running Seeds

Recommended order:

```sql
.read continents.seed.sql
.read regions.seed.sql
.read subregions.seed.sql
.read currencies.seed.sql
.read languages.seed.sql
.read countries.seed.sql
.read country_codes.seed.sql
.read country_flags.seed.sql
.read states.seed.sql
.read cities.seed.sql
.read timezones.seed.sql
.read country_languages.seed.sql
.read country_translations.seed.sql
.read state_translations.seed.sql
.read city_translations.seed.sql
```

---

# Validation Checklist

After seeding, verify:

- ✅ 7 continents exist
- ✅ Every region belongs to a continent
- ✅ Every sub-region belongs to a region
- ✅ Every country belongs to a sub-region
- ✅ Every state belongs to a country
- ✅ Every city belongs to a state
- ✅ Every country has ISO codes
- ✅ Every country has a currency
- ✅ Every country has at least one language
- ✅ No duplicate ISO codes
- ✅ No orphan records

---

# Recommended Data Sources

- ISO 3166 (Countries)
- ISO 4217 (Currencies)
- ISO 639 (Languages)
- Unicode CLDR (Translations)
- IANA Time Zone Database
- GeoNames
- United Nations Statistics Division (UNSD)

---

# BookQubit Usage

After seeding, the Geography Schema is available to:

- 📚 Books
- 📖 Comics
- 👤 Authors
- 🏢 Publishers
- 👥 Users
- 🏛 Organizations
- 🎉 Events
- 🔍 Search
- 📊 Analytics
- 🌍 Localization

No module should duplicate geographical data; all should reference this shared schema.

---

## Future Enhancements

Planned additions include:

- Postal codes
- Administrative levels
- Historical country names
- Historical borders
- GeoJSON boundaries
- Climate zones
- Elevation data
- World heritage sites
- Population history
- Interactive map support

---

## Document Information

| Property | Value |
|----------|-------|
| Project | BookQubit |
| Module | Geography Schema |
| Document | SEED_GUIDE.md |
| Database | SQLite |
| Version | 1.0.0 |
| Status | Production Ready |