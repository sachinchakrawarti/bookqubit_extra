# User Interaction Schema Backup Guide

## Overview

The **User Interaction Schema Backup Guide** defines the backup, recovery, and disaster recovery strategy for the BookQubit platform.

The User Interaction Schema contains valuable user-generated data such as:

- Reviews
- Ratings
- Bookmarks
- Notes
- Highlights
- Reading Progress
- Reading History
- Notifications
- Bookshelves
- Collections
- Activity Logs
- Search History
- Reports

Regular backups ensure that user data can be restored after accidental deletion, hardware failure, software bugs, cyber incidents, or other disasters.

---

# Objectives

The backup strategy aims to:

- Prevent data loss
- Ensure business continuity
- Enable disaster recovery
- Support database migration
- Protect against corruption
- Preserve historical records
- Meet operational and compliance requirements

---

# Backup Architecture

```text
SQLite Database
        │
        ▼
Backup Process
        │
        ▼
Local Backup
        │
        ├────────► External Drive
        │
        ├────────► Cloud Storage
        │
        └────────► Archive Storage
```

---

# Backup Types

| Backup Type | Description |
|-------------|-------------|
| Full Backup | Entire database |
| Incremental Backup | Changes since the last backup |
| Differential Backup | Changes since the last full backup |
| Snapshot Backup | Point-in-time database copy |
| Logical Backup | SQL dump or exported data |
| Physical Backup | Database file copy |

---

# Recommended Backup Schedule

| Frequency | Backup |
|-----------|--------|
| Hourly | Incremental (if supported) |
| Daily | Full database backup |
| Weekly | Compressed archive |
| Monthly | Long-term archive |
| Before Migration | Full backup |
| Before Major Release | Full backup |

For SQLite, file-based backups are common because incremental backups require additional tooling or application support.

---

# SQLite Backup Methods

## Method 1 — Backup API (Recommended)

SQLite supports online backups using the SQLite Backup API.

Advantages:

- Database remains available
- Consistent backup
- Safe for production environments

---

## Method 2 — VACUUM INTO

Example:

```sql
VACUUM INTO 'backup/bookqubit_backup.db';
```

Benefits:

- Creates a compact backup
- Removes unused pages
- Reduces database size

---

## Method 3 — File Copy

Copy:

```text
bookqubit_database.db
```

Only perform file-copy backups when the database is in a safe state (for example, after stopping writes or following SQLite backup recommendations).

---

## Method 4 — SQL Dump

Export schema and data.

Example:

```text
sqlite3 bookqubit_database.db .dump > backup.sql
```

Useful for:

- Migration
- Version control
- Cross-database conversion

---

# JSON Backup

Certain user interaction data can also be exported to JSON.

Example:

```json
{
    "review_id": 101,
    "user_id": 15,
    "book_id": 20,
    "rating": 5
}
```

Useful for:

- API exports
- Testing
- Data exchange
- Offline analysis

---

# Backup Directory Structure

```text
backups/
│
├── daily/
│   ├── 2026-07-01.db
│   ├── 2026-07-02.db
│   └── 2026-07-03.db
│
├── weekly/
│
├── monthly/
│
├── sql/
│
├── json/
│
└── logs/
```

---

# Backup Naming Convention

Database backups:

```text
bookqubit_YYYY-MM-DD.db
```

SQL dumps:

```text
bookqubit_YYYY-MM-DD.sql
```

JSON exports:

```text
user_reviews_YYYY-MM-DD.json
```

---

# Restore Process

Typical workflow:

```text
Backup File
      │
      ▼
Integrity Verification
      │
      ▼
Restore Database
      │
      ▼
Run Validation
      │
      ▼
Application Ready
```

---

# SQLite Restore

Replace the existing database with the backup after ensuring the application is stopped or writes are safely paused.

Example:

```text
bookqubit_backup.db

↓

bookqubit_database.db
```

---

# Backup Validation

After every backup:

- Verify file exists.
- Verify file size.
- Confirm checksum if used.
- Test database integrity.
- Perform periodic restore tests.

SQLite integrity check:

```sql
PRAGMA integrity_check;
```

---

# Disaster Recovery

Recovery steps:

1. Stop application writes.
2. Identify the latest valid backup.
3. Restore the database.
4. Verify integrity.
5. Restart services.
6. Monitor application health.

---

# Backup Security

Protect backup files by:

- Encrypting backups.
- Restricting access.
- Storing off-site copies.
- Keeping multiple backup generations.
- Monitoring backup jobs.
- Verifying restores regularly.

---

# Backup Retention Policy

Suggested retention:

| Backup | Retention |
|---------|-----------|
| Daily | 30 days |
| Weekly | 12 weeks |
| Monthly | 12 months |
| Yearly | 5 years |

Adjust retention according to organizational, legal, and regulatory requirements.

---

# Automation

Backups can be automated using:

- Cron (Linux/macOS)
- Windows Task Scheduler
- GitHub Actions
- CI/CD pipelines
- Scheduled Node.js scripts
- Cloud backup services

---

# Monitoring

Monitor:

- Backup success/failure
- Backup duration
- Backup size
- Storage usage
- Restore test results
- Integrity check status

---

# Best Practices

- Back up before every schema migration.
- Test restores regularly.
- Keep multiple backup generations.
- Store backups in multiple locations.
- Encrypt sensitive backups.
- Automate backup schedules.
- Verify backup integrity.
- Document recovery procedures.
- Monitor backup jobs.
- Periodically review retention policies.

---

# Future Enhancements

Planned improvements include:

- Incremental backup automation
- Cloud-native backup integration
- Point-in-time recovery (for supported databases)
- Backup compression
- Backup deduplication
- Immutable backup storage
- Automated restore testing
- Cross-region replication
- Backup dashboards
- AI-assisted backup health monitoring

---

# Status

**Production Ready**

Supports:

- Full database backups
- SQLite Backup API guidance
- VACUUM INTO backups
- SQL dump exports
- JSON exports
- Backup validation
- Disaster recovery procedures
- Automated backup workflows
- Secure backup storage
- SQLite, PostgreSQL, and MySQL compatibility