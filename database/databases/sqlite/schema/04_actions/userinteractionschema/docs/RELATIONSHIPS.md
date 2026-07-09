# User Interaction Schema Relationships

## Overview

The **User Interaction Schema** defines how users interact with books and with other platform resources. It relies on foreign key relationships with the Authentication Schema and Book Schema while maintaining a normalized, scalable design.

---

# Primary Relationships

```text
Authentication Schema
        │
        │
        ▼
      Users
        │
        │
        ├───────────────────────────────────────────────┐
        │                                               │
        ▼                                               ▼
User Interaction Schema                          Book Schema
        │                                               │
        │                                               │
        └──────────────────────────────┬────────────────┘
                                       │
                                       ▼
                              User ↔ Book Interactions
```

---

# Schema Dependencies

| Schema | Dependency | Required |
|---------|------------|----------|
| Authentication Schema | Users | Yes |
| Book Schema | Books | Yes |
| Language Schema | Optional localization | Optional |
| Geography Schema | Regional preferences | Optional |
| Notification Schema | User notifications | Optional |
| Analytics Schema | Event tracking | Optional |

---

# User Relationships

One user can perform many interactions.

```text
Users
-----
user_id (PK)

      │
      │ 1
      │
      │ N

┌────────────────────────────────────────────────────────────┐
│                                                            │
▼                                                            ▼

Bookmarks
Ratings
Reviews
Notes
Highlights
Reading Progress
Reading History
Bookshelves
Collections
Notifications
Preferences
Activity Logs
Search History
```

---

# Book Relationships

One book can receive interactions from many users.

```text
Books
-----
book_id (PK)

      │
      │ 1
      │
      │ N

Bookmarks
Ratings
Reviews
Notes
Highlights
Reading Progress
Reading History
Collection Books
Bookshelf Books
Recommendations
```

---

# Reading Progress

```text
Users
-----
user_id
      │
      │
      ▼

user_reading_progress
----------------------
progress_id
user_id (FK)
book_id (FK)

      ▲
      │
Books
-----
book_id
```

Relationship

- User → Reading Progress = One-to-Many
- Book → Reading Progress = One-to-Many

---

# Ratings

```text
Users
   │
   ▼

user_ratings

   ▲
   │

Books
```

Relationship

- One User → Many Ratings
- One Book → Many Ratings

Recommended Constraint

One rating per user per book.

```text
UNIQUE(user_id, book_id)
```

---

# Reviews

```text
Users
   │
   ▼

user_reviews

   ▲
   │

Books
```

Relationship

- One User → Many Reviews
- One Book → Many Reviews

Recommended Constraint

One review per user per book.

```text
UNIQUE(user_id, book_id)
```

---

# Bookmarks

```text
Users
   │
   ▼

user_bookmarks

   ▲
   │

Books
```

Relationship

One bookmark per user per book.

```text
UNIQUE(user_id, book_id)
```

---

# Notes

```text
Users
   │
   ▼

user_notes

   ▲
   │

Books
```

Relationship

- One User → Many Notes
- One Book → Many Notes

Users may create multiple notes for the same book.

---

# Highlights

```text
Users
   │
   ▼

user_highlights

   ▲
   │

Books
```

Relationship

Users can highlight multiple passages in a book.

---

# Reading History

```text
Users
   │
   ▼

user_reading_history

   ▲
   │

Books
```

Multiple sessions may exist for one book.

---

# Bookshelves

```text
Users
   │
   ▼

user_bookshelves
-----------------
bookshelf_id

      │
      │
      ▼

bookshelf_books
----------------
bookshelf_id
book_id

      │
      ▼

Books
```

Relationship

- User → Many Bookshelves
- Bookshelf → Many Books
- Book → Many Bookshelves

Many-to-Many

---

# Collections

```text
Users
   │
   ▼

user_collections
----------------
collection_id

      │
      ▼

collection_books
----------------
collection_id
book_id

      │
      ▼

Books
```

Relationship

Many-to-Many

---

# Comments

```text
Users
   │
   ▼

user_comments

   │
   ▼

user_reviews
```

Relationship

- One Review → Many Comments
- One User → Many Comments

---

# Reactions

```text
Users
   │
   ▼

user_reactions

Target Type

Book
Review
Comment
Highlight
```

Supports polymorphic relationships.

---

# Notifications

```text
Users
   │
   ▼

user_notifications
```

Each notification belongs to one user.

---

# Preferences

```text
Users
   │
   ▼

user_preferences
```

Recommended

One preferences record per user.

```text
UNIQUE(user_id)
```

---

# Search History

```text
Users
   │
   ▼

user_search_history
```

One user can perform unlimited searches.

---

# Activity Logs

```text
Users
   │
   ▼

user_activity_logs
```

Tracks

- Login
- Logout
- Review
- Bookmark
- Download
- Reading
- Search
- Purchase

---

# Recommendations

```text
Users
   │
   ▼

user_recommendations

   ▲
   │

Books
```

Stores personalized recommendations generated by AI or recommendation engines.

---

# Relationship Summary

| Parent | Child | Type |
|---------|-------|------|
| Users | Bookmarks | 1:N |
| Users | Ratings | 1:N |
| Users | Reviews | 1:N |
| Users | Notes | 1:N |
| Users | Highlights | 1:N |
| Users | Reading Progress | 1:N |
| Users | Reading History | 1:N |
| Users | Bookshelves | 1:N |
| Users | Collections | 1:N |
| Users | Notifications | 1:N |
| Users | Preferences | 1:1 |
| Users | Activity Logs | 1:N |
| Users | Search History | 1:N |
| Books | Ratings | 1:N |
| Books | Reviews | 1:N |
| Books | Bookmarks | 1:N |
| Books | Notes | 1:N |
| Books | Highlights | 1:N |
| Books | Reading Progress | 1:N |
| Books | Reading History | 1:N |
| Bookshelves | Books | M:N |
| Collections | Books | M:N |
| Reviews | Comments | 1:N |
| Comments | Reactions | 1:N |

---

# Foreign Keys

| Child Table | Foreign Key | Parent Table |
|--------------|-------------|--------------|
| user_bookmarks | user_id | users |
| user_bookmarks | book_id | books |
| user_ratings | user_id | users |
| user_ratings | book_id | books |
| user_reviews | user_id | users |
| user_reviews | book_id | books |
| user_notes | user_id | users |
| user_notes | book_id | books |
| user_highlights | user_id | users |
| user_highlights | book_id | books |
| user_reading_progress | user_id | users |
| user_reading_progress | book_id | books |
| user_reading_history | user_id | users |
| user_reading_history | book_id | books |
| bookshelf_books | bookshelf_id | user_bookshelves |
| bookshelf_books | book_id | books |
| collection_books | collection_id | user_collections |
| collection_books | book_id | books |
| user_comments | review_id | user_reviews |
| user_notifications | user_id | users |
| user_preferences | user_id | users |
| user_search_history | user_id | users |
| user_activity_logs | user_id | users |

---

# Design Principles

- Third Normal Form (3NF)
- Referential integrity through foreign keys
- One source of truth for users and books
- Support for one-to-one, one-to-many, and many-to-many relationships
- Unique constraints to prevent duplicate ratings, reviews, and bookmarks
- Scalable architecture for millions of interactions
- Compatible with AI recommendation systems, analytics, and future social features