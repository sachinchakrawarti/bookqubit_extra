# Changelog

All notable changes to the **Language Schema** will be documented in this file.

The project follows the principles of **Keep a Changelog** and **Semantic Versioning (SemVer)**.

---

## [1.0.0] - 2026-07-08

### Added

#### Core Tables

- Added `languages` table
- Added `scripts` table
- Added `language_names` table
- Added `language_regions` table
- Added `language_aliases` table

#### Constraints

- Language constraints
- Script constraints
- Language name constraints
- Language region constraints

#### Foreign Keys

- Languages → Scripts
- Language Names → Languages
- Display Languages → Languages
- Language Regions → Languages

#### Indexes

- Languages indexes
- Scripts indexes
- Language names indexes
- Language region indexes

#### Triggers

- Automatic `updated_at` maintenance
- Default language enforcement
- Preferred language name enforcement
- Language code normalization
- Script validation
- Language name validation

#### Views

- `vw_languages`
- `vw_active_languages`
- `vw_default_language`
- `vw_language_names`
- `vw_preferred_language_names`
- `vw_language_lookup`
- `vw_language_dropdown`
- `vw_language_dropdown_native`
- `vw_language_search`
- `vw_language_statistics`
- `vw_language_name_statistics`

#### Seed Data

- Initial language seed data
- Script seed data
- Region seed data
- Localized language names

#### Sample Data

- Languages sample
- Scripts sample
- Language names sample

#### Validation

- Language validation scripts
- Language name validation scripts

#### Testing

- Integration tests
- Unit tests
- Test fixtures

#### Documentation

- README
- TABLES
- RELATIONSHIPS
- DATA_TYPES
- QUERY_EXAMPLES
- MIGRATION_GUIDE
- ER Diagram

---

## Planned

### Tables

- Language families
- Dialects
- Locale preferences
- Number systems
- Calendar systems

### Views

- Locale lookup
- Language family hierarchy
- Translation coverage
- Script statistics

### Validation

- ISO code verification
- Locale validation
- CLDR compatibility checks

### Documentation

- API Guide
- Seed Guide
- Development Guide
- Performance Guide

### Features

- CLDR support
- ICU collation
- Transliteration rules
- Locale fallback chains
- Language hierarchy
- Script variants
- Translation metadata

---

## Versioning

This project follows **Semantic Versioning (SemVer)**.

```
MAJOR.MINOR.PATCH
```

Example

```
1.0.0
1.1.0
1.2.0
2.0.0
```

### MAJOR

Increment when incompatible schema changes are introduced.

Examples:

- Dropping tables
- Renaming columns
- Breaking foreign keys

### MINOR

Increment when new functionality is added without breaking compatibility.

Examples:

- New tables
- New views
- New indexes
- Additional migrations

### PATCH

Increment for backward-compatible fixes.

Examples:

- Documentation improvements
- Trigger fixes
- Index optimization
- Validation updates

---

## Release Notes

### Version 1.0.0

Initial production-ready release of the Language Schema featuring:

- Fully normalized database design
- ISO 639 language support
- ISO 15924 script support
- Localized language names
- Language-region mapping
- Alias support
- SQLite-compatible schema
- Foreign key relationships
- Validation scripts
- Triggers
- Views
- Seed data
- Unit and integration tests
- Comprehensive documentation