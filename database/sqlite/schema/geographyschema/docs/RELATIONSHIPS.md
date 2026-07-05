# Geography Schema Relationships

## Overview

This document describes the relationships between all entities in the Geography Schema used by the BookQubit platform.

The schema is fully normalized and designed to eliminate duplicate geographical data while providing reusable references for all modules.

---

# Relationship Hierarchy

```text
World
│
├── Continents
│      │
│      ├── Regions
│      │      │
│      │      ├── Sub Regions
│      │      │      │
│      │      │      ├── Countries
│      │      │      │      │
│      │      │      │      ├── States
│      │      │      │      │      │
│      │      │      │      │      └── Cities
│      │      │      │      │
│      │      │      │      ├── Languages
│      │      │      │      ├── Currency
│      │      │      │      ├── Timezone
│      │      │      │      ├── Flag
│      │      │      │      └── Capital
```

---

# Entity Relationships

## Continents → Regions

Relationship

```
One Continent
        │
        ▼
Many Regions
```

Example

```
Asia
    ├── Eastern Asia
    ├── Southern Asia
    ├── Western Asia
    └── Central Asia
```

Cardinality

```
1 : N
```

Foreign Key

```
regions.continent_id
```

---

## Regions → Sub Regions

Relationship

```
One Region
      │
      ▼
Many Sub Regions
```

Example

```
Southern Asia

    ├── Indian Subcontinent

    ├── Himalayan Region
```

Cardinality

```
1 : N
```

Foreign Key

```
subregions.region_id
```

---

## Sub Regions → Countries

Relationship

```
One Sub Region
        │
        ▼
Many Countries
```

Example

```
Indian Subcontinent

    ├── India

    ├── Nepal

    ├── Bhutan

    ├── Bangladesh

    └── Sri Lanka
```

Cardinality

```
1 : N
```

Foreign Key

```
countries.subregion_id
```

---

## Countries → States

Relationship

```
One Country
        │
        ▼
Many States
```

Example

```
India

    ├── Madhya Pradesh

    ├── Maharashtra

    ├── Rajasthan

    └── Gujarat
```

Cardinality

```
1 : N
```

Foreign Key

```
states.country_id
```

---

## States → Cities

Relationship

```
One State
      │
      ▼
Many Cities
```

Example

```
Madhya Pradesh

    ├── Bhopal

    ├── Indore

    ├── Gwalior

    └── Jabalpur
```

Cardinality

```
1 : N
```

Foreign Key

```
cities.state_id
```

---

# Countries → Languages

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

Explanation

A country can have multiple official languages.

A language can be official in multiple countries.

Cardinality

```
N : N
```

Junction Table

```
country_languages
```

Example

```
India

Hindi

English

Tamil

Bengali
```

---

# Countries → Currency

Relationship

```
One Currency

        ▲

        │

Many Countries
```

Example

```
USD

    ├── United States

    ├── Ecuador

    ├── Zimbabwe
```

Cardinality

```
1 : N
```

Foreign Key

```
countries.currency_id
```

---

# Countries → Timezone

Relationship

```
One Country

        │

        ▼

Many Timezones
```

Example

```
United States

    ├── America/New_York

    ├── America/Chicago

    ├── America/Denver

    └── America/Los_Angeles
```

Cardinality

```
1 : N
```

Junction Table (recommended)

```
country_timezones
```

---

# Countries → Flag

Relationship

```
One Country

        │

        ▼

One Flag
```

Cardinality

```
1 : 1
```

Table

```
country_flags
```

---

# Countries → Capital

Relationship

```
One Country

        │

        ▼

One Capital
```

Capital references a city.

```
countries.capital_city_id

      ▼

cities.city_id
```

Cardinality

```
1 : 1
```

---

# Countries → Neighbor Countries

Relationship

```
India

    ├── Pakistan

    ├── China

    ├── Nepal

    ├── Bhutan

    ├── Bangladesh

    └── Myanmar
```

Cardinality

```
N : N
```

Table

```
country_neighbors
```

---

# Country → Translation

Relationship

```
Country

      │

      ▼

Many Country Translations
```

Cardinality

```
1 : N
```

Table

```
country_translations
```

Example

| Language | Name |
|-----------|------|
| English | India |
| Hindi | भारत |
| Japanese | インド |
| Arabic | الهند |

---

# State → Translation

```
1 : N
```

Table

```
state_translations
```

---

# City → Translation

```
1 : N
```

Table

```
city_translations
```

---

# Geography Used By BookQubit

## Books

```
books.country_id
```

Represents

- Origin Country
- Setting Country
- Publication Country

---

## Authors

```
authors.birth_country_id

authors.birth_city_id

authors.death_country_id

authors.death_city_id
```

---

## Publishers

```
publishers.country_id

publishers.city_id
```

---

## Comics

```
comics.country_id
```

---

## Manga

```
manga.country_id
```

---

## Users

```
users.country_id

users.city_id
```

---

## Organizations

```
organizations.country_id
```

---

## Events

```
events.country_id

events.city_id
```

---

# Complete Relationship Tree

```text
Continents
│
└── Regions
    │
    └── Sub Regions
        │
        └── Countries
            ├── States
            │      └── Cities
            │
            ├── Languages
            ├── Currency
            ├── Timezones
            ├── Flag
            ├── Capital
            ├── Neighbors
            └── Translations
```

---

# Relationship Summary

| Parent | Child | Type |
|---------|-------|------|
| Continents | Regions | 1 : N |
| Regions | Sub Regions | 1 : N |
| Sub Regions | Countries | 1 : N |
| Countries | States | 1 : N |
| States | Cities | 1 : N |
| Countries | Languages | N : N |
| Countries | Timezones | N : N |
| Countries | Currency | N : 1 |
| Countries | Country Translations | 1 : N |
| States | State Translations | 1 : N |
| Cities | City Translations | 1 : N |
| Countries | Neighbor Countries | N : N |
| Countries | Capital City | 1 : 1 |
| Countries | Flag | 1 : 1 |

---

# Design Principles

- Fully normalized (3NF)
- No duplicate geographic data
- Shared across all BookQubit modules
- Translation-ready
- ISO-compliant
- Scalable to future geopolitical changes
- Optimized for SQLite with future migration to PostgreSQL/MySQL

---

**Document Version:** 1.0.0  
**Schema:** Geography Schema  
**Project:** BookQubit