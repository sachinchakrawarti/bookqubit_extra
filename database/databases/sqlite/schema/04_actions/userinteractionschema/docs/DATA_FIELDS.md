# User Interaction Schema Data Fields

## Overview

This document describes the standard data fields used throughout the **User Interaction Schema**.

The goal is to maintain:

- Consistent naming
- Standardized data types
- Easy maintenance
- Better API integration
- Cross-table compatibility

---

# Field Naming Convention

| Type | Format | Example |
|------|---------|----------|
| Primary Key | `<table>_id` | review_id |
| Foreign Key | `<entity>_id` | user_id |
| UUID | uuid | uuid |
| Boolean | is_* | is_public |
| Date | *_at | created_at |
| Status | status | published |
| Counter | *_count | like_count |
| Percentage | percentage | progress_percentage |

---

# Common Primary Fields

## ID

| Field | Type | Description |
|---------|------|-------------|
| id | INTEGER | Auto Increment Primary Key |

Example

```sql
rating_id INTEGER PRIMARY KEY AUTOINCREMENT
```

---

## UUID

Unique identifier.

```sql
uuid TEXT NOT NULL UNIQUE
```

Example

```text
d83b89aa-d4f8-41d7-9234-a8efcb9d9b65
```

---

# User Fields

## user_id

Links to Authentication Schema.

```sql
user_id INTEGER NOT NULL
```

Referenced Table

```text
users
```

---

# Book Fields

## book_id

Links to Book Schema.

```sql
book_id INTEGER NOT NULL
```

Referenced Table

```text
books
```

---

# Reading Fields

## current_page

Current reading page.

```sql
INTEGER
```

Example

```text
125
```

---

## total_pages

Total pages.

```sql
INTEGER
```

---

## progress_percentage

Reading completion percentage.

```sql
REAL
```

Example

```text
72.5
```

---

## reading_time

Minutes spent reading.

```sql
INTEGER
```

Example

```text
540
```

---

## started_at

Reading started.

```sql
DATETIME
```

---

## finished_at

Reading completed.

```sql
DATETIME
```

---

# Rating Fields

## rating

User rating.

```sql
INTEGER
```

Allowed values

```text
1
2
3
4
5
```

---

## average_rating

Book average.

```sql
REAL
```

Example

```text
4.73
```

---

# Review Fields

## title

Review title.

```sql
TEXT
```

---

## review

Full review.

```sql
TEXT
```

---

## spoiler

Spoiler warning.

```sql
BOOLEAN
```

---

## helpful_count

Helpful votes.

```sql
INTEGER
```

---

# Bookmark Fields

## bookmark_type

Examples

- Favorite
- Wishlist
- Read Later

```sql
TEXT
```

---

# Highlight Fields

## selected_text

Highlighted content.

```sql
TEXT
```

---

## color

Highlight color.

```sql
TEXT
```

Examples

```text
yellow
green
blue
pink
orange
```

---

## location_start

Start position.

```sql
INTEGER
```

---

## location_end

End position.

```sql
INTEGER
```

---

# Notes

## note

User note.

```sql
TEXT
```

---

## note_type

Examples

```text
Personal
Quote
Reference
Idea
```

---

# Search Fields

## keyword

Search keyword.

```sql
TEXT
```

---

## search_filter

Applied filters.

```sql
TEXT
```

JSON example

```json
{
  "language":"en",
  "rating":4,
  "category":"Science"
}
```

---

# Notification Fields

## title

Notification title.

```sql
TEXT
```

---

## message

Notification body.

```sql
TEXT
```

---

## notification_type

Examples

```text
system
promotion
reading
review
achievement
```

---

## is_read

Read status.

```sql
BOOLEAN
```

---

# Collection Fields

## name

Collection name.

```sql
TEXT
```

---

## description

Collection description.

```sql
TEXT
```

---

## visibility

Allowed values

```text
public
private
unlisted
friends
```

---

# Bookshelf Fields

## shelf_name

Examples

```text
Favorites
Reading Now
Want to Read
Completed
```

---

# Reaction Fields

## reaction

Examples

```text
like
love
laugh
wow
sad
angry
```

---

## target_type

Examples

```text
book
review
comment
note
highlight
```

---

## target_id

Target object ID.

```sql
INTEGER
```

---

# Activity Fields

## activity_type

Examples

```text
login
logout
search
read
bookmark
download
review
rating
```

---

## activity_data

Stores metadata.

```sql
TEXT
```

JSON example

```json
{
  "page":125,
  "device":"Android"
}
```

---

# Device Fields

## device_name

Example

```text
Samsung Galaxy S24
```

---

## platform

Examples

```text
Android
iOS
Windows
macOS
Linux
Web
```

---

## app_version

Example

```text
2.5.1
```

---

# Status Fields

## status

Common values

```text
active
inactive
draft
published
archived
deleted
blocked
reported
pending
approved
rejected
```

---

# Boolean Fields

Common fields

```text
is_public
is_private
is_deleted
is_verified
is_featured
is_spam
is_spoiler
is_read
is_completed
is_synced
```

---

# Counter Fields

Examples

```text
view_count
like_count
comment_count
share_count
download_count
bookmark_count
review_count
rating_count
reading_count
```

---

# Date Fields

Standard timestamps.

| Field | Purpose |
|---------|----------|
| created_at | Record created |
| updated_at | Last updated |
| deleted_at | Soft delete |
| viewed_at | Viewed |
| downloaded_at | Downloaded |
| started_at | Started |
| finished_at | Completed |
| published_at | Published |

---

# Audit Fields

Recommended for all tables.

| Field | Type |
|---------|------|
| created_by | INTEGER |
| updated_by | INTEGER |
| deleted_by | INTEGER |

---

# JSON Fields

Some tables may store structured metadata.

Examples

```sql
preferences
settings
filters
activity_data
notification_payload
```

---

# Standard Constraints

Recommended

```text
NOT NULL
UNIQUE
CHECK
FOREIGN KEY
DEFAULT
```

Example

```sql
rating INTEGER CHECK(rating BETWEEN 1 AND 5)
```

---

# Reserved Field Names

Avoid using

```text
user
group
index
table
select
where
order
limit
key
```

---

# Best Practices

- Use `snake_case` for all field names.
- Keep field names descriptive and consistent.
- Use foreign keys for relationships.
- Store timestamps in UTC.
- Use `INTEGER` for IDs in SQLite.
- Use `TEXT` for UUIDs.
- Validate numeric ranges with `CHECK` constraints.
- Prefer JSON only for flexible metadata, not relational data.
- Add indexes to frequently searched fields.
- Maintain consistency across all interaction tables.