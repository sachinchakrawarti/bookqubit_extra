# BookQubit Database Registry

## Overview

The `registry` folder contains the master build files for the BookQubit database.

Instead of scanning the project automatically, the registry explicitly defines the order in which schemas and SQL scripts are executed.

This provides a single source of truth for building the database.

---

# Files

## all_schemas.sql

Loads every SQL file required to build the database.

Example:

- Tables
- Indexes
- Views
- Triggers

---

## schema_order.sql

Defines the order in which schemas are created.

This is important because many schemas depend on others.

Example dependency:

```text
languageschema
        │
        ▼
authorschema
        │
        ▼
bookschema
        │
        ▼
tradingschema
```

---

# Why a Registry?

The registry provides:

- Predictable build order
- Dependency management
- Easier maintenance
- One place to manage the database build
- Support for automated build scripts

---

# Build Flow

```text
schema_order.sql
        │
        ▼
all_schemas.sql
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

# Example Usage

```bash
sqlite3 bookqubit_database.db ".read registry/all_schemas.sql"
```

or

```bash
npm run db:build
```

---

# Notes

- Always add new schemas to `schema_order.sql`.
- Keep `all_schemas.sql` updated when adding new SQL files.
- The registry contains build orchestration only.
- Actual schema definitions remain inside the `schema/` directory.

---

**BookQubit Database Registry**