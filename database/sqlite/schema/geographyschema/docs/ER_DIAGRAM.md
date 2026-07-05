# Geography Schema - Entity Relationship Diagram

## Overview

The Geography Schema provides a normalized geographical hierarchy used throughout the BookQubit platform.

It supports:

- 🌍 Continents
- 🌎 Regions
- 🗺️ Sub Regions
- 🏳️ Countries
- 🏛️ States / Provinces
- 🏙️ Cities
- 🕒 Timezones
- 💱 Currencies
- 🗣️ Languages
- 🌐 Country Translations

---

# High Level ER Diagram

```text
                                   +----------------+
                                   |  Continents    |
                                   +----------------+
                                   | PK continent_id|
                                   | name           |
                                   | code           |
                                   +--------+-------+
                                            |
                                            | 1
                                            |
                                            | N
                                   +--------v-------+
                                   |    Regions     |
                                   +----------------+
                                   | PK region_id   |
                                   | FK continent_id|
                                   | name           |
                                   | code           |
                                   +--------+-------+
                                            |
                                            | 1
                                            |
                                            | N
                                   +--------v-------+
                                   |  Sub Regions   |
                                   +----------------+
                                   | PK subregion_id|
                                   | FK region_id   |
                                   | name           |
                                   +--------+-------+
                                            |
                                            | 1
                                            |
                                            | N
                                   +--------v-------+
                                   |   Countries    |
                                   +----------------+
                                   | PK country_id  |
                                   | FK subregion_id|
                                   | FK currency_id |
                                   | FK timezone_id |
                                   | name           |
                                   | iso2           |
                                   | iso3           |
                                   +--------+-------+
                                            |
                           +----------------+----------------+
                           |                                 |
                           |                                 |
                          1|                                1|
                           |                                 |
                           |                                 |
                          N|                                N|
             +-------------v----------+         +------------v-----------+
             |       States           |         | Country Languages      |
             +------------------------+         +------------------------+
             | PK state_id            |         | PK id                  |
             | FK country_id          |         | FK country_id          |
             | name                   |         | language_id            |
             +------------+-----------+         +------------------------+
                          |
                         1|
                          |
                         N|
              +-----------v-----------+
              |       Cities          |
              +-----------------------+
              | PK city_id            |
              | FK state_id           |
              | name                  |
              +-----------------------+
```

---

# Supporting Tables

```text
Currencies
      │
      └──────────────► Countries


Timezones
      │
      └──────────────► Countries


Country Translations
      │
      └──────────────► Countries


State Translations
      │
      └──────────────► States


City Translations
      │
      └──────────────► Cities


Country Flags
      │
      └──────────────► Countries


Country Codes
      │
      └──────────────► Countries


Country Neighbors
      │
      └──────────────► Countries
```

---

# Database Relationships

## Continents

```
Continent
    │
    └── Regions
```

One continent has many regions.

---

## Regions

```
Region
    │
    └── Sub Regions
```

One region has many sub regions.

---

## Sub Regions

```
Sub Region
      │
      └── Countries
```

One sub region contains many countries.

---

## Countries

A country belongs to:

- One Sub Region
- One Currency
- One Default Timezone

A country has:

- Many States
- Many Languages
- Many Translations
- One Flag
- One Capital
- Many Neighbor Countries

---

## States

One country contains many states.

One state contains many cities.

---

## Cities

Every city belongs to one state.

---

## Languages

A language can belong to many countries.

A country can have many official languages.

Relationship

```
Countries

        ▲

        │

Country Languages

        │

        ▼

Languages
```

---

# Translation Tables

```
Countries
      │
      ├────────► Country Translations
      │
States
      │
      ├────────► State Translations
      │
Cities
      │
      └────────► City Translations
```

Supports:

- English
- Hindi
- Japanese
- Arabic
- French
- Spanish
- German

and all BookQubit supported languages.

---

# BookQubit References

```
Books
      │
      └── country_id


Authors
      │
      ├── birth_country_id
      ├── birth_city_id
      └── death_country_id


Publishers
      │
      └── country_id


Users
      │
      └── country_id


Comics
      │
      └── country_id


Organizations
      │
      └── country_id


Events
      │
      └── country_id
```

---

# Complete Hierarchy Example

```
Earth

└── Asia

      └── Southern Asia

              └── India

                     └── Madhya Pradesh

                            └── Bhopal
```

---

# Normalization Level

The Geography Schema follows:

- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)

No duplicate geographical information is stored.

---

# Future Expansion

Designed to support:

- Territories
- Dependencies
- Autonomous Regions
- Postal Codes
- GPS Coordinates
- Administrative Levels
- Climate Zones
- World Heritage Sites
- Geographic Search
- Interactive Maps

---

# Entity Summary

| Entity | Parent | Children |
|---------|--------|----------|
| Continents | — | Regions |
| Regions | Continents | Sub Regions |
| Sub Regions | Regions | Countries |
| Countries | Sub Regions | States, Languages |
| States | Countries | Cities |
| Cities | States | — |
| Currencies | — | Countries |
| Timezones | — | Countries |
| Languages | — | Country Languages |

---

## Schema Version

Schema: Geography

Database: SQLite

Project: BookQubit

Version: 1.0.0