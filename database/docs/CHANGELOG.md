# Changelog

All notable changes to the **BookQubit Database** project are documented in this file.

This project follows a simple versioning approach where each release records new features, improvements, fixes, and database changes.

---

# Version 1.0.0 (Development)

**Release Date:** July 2026

## Added

### Project Structure

- Created the `database/` workspace.
- Organized SQLite and PostgreSQL into separate directories.
- Added a modular folder structure.
- Added project documentation.
- Added repository layer.
- Added JSON import system.
- Added importer framework.
- Added database configuration files.

### SQLite

- Configured SQLite database.
- Created SQLite database file.
- Added schema registry.
- Added migration folder.
- Added backup folder.
- Added query folder.
- Added script folder.
- Added configuration folder.

### PostgreSQL

- Created PostgreSQL project structure.
- Added schema directory.
- Prepared future PostgreSQL migration support.

### Author Schema

Created initial Author Schema.

Added:

- Author table
- Author alias table
- Author language table
- Author translation table
- Constraints
- Foreign keys
- Indexes
- Views
- Triggers (planned)
- Functions (planned)
- Procedures (planned)
- Rollback scripts
- Seed scripts
- Sample data

### Import System

Created JSON import pipeline.

Added:

- JSON reader
- Validator
- Logger
- Import manager
- Author importer
- Repository integration

### JSON Imports

Created import folders.

Added:

- Authors
- Books
- Publishers

### Documentation

Created documentation structure.

Added:

- Database overview
- README
- Roadmap
- Documentation folders

### Development

Configured:

- Node.js
- Knex.js
- SQLite3
- npm

---

## Changed

- Improved project folder organization.
- Standardized SQL file naming.
- Improved schema organization.
- Updated documentation structure.
- Improved import architecture.

---

## Planned

### Database

- Book Schema
- Publisher Schema
- Category Schema
- Genre Schema
- Series Schema
- Review Schema
- Rating Schema

### Authentication

- User Schema
- Sessions
- Login History
- Refresh Tokens
- Email Verification

### Geography

- Continents
- Countries
- States
- Cities

### Analytics

- Dashboard
- Reports
- Trends
- Statistics

### Import System

- CSV import
- Excel import
- XML import
- API import

### PostgreSQL

- Complete PostgreSQL schemas
- PostgreSQL migrations
- PostgreSQL functions
- PostgreSQL procedures

---

# Upcoming Versions

## Version 1.1.0

Planned:

- Complete Book Schema
- Publisher Schema
- Language improvements
- Better JSON validation
- Repository enhancements

---

## Version 1.2.0

Planned:

- User module
- Authentication module
- Notification module
- Search improvements

---

## Version 1.3.0

Planned:

- Analytics
- Reporting
- Dashboard
- Performance improvements

---

## Version 2.0.0

Major Release

Planned:

- PostgreSQL support
- Full migration system
- Production deployment
- Performance optimization
- Enterprise features

---

# Versioning Rules

## Major Version (X.0.0)

Increment when:

- Database architecture changes.
- Breaking schema changes occur.
- Major features are introduced.

Example:

```text
1.0.0 → 2.0.0
```

---

## Minor Version (1.X.0)

Increment when:

- New schemas are added.
- New tables are introduced.
- New features are implemented.

Example:

```text
1.0.0 → 1.1.0
```

---

## Patch Version (1.0.X)

Increment when:

- Bugs are fixed.
- Documentation is updated.
- Small SQL improvements are made.
- Performance is improved.

Example:

```text
1.0.0 → 1.0.1
```

---

# Changelog Categories

Each release should document changes under the following headings:

- Added
- Changed
- Fixed
- Removed
- Deprecated
- Security
- Performance
- Documentation

---

# Notes

- Record every database schema change.
- Record every migration.
- Record all new SQL files.
- Record documentation updates.
- Record performance improvements.
- Record security improvements.
- Record breaking changes.

Maintaining an accurate changelog makes it easier to track the evolution of the BookQubit Database and simplifies upgrades, maintenance, and collaboration.