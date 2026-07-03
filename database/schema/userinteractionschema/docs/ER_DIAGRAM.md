# Entity Relationship Diagram (ER Diagram)

## Overview

The **User Interaction Schema** records all interactions between users and books within the BookQubit platform.

It is built around three core entities:

- Users
- Books
- User Interactions

This modular design allows unlimited user engagement while keeping the database normalized and highly scalable.

---

# High-Level Architecture

```text
                    +----------------+
                    |     USERS      |
                    +----------------+
                           |
                           | 1
                           |
                           | N
        -------------------------------------------------------------
        |        |         |        |        |         |             |
        ▼        ▼         ▼        ▼        ▼         ▼             ▼

+------------+ +------------+ +------------+ +------------+ +------------+
| Bookmarks  | |  Ratings   | |  Reviews   | |   Notes    | | Highlights |
+------------+ +------------+ +------------+ +------------+ +------------+
        |             |              |              |              |
        |             |              |              |              |
        +-------------+--------------+--------------+--------------+
                                      |
                                      |
                                      ▼
                              +---------------+
                              |     BOOKS     |
                              +---------------+
```

---

# Complete ER Diagram

```text
                                 USERS
                          -------------------
                          user_id (PK)
                          username
                          email
                          ...
                               │
                               │
          ─────────────────────┼───────────────────────────
                               │
                               │
     ┌──────────────┬──────────┼───────────┬──────────────┐
     │              │          │           │              │
     ▼              ▼          ▼           ▼              ▼

BOOKMARKS      RATINGS     REVIEWS     NOTES      HIGHLIGHTS
----------     --------     -------     ------     ----------
bookmark_id    rating_id    review_id   note_id    highlight_id
user_id (FK)   user_id      user_id     user_id    user_id
book_id (FK)   book_id      book_id     book_id    book_id
               rating       review      note       selected_text
                                           │
                                           │
                                           ▼

                                  READING_PROGRESS
                                  -----------------
                                  progress_id
                                  user_id
                                  book_id
                                  current_page
                                  percentage
                                  reading_time

                                           │
                                           │
                                           ▼

                                  READING_HISTORY
                                  ----------------
                                  history_id
                                  user_id
                                  book_id
                                  opened_at
                                  finished_at

                                           │
                                           │
                                           ▼

                                  BOOKSHELF_BOOKS
                                  ----------------
                                  bookshelf_id
                                  book_id

                                           ▲
                                           │
                                  USER_BOOKSHELVES
                                  ----------------
                                  bookshelf_id
                                  user_id
                                  name
                                  visibility

                                           │
                                           │
                                           ▼

                                USER_COLLECTIONS
                                -----------------
                                collection_id
                                user_id
                                name

                                           │
                                           │
                                           ▼

                                COLLECTION_BOOKS
                                ----------------
                                collection_id
                                book_id
```

---

# Relationship with Books Schema

```text
                BOOKS
        ---------------------
        book_id (PK)
        title
        slug
        language
        ...

              ▲
              │
              │ 1
              │
              │ N

 ┌────────────┼───────────────────────────────────────────┐
 │            │           │          │         │           │
 ▼            ▼           ▼          ▼         ▼           ▼

Bookmarks   Ratings   Reviews    Notes   Progress   Reading History
```

---

# Relationship with Authentication Schema

```text
                 USERS
        ----------------------
        user_id (PK)
        username
        email
        ...

              ▲
              │
              │
              │
 ┌────────────┼────────────────────────────────────────────┐
 │            │            │            │                  │
 ▼            ▼            ▼            ▼                  ▼

Bookmarks   Reviews     Ratings     Notes          Notifications
```

---

# Many-to-Many Relationships

## User ↔ Books

One user can interact with many books.

One book can have interactions from many users.

```text
Users
  │
  │
  ▼

User Interactions

  │
  │
  ▼

Books
```

---

## Bookshelf ↔ Books

```text
User Bookshelves
        │
        │
        ▼

Bookshelf Books

        │
        │
        ▼

Books
```

---

## Collection ↔ Books

```text
Collections
      │
      │
      ▼

Collection Books

      │
      │
      ▼

Books
```

---

# Entity Summary

| Entity | Primary Key | Purpose |
|----------|-------------|----------|
| Users | user_id | Platform users |
| Books | book_id | Books catalog |
| User Bookmarks | bookmark_id | Saved books |
| User Ratings | rating_id | Book ratings |
| User Reviews | review_id | Written reviews |
| User Notes | note_id | Personal notes |
| User Highlights | highlight_id | Highlighted text |
| Reading Progress | progress_id | Current reading position |
| Reading History | history_id | Reading activity |
| User Bookshelves | bookshelf_id | User shelves |
| Bookshelf Books | bookshelf_book_id | Books inside shelves |
| User Collections | collection_id | User collections |
| Collection Books | collection_book_id | Books inside collections |
| User Notifications | notification_id | Notifications |
| User Preferences | preference_id | User settings |
| User Activity Logs | activity_id | Audit and analytics |

---

# Cardinality

| Relationship | Cardinality |
|--------------|-------------|
| User → Bookmarks | One-to-Many |
| User → Ratings | One-to-Many |
| User → Reviews | One-to-Many |
| User → Notes | One-to-Many |
| User → Highlights | One-to-Many |
| User → Reading Progress | One-to-Many |
| User → Reading History | One-to-Many |
| User → Bookshelves | One-to-Many |
| Bookshelf → Books | Many-to-Many |
| Collection → Books | Many-to-Many |
| Book → Reviews | One-to-Many |
| Book → Ratings | One-to-Many |
| Book → Bookmarks | One-to-Many |

---

# Design Principles

- Fully normalized (3NF)
- Foreign key integrity
- Soft delete support
- UUID-ready architecture
- Optimized for high-volume user interactions
- Designed for horizontal scalability
- AI-ready for recommendation and personalization engines
- Supports future social features, reading clubs, and gamification

---

# Future Expansion

The ER model can be extended with:

- Reading Challenges
- Reading Streaks
- Achievement Badges
- Community Discussions
- Book Clubs
- Friend System
- Shared Bookshelves
- AI Reading Assistant
- Reading Goals
- Voice Notes
- Annotation Threads
- Live Reading Sessions
- Recommendation Feedback
- User Interests
- Personalized Learning Paths