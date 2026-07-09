# Language Schema

## Overview

The **Language Schema** provides a normalized SQLite database structure for storing languages, scripts, localized language names, aliases, and language-region relationships.

It is designed for multilingual applications such as:

- Digital Libraries
- BookQubit
- CMS
- eCommerce
- ERP
- GIS
- Translation Systems
- Learning Platforms

The schema follows international standards including:

- ISO 639-1
- ISO 639-2
- ISO 639-3
- ISO 15924
- Locale Codes
- Unicode

---

# Folder Structure

```
language_schema/
│
├── constraints/
├── docs/
├── foreign_keys/
├── indexes/
├── migrations/
├── rollback/
├── samples/
├── seed/
│   └── data/
├── tables/
├── tests/
│   ├── fixtures/
│   ├── integration/
│   └── unit/
├── triggers/
├── validation/
├── views/
│
├── README.md
└── schema_order.sql
```

---

# Database Tables

| Table | Description |
|---------|------------|
| languages | Master list of languages |
| scripts | Unicode writing systems |
| language_names | Localized language names |
| language_regions | Countries where a language is spoken |
| language_aliases | Alternate and historical names |

---

# Main Features

- ISO compliant language codes
- ISO 15924 script support
- RTL / LTR support
- Locale support
- Native language names
- Localized language names
- Multiple scripts
- Country mapping
- Aliases
- Views
- Triggers
- Validation scripts
- Sample data
- Seed data
- Unit tests
- Integration tests

---

# Tables

## languages

Stores master language information.

Examples

- English
- Hindi
- Arabic
- Bengali
- Japanese

Contains

- ISO639 codes
- locale
- script
- direction
- active status
- default language

---

## scripts

Stores Unicode writing systems.

Examples

- Latin
- Devanagari
- Arabic
- Bengali
- Hangul
- Han
- Hiragana

---

## language_names

Stores translated language names.

Example

English

```
Hindi
```

Display language

```
French
```

Localized name

```
Hindi
```

---

## language_regions

Maps languages to countries.

Example

English

- USA
- Canada
- Australia
- UK

Hindi

- India

Arabic

- Saudi Arabia
- UAE
- Egypt

---

## language_aliases

Stores

- abbreviations
- alternate names
- historic names
- romanized names
- search aliases

Example

```
English

Modern English
Old English
British English
```

---

# Execution Order

Run

```
schema_order.sql
```

This automatically creates

- tables
- constraints
- foreign keys
- indexes
- triggers
- views
- sample data
- seed data
- validation

---

# Views

The schema includes ready-to-use views.

Examples

```
vw_languages
vw_active_languages
vw_default_language

vw_language_names
vw_preferred_language_names

vw_language_lookup
vw_language_dropdown
vw_language_search

vw_language_scripts
```

---

# Triggers

Automatic handling for

- updated_at
- default language
- preferred language names
- lowercase ISO codes
- validation
- timestamps

---

# Validation

Validation scripts check

- duplicate ISO codes
- duplicate language names
- invalid locale codes
- invalid directions
- orphan records
- missing translations

---

# Tests

The schema contains

```
tests/

fixtures/
integration/
unit/
```

Tests verify

- constraints
- foreign keys
- indexes
- ISO codes
- language names
- scripts

---

# Seed Data

Included

```
languages.seed.json

scripts.seed.json

regions.seed.json

language_names.seed.json
```

SQL seed files

```
01.languages.seed.sql

02.scripts.seed.sql

03.regions.seed.sql

04.language_names.seed.sql
```

---

# Rollback

Rollback scripts are available for every table.

```
rollback/

languages
language_names
language_regions
scripts
```

---

# Migration Files

```
001_initial_languages.sql

002_add_scripts.sql

003_add_regions.sql

004_add_native_names.sql
```

---

# SQLite Compatibility

Designed specifically for SQLite 3.x.

Uses

- CHECK constraints
- Views
- Triggers
- Foreign Keys
- PRAGMA foreign_keys
- AUTOINCREMENT

No SQLite extensions are required.

---

# Future Enhancements

Recommended additions

- language families
- dialects
- transliteration rules
- CLDR support
- pluralization rules
- calendar preferences
- numbering systems
- date formats
- currency preferences
- timezone defaults
- ICU collation
- locale fallback chains

---

# License

This schema is part of the BookQubit database project and may be extended or modified to suit application requirements.