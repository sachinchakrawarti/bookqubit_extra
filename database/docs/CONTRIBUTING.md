# Contributing to BookQubit Database

Thank you for your interest in contributing to the **BookQubit Database** project.

This document defines the standards, workflow, and best practices for contributing to the database. Following these guidelines helps maintain a clean, scalable, and consistent codebase.

---

# Table of Contents

- Getting Started
- Development Environment
- Project Structure
- Branch Strategy
- Coding Standards
- SQL Standards
- Naming Conventions
- Schema Development
- Documentation Standards
- JSON Import Standards
- Repository Standards
- Testing
- Commit Messages
- Pull Requests
- Best Practices

---

# Getting Started

Before contributing:

1. Clone the repository.
2. Install project dependencies.
3. Configure SQLite.
4. Read the project documentation.
5. Understand the folder structure.
6. Create a feature branch.

---

# Development Environment

## Required Software

- Node.js
- npm
- SQLite
- Knex.js
- Git
- Visual Studio Code

---

# Project Structure

```text
database/
│
├── docs/
├── imports/
├── importers/
├── repositories/
├── sqlite/
├── postgres/
├── tests/
└── utils/
```

Always place files in their appropriate directories.

---

# Branch Strategy

Create a new branch for every feature or bug fix.

Examples:

```text
feature/author-schema

feature/book-import

feature/postgres-support

bugfix/import-validation

docs/update-readme
```

Do not commit directly to the main branch.

---

# Coding Standards

## JavaScript

- Use modern JavaScript.
- Use meaningful variable names.
- Keep functions small.
- Avoid duplicate code.
- Add comments only when necessary.
- Handle errors properly.

Example:

```javascript
function insertAuthor(author) {
    // implementation
}
```

---

# SQL Standards

- Keep one responsibility per SQL file.
- Use uppercase SQL keywords.
- Use lowercase snake_case table names.
- Add comments for complex queries.
- Keep formatting consistent.

Example:

```sql
SELECT *
FROM author
WHERE id = ?;
```

---

# Naming Conventions

## Tables

```text
author

book

publisher
```

---

## Translation Tables

```text
author_translation

book_translation
```

---

## Alias Tables

```text
author_alias
```

---

## SQL Files

```text
01.author.table.sql

02.author_alias.table.sql

03.author_translation.table.sql
```

---

## JSON Files

```text
authors_0001.json

authors_0002.json

books_0001.json
```

---

## Repository Files

```text
author.repository.js

book.repository.js
```

---

# Schema Development

Each schema should include:

```text
README.md

01.table.sql

02.constraint.sql

03.foreign_key.sql

04.index.sql

05.view.sql

06.trigger.sql

07.seed.sql

08.rollback.sql

schema_order.sql
```

Every schema must be independent and self-contained.

---

# Documentation Standards

Each schema should include documentation such as:

- README.md
- TABLES.md
- DATA_FIELDS.md
- DATA_TYPES.md
- RELATIONSHIPS.md
- ER_DIAGRAM.md

Documentation should be updated whenever the schema changes.

---

# JSON Import Standards

JSON files should:

- Use UTF-8 encoding.
- Be properly formatted.
- Contain valid data.
- Follow the project's import schema.
- Avoid duplicate records.

Example:

```json
{
    "authors": [
        {
            "id": "AUTH000001",
            "gender": "male"
        }
    ]
}
```

---

# Repository Standards

Repositories should:

- Perform database operations only.
- Avoid business logic.
- Return consistent results.
- Use transactions when needed.
- Keep methods reusable.

Example:

```text
insert()

update()

delete()

findById()

findAll()
```

---

# Testing

Before submitting changes:

- Verify SQL syntax.
- Test schema creation.
- Test migrations.
- Test imports.
- Test repositories.
- Test rollback scripts.

Do not submit untested changes.

---

# Commit Messages

Use clear, descriptive commit messages.

Examples:

```text
feat: add author translation table

fix: correct foreign key constraint

docs: update author schema documentation

refactor: simplify repository methods

test: add importer validation tests
```

Avoid vague messages such as:

```text
update

fix

changes

work

done
```

---

# Pull Requests

Before creating a pull request:

- Ensure the code builds successfully.
- Verify all SQL files execute correctly.
- Update documentation if needed.
- Keep changes focused on a single feature or fix.

Include:

- Summary
- Reason for the change
- Testing performed
- Related issue (if applicable)

---

# Best Practices

- Keep schemas modular.
- Separate SQL from JavaScript.
- Reuse repository methods.
- Write maintainable SQL.
- Avoid duplicated logic.
- Keep documentation current.
- Follow naming conventions.
- Design with PostgreSQL compatibility in mind.
- Prefer small, focused commits.
- Review your changes before committing.

---

# Reporting Issues

When reporting a bug, include:

- Description
- Expected behavior
- Actual behavior
- Steps to reproduce
- Environment details
- Relevant logs or screenshots (if available)

---

# Suggestions

Feature suggestions should include:

- Problem statement
- Proposed solution
- Expected benefits
- Possible implementation approach

---

# License

By contributing to the BookQubit Database project, you agree that your contributions will be licensed under the project's license.

---

# Thank You

Your contributions help improve the BookQubit Database for everyone. Whether you are fixing bugs, improving documentation, optimizing SQL, or adding new features, your effort is appreciated.