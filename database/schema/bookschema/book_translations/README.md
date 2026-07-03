# Book Translations Module

## Overview

The **Book Translations** module provides multilingual support for BookQubit. It stores translated book content while keeping the original book information in the `books` table.

This design follows a normalized database structure where:

- `books` contains language-independent information.
- `book_translations` contains language-specific content.
- One book can have translations in multiple languages.
- Each language has only one translation per book.

---

# Purpose

The module enables:

- 🌍 Multilingual book catalog
- 📚 Localized book titles
- 📝 Localized descriptions
- 🔍 Language-specific search
- 🌐 SEO for every language
- 🤖 AI-generated translations
- ✅ Human verified translations
- 🔄 Translation version management

---

# Folder Structure

```text
book_translations/
│
├── book_translations.sql
├── book_translations.index.sql
├── book_translations.view.sql
├── book_translations.trigger.sql
│
├── seed/
│   ├── book_translations.seed.en.json
│   ├── book_translations.seed.hi.json
│   ├── book_translations.seed.bn.json
│   ├── book_translations.seed.gu.json
│   ├── book_translations.seed.mr.json
│   ├── book_translations.seed.ta.json
│   ├── book_translations.seed.te.json
│   ├── book_translations.seed.kn.json
│   ├── book_translations.seed.ml.json
│   ├── book_translations.seed.pa.json
│   ├── book_translations.seed.ur.json
│   ├── book_translations.seed.fr.json
│   ├── book_translations.seed.de.json
│   ├── book_translations.seed.es.json
│   ├── book_translations.seed.pt.json
│   ├── book_translations.seed.it.json
│   ├── book_translations.seed.ru.json
│   ├── book_translations.seed.ar.json
│   ├── book_translations.seed.zh.json
│   ├── book_translations.seed.ja.json
│   └── book_translations.seed.ko.json
│
└── README.md
```

---

# Database Objects

## Tables

| Table | Description |
|--------|-------------|
| book_translations | Stores translated content for books |

---

## Indexes

Optimized indexes are created for:

- Book ID
- Language ID
- Status
- Verification
- Machine Translation
- Created Date
- Updated Date

---

## Views

Views provide simplified access for:

- Published translations
- Verified translations
- Language-specific books
- Search results

---

## Triggers

Triggers automatically maintain:

- updated_at timestamp
- Translation consistency
- Data validation
- Audit information

---

# Relationship

```text
books
-----
book_id
title
...

        │
        │ 1
        │
        ▼

book_translations
-----------------
translation_id
book_id
language_id
title
description
slug
...
```

One book can have multiple translations.

---

# Supported Languages

| Code | Language |
|------|----------|
| en | English |
| hi | Hindi |
| bn | Bengali |
| gu | Gujarati |
| mr | Marathi |
| ta | Tamil |
| te | Telugu |
| kn | Kannada |
| ml | Malayalam |
| pa | Punjabi |
| ur | Urdu |
| fr | French |
| de | German |
| es | Spanish |
| pt | Portuguese |
| it | Italian |
| ru | Russian |
| ar | Arabic |
| zh | Chinese |
| ja | Japanese |
| ko | Korean |

The module can easily support additional languages.

---

# Translation Workflow

```text
Original Book
      │
      ▼
English Translation
      │
      ▼
AI Translation
      │
      ▼
Human Review
      │
      ▼
Verification
      │
      ▼
Published
```

---

# Translation Status

| Status | Description |
|---------|-------------|
| draft | Translation in progress |
| review | Waiting for review |
| published | Publicly available |
| archived | No longer active |

---

# Translation Types

## Human Translation

- Professional translator
- High quality
- Verified

---

## AI Translation

- Machine generated
- Fast
- Can be reviewed later

---

# SEO Support

Each translation has independent SEO metadata.

Example:

- Meta Title
- Meta Description
- Meta Keywords
- Localized Slug

This allows search engines to index each language independently.

---

# Search

The module supports searching by:

- Title
- Subtitle
- Description
- Keywords
- Language
- Slug

Future versions can integrate SQLite FTS5 for full-text multilingual search.

---

# Data Validation

The module enforces:

- One translation per language per book
- Unique localized slug
- Valid language reference
- Valid book reference
- Valid publication status

---

# Seed Data

Seed files are organized by language.

Example:

```text
seed/
├── book_translations.seed.en.json
├── book_translations.seed.hi.json
├── book_translations.seed.fr.json
└── ...
```

JSON seed files are easier to:

- Maintain
- Translate
- Import
- Export
- Version control

---

# Performance

Recommended indexes:

- book_id
- language_id
- status
- is_verified
- created_at
- updated_at

Avoid indexing large text fields such as descriptions.

Use SQLite FTS5 for multilingual full-text search.

---

# Future Enhancements

- Translation memory
- AI translation suggestions
- Version history
- Translator assignments
- Approval workflow
- Translation quality score
- Auto translation using AI
- Language fallback
- Locale-specific formatting
- Regional translations (en-US, en-GB, pt-BR, fr-CA)

---

# Best Practices

- Keep original content in `books`.
- Store only localized fields in `book_translations`.
- Use ISO 639-1 language codes.
- Use UTF-8 encoding.
- Maintain one translation per language.
- Keep slugs unique.
- Review AI translations before publishing.
- Store seed data as JSON for easier maintenance.

---

# Dependencies

This module depends on:

- books
- languages

Both tables must exist before importing translation data.

---

# Module Status

**Production Ready**

Supports:

- Unlimited books
- Unlimited languages
- AI translations
- Human translations
- SEO
- Search
- Localization
- JSON seed files
- Enterprise-scale multilingual architecture