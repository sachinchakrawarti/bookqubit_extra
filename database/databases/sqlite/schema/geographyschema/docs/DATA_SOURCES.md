# Geography Schema Data Sources

## Overview

The Geography Schema in **BookQubit** is built using trusted international datasets rather than manually maintained data.

Using standardized data ensures:

- Accurate country information
- Consistent ISO codes
- Reliable translations
- Easy updates
- Cross-platform compatibility
- Future scalability

---

# Primary Data Sources

## 1. ISO Standards ⭐⭐⭐⭐⭐

Official international standards.

Used For

- Country Codes
- Currency Codes
- Language Codes

Standards

| Standard | Purpose |
|-----------|---------|
| ISO 3166-1 | Countries |
| ISO 3166-2 | States / Provinces |
| ISO 4217 | Currency Codes |
| ISO 639 | Language Codes |

Example

```
India

ISO2 : IN

ISO3 : IND

Currency : INR

Language : hi
```

---

## 2. United Nations Statistics Division (UNSD)

Provides official geographical hierarchy.

Used For

- Continents
- Regions
- Sub Regions
- Country Classification

Example

```
Asia

Southern Asia

Indian Subcontinent
```

---

## 3. Unicode CLDR (Common Locale Data Repository)

BookQubit's primary localization source.

Used For

- Country Names
- Native Names
- City Names
- Localized Languages
- Scripts
- Plural Rules

Supports

- English
- Hindi
- Japanese
- Arabic
- Korean
- Chinese
- French

and hundreds more.

---

## 4. IANA Time Zone Database

Official timezone database.

Used For

- Timezones
- UTC Offsets
- DST Rules

Example

```
Asia/Kolkata

Europe/London

Asia/Tokyo

America/New_York
```

---

## 5. Unicode Emoji Database

Used for country flag emojis.

Example

```
🇮🇳

🇯🇵

🇺🇸

🇫🇷
```

---

## 6. GeoNames

Large geographical database.

Used For

- Cities
- Latitude
- Longitude
- Population
- Alternate Names

Contains

- 12M+ place names
- 11M+ alternate names
- 200+ countries

---

## 7. OpenStreetMap (Optional)

Used for

- Administrative Boundaries
- Coordinates
- Maps
- Regions

Useful for future BookQubit map features.

---

## 8. Natural Earth

Public domain GIS dataset.

Used For

- World Maps
- Country Shapes
- Continents
- Oceans

Future use

Interactive maps.

---

## 9. Wikidata (Optional)

Used for additional metadata.

Example

- Demonyms
- Historical names
- Official websites
- Country aliases

---

## 10. CIA World Factbook (Reference)

Useful metadata.

Example

- Population
- Area
- Internet Domains
- Calling Codes

Can be used for verification.

---

# Language Translation Sources

Translations should come from standardized localization datasets.

Preferred order

```
Unicode CLDR

↓

Official Government Sources

↓

Native Speakers

↓

Professional Translators
```

Avoid machine translation for permanent database values.

---

# Country Flags

Recommended formats

```
SVG

PNG

Emoji

CDN URL
```

Example

```
flags/in.svg

flags/us.svg

flags/jp.svg
```

---

# Country Codes

Stored using ISO standards.

Example

| Country | ISO2 | ISO3 | Numeric |
|----------|------|------|----------|
| India | IN | IND | 356 |
| Japan | JP | JPN | 392 |
| France | FR | FRA | 250 |

---

# Currency Data

Recommended fields

```
Currency Name

ISO Code

Symbol

Native Symbol

Decimal Digits

Rounding

Plural Name
```

Example

```
Indian Rupee

INR

₹

2 decimals
```

---

# Language Data

Recommended fields

```
Language Name

Native Name

ISO639-1

ISO639-2

ISO639-3

Script

Direction (LTR / RTL)
```

Example

```
Hindi

हिन्दी

hi

hin

Devanagari

LTR
```

---

# City Data

Recommended fields

```
City Name

Native Name

Population

Latitude

Longitude

Timezone

Elevation
```

---

# State Data

Recommended fields

```
State Name

ISO Code

Country

Capital

Population
```

---

# Recommended Update Frequency

| Dataset | Frequency |
|----------|-----------|
| Countries | Rarely |
| States | Yearly |
| Cities | Quarterly |
| Timezones | When IANA updates |
| Languages | Rarely |
| Currencies | Rarely |
| Country Codes | Rarely |

---

# Data Quality Rules

Every imported dataset should satisfy:

- No duplicate records
- ISO-compliant codes
- UTF-8 encoding
- Unicode normalization
- Referential integrity
- Foreign key validation
- No orphan records

---

# Import Order

```
1. Continents

2. Regions

3. Sub Regions

4. Currencies

5. Languages

6. Countries

7. Country Codes

8. Country Flags

9. States

10. Cities

11. Timezones

12. Country Languages

13. Country Translations

14. State Translations

15. City Translations
```

---

# BookQubit Data Pipeline

```text
Official Data Sources
        │
        ▼
Download Raw Files
        │
        ▼
Validation Scripts
        │
        ▼
Cleaning & Normalization
        │
        ▼
SQLite Seed Files
        │
        ▼
BookQubit Database
        │
        ▼
Books
Authors
Publishers
Users
Comics
Analytics
Search
Recommendations
```

---

# Recommended File Formats

| Data | Format |
|------|--------|
| Seed Data | SQL |
| Bulk Imports | CSV |
| Localization | JSON |
| Maps | GeoJSON |
| GIS Data | Shapefile / GeoJSON |
| Images | SVG / PNG |
| Documentation | Markdown |

---

# Licensing Considerations

Before importing external datasets, verify that their licenses allow redistribution and commercial use within BookQubit.

Maintain attribution records where required.

---

## Document Information

| Property | Value |
|----------|-------|
| Project | BookQubit |
| Module | Geography Schema |
| Document | DATA_SOURCES.md |
| Database | SQLite |
| Version | 1.0.0 |
| Status | Production Ready |