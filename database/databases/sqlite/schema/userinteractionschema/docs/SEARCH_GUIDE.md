# User Interaction Schema Search Guide

## Overview

The **User Interaction Schema Search Guide** defines how search functionality is implemented across user-generated content and activity within the BookQubit platform.

Search allows users to quickly find:

- Reviews
- Notes
- Highlights
- Bookmarks
- Bookshelves
- Collections
- Reading history
- Notifications
- Search history
- Activity logs

The search system is designed to be fast, scalable, secure, and compatible with SQLite, PostgreSQL, and MySQL.

---

# Objectives

The search system aims to:

- Provide fast search results
- Support keyword-based searches
- Enable filtering and sorting
- Improve API performance
- Scale to millions of user interactions
- Support future AI-powered semantic search

---

# Search Architecture

```text
User
   │
   ▼
Search API
   │
   ▼
Validation
   │
   ▼
Query Builder
   │
   ▼
SQLite / PostgreSQL / MySQL
   │
   ▼
Results
```

---

# Searchable Resources

| Resource | Searchable |
|----------|------------|
| User Reviews | ✔ |
| User Notes | ✔ |
| User Highlights | ✔ |
| User Bookmarks | ✔ |
| Bookshelves | ✔ |
| Collections | ✔ |
| Reading History | ✔ |
| Notifications | ✔ |
| Search History | ✔ |
| Activity Logs | ✔ |

---

# Search Methods

Supported search types:

- Keyword Search
- Prefix Search
- Exact Match
- Partial Match
- Full Text Search (FTS5)
- Filtered Search
- Sorted Search
- Paginated Search

---

# Basic Keyword Search

Example:

```sql
SELECT *
FROM user_reviews
WHERE review LIKE '%adventure%';
```

---

# Exact Match

```sql
SELECT *
FROM user_bookshelves
WHERE name = 'Favorites';
```

---

# Prefix Search

```sql
SELECT *
FROM user_notes
WHERE title LIKE 'Java%';
```

---

# Partial Match

```sql
SELECT *
FROM user_reviews
WHERE review LIKE '%history%';
```

---

# Full-Text Search (FTS5)

SQLite FTS5 is recommended for searching large text fields.

Example:

```sql
SELECT *
FROM user_reviews_fts
WHERE user_reviews_fts MATCH 'science';
```

Recommended FTS tables:

- user_reviews
- user_notes
- user_highlights

---

# Filtering

Example:

```sql
SELECT *
FROM user_reviews
WHERE rating >= 4
AND status = 'published';
```

---

# Sorting

Newest first:

```sql
ORDER BY created_at DESC;
```

Highest rated:

```sql
ORDER BY rating DESC;
```

Alphabetically:

```sql
ORDER BY title ASC;
```

---

# Pagination

Example:

```sql
SELECT *
FROM user_reviews
LIMIT 20 OFFSET 0;
```

API example:

```http
GET /reviews?page=1&limit=20
```

---

# Search by User

```sql
SELECT *
FROM user_reviews
WHERE user_id = 10;
```

---

# Search by Book

```sql
SELECT *
FROM user_reviews
WHERE book_id = 101;
```

---

# Date Range Search

```sql
SELECT *
FROM user_activity_logs
WHERE created_at
BETWEEN '2026-01-01'
AND '2026-12-31';
```

---

# Multi-Field Search

```sql
SELECT *
FROM user_reviews
WHERE title LIKE '%java%'
OR review LIKE '%java%';
```

---

# Search API Examples

Search reviews:

```http
GET /api/v1/reviews/search?q=history
```

Search notes:

```http
GET /api/v1/notes/search?q=algorithm
```

Search bookshelves:

```http
GET /api/v1/bookshelves/search?q=favorites
```

---

# Query Parameters

| Parameter | Description |
|-----------|-------------|
| q | Search keyword |
| page | Page number |
| limit | Results per page |
| sort | Sort field |
| order | asc / desc |
| status | Filter by status |
| user_id | Filter by user |
| book_id | Filter by book |
| from | Start date |
| to | End date |

Example:

```http
GET /reviews/search?q=science&page=1&limit=20&sort=created_at&order=desc
```

---

# Search Response

```json
{
    "success": true,
    "page": 1,
    "limit": 20,
    "total": 135,
    "results": [
        {
            "review_id": 1,
            "title": "Excellent Book"
        }
    ]
}
```

---

# Index Recommendations

Frequently searched columns should be indexed.

Recommended indexes:

```text
idx_user_reviews_title
idx_user_reviews_created_at
idx_user_reviews_user
idx_user_reviews_book

idx_user_notes_title
idx_user_notes_user

idx_user_bookshelves_name

idx_user_notifications_status
```

Use **FTS5** instead of normal indexes for long text fields.

---

# Performance Tips

- Index searchable columns.
- Limit returned fields when possible.
- Use pagination.
- Avoid `SELECT *` in production APIs.
- Prefer FTS5 for long text searches.
- Cache frequently used search results.

---

# Security

Search APIs should:

- Validate input.
- Prevent SQL injection using prepared statements.
- Limit maximum page size.
- Escape wildcard characters when needed.
- Enforce user permissions before returning data.

---

# Best Practices

- Keep search queries simple and efficient.
- Combine filtering with pagination.
- Use descriptive endpoint names.
- Return consistent response formats.
- Document searchable fields.
- Monitor slow queries.
- Regularly optimize indexes.

---

# Future Enhancements

Planned search features include:

- AI semantic search
- Natural language search
- Voice search
- Typo tolerance (fuzzy search)
- Search suggestions
- Trending searches
- Saved searches
- Search analytics
- Personalized ranking
- Multi-language search

---

# Status

**Production Ready**

Supports:

- Keyword search
- Exact and partial matching
- Prefix search
- Filtering and sorting
- Pagination
- Full-text search (FTS5)
- Secure API integration
- SQLite, PostgreSQL, and MySQL compatibility
```