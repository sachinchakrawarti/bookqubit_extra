# User Interaction Schema View Guide

## Overview

Database **Views** are virtual tables created from one or more SQL queries. They simplify complex queries, improve code reusability, provide a consistent API layer, and enhance security by exposing only the required data.

The **User Interaction Schema** uses views to present commonly accessed user interaction data without duplicating information.

---

# Objectives

Views are designed to:

- Simplify complex queries
- Improve API readability
- Reduce repeated SQL
- Encapsulate business logic
- Provide read-only datasets
- Support analytics and reporting

---

# Directory Structure

```text
userinteractionschema/
│
├── user_bookmarks/
│   └── user_bookmarks.view.sql
│
├── user_reviews/
│   └── user_reviews.view.sql
│
├── user_ratings/
│   └── user_ratings.view.sql
│
├── user_reading_progress/
│   └── user_reading_progress.view.sql
│
├── user_notifications/
│   └── user_notifications.view.sql
│
└── docs/
    └── VIEW_GUIDE.md
```

---

# Naming Convention

Use the following format:

```text
v_<table_name>_<purpose>
```

Examples:

```text
v_user_reviews_recent
v_user_reviews_public
v_user_bookmarks_active
v_user_reading_current
v_user_notifications_unread
```

---

# View Categories

| Category | Purpose |
|----------|---------|
| Public | Public-facing data |
| Active | Active records only |
| Recent | Recently created records |
| Analytics | Reporting and dashboards |
| Search | Optimized search results |
| Statistics | Aggregated metrics |
| Admin | Administrative reports |

---

# Example View

## Public Reviews

```sql
CREATE VIEW v_user_reviews_public AS
SELECT
    review_id,
    user_id,
    book_id,
    title,
    review,
    rating,
    created_at
FROM user_reviews
WHERE status = 'published';
```

---

# Recent Reviews

```sql
CREATE VIEW v_user_reviews_recent AS
SELECT *
FROM user_reviews
ORDER BY created_at DESC;
```

---

# Active Bookmarks

```sql
CREATE VIEW v_user_bookmarks_active AS
SELECT *
FROM user_bookmarks
WHERE is_deleted = 0;
```

---

# Current Reading

```sql
CREATE VIEW v_user_reading_current AS
SELECT *
FROM user_reading_progress
WHERE progress_percentage < 100;
```

---

# Completed Books

```sql
CREATE VIEW v_user_reading_completed AS
SELECT *
FROM user_reading_progress
WHERE progress_percentage = 100;
```

---

# Unread Notifications

```sql
CREATE VIEW v_user_notifications_unread AS
SELECT *
FROM user_notifications
WHERE is_read = 0;
```

---

# Highly Rated Books

```sql
CREATE VIEW v_books_highly_rated AS
SELECT
    book_id,
    AVG(rating) AS average_rating,
    COUNT(*) AS rating_count
FROM user_ratings
GROUP BY book_id
HAVING AVG(rating) >= 4.5;
```

---

# User Statistics

```sql
CREATE VIEW v_user_statistics AS
SELECT
    user_id,
    COUNT(DISTINCT book_id) AS books_read,
    COUNT(review_id) AS reviews_written,
    COUNT(DISTINCT bookmark_id) AS bookmarks_created
FROM user_bookmarks
LEFT JOIN user_reviews USING(user_id)
GROUP BY user_id;
```

---

# Reading Activity

```sql
CREATE VIEW v_user_reading_activity AS
SELECT
    user_id,
    book_id,
    started_at,
    finished_at,
    reading_time
FROM user_reading_history;
```

---

# Search View

```sql
CREATE VIEW v_user_reviews_search AS
SELECT
    review_id,
    title,
    review,
    rating
FROM user_reviews
WHERE status = 'published';
```

---

# Analytics View

```sql
CREATE VIEW v_book_review_summary AS
SELECT
    book_id,
    COUNT(*) AS total_reviews,
    AVG(rating) AS average_rating
FROM user_reviews
GROUP BY book_id;
```

---

# API Usage

Views simplify backend queries.

Instead of:

```sql
SELECT *
FROM user_reviews
WHERE status = 'published'
ORDER BY created_at DESC;
```

Use:

```sql
SELECT *
FROM v_user_reviews_public;
```

---

# Read-Only Nature

Views are generally treated as read-only.

Recommended operations:

```sql
SELECT
```

Avoid:

```sql
INSERT
UPDATE
DELETE
```

Perform modifications on the underlying base tables instead.

---

# Performance

Views do **not** store data. They execute the underlying query each time they are accessed.

To improve performance:

- Index the underlying tables.
- Keep view queries simple.
- Avoid unnecessary joins.
- Use materialized tables (where supported) for heavy analytics.

---

# Security

Views can expose only approved columns.

Example:

```sql
CREATE VIEW v_public_reviews AS
SELECT
    review_id,
    book_id,
    title,
    review,
    rating
FROM user_reviews;
```

Sensitive fields such as internal moderation notes or user email addresses remain hidden.

---

# Best Practices

- Prefix all views with `v_`.
- Create views for commonly reused queries.
- Keep views focused on a single purpose.
- Document each view.
- Use descriptive names.
- Avoid nested views when possible.
- Index columns used in view filters and joins.
- Test view performance on large datasets.

---

# Future Views

Planned views include:

- `v_user_reading_streaks`
- `v_user_top_reviewers`
- `v_user_most_active`
- `v_book_popularity`
- `v_book_trending`
- `v_book_recommendations`
- `v_notification_queue`
- `v_user_engagement`
- `v_ai_recommendation_scores`
- `v_monthly_reading_statistics`

---

# Status

**Production Ready**

Supports:

- Public views
- Active record views
- Search views
- Analytics views
- Statistics views
- API-friendly queries
- Read-only reporting
- SQLite-compatible implementations