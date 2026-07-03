# User Interaction Schema Data Types

## Overview

This document defines the **standard data types** used across the User Interaction Schema in BookQubit.

It ensures:

- Consistent database design
- SQLite compatibility
- API predictability
- Cross-schema alignment
- Future scalability

---

# SQLite Core Data Types

SQLite uses dynamic typing, but we standardize the following types.

| Type | Usage |
|------|------|
| INTEGER | IDs, counts, flags |
| TEXT | Strings, JSON, UUID |
| REAL | Decimals, percentages, ratings |
| BLOB | Binary data (rare) |
| NULL | Missing values |

---

# Primary Data Types

## INTEGER

Used for:

- Primary keys
- Foreign keys
- Counts
- Flags (0/1)

Example:

```sql
user_id INTEGER
book_id INTEGER
rating INTEGER
```

---

## TEXT

Used for:

- Names
- Descriptions
- UUIDs
- JSON strings
- Slugs
- Tags

Example:

```sql
title TEXT
description TEXT
uuid TEXT
slug TEXT
```

---

## REAL

Used for:

- Ratings
- Progress percentage
- Scores
- Analytics metrics

Example:

```sql
rating REAL
progress_percentage REAL
relevance_score REAL
```

---

## BOOLEAN (Stored as INTEGER)

SQLite does not have a native BOOLEAN type.

Convention:

| Value | Meaning |
|------|--------|
| 0 | false |
| 1 | true |

Example:

```sql
is_verified INTEGER DEFAULT 0
is_deleted INTEGER DEFAULT 0
is_read INTEGER DEFAULT 0
```

---

## DATETIME (Stored as TEXT)

All timestamps are stored in ISO 8601 format.

Format:

```text
YYYY-MM-DD HH:MM:SS
```

Example:

```text
2026-07-03 10:45:12
```

Fields:

- created_at
- updated_at
- deleted_at
- started_at
- finished_at
- viewed_at

---

# UUID Type

Stored as TEXT.

Format:

```text
550e8400-e29b-41d4-a716-446655440000
```

Usage:

- External identifiers
- API-safe IDs
- Sync across systems

---

# JSON Type (Stored as TEXT)

SQLite stores JSON as TEXT but can be queried using JSON1 extension.

Used for:

- Preferences
- Filters
- Activity metadata
- Notification payloads
- Search filters

Example:

```json
{
  "theme": "dark",
  "font_size": 16,
  "language": "en"
}
```

---

# Status Type (TEXT ENUM)

Used for workflow states.

Common values:

```text
active
inactive
draft
published
archived
blocked
deleted
pending
approved
rejected
reported
```

Example:

```sql
status TEXT DEFAULT 'active'
```

---

# Rating Type

Used in user_ratings.

```text
INTEGER OR REAL
```

Rules:

- Minimum: 1
- Maximum: 5

Example:

```sql
CHECK(rating BETWEEN 1 AND 5)
```

---

# Percentage Type

Stored as REAL.

Range:

```text
0.0 → 100.0
```

Example:

```sql
progress_percentage REAL
```

---

# Counter Type

Used for analytics fields.

Type:

```sql
INTEGER
```

Examples:

```sql
view_count INTEGER DEFAULT 0
like_count INTEGER DEFAULT 0
comment_count INTEGER DEFAULT 0
bookmark_count INTEGER DEFAULT 0
```

---

# Boolean Flags

Stored as INTEGER (0/1)

Common flags:

```sql
is_public
is_private
is_verified
is_featured
is_deleted
is_spoiler
is_read
is_completed
is_synced
```

---

# Foreign Key Type

Always INTEGER (recommended).

Example:

```sql
user_id INTEGER
book_id INTEGER
review_id INTEGER
```

Constraint:

```sql
FOREIGN KEY(user_id) REFERENCES users(user_id)
```

---

# Composite Types (Logical)

Not real SQL types, but logical groupings:

## Interaction Object

```json
{
  "user_id": 1,
  "book_id": 101,
  "rating": 5,
  "review": "Excellent book!"
}
```

---

## Activity Object

```json
{
  "user_id": 1,
  "activity_type": "read",
  "book_id": 101,
  "metadata": {
    "page": 120
  }
}
```

---

# Index-Friendly Types

Best for indexing:

- INTEGER (IDs)
- TEXT (slugs, UUIDs)
- DATETIME (timestamps)
- STATUS fields

Avoid indexing:

- Large TEXT (reviews, notes)
- JSON blobs
- Long descriptions

---

# Type Conversion Rules

## Boolean Conversion

```text
true  → 1
false → 0
```

---

## Date Conversion

Always store as UTC:

```text
2026-07-03 10:45:00
```

---

## JSON Storage

Always stringify before storing:

```js
JSON.stringify(data)
```

Parse when reading:

```js
JSON.parse(data)
```

---

# Performance Notes

- Use INTEGER for all IDs (fastest joins)
- Use TEXT only when necessary
- Avoid large BLOB usage
- Normalize repeated structures
- Use indexes on:
  - user_id
  - book_id
  - created_at
  - status

---

# Best Practices

- Keep types consistent across all tables
- Avoid mixing INTEGER and TEXT for IDs
- Always use ISO datetime format
- Use CHECK constraints for validation
- Store JSON only when relational modeling is not possible
- Prefer normalization over duplication
- Keep schema AI-ready and analytics-friendly

---

# Summary

| Type | Usage |
|------|------|
| INTEGER | IDs, flags, counters |
| TEXT | strings, JSON, UUID |
| REAL | ratings, percentages |
| DATETIME | timestamps (TEXT format) |
| BOOLEAN | 0/1 integers |
| JSON | flexible metadata |

---

# Status

This type system is:

✔ SQLite optimized  
✔ API ready  
✔ AI compatible  
✔ Scalable  
✔ Production safe  