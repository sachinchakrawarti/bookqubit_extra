# BookQubit Database

The **BookQubit Database** module contains everything related to the project's databases, including schemas, SQL queries, importers, repositories, migrations, backups, and documentation.

The database layer is designed to use **SQLite** during development and **PostgreSQL** in production with a scalable architecture.

---

# Objectives

- Build a clean and modular database architecture.
- Keep SQL separate from JavaScript code.
- Support both SQLite and PostgreSQL.
- Import large JSON datasets efficiently.
- Make future database migration simple.
- Maintain reusable repositories and importers.

---

# Project Structure

```text
database/
│
├── README.md
├── package.json
├── package-lock.json
├── knexfile.js
├── db.js
│
├── imports/
├── importers/
├── repositories/
├── sqlite/
├── postgres/
├── logs/
├── scripts/
├── tests/
└── docs/
```

---

# Folder Overview

## imports/

Stores JSON data files that will be imported into the database.

Example:

```text
imports/
├── authors/
├── books/
├── publishers/
├── categories/
└── ...
```

---

## importers/

Contains importer programs that read JSON files, validate data, and insert records into the database.

Example:

```text
importers/
├── import.manager.js
├── author.importer.js
├── book.importer.js
└── helpers/
```

---

## repositories/

Contains reusable database operations.

Repositories execute SQL queries and interact with the database.

Example:

```text
repositories/
├── author.repository.js
├── book.repository.js
└── publisher.repository.js
```

---

## sqlite/

Contains SQLite-specific resources.

```text
sqlite/
├── db/
├── schema/
├── queries/
├── migrations/
├── seeds/
└── backups/
```

### db/

SQLite database files.

### schema/

SQLite table definitions.

### queries/

SQLite SQL queries.

### migrations/

Schema migration scripts.

### seeds/

Seed data.

### backups/

Database backup files.

---

## postgres/

Contains PostgreSQL-specific resources.

```text
postgres/
├── schema/
├── queries/
├── migrations/
├── seeds/
└── backups/
```

---

## logs/

Stores logs generated during imports and maintenance.

```text
logs/
├── import.log
├── error.log
└── history.log
```

---

## scripts/

Utility scripts for database management.

Examples:

- Create database
- Reset database
- Backup database
- Restore database
- Export data
- Database migration

---

## tests/

Database-related test files.

```text
tests/
├── connection.test.js
├── author.test.js
├── repository.test.js
└── ...
```

---

## docs/

Project documentation.

```text
docs/
├── database.md
├── sqlite.md
├── postgres.md
└── migration-guide.md
```

---

# Import Workflow

```text
JSON Files
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
SQLite / PostgreSQL
```

---

# Technology Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Query Builder | Knex.js |
| Development Database | SQLite |
| Production Database | PostgreSQL |
| Data Format | JSON |
| Language | JavaScript |

---

# Development Workflow

1. Design database schema.
2. Create SQL files.
3. Prepare JSON import files.
4. Validate imported data.
5. Import records.
6. Verify imported data.
7. Backup the database.

---

# Design Principles

- Modular architecture
- SQL-first development
- Separation of responsibilities
- Reusable repositories
- Reusable importers
- Scalable project structure
- Database portability
- Easy maintenance

---

# Future Enhancements

- Bulk imports
- Parallel processing
- Automatic rollback
- Import progress display
- Import statistics
- Duplicate detection
- Data integrity validation
- PostgreSQL migration
- Database versioning

---

# License

This project is part of the **BookQubit** platform.

---

# Version

**1.0.0**