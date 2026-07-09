# User Interaction Schema Tables

## Overview

The **User Interaction Schema** contains all tables related to user engagement, reading activity, personalization, and social interactions within the BookQubit platform.

These tables are independent of the core book catalog and are linked primarily through **Users** and **Books**.

---

# Schema Summary

| Category | Tables |
|----------|--------|
| Reading | 4 |
| Reviews | 4 |
| Personal Library | 6 |
| Personalization | 4 |
| Analytics | 5 |
| Social | 6 |
| System | 5 |
| **Total** | **34+ Tables** |

---

# Reading Tables

## user_reading_progress

Tracks the current reading progress of a user.

| Column | Type | Description |
|---------|------|-------------|
| progress_id | INTEGER | Primary Key |
| user_id | INTEGER | User |
| book_id | INTEGER | Book |
| current_page | INTEGER | Current page |
| percentage | REAL | Reading progress |
| reading_time | INTEGER | Minutes read |
| started_at | DATETIME | Started reading |
| updated_at | DATETIME | Last update |

---

## user_reading_history

Stores reading sessions.

| Column | Type |
|---------|------|
| history_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| opened_at | DATETIME |
| closed_at | DATETIME |
| duration | INTEGER |

---

## user_recently_viewed

Recently viewed books.

| Column | Type |
|---------|------|
| viewed_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| viewed_at | DATETIME |

---

## user_downloads

Downloaded books.

| Column | Type |
|---------|------|
| download_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| downloaded_at | DATETIME |

---

# Review Tables

## user_ratings

Book ratings.

| Column | Type |
|---------|------|
| rating_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| rating | INTEGER |
| created_at | DATETIME |

---

## user_reviews

Written reviews.

| Column | Type |
|---------|------|
| review_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| review | TEXT |
| rating | INTEGER |
| status | TEXT |

---

## user_comments

Comments on reviews.

| Column | Type |
|---------|------|
| comment_id | INTEGER |
| review_id | INTEGER |
| user_id | INTEGER |
| comment | TEXT |

---

## user_reactions

Likes, dislikes, emojis.

| Column | Type |
|---------|------|
| reaction_id | INTEGER |
| user_id | INTEGER |
| target_type | TEXT |
| target_id | INTEGER |
| reaction | TEXT |

---

# Personal Library

## user_bookmarks

Saved books.

| Column | Type |
|---------|------|
| bookmark_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| created_at | DATETIME |

---

## user_notes

Private notes.

| Column | Type |
|---------|------|
| note_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| note | TEXT |

---

## user_highlights

Highlighted text.

| Column | Type |
|---------|------|
| highlight_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| selected_text | TEXT |
| color | TEXT |

---

## user_bookshelves

User-created shelves.

| Column | Type |
|---------|------|
| bookshelf_id | INTEGER |
| user_id | INTEGER |
| name | TEXT |
| visibility | TEXT |

---

## bookshelf_books

Books inside shelves.

| Column | Type |
|---------|------|
| bookshelf_book_id | INTEGER |
| bookshelf_id | INTEGER |
| book_id | INTEGER |

---

## user_collections

Collections of books.

| Column | Type |
|---------|------|
| collection_id | INTEGER |
| user_id | INTEGER |
| title | TEXT |

---

## collection_books

Books inside collections.

| Column | Type |
|---------|------|
| collection_book_id | INTEGER |
| collection_id | INTEGER |
| book_id | INTEGER |

---

# Personalization

## user_preferences

Stores user preferences.

Examples:

- Theme
- Font Size
- Reading Direction
- Language
- Notification Settings

---

## user_notifications

Notifications.

| Column | Type |
|---------|------|
| notification_id | INTEGER |
| user_id | INTEGER |
| title | TEXT |
| message | TEXT |
| is_read | BOOLEAN |

---

## user_sessions

Login sessions.

| Column | Type |
|---------|------|
| session_id | INTEGER |
| user_id | INTEGER |
| device | TEXT |
| ip_address | TEXT |

---

## user_devices

Registered devices.

| Column | Type |
|---------|------|
| device_id | INTEGER |
| user_id | INTEGER |
| platform | TEXT |
| model | TEXT |

---

# Analytics

## user_activity_logs

Activity tracking.

Examples

- Login
- Logout
- Rating
- Bookmark
- Download

---

## user_search_history

Stores searches.

| Column | Type |
|---------|------|
| search_id | INTEGER |
| user_id | INTEGER |
| keyword | TEXT |
| searched_at | DATETIME |

---

## user_reports

User reports.

| Column | Type |
|---------|------|
| report_id | INTEGER |
| user_id | INTEGER |
| target_type | TEXT |
| target_id | INTEGER |
| reason | TEXT |

---

## user_recommendations

Personalized recommendations.

| Column | Type |
|---------|------|
| recommendation_id | INTEGER |
| user_id | INTEGER |
| book_id | INTEGER |
| score | REAL |

---

## user_points

Gamification points.

| Column | Type |
|---------|------|
| point_id | INTEGER |
| user_id | INTEGER |
| points | INTEGER |

---

# Social

## user_following_authors

Authors followed by users.

---

## user_following_publishers

Publishers followed by users.

---

## user_following_categories

Categories followed by users.

---

## user_shares

Shared books.

---

## user_badges

Achievement badges.

---

## user_achievements

Reading achievements.

---

# Primary Relationships

```text
Users
 │
 ├── user_bookmarks
 ├── user_notes
 ├── user_reviews
 ├── user_ratings
 ├── user_highlights
 ├── user_reading_progress
 ├── user_reading_history
 ├── user_bookshelves
 ├── user_preferences
 ├── user_notifications
 └── user_activity_logs

Books
 │
 ├── user_bookmarks
 ├── user_notes
 ├── user_reviews
 ├── user_ratings
 ├── user_highlights
 ├── user_reading_progress
 ├── user_reading_history
 └── bookshelf_books
```

---

# Naming Convention

| Object | Format |
|---------|--------|
| Table | snake_case |
| Primary Key | table_name_id |
| Foreign Key | entity_id |
| Index | idx_table_column |
| Trigger | trg_table_action |
| View | v_table_name |

---

# Future Tables

Planned additions include:

- reading_goals
- reading_streaks
- annotation_threads
- ai_reading_sessions
- ai_book_summaries
- ai_recommendation_feedback
- reading_heatmaps
- collaborative_bookshelves
- reading_clubs
- live_reading_sessions

---

# Design Principles

- Fully normalized (3NF)
- Modular architecture
- Foreign key integrity
- Soft delete support
- UUID-ready
- JSON-compatible
- Optimized indexing
- AI-ready
- Scalable for millions of users
- Consistent naming across all schemas