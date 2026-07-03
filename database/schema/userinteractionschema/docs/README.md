# User Interaction Schema

## Overview

The **User Interaction Schema** manages all user-generated activities and engagement within BookQubit. It records how users interact with books, authors, publishers, collections, and the platform itself.

This schema is designed to support personalized reading experiences, social features, analytics, recommendations, and future AI-powered interactions.

---

# Purpose

The User Interaction Schema enables:

- 📖 Reading progress tracking
- ⭐ Book ratings
- ✍️ Reviews and comments
- 🔖 Bookmarks
- 📝 Personal notes
- 🖍️ Text highlights
- ❤️ Reactions
- 📚 Bookshelves and collections
- 🔍 Search history
- 👀 Recently viewed items
- 🔔 Notifications
- 📊 Reading analytics
- 🎯 Personalized recommendations
- 🏆 Gamification (future)
- 🤖 AI-assisted user experiences

---

# Folder Structure

```text
userinteractionschema/
│
├── user_bookmarks/
├── user_highlights/
├── user_notes/
├── user_ratings/
├── user_reviews/
├── user_comments/
├── user_reactions/
├── user_reading_history/
├── user_reading_progress/
├── user_bookshelves/
├── bookshelf_books/
├── user_collections/
├── collection_books/
├── user_search_history/
├── user_recently_viewed/
├── user_downloads/
├── user_notifications/
├── user_preferences/
├── user_activity_logs/
├── user_reports/
├── user_sessions/
├── user_devices/
├── user_achievements/
├── user_badges/
├── user_points/
├── user_following_authors/
├── user_following_publishers/
├── user_following_categories/
├── user_recommendations/
│
├── views/
├── triggers/
├── migrations/
├── seed/
├── tests/
├── docs/
│
├── userinteraction.init.sql
├── userinteraction.drop.sql
└── userinteraction.rollback.sql
```

---

# Schema Organization

The schema is divided into several functional areas.

## Reading

Tracks reading-related activities.

- Reading Progress
- Reading History
- Recently Viewed
- Downloads

---

## Reviews

Stores user feedback.

- Ratings
- Reviews
- Comments
- Reactions

---

## Personal Library

Allows users to organize content.

- Bookshelves
- Collections
- Bookmarks
- Notes
- Highlights

---

## Social

Supports community features.

- Follows
- Shares
- Comments
- Reactions

---

## Personalization

Stores user preferences.

- Preferred Language
- Reading Theme
- Font Size
- Notification Settings

---

## Analytics

Tracks user activity.

- Search History
- Reading Sessions
- Activity Logs
- Device Information

---

# Major Modules

| Module | Description |
|---------|-------------|
| user_bookmarks | Saved books |
| user_notes | Personal notes |
| user_highlights | Highlighted text |
| user_ratings | Star ratings |
| user_reviews | Written reviews |
| user_comments | Discussion comments |
| user_reactions | Likes and reactions |
| user_reading_progress | Current reading progress |
| user_reading_history | Reading history |
| user_bookshelves | User-created bookshelves |
| bookshelf_books | Books within shelves |
| user_notifications | Notifications |
| user_preferences | User settings |
| user_activity_logs | Activity tracking |

---

# Database Design

The schema follows database normalization principles.

- No duplicated user interaction data
- Proper foreign keys
- Optimized indexing
- Soft delete support
- Audit timestamps
- UUID support where applicable

---

# Relationships

```text
Users
   │
   ├────────────┐
   │            │
   ▼            ▼

Books      User Interactions
               │
               ├── Ratings
               ├── Reviews
               ├── Notes
               ├── Highlights
               ├── Bookmarks
               ├── Progress
               ├── History
               └── Collections
```

---

# Features

## Reading Experience

- Continue Reading
- Reading Progress
- Reading Statistics
- Reading Goals
- Estimated Reading Time

---

## Reviews

Users can

- Rate books
- Write reviews
- Edit reviews
- Delete reviews
- Report reviews

---

## Notes

Users can

- Create notes
- Edit notes
- Delete notes
- Organize notes

---

## Highlights

Supports

- Text highlighting
- Color labels
- Highlight categories
- Export highlights

---

## Bookmarks

Supports

- Favorite books
- Reading later
- Wishlist
- Custom folders

---

## Search

Stores

- Recent searches
- Popular searches
- Search filters
- Search suggestions

---

# Performance

The schema is optimized using:

- Composite indexes
- Foreign key indexes
- Covering indexes
- Views
- Triggers

Large text fields should not be indexed.

SQLite FTS5 is recommended for review searching.

---

# Seed Data

The schema supports JSON seed files.

Example:

```text
seed/
├── user_ratings.seed.json
├── user_bookmarks.seed.json
├── user_reviews.seed.json
└── ...
```

---

# Documentation

The **docs/** directory contains detailed documentation including:

- ER Diagram
- Tables
- Relationships
- API Guide
- Migration Guide
- Seed Guide
- Validation Guide
- Security Guide
- Performance Guide
- Best Practices

---

# Future Enhancements

- Reading streaks
- Daily reading goals
- Reading challenges
- Achievement badges
- AI-generated summaries
- AI reading recommendations
- Voice notes
- Audio bookmarks
- Reading heatmaps
- Social feeds
- Reading clubs
- Shared bookshelves
- Community discussions
- Reading insights
- Personalized dashboards

---

# Best Practices

- Keep user-generated content separate from book metadata.
- Use soft deletes for recoverable content.
- Store timestamps in UTC.
- Validate foreign keys.
- Use JSON seed files for testing and development.
- Cache frequently accessed interaction data where appropriate.
- Avoid storing duplicate information.
- Design APIs around user-centric workflows.

---

# Dependencies

This schema depends on:

- Authentication Schema (users)
- Book Schema
- Language Schema
- Geography Schema (optional for localization)

---

# Status

**Production Ready**

Supports:

- Reader engagement
- Reviews and ratings
- Personal libraries
- Reading analytics
- Personalization
- Social interactions
- Notifications
- AI-ready architecture
- Enterprise-scale scalability
```