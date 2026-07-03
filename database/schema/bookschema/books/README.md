# Books Module

The **Books** module is the core of the BookQubit database. It stores the primary information about every book. Related data such as authors, publishers, categories, translations, editions, media, ratings, and reviews are stored in separate modules and linked through foreign keys.

---

# Directory Structure

```text
books/

├── books.sql
├── books.index.sql
├── books.view.sql
├── books.trigger.sql
├── books.seed.sql
└── README.md
```

---

# Files

| File | Description |
|------|-------------|
| **books.sql** | Creates the main `books` table. |
| **books.index.sql** | Creates indexes for faster searching and filtering. |
| **books.view.sql** | Creates reusable SQL views. |
| **books.trigger.sql** | Contains triggers for automatic updates and data integrity. |
| **books.seed.sql** | Inserts sample data for development and testing. |
| **README.md** | Module documentation. |

---

# Table

## books

Stores the master record for every book.

### Primary Key

- `book_id`

### Unique Fields

- `uuid`
- `slug`
- `isbn10`
- `isbn13`

---

# Main Columns

| Column | Description |
|---------|-------------|
| book_id | Primary key |
| uuid | Global unique identifier |
| slug | URL-friendly identifier |
| original_title | Original book title |
| original_language_id | Original language |
| country_id | Country of publication/origin |
| first_publication_date | First publication date |
| book_type | Book type |
| description | Full description |
| short_description | Short summary |
| isbn10 | ISBN-10 |
| isbn13 | ISBN-13 |
| page_count | Total pages |
| reading_time_minutes | Estimated reading time |
| copyright_year | Copyright year |
| status | Publication status |
| visibility | Public/Private visibility |
| is_adult | Adult content flag |
| is_featured | Featured flag |
| is_trending | Trending flag |
| is_bestseller | Bestseller flag |
| has_series | Part of a series |
| is_ai_generated | AI generated content |
| search_keywords | Search keywords |
| created_at | Creation timestamp |
| updated_at | Last update timestamp |
| published_at | Published timestamp |
| deleted_at | Soft delete timestamp |

---

# Relationships

The `books` table is the central table of the BookQubit database.

It connects to:

- book_authors
- book_publishers
- book_categories
- book_genres
- book_subjects
- book_tags
- book_translations
- book_series
- book_collections
- book_editions
- book_media
- book_reviews
- book_ratings
- book_statistics
- book_awards
- book_links

---

# Dependencies

Requires:

- languages table
- countries table

---

# Indexes

Indexes improve performance for:

- UUID lookup
- Slug lookup
- ISBN lookup
- Title search
- Language filtering
- Country filtering
- Publication date
- Status
- Visibility
- Featured books
- Trending books
- Bestseller books

---

# Views

This module provides reusable views such as:

- Active books
- Public books
- Featured books
- Trending books
- Bestseller books
- Recently published books

---

# Triggers

Triggers automatically:

- Update `updated_at`
- Set `published_at`
- Protect immutable fields
- Prevent physical deletion
- Enforce soft delete rules

---

# Seed Data

`books.seed.sql` provides sample data for:

- Fiction
- Non-fiction
- Programming
- Science
- Space
- History
- AI
- Technology

---

# Status Values

| Value | Description |
|--------|-------------|
| draft | Draft |
| review | Under review |
| scheduled | Scheduled |
| published | Published |
| archived | Archived |

---

# Visibility Values

| Value | Description |
|--------|-------------|
| public | Visible to everyone |
| private | Only owner/admin |
| unlisted | Accessible by direct link |

---

# Book Types

- book
- ebook
- audiobook
- comic
- magazine
- journal
- research
- thesis

---

# Best Practices

- Never duplicate author information.
- Never duplicate publisher information.
- Never duplicate translations.
- Keep the books table lightweight.
- Store relationships in dedicated tables.
- Use UUIDs for external APIs.
- Use foreign keys whenever possible.
- Use indexes for searchable columns.
- Prefer soft deletes over physical deletes.

---

# Future Enhancements

- Full-text search (FTS5)
- AI metadata generation
- OCR support
- EPUB metadata extraction
- PDF metadata extraction
- Version history
- Audit logging
- Recommendation engine
- Semantic search
- Vector embeddings

---

# Module Owner

BookQubit Database Architecture

Version: 1.0
Database: SQLite
License: MIT