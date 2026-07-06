# BookQubit Database Architecture

> **Project:** BookQubit Database  
> **Version:** 1.0.0  
> **Status:** Active Development

---

# Overview

The **BookQubit Database** is designed as a **modular**, **scalable**, and **database-independent** system that supports multiple application domains, including books, authors, users, languages, geography, analytics, comics, and trading.

The project uses **SQLite** as the primary development database and is architected for future migration to **PostgreSQL** with minimal code changes.

---

# High-Level Architecture

```text
                           Client Applications
                                   │
                                   ▼
                           Service / API Layer
                                   │
                                   ▼
                          Repository Layer (Node.js)
                                   │
                                   ▼
                              Knex.js Query Builder
                     ┌──────────────┴──────────────┐
                     ▼                             ▼
              SQLite (Development)        PostgreSQL (Production)
```

---

# Data Import Architecture

BookQubit imports data from structured JSON files.

```text
imports/
      │
      ▼
authors_0001.json
books_0001.json
publishers_0001.json
      │
      ▼
Import Manager
      │
      ▼
JSON Reader
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

# Layered Architecture

## 1. Data Layer

Responsible for storing data.

Examples:

- SQLite
- PostgreSQL

Responsibilities:

- Tables
- Indexes
- Views
- Constraints
- Triggers
- Transactions

---

## 2. Query Layer

Contains reusable SQL queries.

Location:

```text
sqlite/queries/
```

Examples:

- Insert
- Update
- Delete
- Reports
- Analytics

---

## 3. Repository Layer

Provides a clean interface between application code and the database.

Location:

```text
repositories/
```

Responsibilities:

- CRUD operations
- Transactions
- Bulk inserts
- Query execution
- Error handling

Example:

```text
author.repository.js

book.repository.js
```

---

## 4. Import Layer

Processes external data.

Location:

```text
importers/
```

Responsibilities:

- Read JSON
- Validate data
- Transform objects
- Save records
- Log results

---

## 5. Configuration Layer

Stores project configuration.

Examples:

```text
database.config.js

schema.config.js

seed.config.js
```

---

## 6. Documentation Layer

Contains project documentation.

Location:

```text
docs/
```

Responsibilities:

- Architecture
- Setup
- Guides
- Standards
- References

---

# Schema Architecture

Each schema is designed as an independent module.

Example:

```text
author_schema/

book_schema/

language_schema/

user_schema/
```

Each schema contains:

```text
README.md

Tables

Indexes

Views

Triggers

Functions

Procedures

Seeds

Rollback

Documentation
```

This modular design makes schemas reusable, easier to maintain, and simpler to extend.

---

# Repository Pattern

Repositories isolate database operations from business logic.

```text
Application
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

Advantages:

- Cleaner code
- Reusable methods
- Easier testing
- Easier database migration

---

# Import Pipeline

```text
JSON File
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

Each step has a single responsibility, making the pipeline easy to maintain and extend.

---

# Database Organization

```text
database/
│
├── docs/
├── imports/
├── importers/
├── postgres/
├── repositories/
├── sqlite/
├── package.json
└── knexfile.js
```

---

# SQLite Architecture

SQLite is used during development because it is:

- Lightweight
- Serverless
- Easy to set up
- Fast for local development
- Portable

Database file:

```text
sqlite/db/bookqubit_database.db
```

---

# PostgreSQL Architecture

PostgreSQL is planned for production due to its support for:

- High concurrency
- Advanced indexing
- JSONB
- Full-text search
- Replication
- Partitioning
- Stored procedures
- Materialized views

The repository layer and Knex.js help minimize code changes when switching databases.

---

# Schema Registry

The schema registry defines the order in which SQL scripts are executed.

Example:

```text
registry/
├── all_schemas.sql
├── schema_order.sql
└── schema_order.md
```

Benefits:

- Consistent database builds
- Repeatable deployments
- Easier automation

---

# Documentation Strategy

Documentation is organized into two levels:

### Project Documentation

```text
docs/
```

Contains:

- Architecture
- Setup
- Roadmap
- Standards

### Schema Documentation

```text
sqlite/schema/<schema_name>/
```

Contains:

- README
- Tables
- Relationships
- Data fields
- ER diagrams

---

# Design Principles

The architecture follows these principles:

- Modularity
- Separation of Concerns
- Reusability
- Scalability
- Maintainability
- Simplicity
- Portability
- Consistency

---

# Database Flow

```text
Client
   │
   ▼
API / Service
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

For imports:

```text
JSON
   │
   ▼
Import Manager
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

# Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Query Builder | Knex.js |
| Development Database | SQLite |
| Production Database | PostgreSQL |
| Data Format | JSON |
| Language | JavaScript |
| Documentation | Markdown |
| Version Control | Git |

---

# Future Enhancements

Planned architectural improvements include:

- Multi-database support
- Automated migrations
- Schema versioning
- Background import jobs
- Data validation rules
- Caching layer
- Audit logging
- Read replicas
- Performance monitoring
- Cloud deployment support

---

# Architecture Goals

The BookQubit Database architecture aims to:

- Support millions of records efficiently.
- Enable smooth migration from SQLite to PostgreSQL.
- Keep modules independent and reusable.
- Simplify maintenance and testing.
- Provide a strong foundation for future growth.
- Ensure long-term scalability and reliability.

---

# Related Documentation

- `docs/BookQubit_Database.md`
- `docs/architecture/folder_structure.md`
- `docs/architecture/design_principles.md`
- `docs/architecture/technology_stack.md`
- `docs/import_system/README.md`

---

# Last Updated

**Version:** 1.0.0  
**Status:** Active Development