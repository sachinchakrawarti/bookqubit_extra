# Data Dictionary

Welcome to the **BookQubit Data Dictionary**.

The Data Dictionary is the central reference for understanding the data stored in the BookQubit Database. It documents every entity, attribute, relationship, constraint, and standard used throughout the project.

Unlike SQL schema files, which define how the database is implemented, the Data Dictionary explains **what the data represents**, **how it should be used**, and **why it exists**.

---

# Purpose

The Data Dictionary helps developers:

- Understand the database model.
- Learn the meaning of tables and columns.
- Follow consistent naming conventions.
- Discover relationships between entities.
- Understand constraints and validation rules.
- Maintain data consistency.
- Support future database migrations.
- Improve collaboration across teams.

---

# Directory Structure

```text
docs/
└── data-dictionary/
    │
    ├── README.md
    ├── ENTITIES.md
    ├── ATTRIBUTES.md
    ├── RELATIONSHIPS.md
    ├── CONSTRAINTS.md
    ├── DATA_TYPES.md
    ├── NAMING_CONVENTIONS.md
    ├── ENUMS.md
    ├── STATUS_CODES.md
    └── INDEX.md
```

---

# Documents

## ENTITIES.md

Describes every entity (table) in the database.

Examples:

- Author
- Book
- Publisher
- Language
- User
- Category
- Comic
- Country

For each entity, the document explains:

- Purpose
- Primary key
- Important fields
- Related entities
- Business meaning

---

## ATTRIBUTES.md

Defines all common database attributes (columns).

Examples:

- author_id
- book_id
- language_id
- title
- slug
- created_at
- updated_at
- is_active

Each attribute includes:

- Name
- Data type
- Description
- Usage
- Example value

---

## RELATIONSHIPS.md

Documents relationships between entities.

Examples:

- Author → Books
- Book → Publisher
- Book → Language
- User → Reviews

Includes:

- Relationship type
- Foreign keys
- Cardinality (1:1, 1:N, N:M)
- Relationship diagrams (where applicable)

---

## CONSTRAINTS.md

Lists all database constraints.

Examples:

- Primary Keys
- Foreign Keys
- Unique Constraints
- Check Constraints
- Default Values
- NOT NULL rules

---

## DATA_TYPES.md

Defines the standard data types used throughout the project.

Examples:

- INTEGER
- TEXT
- REAL
- BLOB
- NUMERIC
- BOOLEAN (SQLite convention)
- DATETIME

This document also explains how data types map between SQLite and PostgreSQL.

---

## NAMING_CONVENTIONS.md

Defines naming standards for database objects.

Examples:

- Tables
- Columns
- Indexes
- Views
- Triggers
- SQL files
- JSON files

Following these conventions ensures consistency across the project.

---

## ENUMS.md

Documents standardized enumerated values used in the database.

Examples:

- User roles
- Book formats
- Author types
- Publication status
- Visibility options
- Language direction

---

## STATUS_CODES.md

Defines reusable status values used across entities.

Examples:

- Active
- Inactive
- Deleted
- Draft
- Published
- Archived
- Pending
- Approved

This provides a consistent interpretation of status fields throughout the system.

---

## INDEX.md

An alphabetical index of documented entities and attributes.

The index provides quick navigation to:

- Tables
- Columns
- Relationships
- Enums
- Constraints

---

# Scope

The Data Dictionary covers:

- SQLite schemas
- PostgreSQL schemas
- JSON import structures
- Repository field mappings
- Shared database standards

It serves as the authoritative reference for data definitions across the BookQubit project.

---

# Relationship to SQL Schemas

The Data Dictionary complements the SQL schema files.

| SQL Schema | Data Dictionary |
|------------|-----------------|
| Defines how the database is built | Explains what the data means |
| SQL implementation | Business and technical documentation |
| Tables, indexes, triggers | Entities, attributes, relationships |
| Executable SQL | Human-readable reference |

Both should be kept in sync as the project evolves.

---

# Maintenance Guidelines

When making database changes:

1. Update the SQL schema.
2. Update the corresponding Data Dictionary documents.
3. Review related relationships and constraints.
4. Update examples if needed.
5. Verify consistency with project naming conventions.

Keeping the Data Dictionary current helps ensure reliable documentation and reduces ambiguity.

---

# Related Documentation

- `docs/architecture/`
- `docs/schemas/`
- `docs/ai/`
- `sqlite/schema/`
- `postgres/schema/`

---

# Version

**Version:** 1.0.0

**Status:** Active Development