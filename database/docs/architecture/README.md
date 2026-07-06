# Architecture Documentation

Welcome to the **BookQubit Database Architecture** documentation.

This directory explains how the BookQubit database is designed, organized, and maintained. It covers the overall system architecture, design principles, folder organization, naming conventions, and technologies used throughout the project.

The goal is to provide a clear understanding of the database structure before working with schemas, queries, importers, or repositories.

---

# Purpose

The architecture documentation helps developers:

- Understand the overall database design.
- Learn how project components interact.
- Follow consistent development practices.
- Build scalable and maintainable database modules.
- Prepare for future PostgreSQL migration.

---

# Directory Structure

```text
architecture/
│
├── README.md
├── database_architecture.md
├── folder_structure.md
├── naming_conventions.md
├── coding_standards.md
├── design_principles.md
└── technology_stack.md
```

---

# Documents

## database_architecture.md

Provides an overview of the complete database architecture.

Topics include:

- High-level system overview
- Database layers
- Data flow
- Repository pattern
- Import pipeline
- SQLite architecture
- PostgreSQL architecture

---

## folder_structure.md

Explains the organization of the project folders.

Includes:

- Root directory
- SQLite folders
- PostgreSQL folders
- Documentation
- Import system
- Repositories
- Scripts

---

## naming_conventions.md

Defines naming standards used across the project.

Examples include:

- Tables
- Columns
- SQL files
- JSON files
- JavaScript files
- Repositories
- Importers

---

## coding_standards.md

Describes coding guidelines for:

- JavaScript
- SQL
- JSON
- Markdown
- Project organization

---

## design_principles.md

Explains the core principles behind the project architecture.

Topics include:

- Modularity
- Separation of concerns
- Scalability
- Reusability
- Simplicity
- Database portability

---

## technology_stack.md

Documents all technologies used in the project.

Examples:

- Node.js
- SQLite
- PostgreSQL
- Knex.js
- npm
- Visual Studio Code

---

# Architecture Overview

```text
                JSON Files
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
         ┌───────────┴───────────┐
         ▼                       ▼
     SQLite               PostgreSQL
```

---

# Design Goals

The BookQubit database architecture is designed to be:

- Modular
- Scalable
- Maintainable
- Database-independent
- Easy to understand
- Easy to extend
- Suitable for long-term development

---

# Core Components

The architecture consists of the following major components:

- Database schemas
- SQL scripts
- Repository layer
- Import system
- Configuration
- Documentation
- Migrations
- Backup system

Each component has a well-defined responsibility.

---

# Development Principles

The project follows these principles:

- Keep SQL separate from application code.
- Keep schemas modular.
- Avoid duplicate logic.
- Use repositories for database access.
- Prefer configuration over hardcoding.
- Document every major component.
- Maintain compatibility between SQLite and PostgreSQL where practical.

---

# Related Documentation

- `docs/BookQubit_Database.md`
- `docs/ROADMAP.md`
- `docs/CONTRIBUTING.md`
- `docs/GLOSSARY.md`

---

# Last Updated

**Version:** 1.0.0

**Status:** Active Development