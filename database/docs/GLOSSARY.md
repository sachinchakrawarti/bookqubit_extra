# Glossary

This glossary defines common terms, abbreviations, and concepts used throughout the **BookQubit Database** project.

---

# A

## Alias

An alternative name for an entity.

Example:

```text
William Shakespeare

Aliases:
- The Bard
- Bard of Avon
```

---

## API

**Application Programming Interface**

A set of functions or endpoints that allow applications to communicate with the database.

---

## Attribute

A property or characteristic of an entity.

Example:

```text
Author

Attributes:
- id
- gender
- birth_date
```

---

# B

## Backup

A copy of the database used for recovery in case of data loss.

---

## Batch Import

Importing multiple records at once.

Example:

```text
100 Authors

500 Books

50 Publishers
```

---

## Book

A published literary work stored in the BookQubit database.

---

## Boolean

A data type with two possible values:

```text
TRUE

FALSE
```

---

# C

## Constraint

A rule that ensures data integrity.

Examples:

- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- CHECK
- NOT NULL

---

## CRUD

Basic database operations.

```text
Create

Read

Update

Delete
```

---

# D

## Database

An organized collection of structured information.

---

## Data Integrity

Ensuring that stored data remains accurate, valid, and consistent.

---

## Data Type

Defines what kind of data a column stores.

Examples:

```text
INTEGER

TEXT

DATE

BOOLEAN

REAL
```

---

# E

## Entity

A real-world object represented in the database.

Examples:

- Author
- Book
- Publisher
- User

---

## ER Diagram

**Entity Relationship Diagram**

A visual representation of tables and their relationships.

---

# F

## Foreign Key

A column that references the primary key of another table.

Example:

```text
book.author_id

→ author.id
```

---

# G

## Git

A distributed version control system used to track project changes.

---

## GitHub

A platform for hosting Git repositories and collaborating on software projects.

---

# I

## Index

A database object that speeds up data retrieval.

---

## Importer

A program that reads external data (such as JSON) and inserts it into the database.

---

# J

## JSON

**JavaScript Object Notation**

A lightweight format used to exchange structured data.

Example:

```json
{
  "id": "AUTH000001",
  "gender": "male"
}
```

---

# K

## Knex.js

A JavaScript SQL query builder that supports multiple relational databases, including SQLite and PostgreSQL.

---

# L

## Language

A language in which data is stored or translated.

Examples:

- English
- Hindi
- Urdu

---

# M

## Migration

A version-controlled change to the database schema.

---

## Module

A self-contained part of the project.

Examples:

- Author
- Books
- Users
- Geography

---

# N

## Normalization

Organizing database tables to reduce redundancy and improve data integrity.

---

## Null

Represents the absence of a value.

---

# P

## PostgreSQL

An advanced open-source relational database management system planned for BookQubit's production environment.

---

## Primary Key

A unique identifier for each row in a table.

Example:

```text
author.id
```

---

# Q

## Query

A SQL statement used to retrieve or modify data.

Examples:

```sql
SELECT

INSERT

UPDATE

DELETE
```

---

# R

## Record

A single row in a database table.

---

## Relationship

A logical association between two tables.

Example:

```text
Author

↓

Book
```

---

## Repository

A JavaScript module responsible for database operations, separating application logic from data access.

---

# S

## Schema

A logical collection of related database objects.

Examples:

- author_schema
- book_schema
- language_schema

---

## Seed

Initial data inserted into a database after schema creation.

---

## SQLite

A lightweight, serverless relational database used for local development.

---

## SQL

**Structured Query Language**

The standard language used to interact with relational databases.

---

# T

## Table

A collection of rows and columns that stores related data.

Example:

```text
author
```

---

## Transaction

A sequence of database operations executed as a single unit.

A transaction either:

- Commits successfully
- Rolls back completely

---

## Trigger

A database object that automatically executes when a specified event occurs.

---

# U

## Unique Constraint

Ensures that duplicate values cannot be stored in a column.

---

## UTF-8

A character encoding standard that supports multilingual text.

---

# V

## View

A virtual table created from one or more SQL queries.

---

## Validation

The process of checking whether data meets predefined rules before insertion or update.

---

# W

## WAL

**Write-Ahead Logging**

A SQLite journal mode that improves concurrency and performance.

Files created:

```text
bookqubit_database.db-wal

bookqubit_database.db-shm
```

---

# X

## XML

**Extensible Markup Language**

A structured data format that may be supported for future imports.

---

# Y

## YAML

**YAML Ain't Markup Language**

A human-readable data serialization format often used for configuration files.

---

# Z

## Zero-Downtime Migration

A deployment strategy that allows schema changes with minimal or no interruption to application availability.

---

# Abbreviations

| Abbreviation | Meaning |
|--------------|---------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| DB | Database |
| ER | Entity Relationship |
| FK | Foreign Key |
| JSON | JavaScript Object Notation |
| PK | Primary Key |
| SQL | Structured Query Language |
| WAL | Write-Ahead Logging |
| UTF-8 | Unicode Transformation Format - 8-bit |

---

# Project-Specific Terms

| Term | Description |
|------|-------------|
| Importer | Reads JSON and inserts data into the database |
| Repository | JavaScript layer that interacts with the database |
| Registry | Collection of SQL scripts executed in order |
| Schema Order | Defines the execution order of SQL files |
| Seed Data | Initial records used to populate tables |
| Translation Table | Stores multilingual text for an entity |
| Alias Table | Stores alternate names for an entity |
| Rollback Script | SQL used to undo schema changes |

---

# Related Documentation

- `BookQubit_Database.md`
- `ROADMAP.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- Schema-specific `README.md` files

---

# Last Updated

**Version:** 1.0.0
**Status:** Active Development