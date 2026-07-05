# Frequently Asked Questions (FAQ)

This document answers common questions about the **BookQubit Database** project.

---

# General

## What is the BookQubit Database?

The BookQubit Database is the central data layer of the BookQubit platform. It stores information related to books, authors, publishers, users, languages, analytics, comics, and other application modules.

---

## Which database is currently used?

SQLite is currently used for development.

---

## Which database will be used in production?

PostgreSQL is planned for production deployments.

---

## Why use SQLite first?

SQLite offers several advantages during development:

- Lightweight
- No server installation
- Easy setup
- Single database file
- Fast local development

---

## Why migrate to PostgreSQL later?

PostgreSQL provides features better suited for production systems:

- High concurrency
- Better performance
- JSONB support
- Full-text search
- Advanced indexing
- Replication
- Partitioning

---

# Architecture

## Why is Knex.js used?

Knex.js provides a database abstraction layer that allows the application to work with both SQLite and PostgreSQL with minimal code changes.

---

## Are raw SQL files still used?

Yes.

SQL is stored separately from JavaScript to improve:

- Readability
- Reusability
- Maintainability
- Database portability

---

## Why separate repositories from SQL?

Repositories manage database access, while SQL files contain the queries. This separation keeps responsibilities clear and makes maintenance easier.

---

# Import System

## Where are JSON files stored?

```text
database/
└── imports/
```

Example:

```text
imports/
├── authors/
├── books/
└── publishers/
```

---

## How is JSON imported?

The import process is:

```text
JSON
    │
    ▼
Reader
    │
    ▼
Validator
    │
    ▼
Importer
    │
    ▼
Repository
    │
    ▼
Knex.js
    │
    ▼
Database
```

---

## Can one JSON file contain thousands of records?

Yes.

Large JSON files are supported and are intended for bulk imports.

---

## Can data be imported multiple times?

Only if duplicate detection allows it. Importers should validate records to prevent duplicate entries.

---

# Schemas

## Why are schemas divided into folders?

Each schema is independent, making the project easier to maintain and extend.

Example:

```text
author_schema/

book_schema/

language_schema/

user_schema/
```

---

## What does a schema usually contain?

Typical schema contents include:

- Tables
- Constraints
- Foreign keys
- Indexes
- Views
- Triggers
- Seed data
- Rollback scripts
- Documentation

---

# SQLite

## Where is the SQLite database stored?

```text
sqlite/db/bookqubit_database.db
```

---

## Why are there `.db-wal` and `.db-shm` files?

These files are created automatically when SQLite uses **Write-Ahead Logging (WAL)** mode.

Do not delete them while the database is in use.

---

## Should the SQLite database be committed to Git?

Generally, no.

Database files should usually be ignored unless they are intentionally shared as sample databases.

---

# PostgreSQL

## Will PostgreSQL use the same schema?

Yes.

The goal is to keep the database design compatible across SQLite and PostgreSQL whenever possible.

---

## Will importers need to change?

Ideally, no.

Knex.js should handle most database-specific differences.

---

# Queries

## Where are SQL queries stored?

```text
sqlite/
└── queries/
```

Example:

```text
queries/
├── author/
├── books/
├── reports/
└── analytics/
```

---

## Why not write SQL inside JavaScript?

Keeping SQL in separate files provides:

- Better organization
- Easier debugging
- Cleaner source code
- Query reuse

---

# Documentation

## Why is there so much documentation?

Good documentation helps developers:

- Understand the architecture
- Learn the project faster
- Maintain consistency
- Reduce onboarding time

---

## Where is schema documentation located?

Each schema maintains its own documentation.

Example:

```text
author_schema/
├── README.md
└── ...
```

---

# Development

## Which editor is recommended?

Visual Studio Code.

Recommended extensions include:

- SQLTools
- Error Lens
- GitLens
- Peacock
- Prettier
- ESLint
- Path IntelliSense

---

## Which Node.js version is recommended?

Use the current Active LTS version whenever possible.

---

## How do I install dependencies?

```bash
npm install
```

---

## How do I test the database connection?

```bash
node test.js
```

---

## How do I run an importer?

Example:

```bash
node importers/import.manager.js
```

---

# Best Practices

## Should SQL keywords be uppercase?

Yes.

Example:

```sql
SELECT *
FROM author
WHERE id = ?;
```

---

## Should schema names follow a naming convention?

Yes.

Use lowercase snake_case.

Example:

```text
author_schema

book_schema

language_schema
```

---

## Should SQL and JavaScript be separated?

Yes.

Keep SQL in `.sql` files and JavaScript focused on application logic.

---

## Should documentation be updated when schemas change?

Yes.

Documentation should stay synchronized with the implementation.

---

# Troubleshooting

## "Cannot find module"

Run:

```bash
npm install
```

---

## SQLite database not found

Verify the database exists:

```text
sqlite/db/bookqubit_database.db
```

---

## SQL file cannot be opened

Check:

- File path
- File name
- Current working directory
- File permissions

---

## JSON import fails

Verify:

- JSON syntax
- Required fields
- File encoding (UTF-8)
- Validation rules

---

# Need Help?

If your question is not covered here:

1. Read the project documentation.
2. Check the schema documentation.
3. Review the import system guides.
4. Consult the changelog and roadmap.
5. Open an issue or contact the project maintainers.

---

# Last Updated

**Version:** 1.0.0