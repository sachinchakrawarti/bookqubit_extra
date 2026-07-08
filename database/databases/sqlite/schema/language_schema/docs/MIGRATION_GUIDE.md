# Language Schema Migration Guide

## Overview

This guide explains how to install, upgrade, migrate, validate, and roll back the **Language Schema**.

The schema is designed for SQLite and follows a modular migration approach, making it easy to maintain and extend.

---

# Migration Structure

```
language_schema/

migrations/
│
├── 001_initial_languages.sql
├── 002_add_scripts.sql
├── 003_add_regions.sql
└── 004_add_native_names.sql
```

Each migration performs one logical change to the database.

---

# Migration Order

Always execute migrations in numerical order.

| Order | Migration | Purpose |
|--------|-----------|---------|
| 001 | initial_languages | Create base language tables |
| 002 | add_scripts | Add writing system support |
| 003 | add_regions | Add language-region mapping |
| 004 | add_native_names | Add localized language names |

---

# Fresh Installation

For a new database, execute the complete schema instead of individual migrations.

```sql
.read schema_order.sql
```

This creates:

- Tables
- Constraints
- Foreign Keys
- Indexes
- Triggers
- Views
- Seed Data
- Validation Scripts

---

# Applying Individual Migrations

To apply only a specific migration:

```sql
.read migrations/001_initial_languages.sql
```

Next:

```sql
.read migrations/002_add_scripts.sql
```

Continue sequentially until all migrations have been applied.

---

# Recommended Upgrade Process

1. Back up the database.
2. Enable foreign key enforcement.
3. Apply pending migrations in order.
4. Rebuild indexes if required.
5. Refresh views if modified.
6. Run validation scripts.
7. Execute integration and unit tests.
8. Verify application functionality.

---

# Backup

Create a backup before any migration.

SQLite CLI:

```sql
.backup language_schema_backup.db
```

Or from the command line:

```bash
sqlite3 language.db ".backup language_backup.db"
```

---

# Validation

After applying migrations, run:

```sql
.read validation/01.languages.validation.sql
```

```sql
.read validation/02.language_names.validation.sql
```

Validation checks include:

- Duplicate ISO codes
- Missing foreign keys
- Invalid locale codes
- Invalid direction values
- Duplicate preferred names
- Orphan records

---

# Running Tests

Execute integration tests:

```sql
.read tests/integration/test_languages.sql
```

```sql
.read tests/integration/test_scripts.sql
```

Execute unit tests:

```sql
.read tests/unit/test_language_codes.sql
```

```sql
.read tests/unit/test_language_names.sql
```

A successful run should complete without errors and all validation queries should return no unexpected rows.

---

# Rollback

Rollback scripts are provided for each major table.

```
rollback/

01.languages.rollback.sql
02.language_names.rollback.sql
03.language_regions.rollback.sql
04.scripts.rollback.sql
```

Example:

```sql
.read rollback/04.scripts.rollback.sql
```

> **Warning:** Rollback scripts may permanently remove schema objects or data. Always verify dependencies before executing them.

---

# Migration Best Practices

- Apply migrations only once.
- Keep migrations immutable after they have been committed.
- Create a new migration for every schema change.
- Test migrations on a development database before production.
- Always keep backups.

---

# Adding a New Migration

Follow the existing numbering convention.

Example:

```
005_add_language_aliases.sql
006_add_language_families.sql
007_add_cldr_support.sql
```

Migration template:

```sql
BEGIN TRANSACTION;

-- Schema changes

COMMIT;
```

---

# Schema Versioning

Maintain migrations in ascending order.

```
001
002
003
004
005
...
```

Avoid renumbering existing migration files, as this can cause inconsistencies across environments.

---

# Migration Checklist

Before migration:

- Backup completed
- Development testing completed
- New migration reviewed
- Foreign keys enabled

After migration:

- Validation scripts passed
- Unit tests passed
- Integration tests passed
- Views available
- Triggers functioning
- Seed data verified
- Application verified

---

# Troubleshooting

## Foreign key errors

```sql
PRAGMA foreign_keys = ON;
```

Verify that referenced parent records exist before inserting child records.

---

## Duplicate key errors

Run the validation scripts to identify duplicate ISO codes, language codes, or localized names before retrying the migration.

---

## Trigger errors

Confirm that all tables referenced by triggers have already been created and that triggers are applied after tables and indexes.

---

## View errors

Views should be created only after the required tables and dependent views are available.

---

# Recommended Deployment Order

```text
Tables
    ↓
Constraints
    ↓
Foreign Keys
    ↓
Indexes
    ↓
Triggers
    ↓
Views
    ↓
Seed Data
    ↓
Validation
    ↓
Tests
```

This order minimizes dependency issues and ensures the schema is fully operational before application code begins using it.

---

# Future Migration Roadmap

Planned enhancements include:

- Language families
- Dialects
- Transliteration rules
- CLDR locale metadata
- Numbering systems
- Calendar preferences
- ICU collation support
- Locale fallback chains
- Script variants
- Translation metadata

Each enhancement should be introduced as a new numbered migration to preserve upgrade compatibility.