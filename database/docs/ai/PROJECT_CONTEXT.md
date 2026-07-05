# BookQubit Database — AI Project Context

> This document provides the complete context for AI assistants working on the BookQubit Database project. Read this document before generating any code, SQL, documentation, JSON, or architecture.

---

# Project Name

BookQubit Database

---

# Project Goal

BookQubit is a modular, scalable, and database-independent database system for storing information related to books, authors, comics, publishers, users, languages, geography, analytics, and other future modules.

The project is designed for long-term growth and future enterprise-scale applications.

---

# Primary Database

SQLite

Used for:

- Development
- Local testing
- JSON imports
- Rapid prototyping

Database file:

```text
sqlite/db/bookqubit_database.db
```

---

# Future Database

PostgreSQL

The project must be designed so that migration from SQLite to PostgreSQL requires minimal changes.

---

# Technology Stack

- Node.js
- Knex.js
- SQLite
- PostgreSQL
- JavaScript
- JSON
- Markdown
- Git

---

# Project Architecture

The project follows a layered architecture.

```text
JSON Files
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
SQLite / PostgreSQL
```

Application code must never execute raw SQL directly.

Repositories are responsible for all database operations.

---

# Folder Structure

```text
database/
│
├── docs/
├── imports/
├── importers/
├── postgres/
├── repositories/
├── sqlite/
├── knexfile.js
├── package.json
└── README.md
```

---

# SQLite Folder

```text
sqlite/
│
├── db/
├── schema/
├── queries/
├── migrations/
├── scripts/
├── backups/
├── registry/
└── config/
```

---

# Import System

JSON files are stored inside

```text
imports/
```

Example

```text
imports/
└── authors/
    ├── authors_0001.json
    ├── authors_0002.json
    └── authors_0003.json
```

Importers read JSON and insert records through repositories.

Never insert directly from JSON into SQL.

---

# Repository Pattern

Repositories contain CRUD operations only.

Example

```text
repositories/
├── author.repository.js
├── book.repository.js
└── publisher.repository.js
```

Repositories use Knex.js.

---

# SQL Organization

Every schema is modular.

Example

```text
author_schema/

01.author.table.sql
02.author_alias.table.sql
03.author_language.table.sql
04.author_translation.table.sql
05.author.constraint.sql
06.author.foreign_key.sql
07.author.index.sql
08.author.view.sql
09.author.function.sql
10.author.procedure.sql
11.author.trigger.sql
12.author.seed.sql
13.author.sample_data.sql
14.author.rollback.sql
README.md
schema_order.sql
```

---

# Naming Rules

Tables

snake_case

Example

```text
author_translation
book_language
user_profile
```

Columns

snake_case

Primary Keys

```text
author_id
book_id
language_id
```

Foreign Keys

```text
author_id
book_id
language_id
```

Boolean columns

```text
is_active
is_deleted
is_verified
```

Timestamp columns

```text
created_at
updated_at
deleted_at
```

---

# JSON Rules

Always use

```json
{
  "authors": []
}
```

Never use random property names.

IDs should be UUIDs whenever possible.

JSON must be UTF-8 encoded.

---

# SQL Rules

Always

- Use uppercase SQL keywords.
- Use snake_case.
- Add comments.
- Keep one object per file.
- Write readable SQL.
- Prefer explicit column names.
- Avoid SELECT *.

---

# JavaScript Rules

- Use CommonJS modules.
- Keep functions small.
- Use async/await where appropriate.
- Separate business logic from database logic.
- Validate input before inserting.
- Use repositories for database access.

---

# Documentation Rules

Every major folder should contain:

```text
README.md
```

Every schema should include documentation.

Markdown should use proper headings.

---

# AI Responsibilities

When generating code:

Always

- Follow existing folder structure.
- Follow naming conventions.
- Generate clean code.
- Avoid duplication.
- Keep code modular.
- Add comments where useful.
- Produce production-ready output.

Never

- Invent folder names.
- Change project architecture.
- Rename existing files.
- Mix SQLite and PostgreSQL syntax.
- Break naming conventions.
- Produce incomplete code.

---

# Coding Style

Prefer

Simple

Readable

Modular

Reusable

Maintainable

Scalable

---

# Output Expectations

Generated code should be:

- Production-ready
- Properly formatted
- Documented
- Consistent
- Tested when possible

Do not generate placeholder code unless requested.

---

# Development Philosophy

The BookQubit Database emphasizes:

- Clean Architecture
- Modular Design
- Separation of Concerns
- Reusability
- Performance
- Scalability
- Long-Term Maintainability

---

# When Working With This Project

Assume that:

- Folder names already exist.
- Existing conventions must be preserved.
- Existing SQL should not be rewritten unnecessarily.
- New modules should match existing modules.
- Documentation should always accompany new features.

---

# End of Context

If you understand this document, generate all future code and documentation according to these rules unless explicitly instructed otherwise.