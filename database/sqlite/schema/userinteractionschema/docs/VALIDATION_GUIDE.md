# User Interaction Schema Validation Guide

## Overview

Validation ensures that all data stored in the **User Interaction Schema** is accurate, complete, consistent, and conforms to business rules.

Validation should occur at multiple layers:

1. Client-side validation
2. API validation
3. Database validation
4. Business rule validation

Using layered validation improves data quality and prevents invalid or inconsistent records.

---

# Objectives

The validation system is designed to:

- Ensure data integrity
- Prevent invalid data entry
- Enforce business rules
- Protect database consistency
- Improve API reliability
- Reduce application errors

---

# Validation Layers

```text
User Input
     │
     ▼
Client Validation
     │
     ▼
API Validation
     │
     ▼
Business Rules
     │
     ▼
Database Constraints
     │
     ▼
SQLite Database
```

---

# Validation Categories

| Category | Purpose |
|----------|---------|
| Required Fields | Prevent missing values |
| Data Type | Verify correct data types |
| Range Validation | Restrict numeric values |
| Length Validation | Limit text size |
| Format Validation | Validate patterns (UUID, email, etc.) |
| Foreign Keys | Ensure referenced records exist |
| Uniqueness | Prevent duplicate records |
| Business Rules | Enforce application logic |

---

# Required Field Validation

Examples:

```text
user_id
book_id
rating
created_at
```

SQL example:

```sql
user_id INTEGER NOT NULL
```

API example:

```javascript
if (!user_id) {
    throw new Error("user_id is required.");
}
```

---

# Data Type Validation

| Field | Type |
|--------|------|
| user_id | INTEGER |
| book_id | INTEGER |
| rating | INTEGER |
| progress_percentage | REAL |
| review | TEXT |
| created_at | DATETIME |

Example:

```javascript
Number.isInteger(user_id);
```

---

# Length Validation

Examples:

| Field | Maximum Length |
|--------|---------------:|
| Review Title | 200 |
| Bookshelf Name | 100 |
| Note | 5000 |
| Search Keyword | 255 |

Example:

```javascript
if (title.length > 200) {
    throw new Error("Title is too long.");
}
```

---

# Range Validation

Example ratings:

```text
Minimum = 1
Maximum = 5
```

SQLite:

```sql
CHECK(rating BETWEEN 1 AND 5)
```

Progress:

```text
0–100
```

SQLite:

```sql
CHECK(progress_percentage BETWEEN 0 AND 100)
```

---

# Enum Validation

Examples:

Notification status:

```text
unread
read
archived
```

Review status:

```text
draft
published
hidden
deleted
```

Reading status:

```text
reading
completed
paused
abandoned
```

---

# Date Validation

Accepted format:

```text
YYYY-MM-DD HH:MM:SS
```

Example:

```text
2026-07-03 15:30:00
```

Rules:

- Valid calendar date
- Valid time
- UTC recommended

---

# Foreign Key Validation

Verify referenced records exist.

Example:

```text
user_id
```

Must exist in:

```text
users
```

Example:

```text
book_id
```

Must exist in:

```text
books
```

---

# Uniqueness Validation

Prevent duplicate interactions.

Examples:

User can rate a book only once.

```text
(user_id, book_id)
```

Bookshelf names should be unique per user.

```text
(user_id, shelf_name)
```

Bookmarks:

```text
(user_id, book_id)
```

---

# Business Rule Validation

Examples:

- A user cannot review the same book twice (if business rules require one review per user).
- Progress cannot exceed 100%.
- Finished books require a completion date.
- Deleted bookmarks cannot be modified.
- Archived notifications cannot be marked unread.

---

# JSON Validation

Seed files should be checked for:

- Valid JSON syntax
- Required properties
- Correct data types
- No duplicate keys
- UTF-8 encoding

Example:

```json
{
    "user_id": 1,
    "book_id": 101,
    "rating": 5
}
```

---

# SQL Constraints

Examples:

```sql
NOT NULL
```

```sql
UNIQUE
```

```sql
CHECK
```

```sql
FOREIGN KEY
```

```sql
PRIMARY KEY
```

---

# API Validation Example

```javascript
if (rating < 1 || rating > 5) {
    return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5."
    });
}
```

---

# Validation Error Response

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": [
        {
            "field": "rating",
            "message": "Rating must be between 1 and 5."
        }
    ]
}
```

---

# Validation Checklist

Before inserting or updating data:

- Required fields provided
- Data types verified
- Length limits respected
- Numeric ranges validated
- Foreign keys exist
- Unique constraints satisfied
- Enum values allowed
- Dates correctly formatted
- Business rules passed

---

# Testing Validation

Test cases should include:

- Missing required fields
- Invalid IDs
- Invalid ratings
- Duplicate records
- Invalid dates
- Oversized text
- Invalid enum values
- Broken foreign keys

---

# Performance Considerations

- Validate on the client for faster feedback.
- Always validate again on the server.
- Use database constraints as the final safeguard.
- Avoid unnecessary validation for unchanged fields.
- Cache lookup values when appropriate.

---

# Best Practices

- Validate at every application layer.
- Return clear and consistent error messages.
- Keep validation rules centralized where possible.
- Never rely solely on client-side validation.
- Use database constraints to enforce critical rules.
- Document all validation requirements.
- Write automated tests for validation logic.

---

# Future Enhancements

Planned validation improvements include:

- JSON Schema validation
- OpenAPI request validation
- Automatic input sanitization
- AI-assisted data quality checks
- Configurable business rule engine
- Localization of validation messages
- Real-time validation feedback
- Custom validation plugins

---

# Status

**Production Ready**

Supports:

- Required field validation
- Data type validation
- Range and length validation
- Enum validation
- Foreign key validation
- Unique constraint validation
- Business rule enforcement
- JSON seed validation
- SQLite constraint integration
- API error handling