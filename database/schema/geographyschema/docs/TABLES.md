# Geography Schema Tables

## Overview

The **Geography Schema** is the central location database for the entire BookQubit platform.

Every module—including Books, Comics, Authors, Publishers, Users, Events, Organizations, and future services—references this schema instead of storing geographical information repeatedly.

This schema follows:

- Third Normal Form (3NF)
- SQLite compatible
- Translation-ready
- ISO standards
- Unicode CLDR
- IANA Time Zones

---

# Table Categories

```
Core Geography
├── Continents
├── Regions
├── Sub Regions
├── Countries
├── States
└── Cities

Localization
├── Languages
├── Country Languages
├── Country Translations
├── State Translations
└── City Translations

Country Metadata
├── Country Codes
├── Country Flags
├── Country Capitals
├── Country Neighbors
├── Currencies
└── Timezones
```

---

# Core Tables

---

## continents

Stores every continent.

### Primary Key

```
continent_id
```

### Used By

- regions

### Example

| ID | Name | Code |
|----|------|------|
| 1 | Africa | AF |
| 2 | Asia | AS |
| 3 | Europe | EU |

---

## regions

Stores geographical regions.

### Primary Key

```
region_id
```

### Foreign Keys

```
continent_id
```

### Used By

- subregions

### Example

| Region | Continent |
|---------|-----------|
| Eastern Asia | Asia |
| Southern Asia | Asia |
| Western Europe | Europe |

---

## subregions

Stores sub-regions.

### Primary Key

```
subregion_id
```

### Foreign Keys

```
region_id
```

### Example

| Sub Region |
|------------|
| Indian Subcontinent |
| Arabian Peninsula |
| Caribbean |

---

## countries

Stores all countries.

### Primary Key

```
country_id
```

### Foreign Keys

```
subregion_id
currency_id
```

### Main Columns

```
name

iso2

iso3

numeric_code

phone_code

internet_tld

population

area_km2

latitude

longitude

capital_city_id

currency_id
```

### Used By

- Books
- Comics
- Authors
- Publishers
- Users
- Organizations
- Events

---

## states

Stores states, provinces and administrative divisions.

### Primary Key

```
state_id
```

### Foreign Key

```
country_id
```

Example

```
California

Queensland

Madhya Pradesh

Ontario
```

---

## cities

Stores cities.

### Primary Key

```
city_id
```

### Foreign Key

```
state_id
```

Example

```
Bhopal

London

Tokyo

Paris
```

---

# Localization Tables

---

## languages

Stores supported languages.

### Primary Key

```
language_id
```

### Example

| Code | Language |
|------|----------|
| en | English |
| hi | Hindi |
| ja | Japanese |
| fr | French |

---

## country_languages

Many-to-many relationship between countries and languages.

### Primary Key

```
id
```

### Foreign Keys

```
country_id

language_id
```

---

## country_translations

Stores translated country names.

Example

```
India

भारत

インド

الهند

Inde
```

---

## state_translations

Stores translated state names.

---

## city_translations

Stores translated city names.

---

# Country Metadata Tables

---

## currencies

Stores currencies.

### Example

| Currency | Code |
|----------|------|
| US Dollar | USD |
| Euro | EUR |
| Indian Rupee | INR |

---

## timezones

Stores IANA timezones.

Example

```
Asia/Kolkata

Europe/London

America/New_York

Asia/Tokyo
```

---

## country_codes

Stores international identifiers.

Contains

```
ISO Alpha-2

ISO Alpha-3

ISO Numeric

Phone Code

Internet Domain
```

---

## country_flags

Stores country flag information.

Example

```
🇮🇳

🇺🇸

🇫🇷

🇯🇵
```

Can store

- SVG
- PNG
- Emoji
- CDN URL

---

## country_capitals

Maps countries to their capital cities.

Example

```
India → New Delhi

Japan → Tokyo

France → Paris
```

---

## country_neighbors

Stores border relationships.

Example

```
India

Pakistan

China

Nepal

Bhutan

Bangladesh

Myanmar
```

---

# Views

## v_country_full

Complete country information.

Includes

- Region
- Currency
- Timezone
- Capital
- Languages

---

## v_state_full

Complete state information.

---

## v_city_full

Complete city information.

---

## v_world_map

Returns complete geographical hierarchy.

---

# Relationship Summary

| Table | References |
|---------|------------|
| continents | — |
| regions | continents |
| subregions | regions |
| countries | subregions, currencies |
| states | countries |
| cities | states |
| languages | — |
| country_languages | countries, languages |
| country_translations | countries, languages |
| state_translations | states, languages |
| city_translations | cities, languages |
| currencies | — |
| timezones | — |
| country_codes | countries |
| country_flags | countries |
| country_capitals | countries, cities |
| country_neighbors | countries |

---

# Initialization Order

```
1. continents

2. regions

3. subregions

4. currencies

5. languages

6. countries

7. states

8. cities

9. timezones

10. country_codes

11. country_flags

12. country_capitals

13. country_neighbors

14. country_languages

15. translations

16. views

17. triggers
```

---

# Estimated Scale

| Entity | Approximate Records |
|----------|--------------------:|
| Continents | 7 |
| Regions | 25–30 |
| Sub Regions | 40–60 |
| Countries | 249 |
| States | 5,000+ |
| Cities | 150,000+ |
| Languages | 8,000+ |
| Currencies | 180+ |
| Timezones | 400+ |

---

# Used Throughout BookQubit

This schema is shared by:

- 📚 Books
- 📖 Comics
- 📘 Manga
- 👤 Authors
- 🏢 Publishers
- 👥 Users
- 🎉 Events
- 🏛 Organizations
- 🏆 Awards
- 🌍 Analytics
- 🔍 Search
- 🤖 Recommendations

---

## Document Information

| Property | Value |
|----------|-------|
| Project | BookQubit |
| Module | Geography Schema |
| Database | SQLite |
| Normalization | 3NF |
| Version | 1.0.0 |
| Status | Production Ready |