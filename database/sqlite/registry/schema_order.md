# Schema Build Order

## Overview

The BookQubit database is divided into independent schemas.

Some schemas depend on tables from other schemas. Therefore, schemas must be created in a specific order to ensure all foreign keys and relationships are valid.

This document defines the recommended build order.

---

# Build Order

| Order | Schema | Description | Depends On |
|-------:|---------|-------------|------------|
| 1 | `languageschema` | Supported languages | None |
| 2 | `geographyschema` | Countries, states, cities, continents | None |
| 3 | `academicschema` | Academic reference data | None |
| 4 | `authorschema` | Authors and translations | `languageschema` |
| 5 | `bookschema` | Books and book metadata | `authorschema`, `languageschema` |
| 6 | `comicschema` | Comics and manga | `authorschema`, `languageschema` |
| 7 | `tradingschema` | Marketplace and trading | `bookschema`, `userschema` |
| 8 | `authschema` | Authentication and user accounts | None |
| 9 | `userinteractionschema` | Reviews, ratings, reading history, libraries | `authschema`, `bookschema` |

---

# Dependency Diagram

```text
languageschema
        │
        ├──────────────┐
        │              │
        ▼              ▼
authorschema     geographyschema
        │
        ▼
bookschema
        │
        ├──────────────┐
        │              │
        ▼              ▼
comicschema    tradingschema
        │              │
        └──────┬───────┘
               │
               ▼
      userinteractionschema

authschema
      │
      ▼
userinteractionschema
```

---

# Current Build Status

| Schema | Status |
|----------|--------|
| languageschema | ✅ In Progress |
| authorschema | ✅ In Progress |
| academicschema | ⏳ Planned |
| geographyschema | ⏳ Planned |
| bookschema | ⏳ Planned |
| comicschema | ⏳ Planned |
| tradingschema | ⏳ Planned |
| authschema | ⏳ Planned |
| userinteractionschema | ⏳ Planned |

---

# Guidelines

- Create independent schemas first.
- Create parent tables before child tables.
- Create all tables before indexes.
- Create indexes before views.
- Create views before triggers.
- Import seed data after all tables have been created.
- Build dependent schemas only after their required schemas exist.

---

# Recommended Build Flow

```text
Drop Database
      │
      ▼
Create Tables
      │
      ▼
Create Indexes
      │
      ▼
Create Views
      │
      ▼
Create Triggers
      │
      ▼
Import Seed Data
      │
      ▼
Database Ready
```

---

# Notes

- This document defines the logical order for building the database.
- It should be updated whenever a new schema is added or schema dependencies change.
- The build scripts should follow this order to ensure a successful database initialization.