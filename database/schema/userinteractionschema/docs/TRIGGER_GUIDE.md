# User Interaction Schema Trigger Guide

## Overview

Database **Triggers** are SQL procedures that automatically execute when specific database events occur, such as `INSERT`, `UPDATE`, or `DELETE`.

The **User Interaction Schema** uses triggers to maintain data integrity, automate calculations, update statistics, record activity, and enforce business rules without requiring application-level logic.

---

# Objectives

Triggers are designed to:

- Automate repetitive tasks
- Enforce business rules
- Maintain data consistency
- Update statistics automatically
- Record user activities
- Prevent invalid operations
- Reduce application-side logic

---

# Directory Structure

```text
userinteractionschema/
│
├── user_bookmarks/
│   └── user_bookmarks.trigger.sql
│
├── user_reviews/
│   └── user_reviews.trigger.sql
│
├── user_ratings/
│   └── user_ratings.trigger.sql
│
├── user_reading_progress/
│   └── user_reading_progress.trigger.sql
│
├── user_notifications/
│   └── user_notifications.trigger.sql
│
└── docs/
    └── TRIGGER_GUIDE.md
```

---

# Trigger Naming Convention

Use the following format:

```text
trg_<table>_<event>_<action>
```

Examples:

```text
trg_user_reviews_insert_activity
trg_user_ratings_update_average
trg_user_bookmarks_delete_log
trg_user_notifications_insert_timestamp
```

---

# Trigger Types

| Event | Description |
|--------|-------------|
| BEFORE INSERT | Runs before inserting data |
| AFTER INSERT | Runs after inserting data |
| BEFORE UPDATE | Runs before updating data |
| AFTER UPDATE | Runs after updating data |
| BEFORE DELETE | Runs before deleting data |
| AFTER DELETE | Runs after deleting data |

---

# Example Trigger

## Automatically Set `updated_at`

```sql
CREATE TRIGGER trg_user_reviews_update_timestamp
AFTER UPDATE ON user_reviews
FOR EACH ROW
BEGIN
    UPDATE user_reviews
    SET updated_at = CURRENT_TIMESTAMP
    WHERE review_id = NEW.review_id;
END;
```

---

# Prevent Invalid Ratings

```sql
CREATE TRIGGER trg_user_ratings_validate
BEFORE INSERT ON user_ratings
FOR EACH ROW
WHEN NEW.rating < 1 OR NEW.rating > 5
BEGIN
    SELECT RAISE(ABORT, 'Rating must be between 1 and 5.');
END;
```

---

# Log User Activity

```sql
CREATE TRIGGER trg_user_reviews_insert_activity
AFTER INSERT ON user_reviews
FOR EACH ROW
BEGIN
    INSERT INTO user_activity_logs (
        user_id,
        activity_type,
        created_at
    )
    VALUES (
        NEW.user_id,
        'review_created',
        CURRENT_TIMESTAMP
    );
END;
```

---

# Update Average Rating

```sql
CREATE TRIGGER trg_user_ratings_update_average
AFTER INSERT ON user_ratings
FOR EACH ROW
BEGIN
    UPDATE books
    SET average_rating = (
        SELECT AVG(rating)
        FROM user_ratings
        WHERE book_id = NEW.book_id
    )
    WHERE book_id = NEW.book_id;
END;
```

---

# Soft Delete Protection

Prevent permanent deletion.

```sql
CREATE TRIGGER trg_user_reviews_prevent_delete
BEFORE DELETE ON user_reviews
FOR EACH ROW
BEGIN
    SELECT RAISE(ABORT, 'Use soft delete instead of DELETE.');
END;
```

---

# Automatically Create Notification

```sql
CREATE TRIGGER trg_reviews_notify_author
AFTER INSERT ON user_reviews
FOR EACH ROW
BEGIN
    INSERT INTO user_notifications (
        user_id,
        title,
        message,
        is_read,
        created_at
    )
    VALUES (
        NEW.user_id,
        'Review Submitted',
        'Your review has been published.',
        0,
        CURRENT_TIMESTAMP
    );
END;
```

---

# Update Reading Completion

```sql
CREATE TRIGGER trg_progress_complete
AFTER UPDATE ON user_reading_progress
FOR EACH ROW
WHEN NEW.progress_percentage = 100
BEGIN
    UPDATE user_reading_progress
    SET finished_at = CURRENT_TIMESTAMP
    WHERE progress_id = NEW.progress_id;
END;
```

---

# Common Trigger Use Cases

| Table | Purpose |
|--------|---------|
| user_ratings | Update average ratings |
| user_reviews | Log activity |
| user_bookmarks | Count bookmarks |
| user_reading_progress | Mark completed books |
| user_notifications | Set timestamps |
| user_activity_logs | Track events |
| user_comments | Update comment counts |
| user_reactions | Update reaction counts |

---

# Trigger Execution Order

```text
Client Request
      │
      ▼
BEFORE Trigger
      │
      ▼
INSERT / UPDATE / DELETE
      │
      ▼
AFTER Trigger
      │
      ▼
Commit Transaction
```

---

# Error Handling

Use `RAISE()` to stop invalid operations.

Example:

```sql
SELECT RAISE(ABORT, 'Duplicate bookmark.');
```

Other SQLite options:

```text
ABORT
FAIL
IGNORE
ROLLBACK
```

---

# Performance Considerations

Triggers execute automatically and can affect write performance.

Recommendations:

- Keep trigger logic short.
- Avoid nested trigger chains.
- Do not perform expensive queries inside triggers.
- Use indexes on referenced columns.
- Test performance with large datasets.

---

# Testing Triggers

After creating a trigger:

1. Insert test data.
2. Verify expected changes.
3. Test invalid inputs.
4. Check rollback behavior.
5. Confirm timestamps and counters.

Example:

```sql
INSERT INTO user_ratings (
    user_id,
    book_id,
    rating
)
VALUES (1, 101, 5);
```

---

# Managing Triggers

List triggers:

```sql
SELECT name
FROM sqlite_master
WHERE type = 'trigger';
```

Drop a trigger:

```sql
DROP TRIGGER IF EXISTS trg_user_ratings_update_average;
```

---

# Best Practices

- Prefix all triggers with `trg_`.
- Keep each trigger focused on one responsibility.
- Use descriptive names.
- Prefer `AFTER` triggers for logging and statistics.
- Use `BEFORE` triggers for validation.
- Avoid recursive trigger behavior.
- Document every trigger.
- Test triggers with realistic datasets.
- Keep business logic simple and deterministic.

---

# Future Triggers

Planned trigger implementations include:

- Reading streak updates
- Achievement badge generation
- Recommendation score recalculation
- Trending book updates
- User engagement metrics
- AI recommendation refresh
- Daily reading statistics
- Automatic archive of old notifications
- Moderation workflow automation
- Reputation score updates

---

# Status

**Production Ready**

Supports:

- BEFORE and AFTER triggers
- Data validation
- Automatic timestamps
- Activity logging
- Statistics updates
- Notification generation
- Business rule enforcement
- SQLite-compatible implementations