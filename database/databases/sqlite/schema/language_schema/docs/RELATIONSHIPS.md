# Language Schema Relationships

## Overview

The Language Schema is designed using a normalized relational model. Each table has a single responsibility while maintaining referential integrity through foreign keys.

---

# Entity Relationship Diagram

```text
                     +----------------------+
                     |       scripts        |
                     +----------------------+
                     | script_id (PK)       |
                     | script_code          |
                     | iso15924_code        |
                     | script_name          |
                     +----------+-----------+
                                |
                                | default_script_id
                                |
                                ▼
                     +----------------------+
                     |      languages       |
                     +----------------------+
                     | language_id (PK)     |
                     | language_code        |
                     | english_name         |
                     | native_name          |
                     | locale_code          |
                     | default_script_id FK |
                     +----+-----------+-----+
                          |           |
          language_id     |           | language_id
                          |           |
                          ▼           ▼
          +----------------------+   +-----------------------+
          |   language_names     |   |   language_regions    |
          +----------------------+   +-----------------------+
          | language_name_id PK  |   | language_region_id PK |
          | language_id FK       |   | language_id FK        |
          | display_language_id  |   | country_id            |
          | language_name        |   | is_official           |
          +----------+-----------+   +-----------------------+
                     |
                     |
                     ▼
          +----------------------+
          |  display language    |
          |     languages        |
          +----------------------+

                          |
                          |
                          ▼

               +-----------------------+
               |   language_aliases    |
               +-----------------------+
               | language_alias_id PK  |
               | language_id FK        |
               | alias_name            |
               +-----------------------+
```

---

# Relationships

## 1. Scripts → Languages

### Relationship

```
One Script
      │
      ▼
Many Languages
```

### Foreign Key

```text
languages.default_script_id
        ↓
scripts.script_id
```

### Example

| Script | Languages |
|----------|-----------|
| Latin | English, French, German |
| Devanagari | Hindi, Marathi, Nepali |
| Arabic | Arabic, Urdu, Persian |

---

# 2. Languages → Language Names

### Relationship

```
One Language
      │
      ▼
Many Localized Names
```

### Foreign Key

```text
language_names.language_id
        ↓
languages.language_id
```

Each language may have dozens of translated names.

Example

English

| Display Language | Name |
|------------------|------|
| English | English |
| Hindi | अंग्रेज़ी |
| French | Anglais |
| German | Englisch |
| Japanese | 英語 |

---

# 3. Display Language Relationship

The `display_language_id` also references the `languages` table.

```text
language_names.display_language_id
              │
              ▼
languages.language_id
```

This creates a self-referencing relationship.

Example

```
Language

Japanese

Displayed In

English

Result

Japanese
```

```
Language

Japanese

Displayed In

Hindi

Result

जापानी
```

---

# 4. Languages → Language Regions

### Relationship

```
One Language
      │
      ▼
Many Countries
```

Foreign Key

```text
language_regions.language_id
          │
          ▼
languages.language_id
```

Example

English

- United States
- Canada
- Australia
- United Kingdom

Spanish

- Spain
- Mexico
- Argentina

Arabic

- Saudi Arabia
- Egypt
- UAE

---

# 5. Languages → Aliases

Relationship

```
One Language

        │

        ▼

Many Aliases
```

Foreign Key

```text
language_aliases.language_id
           │
           ▼
languages.language_id
```

Example

English

- British English
- Modern English
- Old English

Hindi

- Hindustani
- Modern Hindi

---

# Cardinality Summary

| Parent | Child | Relationship |
|---------|-------|--------------|
| scripts | languages | One-to-Many |
| languages | language_names | One-to-Many |
| languages | language_regions | One-to-Many |
| languages | language_aliases | One-to-Many |
| languages | language_names (display_language_id) | Self One-to-Many |

---

# Foreign Key Summary

| Child Table | Column | Parent Table | Parent Column |
|--------------|--------|--------------|---------------|
| languages | default_script_id | scripts | script_id |
| language_names | language_id | languages | language_id |
| language_names | display_language_id | languages | language_id |
| language_regions | language_id | languages | language_id |
| language_aliases | language_id | languages | language_id |

> **Note:** `language_regions.country_id` is intended to reference the `countries` table in the Geography Schema. The foreign key can be added once that schema is available.

---

# Delete Behavior

| Parent | Child | Action |
|---------|-------|--------|
| scripts | languages | `ON DELETE SET NULL` |
| languages | language_names | `ON DELETE CASCADE` |
| languages | language_regions | `ON DELETE CASCADE` |
| languages | language_aliases | `ON DELETE CASCADE` |

---

# Update Behavior

All foreign key relationships use:

```sql
ON UPDATE CASCADE
```

This ensures that key changes are propagated automatically to related tables.

---

# Normalization Level

The schema follows **Third Normal Form (3NF)**.

### First Normal Form (1NF)

- Atomic values
- No repeating groups

### Second Normal Form (2NF)

- Full dependency on primary keys
- No partial dependencies

### Third Normal Form (3NF)

- No transitive dependencies
- Lookup data separated into dedicated tables

---

# Design Principles

- Fully normalized relational model
- Strong referential integrity
- ISO 639 language standards
- ISO 15924 script standards
- Unicode-compatible
- Locale-aware
- Supports LTR and RTL writing systems
- Extensible for multilingual applications
- Compatible with SQLite and easily portable to PostgreSQL or MySQL

---

# Future Relationships

The schema is designed to integrate with additional modules.

| Future Schema | Relationship |
|---------------|--------------|
| Geography | `language_regions.country_id → countries.country_id` |
| Books | `books.language_id → languages.language_id` |
| Authors | `authors.primary_language_id → languages.language_id` |
| Publishers | `publishers.language_id → languages.language_id` |
| Users | `users.preferred_language_id → languages.language_id` |
| Translation | Shared language reference for multilingual content |
| Localization | UI language and locale preferences |

These planned relationships allow the `languages` table to act as a central reference across the entire BookQubit ecosystem.