# User Interaction Schema Migration Guide

## Overview

The **User Interaction Schema Migration Guide** defines how database schema changes are created, versioned, tested, and deployed within the BookQubit platform.

Migrations ensure that every database instance evolves in a controlled, repeatable, and reversible manner.

---

# Objectives

The migration system is designed to:

- Version database changes
- Track schema history
- Support upgrades and rollbacks
- Keep development, staging, and production synchronized
- Preserve data integrity during updates

---

# Migration Directory Structure

```text
userinteractionschema/
│
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_create_user_bookmarks.sql
│   ├── 003_create_user_ratings.sql
│   ├── 004_create_user_reviews.sql
│   ├── 005_create_user_notes.sql
│   ├── 006_create_user_highlights.sql
│   ├── 007_create_user_reading_progress.sql
│   ├── 008_create_user_notifications.sql
│   ├── 009_add_indexes.sql
│   ├── 010_update_constraints.sql
│   └── README.md
```

---

# Migration Naming Convention

Each migration file should use the following format:

```text
###_short_description.sql
```

Examples:

```text
001_initial_schema.sql
002_create_user_bookmarks.sql
003_create_user_reviews.sql
015_add_review_indexes.sql
028_add_notification_status.sql
```

Rules:

- Use a three-digit sequential prefix.
- Use lowercase letters.
- Separate words with underscores (`_`).
- Do not rename or modify executed migrations.

---

# Migration Lifecycle

```text
Create Migration
        │
        ▼
Review SQL
        │
        ▼
Test Locally
        │
        ▼
Commit to Repository
        │
        ▼
Deploy to Staging
        │
        ▼
Deploy to Production
```

---

# Migration Categories

| Category | Description |
|----------|-------------|
| Create | Create new tables |
| Alter | Modify existing tables |
| Index | Add or remove indexes |
| Constraint | Add foreign keys or checks |
| Data | Populate reference data |
| Cleanup | Remove obsolete objects |

---

# Example Migration

```sql
CREATE TABLE user_bookmarks (
    bookmark_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    created_at TEXT NOT NULL
);
```

---

# Alter Table Example

```sql
ALTER TABLE user_reviews
ADD COLUMN spoiler INTEGER DEFAULT 0;
```

---

# Create Index Example

```sql
CREATE INDEX idx_user_reviews_book
ON user_reviews(book_id);
```

---

# Rollback Strategy

Every migration should have a rollback plan.

Example:

```sql
DROP INDEX IF EXISTS idx_user_reviews_book;
```

Or

```sql
DROP TABLE IF EXISTS user_bookmarks;
```

If a rollback cannot be automated, document the manual recovery steps.

---

# Migration Order

Recommended execution order:

| Order | Migration |
|------:|-----------|
| 001 | Initial schema |
| 002 | Core tables |
| 003 | Foreign keys |
| 004 | Indexes |
| 005 | Views |
| 006 | Triggers |
| 007 | Seed data (development only) |

---

# Dependencies

The User Interaction Schema depends on:

```text
Authentication Schema
        │
        ▼
Users

Book Schema
        │
        ▼
Books
```

Ensure these schemas are migrated before applying User Interaction migrations.

---

# Version Tracking

Maintain a migration history table.

Example:

```sql
CREATE TABLE schema_migrations (
    version TEXT PRIMARY KEY,
    description TEXT,
    applied_at TEXT NOT NULL
);
```

Example records:

| Version | Description |
|----------|-------------|
| 001 | Initial schema |
| 002 | Create bookmarks |
| 003 | Create ratings |

---

# Testing Migrations

Before deployment:

- Apply migrations to a fresh database.
- Test with existing data.
- Verify foreign keys.
- Validate indexes.
- Check triggers and views.
- Confirm rollback works.

---

# Deployment Checklist

Before running migrations:

- Backup the database.
- Verify migration order.
- Ensure no pending conflicts.
- Review SQL syntax.
- Test in staging.

After running migrations:

- Verify tables.
- Verify indexes.
- Verify foreign keys.
- Run smoke tests.
- Check application logs.

---

# Best Practices

- One logical change per migration.
- Never edit an already applied migration.
- Create a new migration for every schema change.
- Keep migrations small and focused.
- Use descriptive file names.
- Document manual steps when required.
- Test on realistic datasets.
- Keep migrations idempotent where possible (`IF EXISTS`, `IF NOT EXISTS`).

---

# Common SQLite Notes

SQLite has limited support for some `ALTER TABLE` operations.

When making complex changes:

1. Create a new table.
2. Copy existing data.
3. Drop the old table.
4. Rename the new table.

Example workflow:

```sql
ALTER TABLE old_table RENAME TO old_table_backup;

CREATE TABLE old_table (...);

INSERT INTO old_table (...)
SELECT ...
FROM old_table_backup;

DROP TABLE old_table_backup;
```

---

# Migration vs Seed

| Migration | Seed |
|-----------|------|
| Changes database structure | Inserts sample or reference data |
| Version controlled | Replaceable |
| Runs once | Can be rerun in development |
| Required in production | Usually skipped in production |

---

# Automation

Recommended migration flow:

```text
Developer
      │
      ▼
Create SQL Migration
      │
      ▼
Git Commit
      │
      ▼
CI/CD Pipeline
      │
      ▼
Apply Migration
      │
      ▼
Record Version
```

---

# Future Enhancements

Planned support includes:

- Automated migration runner
- Rollback scripts
- Migration validation
- Schema diff generation
- Multi-database compatibility (SQLite, PostgreSQL, MySQL)
- Migration checksum verification
- Zero-downtime deployment strategies

---

# Status

**Production Ready**

Supports:

- Versioned SQL migrations
- Sequential execution
- Rollback planning
- Schema history tracking
- SQLite-compatible workflows
- Safe deployment practices