# User Interaction Schema Pagination Guide

## Overview

Pagination is the process of dividing large datasets into smaller, manageable pages. It improves application performance, reduces bandwidth usage, and provides a better user experience.

The **User Interaction Schema** uses pagination for all list-based APIs, including reviews, bookmarks, notes, highlights, reading history, notifications, activity logs, and search results.

---

# Objectives

The pagination system is designed to:

- Improve API performance
- Reduce database load
- Minimize network traffic
- Support infinite scrolling
- Enable efficient browsing
- Scale to millions of records

---

# Pagination Workflow

```text
Client Request
      │
      ▼
Pagination Parameters
      │
      ▼
Validation
      │
      ▼
Database Query
      │
      ▼
Paginated Results
      │
      ▼
JSON Response
```

---

# Supported Pagination Methods

| Method | Recommended | Description |
|---------|:-----------:|-------------|
| Offset Pagination | ✔ | Uses `LIMIT` and `OFFSET` |
| Cursor Pagination | ✔✔ | Uses the last record as a cursor |
| Keyset Pagination | ✔✔ | Uses indexed values for high performance |
| Infinite Scroll | ✔ | Frontend implementation using cursor pagination |

---

# Offset Pagination

SQLite example:

```sql
SELECT *
FROM user_reviews
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

Second page:

```sql
SELECT *
FROM user_reviews
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;
```

Formula:

```text
OFFSET = (page - 1) × limit
```

Example:

| Page | Limit | Offset |
|------|------:|-------:|
| 1 | 20 | 0 |
| 2 | 20 | 20 |
| 3 | 20 | 40 |

---

# Cursor Pagination

Example:

```sql
SELECT *
FROM user_reviews
WHERE review_id > 250
ORDER BY review_id
LIMIT 20;
```

Advantages:

- Faster on large datasets
- Stable during inserts/deletes
- Ideal for infinite scrolling

---

# Keyset Pagination

Example:

```sql
SELECT *
FROM user_activity_logs
WHERE created_at < '2026-07-03 12:00:00'
ORDER BY created_at DESC
LIMIT 20;
```

Best suited for:

- Activity feeds
- Notifications
- Reading history
- Recent reviews

---

# API Parameters

| Parameter | Description | Default |
|-----------|-------------|--------:|
| page | Page number | 1 |
| limit | Records per page | 20 |
| cursor | Cursor token | null |
| sort | Sort field | created_at |
| order | asc / desc | desc |

---

# Example API Requests

Reviews:

```http
GET /api/v1/user-reviews?page=1&limit=20
```

Bookmarks:

```http
GET /api/v1/user-bookmarks?page=2&limit=10
```

Notifications:

```http
GET /api/v1/user-notifications?cursor=450
```

Reading History:

```http
GET /api/v1/user-reading-history?page=3&limit=25
```

---

# JSON Response

```json
{
    "success": true,
    "page": 1,
    "limit": 20,
    "total_records": 560,
    "total_pages": 28,
    "has_next": true,
    "has_previous": false,
    "results": [
        {
            "review_id": 1,
            "title": "Excellent Book"
        }
    ]
}
```

---

# Cursor Response Example

```json
{
    "success": true,
    "next_cursor": 270,
    "has_next": true,
    "results": [
        {
            "review_id": 251
        }
    ]
}
```

---

# Sorting

Recommended sortable fields:

- created_at
- updated_at
- rating
- progress_percentage
- reading_time
- title

Example:

```sql
ORDER BY created_at DESC;
```

---

# Filtering with Pagination

Example:

```sql
SELECT *
FROM user_reviews
WHERE rating >= 4
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

---

# Index Recommendations

Recommended indexes for paginated queries:

```text
idx_user_reviews_created_at
idx_user_reviews_user_created_at
idx_user_reviews_book_created_at

idx_user_notifications_created_at

idx_user_activity_logs_created_at

idx_user_reading_history_started_at
```

Composite indexes are preferred when filtering and sorting together.

---

# Validation Rules

Validate incoming parameters:

| Parameter | Rule |
|-----------|------|
| page | Integer ≥ 1 |
| limit | Integer between 1 and 100 |
| cursor | Valid integer or UUID |
| sort | Allowed column only |
| order | asc or desc |

Example validation:

```javascript
if (limit > 100) {
    limit = 100;
}
```

---

# Performance Tips

- Prefer cursor or keyset pagination for very large tables.
- Always use indexed columns for sorting.
- Avoid large `OFFSET` values on high-volume tables.
- Select only required columns instead of `SELECT *`.
- Cache frequently accessed pages where appropriate.

---

# Error Response

```json
{
    "success": false,
    "message": "Invalid pagination parameters."
}
```

---

# Best Practices

- Use a sensible default page size (20–50 records).
- Limit the maximum page size to prevent abuse.
- Keep response metadata consistent across APIs.
- Combine pagination with filtering and sorting.
- Document supported query parameters.
- Use cursor pagination for real-time feeds.
- Monitor slow pagination queries.

---

# Future Enhancements

Planned improvements include:

- GraphQL cursor connections
- Bidirectional cursor pagination
- Infinite scroll optimization
- Cached pagination
- AI-ranked result pagination
- Adaptive page sizes
- Time-based pagination
- Distributed pagination for sharded databases

---

# Status

**Production Ready**

Supports:

- Offset pagination
- Cursor pagination
- Keyset pagination
- Infinite scrolling
- Filtering and sorting
- Pagination metadata
- SQLite, PostgreSQL, and MySQL compatibility
- High-performance API design