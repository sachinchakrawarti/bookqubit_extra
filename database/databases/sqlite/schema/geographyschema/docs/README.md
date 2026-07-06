# Geography Schema

## Overview

The **Geography Schema** provides a centralized and reusable geographical database for the entire BookQubit platform.

Instead of storing country, city, language, or currency information repeatedly in multiple modules, all geographical data is managed here and referenced through foreign keys.

This schema is shared by:

- 📚 Books
- 👤 Authors
- 🏢 Publishers
- 📖 Comics
- 📘 Manga
- 👥 Users
- 🎉 Events
- 🏆 Awards
- 🌍 Organizations

---

# Folder Structure

```
geographyschema/
│
├── continents/
├── regions/
├── subregions/
├── countries/
├── states/
├── cities/
├── timezones/
├── currencies/
├── languages/
│
├── views/
├── triggers/
├── migrations/
├── seed/
├── tests/
├── docs/
│
├── geography.init.sql
├── geography.drop.sql
└── geography.rollback.sql
```

---

# Schema Hierarchy

```
World
    │
    ▼
Continents
    │
    ▼
Regions
    │
    ▼
Sub Regions
    │
    ▼
Countries
    │
    ▼
States / Provinces
    │
    ▼
Cities
```

---

# Directory Description

## continents/

Stores all continents.

Example

- Africa
- Asia
- Europe
- North America
- South America
- Oceania
- Antarctica

---

## regions/

Stores UN geographical regions.

Example

- Eastern Asia
- Southern Asia
- Western Europe
- Northern Africa

---

## subregions/

Stores smaller geographical divisions.

Example

- Indian Subcontinent
- Arabian Peninsula
- Caribbean
- Balkans

---

## countries/

Stores all countries.

Includes

- Country Name
- ISO Codes
- Capital
- Currency
- Population
- Flag
- Phone Code
- Internet Domain
- Coordinates

Example

```
India
Japan
France
Germany
Brazil
```

---

## states/

Stores states, provinces, territories and administrative divisions.

Example

```
Madhya Pradesh
California
Tokyo Prefecture
Queensland
```

---

## cities/

Stores cities.

Example

```
Bhopal
Mumbai
Delhi
Tokyo
London
New York
```

---

## timezones/

Stores IANA time zones.

Example

```
Asia/Kolkata
Europe/London
America/New_York
Asia/Tokyo
```

---

## currencies/

Stores world currencies.

Example

| Currency | Code |
|----------|------|
| Indian Rupee | INR |
| US Dollar | USD |
| Euro | EUR |
| Japanese Yen | JPY |

---

## languages/

Maps countries and official languages.

Example

| Country | Language |
|----------|-----------|
| India | Hindi |
| India | English |
| Japan | Japanese |
| France | French |

---

## views/

Contains reusable SQL Views.

Example

```
v_country_full

v_state_full

v_city_full

v_world_map
```

---

## triggers/

Database triggers.

Example

- Update timestamps
- Audit changes
- Synchronize statistics

---

## migrations/

Schema version control.

Example

```
001_create_continents.sql

002_create_regions.sql

003_create_countries.sql
```

---

## seed/

Initial data.

Contains

- Continents
- Regions
- Countries
- States
- Cities
- Timezones
- Currencies

---

## tests/

Database integrity tests.

Example

- Foreign Keys
- Duplicate Countries
- Missing Capitals
- Missing Timezones

---

## docs/

Documentation for Geography Schema.

---

# Relationships

```
Continents
      │
      ▼
Regions
      │
      ▼
SubRegions
      │
      ▼
Countries
      │
      ▼
States
      │
      ▼
Cities
```

---

# Used By

The Geography Schema is referenced throughout BookQubit.

```
Books
        │
        ▼
Country

Authors
        │
        ▼
Birth Country

Publishers
        │
        ▼
Headquarters

Users
        │
        ▼
Location

Events
        │
        ▼
Venue

Awards
        │
        ▼
Host Country
```

---

# Supported Standards

- ISO 3166 Country Codes
- ISO 4217 Currency Codes
- ISO 639 Language Codes
- Unicode CLDR
- IANA Time Zones
- UN Geographical Regions

---

# Design Goals

- No duplicate geographical data
- Reusable across all modules
- Fully normalized
- Fast indexed lookups
- Easy migrations
- Scalable to future countries or territories
- Translation-ready
- SQLite compatible
- Future PostgreSQL/MySQL compatible

---

# Initialization Order

1. Continents
2. Regions
3. Sub Regions
4. Countries
5. States
6. Cities
7. Timezones
8. Currencies
9. Country Languages
10. Views
11. Triggers

---

# Future Extensions

The schema is designed to support future features including:

- Geographic search
- Nearby bookstores
- Author birthplace maps
- Publisher headquarters
- Country-wise analytics
- Heatmaps
- Interactive world maps
- Regional recommendations
- Localization services

---

# Version

BookQubit Database

Schema: Geography

Version: 1.0.0

Database: SQLite

Status: Production Ready