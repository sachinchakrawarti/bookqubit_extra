# User Interaction Schema JSON Seed Guide

## Overview

BookQubit uses **JSON** as the preferred format for seeding the **User Interaction Schema**.

JSON seed files are easy to read, edit, version, and import into SQLite, PostgreSQL, MySQL, and other supported databases. They are also ideal for development, testing, demos, and automated CI/CD pipelines.

---

# Objectives

The JSON seed system is designed to:

- Store sample user interaction data
- Populate development databases
- Support automated testing
- Simplify data maintenance
- Enable cross-database compatibility
- Work seamlessly with Node.js import scripts

---

# Directory Structure

```text
userinteractionschema/
│
├── seed/
│   ├── user_bookmarks.seed.json
│   ├── user_bookshelves.seed.json
│   ├── bookshelf_books.seed.json
│   ├── user_collections.seed.json
│   ├── collection_books.seed.json
│   ├── user_reading_progress.seed.json
│   ├── user_reading_history.seed.json
│   ├── user_ratings.seed.json
│   ├── user_reviews.seed.json
│   ├── user_comments.seed.json
│   ├── user_reactions.seed.json
│   ├── user_notes.seed.json
│   ├── user_highlights.seed.json
│   ├── user_notifications.seed.json
│   ├── user_preferences.seed.json
│   ├── user_search_history.seed.json
│   ├── user_activity_logs.seed.json
│   ├── user_reports.seed.json
│   ├── user_recommendations.seed.json
│   └── README.md
```

---

# File Naming Convention

Use the following pattern:

```text
<table_name>.seed.json
```

Examples:

```text
user_reviews.seed.json
user_ratings.seed.json
user_notes.seed.json
user_notifications.seed.json
```

For language-specific datasets:

```text
user_notifications.seed.en.json
user_notifications.seed.hi.json
```

---

# JSON Structure

Each file should contain a single JSON array.

Example:

```json
[
    {
        "user_id": 1,
        "book_id": 101,
        "rating": 5
    },
    {
        "user_id": 2,
        "book_id": 101,
        "rating": 4
    }
]
```

---

# Example: Ratings

```json
[
    {
        "user_id": 1,
        "book_id": 101,
        "rating": 5,
        "created_at": "2026-07-03 12:00:00"
    }
]
```

---

# Example: Reviews

```json
[
    {
        "user_id": 1,
        "book_id": 101,
        "title": "Excellent Book",
        "review": "Highly recommended.",
        "rating": 5,
        "status": "published"
    }
]
```

---

# Example: Reading Progress

```json
[
    {
        "user_id": 1,
        "book_id": 101,
        "current_page": 125,
        "progress_percentage": 42.8,
        "reading_time": 180
    }
]
```

---

# Example: Notifications

```json
[
    {
        "user_id": 1,
        "title": "Reading Goal Achieved",
        "message": "Congratulations! You completed your daily goal.",
        "is_read": 0
    }
]
```

---

# Import Order

To satisfy foreign key relationships, import files in this order:

| Order | File |
|------:|------|
| 1 | Authentication Schema (users) |
| 2 | Book Schema (books) |
| 3 | user_preferences.seed.json |
| 4 | user_bookshelves.seed.json |
| 5 | bookshelf_books.seed.json |
| 6 | user_collections.seed.json |
| 7 | collection_books.seed.json |
| 8 | user_bookmarks.seed.json |
| 9 | user_reading_progress.seed.json |
| 10 | user_reading_history.seed.json |
| 11 | user_ratings.seed.json |
| 12 | user_reviews.seed.json |
| 13 | user_comments.seed.json |
| 14 | user_reactions.seed.json |
| 15 | user_notes.seed.json |
| 16 | user_highlights.seed.json |
| 17 | user_notifications.seed.json |
| 18 | user_search_history.seed.json |
| 19 | user_activity_logs.seed.json |
| 20 | user_reports.seed.json |
| 21 | user_recommendations.seed.json |

---

# Import Example (Node.js)

```javascript
import fs from "fs";

const ratings = JSON.parse(
    fs.readFileSync(
        "./seed/user_ratings.seed.json",
        "utf8"
    )
);

console.log(ratings);
```

---

# Import into SQLite

Example workflow:

```text
Read JSON
        │
        ▼
Parse JSON
        │
        ▼
Prepare SQL INSERT
        │
        ▼
Insert Records
        │
        ▼
Commit Transaction
```

---

# Data Validation

Before importing:

- JSON syntax is valid
- Required fields are present
- Foreign keys exist
- Ratings are between 1 and 5
- Dates follow ISO 8601 format
- No duplicate unique records

---

# Recommended Record Counts

| File | Sample Records |
|------|---------------:|
| user_bookmarks | 100 |
| user_ratings | 500 |
| user_reviews | 250 |
| user_comments | 500 |
| user_notes | 300 |
| user_highlights | 600 |
| user_reading_progress | 150 |
| user_reading_history | 1000 |
| user_notifications | 300 |
| user_activity_logs | 5000 |

---

# Environment Usage

| Environment | JSON Seed |
|-------------|-----------|
| Development | ✔ |
| Testing | ✔ |
| Staging | ✔ (anonymized) |
| Production | ✖ (except reference data if required) |

---

# Best Practices

- Use UTF-8 encoding.
- Store one table per JSON file.
- Keep arrays at the root level.
- Use consistent key names.
- Keep sample data realistic.
- Avoid personal or production data.
- Version seed files with Git.
- Validate JSON before importing.
- Keep files modular and easy to maintain.

---

# Future Enhancements

Planned support includes:

- Faker-generated seed data
- Locale-specific datasets
- JSON Schema validation
- Incremental seed updates
- CLI-based seed importer
- Automatic SQL generation
- CSV ↔ JSON conversion
- AI-generated realistic interaction data

---

# Status

**Production Ready**

Supports:

- JSON-based seed files
- SQLite-compatible imports
- Modular data organization
- Development and testing workflows
- Cross-database compatibility
- Node.js integration
- Version-controlled sample datasets