# Author Schema ER Diagram

## Overview

The **Author Schema** stores language-independent author records and their multilingual translations.

This design follows a normalized database structure:

- **authors** → Master author records
- **author_translations** → Language-specific author names
- **languages** → Supported languages

---

# Entity Relationship Diagram

```text
                 +----------------------+
                 |      languages       |
                 +----------------------+
                 | PK language_id       |
                 | code (UNIQUE)        |
                 | name                 |
                 | status               |
                 | created_at           |
                 +----------+-----------+
                            |
                            |
                            | code
                            |
                            ▼
+----------------------+      +-------------------------------+
|       authors        |      |    author_translations        |
+----------------------+      +-------------------------------+
| PK author_id         |<-----| PK translation_id             |
| uuid (UNIQUE)        |      | FK author_id                  |
| slug (UNIQUE)        |      | FK language_code              |
| status               |      | name                          |
| created_at           |      | created_at                    |
+----------------------+      +-------------------------------+
```

---

# Tables

## 1. authors

Stores language-independent information about authors.

### Primary Key

- `author_id`

### Unique Fields

- `uuid`
- `slug`

### Purpose

One record represents one author regardless of language.

---

## 2. author_translations

Stores translated author names.

### Primary Key

- `translation_id`

### Foreign Keys

- `author_id` → `authors.author_id`
- `language_code` → `languages.code`

### Unique Constraint

```
(author_id, language_code)
```

This prevents duplicate translations for the same language.

---

## 3. languages

Stores supported application languages.

### Primary Key

- `language_id`

### Unique Field

- `code`

### Example

| Code | Language |
|------|----------|
| en | English |
| hi | Hindi |
| ur | Urdu |

---

# Relationships

## authors → author_translations

One author can have multiple translations.

```
Author
   │
   ├── English
   ├── Hindi
   └── Urdu
```

Relationship

```
1 : N
```

---

## languages → author_translations

One language can be used by many authors.

```
English
   │
   ├── Immanuel Kant
   ├── Friedrich Nietzsche
   ├── Plato
   └── Aristotle
```

Relationship

```
1 : N
```

---

# Database Flow

```
authors
    │
    ├──────────────┐
    │              │
    ▼              ▼
author_translations
           ▲
           │
      languages
```

---

# Current Tables

- authors
- author_translations
- languages

---

# Future Expansion

The schema is designed to support additional tables without modifying the existing structure.

Examples:

- author_aliases
- author_languages
- author_awards
- author_images
- author_social_links
- author_websites
- author_statistics

---

# Advantages

- Normalized database design
- Supports unlimited languages
- Prevents duplicate translations
- Language-independent author records
- Easy to maintain
- Easy to extend
- SQLite compatible
- Optimized for multilingual applications