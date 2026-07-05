# BookQubit Database Folder Structure

> **Project:** BookQubit Database  
> **Version:** 1.0.0

---

# Overview

The BookQubit Database project follows a **modular**, **layered**, and **scalable** directory structure. Every major component has its own dedicated folder, making the project easy to navigate, maintain, and extend.

The project is organized to support both **SQLite** (development) and **PostgreSQL** (production) while keeping application logic independent of the database engine.

---

# Root Directory

```text
database/
│
├── docs/
├── imports/
├── importers/
├── postgres/
├── repositories/
├── sqlite/
├── tests/
├── utils/
├── .gitignore
├── knexfile.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Root Folder Description

| Folder | Purpose |
|---------|----------|
| docs | Project documentation |
| imports | JSON files to import into the database |
| importers | Import pipeline and import logic |
| postgres | PostgreSQL schemas and scripts |
| repositories | Database access layer |
| sqlite | SQLite database and SQL scripts |
| tests | Automated tests |
| utils | Shared helper utilities |

---

# docs/

Contains all project documentation.

```text
docs/
│
├── architecture/
├── setup/
├── schemas/
├── import_system/
├── migrations/
├── backup/
├── security/
├── performance/
├── api/
├── diagrams/
├── examples/
└── references/
```

Purpose:

- Architecture
- Setup guides
- Development standards
- Database documentation

---

# imports/

Stores JSON data before importing into the database.

```text
imports/
│
├── authors/
├── books/
├── publishers/
├── languages/
├── categories/
└── users/
```

Example:

```text
authors/
├── authors_0001.json
├── authors_0002.json
└── authors_0003.json
```

---

# importers/

Contains the complete JSON import system.

```text
importers/
│
├── helpers/
│   ├── logger.js
│   ├── reader.js
│   └── validator.js
│
├── author.importer.js
├── book.importer.js
├── publisher.importer.js
├── import.manager.js
└── README.md
```

Responsibilities:

- Read JSON
- Validate data
- Insert records
- Log results

---

# repositories/

Contains reusable database access methods.

```text
repositories/
│
├── author.repository.js
├── book.repository.js
├── publisher.repository.js
└── user.repository.js
```

Responsibilities:

- CRUD operations
- Transactions
- Bulk inserts
- Query execution

---

# sqlite/

Development database and SQL scripts.

```text
sqlite/
│
├── backups/
├── config/
├── db/
├── doc/
├── migrations/
├── queries/
├── registry/
├── schema/
├── scripts/
└── schemafilestructure/
```

---

## sqlite/db/

Contains SQLite database files.

```text
db/
│
├── bookqubit_database.db
├── bookqubit_database.db-shm
└── bookqubit_database.db-wal
```

---

## sqlite/schema/

Contains every database schema.

Example:

```text
schema/
│
├── author_schema/
├── bookschema/
├── languageschema/
├── geographyschema/
├── authschema/
├── analyticschema/
├── comicschema/
└── userinteractionschema/
```

Each schema is independent.

---

## sqlite/queries/

Contains reusable SQL queries.

```text
queries/
│
├── author/
├── books/
├── analytics/
├── reports/
└── maintenance/
```

---

## sqlite/migrations/

Contains versioned migration scripts.

```text
migrations/
│
├── 001_initial_schema.sql
├── 002_add_author.sql
├── 003_add_books.sql
└── ...
```

---

## sqlite/scripts/

Database automation scripts.

Examples:

```text
scripts/
│
├── create_database.sql
├── build_database.js
├── import_seeds.js
└── README.md
```

---

## sqlite/backups/

Stores backup copies of the database.

```text
backups/
│
├── daily/
├── weekly/
├── monthly/
└── archive/
```

---

# postgres/

Contains PostgreSQL-specific files.

```text
postgres/
│
├── schema/
├── migrations/
├── scripts/
├── functions/
├── procedures/
├── views/
└── README.md
```

This mirrors the SQLite structure where practical.

---

# tests/

Contains automated tests.

```text
tests/
│
├── repositories/
├── importers/
├── schemas/
├── migrations/
└── integration/
```

---

# utils/

Contains reusable utilities.

```text
utils/
│
├── constants.js
├── errors.js
├── helpers.js
├── logger.js
└── validator.js
```

---

# Configuration Files

## package.json

Defines project metadata and dependencies.

---

## knexfile.js

Stores Knex.js database configurations.

Supports:

- SQLite
- PostgreSQL
- Development
- Production

---

## .gitignore

Specifies files ignored by Git.

Typical entries:

```text
node_modules/
*.db
*.db-shm
*.db-wal
.env
```

---

# Design Principles

The folder structure follows these principles:

- Modular organization
- Clear separation of concerns
- Easy navigation
- Reusable components
- Database independence
- Consistent naming
- Scalable architecture

---

# Naming Conventions

| Type | Example |
|------|---------|
| Folder | `author_schema` |
| SQL File | `01.author.table.sql` |
| Query File | `insert.author.sql` |
| Repository | `author.repository.js` |
| Importer | `author.importer.js` |
| JSON | `authors_0001.json` |
| Documentation | `README.md` |

---

# Folder Relationships

```text
imports/
      │
      ▼
importers/
      │
      ▼
repositories/
      │
      ▼
Knex.js
      │
      ▼
SQLite / PostgreSQL
```

---

# Benefits

This folder structure provides:

- Easy maintenance
- Clear project organization
- Independent modules
- Faster onboarding
- Better scalability
- Cleaner codebase
- Simplified testing
- Easier PostgreSQL migration

---

# Related Documentation

- `docs/architecture/database_architecture.md`
- `docs/architecture/design_principles.md`
- `docs/architecture/naming_conventions.md`
- `docs/setup/installation.md`

---

# Last Updated

**Version:** 1.0.0  
**Status:** Active Development