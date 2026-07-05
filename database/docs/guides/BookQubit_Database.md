# BookQubit Database

> **Version:** 1.0.0  
> **Project:** BookQubit  
> **Current Database:** SQLite  
> **Future Database:** PostgreSQL  
> **Query Builder:** Knex.js

---

# Overview

The **BookQubit Database** is the central data layer of the BookQubit platform. It stores and manages all application data, including books, authors, users, publishers, languages, comics, analytics, and other related entities.

The database is designed to be:

- Modular
- Scalable
- Database-independent
- Easy to maintain
- Easy to migrate
- Performance-oriented

SQLite is used during development, while PostgreSQL is planned for future production deployments.

---

# Design Goals

- Modular schema architecture
- Clean separation of SQL and JavaScript
- JSON-based bulk import system
- Reusable repositories
- Easy migration to PostgreSQL
- High performance
- Multi-language support
- Maintainable project structure

---

# Architecture

```text
JSON Files
     │
     ▼
Importers
     │
     ▼
Validators
     │
     ▼
Repositories
     │
     ▼
Knex.js
     │
     ▼
SQLite (Development)
     │
     ▼
PostgreSQL (Future)
```

---

# Database Engines

## SQLite

Used during development.

Advantages:

- Lightweight
- Zero configuration
- Fast local development
- Single database file
- Easy backup

---

## PostgreSQL

Planned for production.

Advantages:

- High performance
- Better concurrency
- JSONB support
- Full-text search
- Advanced indexing
- Replication
- Partitioning
- Enterprise scalability

---

# Directory Structure

```text
database/
│
├── docs/
├── imports/
├── importers/
├── repositories/
├── sqlite/
├── postgres/
├── utils/
├── constants/
├── templates/
├── tests/
│
├── db.js
├── knexfile.js
├── package.json
└── README.md
```

---

# SQLite Structure

```text
sqlite/
│
├── db/
├── schema/
├── queries/
├── migrations/
├── registry/
├── backups/
├── config/
└── scripts/
```

---

# PostgreSQL Structure

```text
postgres/
│
├── schema/
├── migrations/
├── functions/
├── procedures/
├── views/
└── scripts/
```

---

# Schema Modules

The database is divided into independent modules.

Examples:

- Academic
- Analytics
- Author
- Authentication
- Book
- Comic
- Geography
- Language
- Notification
- Trading
- User Interaction

Each schema contains its own:

- Tables
- Constraints
- Foreign Keys
- Indexes
- Views
- Triggers
- Seed Data
- Rollback Scripts
- Documentation

---

# Import System

Large datasets are imported from JSON files.

```text
imports/
│
├── authors/
├── books/
├── publishers/
└── ...
```

Import workflow:

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
SQLite
```

---

# Repository Layer

Repositories isolate all database operations from application logic.

Responsibilities:

- Insert
- Update
- Delete
- Search
- Batch Import
- Transactions

Examples:

```text
repositories/
│
├── author.repository.js
├── book.repository.js
└── publisher.repository.js
```

---

# SQL Organization

Database queries are stored separately from JavaScript code.

```text
queries/
│
├── author/
├── books/
├── analytics/
├── maintenance/
├── reports/
└── users/
```

Benefits:

- Easier maintenance
- Reusable SQL
- Cleaner source code
- Better organization

---

# Multi-Language Support

Text that appears in multiple languages is stored in translation tables.

Supported examples:

- English
- Hindi
- Urdu

Additional languages can be added without modifying the primary tables.

---

# JSON Import

Large datasets are imported using JSON.

Example:

```text
authors/
│
├── authors_0001.json
├── authors_0002.json
├── authors_0003.json
└── ...
```

Each file may contain hundreds or thousands of records.

---

# Migration Strategy

Current architecture:

```text
JSON
  │
  ▼
SQLite
```

Future architecture:

```text
JSON
  │
  ▼
Knex.js
  │
  ▼
PostgreSQL
```

The application code should remain unchanged while only the database configuration changes.

---

# Backup Strategy

```text
backups/
│
├── daily/
├── weekly/
├── monthly/
└── archive/
```

Regular backups ensure data safety and disaster recovery.

---

# Documentation

Each schema should include documentation such as:

- README.md
- TABLES.md
- DATA_FIELDS.md
- DATA_TYPES.md
- ER_DIAGRAM.md
- RELATIONSHIPS.md
- API_GUIDE.md
- MIGRATION_GUIDE.md

---

# Development Principles

- Keep schemas modular.
- Separate schema SQL from query SQL.
- Normalize relational data.
- Store translations separately.
- Use JSON for bulk imports.
- Keep repositories reusable.
- Use Knex.js for database abstraction.
- Design for PostgreSQL compatibility.
- Write maintainable SQL.
- Document every schema.

---

# Future Roadmap

- PostgreSQL migration
- Full-text search
- Database versioning
- Automatic migrations
- Bulk import optimization
- Parallel import processing
- Performance monitoring
- Advanced analytics
- Database replication
- Cloud deployment

---

# Technology Stack

| Component | Technology |
|----------|------------|
| Runtime | Node.js |
| Query Builder | Knex.js |
| Development Database | SQLite |
| Production Database | PostgreSQL |
| Data Format | JSON |
| Language | JavaScript |

---

# Conclusion

The BookQubit Database is designed as a scalable, modular, and database-independent architecture. Development begins with SQLite for simplicity and rapid development while maintaining compatibility with PostgreSQL for future production use. By separating schemas, queries, repositories, importers, and documentation, the project remains organized, maintainable, and ready for long-term growth.