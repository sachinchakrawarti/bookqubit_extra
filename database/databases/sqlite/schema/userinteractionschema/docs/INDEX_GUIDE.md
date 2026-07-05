# User Interaction Schema Index Guide

## Overview

Indexes improve query performance by allowing SQLite to locate rows efficiently without scanning entire tables.

The **User Interaction Schema** contains highly active tables (ratings, reviews, bookmarks, reading history, notifications, etc.), making proper indexing essential for scalability and fast API responses.

---

# Objectives

The indexing strategy aims to:

- Speed up searches
- Optimize JOIN operations
- Improve filtering and sorting
- Support pagination
- Reduce database I/O
- Scale to millions of user interactions

---

# Index Naming Convention

Use the following format:

```text
idx_<table>_<column>
```

Composite indexes:

```text
idx_<table>_<column1>_<column2>
```

Examples:

```text
idx_user_reviews_user
idx_user_reviews_book
idx_user_reviews_book_status
idx_user_bookmarks_user_book
```

---

# Primary Key Indexes

Every table should have a primary key.

Example:

```sql
review_id INTEGER PRIMARY KEY AUTOINCREMENT
```

SQLite automatically creates an index for the primary key.

---

# Unique Indexes

Use unique indexes to prevent duplicate records.

Example:

```sql
CREATE UNIQUE INDEX idx_user_ratings_unique
ON user_ratings(user_id, book_id);
```

Recommended unique indexes:

| Table | Columns |
|--------|---------|
| user_ratings | user_id, book_id |
| user_bookmarks | user_id, book_id |
| user_preferences | user_id |
| bookshelf_books | bookshelf_id, book_id |
| collection_books | collection_id, book_id |

---

# Foreign Key Indexes

Foreign key columns should always be indexed.

Example:

```sql
CREATE INDEX idx_user_reviews_user
ON user_reviews(user_id);

CREATE INDEX idx_user_reviews_book
ON user_reviews(book_id);
```

Recommended foreign key indexes:

- user_id
- book_id
- review_id
- comment_id
- bookshelf_id
- collection_id
- notification_id

---

# Composite Indexes

Composite indexes improve queries filtering on multiple columns.

Example:

```sql
CREATE INDEX idx_user_reviews_book_status
ON user_reviews(book_id, status);
```

Common examples:

```sql
(user_id, created_at)

(book_id, created_at)

(user_id, status)

(book_id, rating)

(user_id, book_id)
```

---

# Date Indexes

Useful for sorting and pagination.

Example:

```sql
CREATE INDEX idx_user_reviews_created_at
ON user_reviews(created_at);
```

Recommended date indexes:

- created_at
- updated_at
- started_at
- finished_at
- viewed_at

---

# Status Indexes

Frequently filtered fields should be indexed.

Example:

```sql
CREATE INDEX idx_user_notifications_status
ON user_notifications(status);
```

Examples:

```text
status
visibility
is_read
is_deleted
is_public
```

---

# Search Indexes

Frequently searched text fields can be indexed.

Example:

```sql
CREATE INDEX idx_user_bookshelves_name
ON user_bookshelves(name);
```

Useful fields:

- name
- title
- keyword
- slug

For full-text search, prefer SQLite FTS5 instead of regular indexes.

---

# Covering Indexes

Indexes containing all columns required by a query can eliminate table lookups.

Example query:

```sql
SELECT rating
FROM user_ratings
WHERE user_id = ?
AND book_id = ?;
```

Index:

```sql
CREATE INDEX idx_user_ratings_user_book_rating
ON user_ratings(user_id, book_id, rating);
```

---

# Partial Indexes

SQLite supports partial indexes.

Example:

```sql
CREATE INDEX idx_unread_notifications
ON user_notifications(user_id)
WHERE is_read = 0;
```

Benefits:

- Smaller index size
- Faster lookups
- Reduced write overhead

---

# Recommended Indexes by Table

## user_bookmarks

```sql
idx_user_bookmarks_user
idx_user_bookmarks_book
idx_user_bookmarks_user_book (UNIQUE)
idx_user_bookmarks_created_at
```

---

## user_ratings

```sql
idx_user_ratings_user
idx_user_ratings_book
idx_user_ratings_user_book (UNIQUE)
idx_user_ratings_created_at
```

---

## user_reviews

```sql
idx_user_reviews_user
idx_user_reviews_book
idx_user_reviews_status
idx_user_reviews_created_at
idx_user_reviews_book_status
```

---

## user_notes

```sql
idx_user_notes_user
idx_user_notes_book
idx_user_notes_created_at
```

---

## user_highlights

```sql
idx_user_highlights_user
idx_user_highlights_book
idx_user_highlights_created_at
```

---

## user_reading_progress

```sql
idx_user_progress_user
idx_user_progress_book
idx_user_progress_user_book (UNIQUE)
```

---

## user_reading_history

```sql
idx_user_history_user
idx_user_history_book
idx_user_history_started_at
idx_user_history_finished_at
```

---

## user_notifications

```sql
idx_notifications_user
idx_notifications_status
idx_notifications_created_at
idx_notifications_user_status
```

---

## user_search_history

```sql
idx_search_user
idx_search_created_at
idx_search_keyword
```

---

## user_activity_logs

```sql
idx_activity_user
idx_activity_type
idx_activity_created_at
idx_activity_user_created_at
```

---

# Query Examples

### Get User Reviews

```sql
SELECT *
FROM user_reviews
WHERE user_id = ?
ORDER BY created_at DESC;
```

Recommended index:

```sql
(user_id, created_at)
```

---

### User Reading Progress

```sql
SELECT *
FROM user_reading_progress
WHERE user_id = ?
AND book_id = ?;
```

Recommended index:

```sql
(user_id, book_id)
```

---

### Recent Notifications

```sql
SELECT *
FROM user_notifications
WHERE user_id = ?
ORDER BY created_at DESC;
```

Recommended index:

```sql
(user_id, created_at)
```

---

# Performance Considerations

Indexes improve:

- SELECT
- JOIN
- ORDER BY
- GROUP BY
- WHERE

Indexes slow down:

- INSERT
- UPDATE
- DELETE

Only create indexes that are frequently used.

---

# Monitoring

Use SQLite tools to inspect indexes:

```sql
.indexes
```

List indexes for a table:

```sql
.indexes user_reviews
```

Query planner:

```sql
EXPLAIN QUERY PLAN
SELECT *
FROM user_reviews
WHERE book_id = 101;
```

---

# Best Practices

- Index all foreign keys.
- Use composite indexes for common query patterns.
- Avoid indexing large TEXT columns.
- Do not create duplicate indexes.
- Prefer unique indexes for business rules.
- Review index usage periodically.
- Remove unused indexes.
- Use FTS5 for full-text search.
- Keep index names descriptive and consistent.

---

# Future Enhancements

Planned improvements include:

- Automatic index recommendations
- Query performance analytics
- Index usage reports
- FTS5 integration for reviews and notes
- Covering index optimization
- Multi-database index compatibility (SQLite, PostgreSQL, MySQL)

---

# Status

**Production Ready**

Supports:

- Primary key indexes
- Unique indexes
- Foreign key indexes
- Composite indexes
- Partial indexes
- Covering indexes
- SQLite query optimization
- High-performance user interaction queries