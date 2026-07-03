# User Interaction Schema Dummy Tables

## Overview

This document lists all **planned and placeholder tables** for the **User Interaction Schema** in the BookQubit platform.

Dummy tables act as a development roadmap. They define the future structure of the schema before implementation, helping maintain a consistent architecture and simplifying planning, documentation, and migrations.

> **Note:** Presence in this document does **not** mean a table has been implemented.

---

# Table Status Legend

| Status | Meaning |
|---------|---------|
| ✅ | Implemented |
| 🚧 | In Development |
| 📋 | Planned |
| 💡 | Future Idea |
| ❌ | Deprecated |

---

# User Account

| Table | Status | Description |
|---------|--------|-------------|
| users | 📋 | User profile information |
| user_profiles | 📋 | Extended user profile details |
| user_preferences | 📋 | User settings and preferences |
| user_settings | 📋 | Application settings |
| user_devices | 📋 | Registered user devices |
| user_sessions | 📋 | Active login sessions |
| user_security | 📋 | Security-related information |
| user_privacy | 📋 | Privacy preferences |

---

# Reviews & Ratings

| Table | Status | Description |
|---------|--------|-------------|
| user_reviews | 📋 | Book reviews |
| user_review_votes | 📋 | Helpful and unhelpful votes |
| user_review_reports | 📋 | Reported reviews |
| user_review_replies | 📋 | Replies to reviews |
| user_ratings | 📋 | Book ratings |

---

# Reading Progress

| Table | Status | Description |
|---------|--------|-------------|
| user_reading_progress | 📋 | Current reading progress |
| user_reading_history | 📋 | Reading history |
| user_reading_sessions | 📋 | Individual reading sessions |
| user_reading_goals | 📋 | Reading targets |
| user_reading_streaks | 📋 | Consecutive reading days |
| user_reading_statistics | 📋 | Reading analytics |

---

# Notes & Highlights

| Table | Status | Description |
|---------|--------|-------------|
| user_notes | 📋 | Personal notes |
| user_note_tags | 📋 | Tags for notes |
| user_highlights | 📋 | Highlighted text |
| user_highlight_colors | 💡 | Highlight color definitions |

---

# Bookmarks

| Table | Status | Description |
|---------|--------|-------------|
| user_bookmarks | 📋 | Saved books |
| user_bookmark_folders | 📋 | Bookmark folders |
| user_favorites | 📋 | Favorite books |

---

# Collections

| Table | Status | Description |
|---------|--------|-------------|
| user_collections | 📋 | Custom collections |
| user_collection_books | 📋 | Books in collections |
| user_collection_followers | 💡 | Followers of collections |

---

# Bookshelves

| Table | Status | Description |
|---------|--------|-------------|
| user_bookshelves | 📋 | User-created bookshelves |
| user_bookshelf_books | 📋 | Books assigned to shelves |

---

# Notifications

| Table | Status | Description |
|---------|--------|-------------|
| user_notifications | 📋 | Notifications |
| user_notification_settings | 📋 | Notification preferences |
| user_notification_logs | 💡 | Notification delivery logs |

---

# Activity

| Table | Status | Description |
|---------|--------|-------------|
| user_activity_logs | 📋 | User activity history |
| user_login_history | 📋 | Login records |
| user_search_history | 📋 | Search history |
| user_recent_views | 📋 | Recently viewed books |

---

# Social Features

| Table | Status | Description |
|---------|--------|-------------|
| user_follows | 💡 | User following relationships |
| user_follow_requests | 💡 | Pending follow requests |
| user_comments | 💡 | Comments |
| user_comment_likes | 💡 | Comment likes |
| user_mentions | 💡 | User mentions |
| user_messages | 💡 | Direct messaging |

---

# Achievements

| Table | Status | Description |
|---------|--------|-------------|
| user_badges | 💡 | Achievement badges |
| user_achievements | 💡 | Earned achievements |
| user_rewards | 💡 | Reward points |
| user_levels | 💡 | User level system |

---

# Reports & Moderation

| Table | Status | Description |
|---------|--------|-------------|
| user_reports | 📋 | Reported content |
| moderation_queue | 💡 | Pending moderation |
| moderation_actions | 💡 | Moderator actions |

---

# Recommendations

| Table | Status | Description |
|---------|--------|-------------|
| user_recommendations | 💡 | Personalized recommendations |
| recommendation_feedback | 💡 | User feedback on recommendations |

---

# Analytics

| Table | Status | Description |
|---------|--------|-------------|
| analytics_daily | 💡 | Daily analytics |
| analytics_monthly | 💡 | Monthly analytics |
| analytics_yearly | 💡 | Yearly analytics |
| analytics_events | 💡 | Event tracking |

---

# Synchronization

| Table | Status | Description |
|---------|--------|-------------|
| sync_queue | 💡 | Pending synchronization |
| sync_history | 💡 | Synchronization history |
| sync_conflicts | 💡 | Conflict records |

---

# Import & Export

| Table | Status | Description |
|---------|--------|-------------|
| import_jobs | 💡 | Data import jobs |
| export_jobs | 💡 | Data export jobs |

---

# Audit & Logs

| Table | Status | Description |
|---------|--------|-------------|
| audit_logs | 📋 | Security audit logs |
| system_logs | 💡 | Application logs |
| error_logs | 💡 | Error tracking |

---

# Future AI Features

| Table | Status | Description |
|---------|--------|-------------|
| ai_recommendations | 💡 | AI-generated recommendations |
| ai_summaries | 💡 | AI-generated summaries |
| ai_review_analysis | 💡 | Review sentiment analysis |
| ai_reading_insights | 💡 | Reading behavior insights |

---

# Summary

| Category | Planned Tables |
|-----------|---------------:|
| User Account | 8 |
| Reviews & Ratings | 5 |
| Reading | 6 |
| Notes & Highlights | 4 |
| Bookmarks | 3 |
| Collections | 3 |
| Bookshelves | 2 |
| Notifications | 3 |
| Activity | 4 |
| Social | 6 |
| Achievements | 4 |
| Moderation | 3 |
| Recommendations | 2 |
| Analytics | 4 |
| Synchronization | 3 |
| Import & Export | 2 |
| Audit & Logs | 3 |
| AI Features | 4 |

**Estimated Total Tables:** **~69**

---

# Notes

- This document is a planning reference only.
- Not every listed table will necessarily be implemented.
- New tables may be added as BookQubit evolves.
- Implemented tables should be documented separately in **TABLES.md**.
- Schema changes should be tracked in **CHANGELOG.md** and versioned using **VERSIONING_GUIDE.md**.

---

# Status

**Current Version:** **1.0.0**

**Purpose:** Planning & Architecture Reference

**Implementation Status:** Mixed (Planned, In Development, Future)

**Supported Databases:** SQLite • PostgreSQL • MySQL