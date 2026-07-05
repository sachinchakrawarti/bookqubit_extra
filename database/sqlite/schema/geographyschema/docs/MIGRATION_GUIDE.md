# Geography Schema Migration Guide

## Overview

This guide explains how to create, update, migrate, rollback, and maintain the **BookQubit Geography Schema**.

The migration system allows the database structure to evolve safely without losing existing data.

---

# What is a Migration?

A migration is a version-controlled SQL script that modifies the database schema.

Examples:

- Create new tables
- Add new columns
- Create indexes
- Rename columns
- Create views
- Add triggers
- Insert initial data
- Remove deprecated tables

Instead of manually editing the database, every change should be recorded as a migration.

---

# Migration Folder Structure

```text
geographyschema/
│
├── migrations/
│   │
│   ├── 001_create_continents.sql
│   ├── 002_create_regions.sql
│   ├── 003_create_subregions.sql
│   ├── 004_create_currencies.sql
│   ├── 005_create_languages.sql
│   ├── 006_create_countries.sql
│   ├── 007_create_country_codes.sql
│   ├── 008_create_country_flags.sql
│   ├── 009_create_states.sql
│   ├── 010_create_cities.sql
│   ├── 011_create_timezones.sql
│   ├── 012_create_country_languages.sql
│   ├── 013_create_translations.sql
│   ├── 014_create_views.sql
│   ├── 015_create_triggers.sql
│   └── README.md
```

---

# Migration Naming Convention

Always use:

```text
001_description.sql

002_description.sql

003_description.sql
```

Examples

```
001_create_continents.sql

002_create_regions.sql

003_create_subregions.sql

004_add_country_coordinates.sql

005_add_country_population.sql

006_add_timezone_support.sql
```

Never rename old migration files.

---

# Execution Order

Run migrations in ascending order.

```text
001

↓

002

↓

003

↓

004

↓

005
```

Never skip a migration.

---

# Initial Migration Order

```text
001 Create Continents

002 Create Regions

003 Create Sub Regions

004 Create Currencies

005 Create Languages

006 Create Countries

007 Create Country Codes

008 Create Country Flags

009 Create States

010 Create Cities

011 Create Timezones

012 Create Country Languages

013 Create Translation Tables

014 Create Views

015 Create Triggers
```

---

# Migration Lifecycle

```text
Write Migration
        │
        ▼
Review SQL
        │
        ▼
Run on Development
        │
        ▼
Verify Data
        │
        ▼
Commit to Git
        │
        ▼
Deploy
        │
        ▼
Production
```

---

# Migration History Table

Create a table to track executed migrations.

```sql
migration_history

----------------------------

migration_id

migration_name

executed_at

execution_time

checksum

status
```

Example

| ID | Migration | Status |
|----|-----------|---------|
|1|001_create_continents.sql|Completed|
|2|002_create_regions.sql|Completed|
|3|003_create_subregions.sql|Completed|

---

# Adding a New Table

Example

```
016_create_postal_codes.sql
```

Migration

```sql
CREATE TABLE postal_codes (
    postal_code_id INTEGER PRIMARY KEY,
    country_id INTEGER,
    state_id INTEGER,
    city_id INTEGER,
    postal_code TEXT
);
```

Commit to Git.

Run migration.

Done.

---

# Adding a New Column

Example

```
017_add_country_population.sql
```

SQLite

```sql
ALTER TABLE countries
ADD COLUMN population INTEGER;
```

---

# Adding an Index

Example

```
018_add_country_indexes.sql
```

```sql
CREATE INDEX idx_country_name
ON countries(name);
```

---

# Creating a View

Example

```
019_create_country_view.sql
```

```sql
CREATE VIEW v_country_full AS

SELECT *

FROM countries;
```

---

# Creating a Trigger

Example

```
020_country_updated_trigger.sql
```

Purpose

Automatically update timestamps.

---

# Seed Migrations

Seed files should not modify schema.

They only insert data.

Example

```text
continents.seed.sql

countries.seed.sql

cities.seed.sql
```

---

# Rollback Strategy

Every migration should have a rollback plan.

Example

Migration

```sql
ALTER TABLE countries
ADD COLUMN population INTEGER;
```

Rollback

```text
Recreate table without the column.

Copy existing data.

Drop old table.

Rename new table.
```

---

# Migration Rules

### DO

✔ One logical change per migration

✔ Small migrations

✔ Version control every migration

✔ Test locally

✔ Commit after testing

✔ Backup before production

---

### DON'T

✘ Modify old migration files

✘ Delete migration history

✘ Combine unrelated changes

✘ Skip migration numbers

✘ Edit production database manually

---

# SQLite Limitations

SQLite supports

✔ CREATE TABLE

✔ ALTER TABLE ADD COLUMN

✔ CREATE INDEX

✔ CREATE VIEW

✔ CREATE TRIGGER

SQLite does **not** directly support

- DROP COLUMN
- ALTER COLUMN
- MODIFY COLUMN
- DROP CONSTRAINT

To perform these operations:

1. Create a new table
2. Copy data
3. Drop old table
4. Rename new table

---

# Recommended Migration Workflow

```text
Feature Request

↓

Create SQL Migration

↓

Run Migration

↓

Run Seed (if needed)

↓

Run Tests

↓

Commit to Git

↓

Deploy
```

---

# Versioning

Example

```text
v1.0.0

001–015
```

```text
v1.1.0

016–020
```

```text
v1.2.0

021–030
```

---

# Backup Strategy

Before running migrations:

```text
bookqubit_database.db

↓

bookqubit_database_backup_YYYYMMDD.db
```

Always keep at least one verified backup before production upgrades.

---

# Testing Checklist

After every migration verify:

- ✅ Tables created successfully
- ✅ Foreign keys work
- ✅ Indexes exist
- ✅ Views return data
- ✅ Triggers execute correctly
- ✅ Existing data is preserved
- ✅ Seed scripts still work
- ✅ No SQL errors
- ✅ Performance unchanged or improved

---

# Git Workflow

```text
Feature Branch

↓

Create Migration

↓

Test

↓

Commit

↓

Pull Request

↓

Review

↓

Merge

↓

Deploy
```

Migration files should never be edited after they are merged into the main branch.

---

# Future Migration Examples

```
021_add_postal_codes.sql

022_add_country_aliases.sql

023_add_historical_names.sql

024_add_climate_zones.sql

025_add_geolocation_indexes.sql

026_add_world_heritage_sites.sql

027_add_population_history.sql

028_add_map_boundaries.sql

029_add_administrative_levels.sql

030_optimize_search_indexes.sql
```

---

# Best Practices

- Use one migration per feature.
- Keep migrations idempotent whenever possible.
- Always use transactions for multi-step changes.
- Maintain backward compatibility when feasible.
- Document every migration.
- Review SQL before deployment.
- Test on a copy of the production database.
- Never edit production data manually if a migration can accomplish the task.

---

# Migration Status Flow

```text
Draft
   │
   ▼
Reviewed
   │
   ▼
Tested
   │
   ▼
Committed
   │
   ▼
Merged
   │
   ▼
Executed
   │
   ▼
Verified
```

---

# Document Information

| Property | Value |
|----------|-------|
| Project | BookQubit |
| Module | Geography Schema |
| Document | MIGRATION_GUIDE.md |
| Database | SQLite |
| Migration Strategy | Versioned SQL Scripts |
| Current Schema Version | 1.0.0 |
| Status | Production Ready |