# Database Adapters

Welcome to the **Database Adapter Layer** of the **BookQubit Database** project.

The adapter layer provides a unified interface for communicating with different database systems. It abstracts database-specific implementations so that repositories and application code remain independent of the underlying database engine.

Currently, BookQubit supports **SQLite** for development and is designed to support **PostgreSQL** for production.

---

# Purpose

The adapter layer is responsible for:

- Managing database connections
- Executing queries
- Handling transactions
- Providing CRUD operations
- Abstracting database-specific behavior
- Supporting multiple database engines
- Keeping repositories database-independent

---

# Architecture

```text
Application
      │
      ▼
Repositories
      │
      ▼
Database Adapter
      │
      ▼
Knex.js
      │
 ┌────┴───────────┐
 ▼                ▼
SQLite       PostgreSQL
```

---

# Directory Structure

```text
adapters/
│
├── README.md
├── base.adapter.js
├── sqlite.adapter.js
├── postgres.adapter.js
├── adapter.factory.js
└── index.js
```

---

# Files

## base.adapter.js

Defines the common interface for all database adapters.

Typical responsibilities:

- Connect
- Disconnect
- Insert
- Update
- Delete
- Select
- Transactions

Every adapter should implement the same public API.

---

## sqlite.adapter.js

SQLite implementation.

Uses:

- Knex.js
- SQLite client

Responsible for:

- SQLite connection
- Query execution
- Transactions
- SQLite-specific features

---

## postgres.adapter.js

PostgreSQL implementation.

Uses:

- Knex.js
- PostgreSQL client (`pg`)

Responsible for:

- PostgreSQL connection
- Query execution
- Transactions
- PostgreSQL-specific features

---

## adapter.factory.js

Returns the appropriate adapter based on the configured database.

Example flow:

```text
Configuration
      │
      ▼
Adapter Factory
      │
 ┌────┴──────────┐
 ▼               ▼
SQLite      PostgreSQL
```

Repositories never directly choose the database implementation.

---

## index.js

Exports the active adapter.

Repositories simply import:

```javascript
const db = require("../adapters");
```

without knowing which database engine is being used.

---

# Repository Interaction

Repositories communicate only with the adapter layer.

```text
Repository
      │
      ▼
Database Adapter
      │
      ▼
Database
```

This keeps repository code clean and portable.

---

# Supported Operations

Typical adapter methods include:

- connect()
- disconnect()
- insert()
- insertMany()
- update()
- delete()
- findById()
- findOne()
- findAll()
- count()
- exists()
- transaction()

Additional methods may be added as the project grows.

---

# Why Use an Adapter Layer?

Advantages include:

- Database independence
- Easier migration between databases
- Cleaner repository code
- Centralized connection management
- Simplified testing
- Better maintainability
- Improved scalability

---

# Development Guidelines

When creating a new adapter:

- Follow the interface defined in `base.adapter.js`.
- Keep database-specific logic inside the adapter.
- Do not expose Knex.js directly to repositories.
- Handle errors consistently.
- Support transactions where applicable.
- Document any database-specific behavior.

---

# Future Database Support

The adapter architecture allows additional databases to be supported with minimal changes.

Potential future adapters:

- MySQL
- MariaDB
- Microsoft SQL Server
- Oracle Database
- CockroachDB

Only a new adapter implementation is required, while repositories remain unchanged.

---

# Related Components

The adapter layer works closely with:

- `repositories/`
- `sqlite/`
- `postgres/`
- `knexfile.js`
- `package.json`

---

# Version

**Version:** 1.0.0

**Status:** Active Development