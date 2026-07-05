# User Interaction Schema API Guide

## Overview

The **User Interaction API** provides RESTful endpoints for managing user engagement within the BookQubit platform.

These APIs allow users to:

- Read books
- Track reading progress
- Add bookmarks
- Write reviews
- Rate books
- Create notes
- Highlight text
- Manage bookshelves
- View reading history
- Receive notifications
- Access personalized recommendations

---

# Base URL

```text
Development
http://localhost:3000/api/v1
```

```text
Production
https://api.bookqubit.com/api/v1
```

---

# Authentication

Most endpoints require authentication.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Response Format

## Success

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

## Error

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

---

# Reading Progress API

## Get Reading Progress

```http
GET /users/{userId}/reading-progress
```

Returns all books currently being read.

---

## Get Progress for a Book

```http
GET /books/{bookId}/reading-progress
```

---

## Update Progress

```http
POST /books/{bookId}/reading-progress
```

Request

```json
{
    "current_page": 128,
    "progress_percentage": 42.5,
    "reading_time": 95
}
```

---

## Mark Book as Finished

```http
PATCH /books/{bookId}/reading-progress/complete
```

---

# Reading History API

## Reading History

```http
GET /users/{userId}/reading-history
```

---

## Recently Viewed

```http
GET /users/{userId}/recently-viewed
```

---

# Ratings API

## Get Ratings

```http
GET /books/{bookId}/ratings
```

---

## Add Rating

```http
POST /books/{bookId}/ratings
```

Request

```json
{
    "rating": 5
}
```

---

## Update Rating

```http
PATCH /books/{bookId}/ratings/{ratingId}
```

---

## Delete Rating

```http
DELETE /books/{bookId}/ratings/{ratingId}
```

---

# Reviews API

## Get Reviews

```http
GET /books/{bookId}/reviews
```

---

## Review Details

```http
GET /reviews/{reviewId}
```

---

## Create Review

```http
POST /books/{bookId}/reviews
```

Request

```json
{
    "title": "Excellent Book",
    "review": "Highly recommended.",
    "rating": 5,
    "spoiler": false
}
```

---

## Update Review

```http
PATCH /reviews/{reviewId}
```

---

## Delete Review

```http
DELETE /reviews/{reviewId}
```

---

# Bookmarks API

## Get Bookmarks

```http
GET /users/{userId}/bookmarks
```

---

## Add Bookmark

```http
POST /books/{bookId}/bookmarks
```

---

## Remove Bookmark

```http
DELETE /books/{bookId}/bookmarks
```

---

# Notes API

## User Notes

```http
GET /books/{bookId}/notes
```

---

## Add Note

```http
POST /books/{bookId}/notes
```

Request

```json
{
    "note": "Important concept on this page."
}
```

---

## Update Note

```http
PATCH /notes/{noteId}
```

---

## Delete Note

```http
DELETE /notes/{noteId}
```

---

# Highlights API

## Get Highlights

```http
GET /books/{bookId}/highlights
```

---

## Create Highlight

```http
POST /books/{bookId}/highlights
```

Request

```json
{
    "selected_text": "Knowledge is power.",
    "color": "yellow",
    "location_start": 450,
    "location_end": 468
}
```

---

## Delete Highlight

```http
DELETE /highlights/{highlightId}
```

---

# Bookshelves API

## User Bookshelves

```http
GET /users/{userId}/bookshelves
```

---

## Create Shelf

```http
POST /users/{userId}/bookshelves
```

---

## Update Shelf

```http
PATCH /bookshelves/{bookshelfId}
```

---

## Delete Shelf

```http
DELETE /bookshelves/{bookshelfId}
```

---

## Add Book to Shelf

```http
POST /bookshelves/{bookshelfId}/books
```

Request

```json
{
    "book_id": 101
}
```

---

## Remove Book

```http
DELETE /bookshelves/{bookshelfId}/books/{bookId}
```

---

# Collections API

## User Collections

```http
GET /users/{userId}/collections
```

---

## Create Collection

```http
POST /users/{userId}/collections
```

---

## Delete Collection

```http
DELETE /collections/{collectionId}
```

---

# Comments API

## Review Comments

```http
GET /reviews/{reviewId}/comments
```

---

## Add Comment

```http
POST /reviews/{reviewId}/comments
```

---

# Reactions API

## Add Reaction

```http
POST /reactions
```

Request

```json
{
    "target_type": "review",
    "target_id": 25,
    "reaction": "like"
}
```

---

## Remove Reaction

```http
DELETE /reactions/{reactionId}
```

---

# Search History API

## Search History

```http
GET /users/{userId}/search-history
```

---

## Clear History

```http
DELETE /users/{userId}/search-history
```

---

# Notifications API

## Get Notifications

```http
GET /users/{userId}/notifications
```

---

## Mark as Read

```http
PATCH /notifications/{notificationId}/read
```

---

## Mark All Read

```http
PATCH /users/{userId}/notifications/read-all
```

---

# User Preferences API

## Get Preferences

```http
GET /users/{userId}/preferences
```

---

## Update Preferences

```http
PATCH /users/{userId}/preferences
```

Request

```json
{
    "theme": "dark",
    "language": "en",
    "font_size": 18,
    "reading_mode": "vertical"
}
```

---

# Activity Logs API

## User Activities

```http
GET /users/{userId}/activities
```

Supports filtering by:

- activity_type
- date
- device
- book

---

# Recommendations API

## Personalized Recommendations

```http
GET /users/{userId}/recommendations
```

---

## Similar Books

```http
GET /books/{bookId}/similar
```

---

# Pagination

Supported on list endpoints.

Example

```http
GET /books/101/reviews?page=2&limit=20
```

Response

```json
{
    "page": 2,
    "limit": 20,
    "total": 185,
    "pages": 10,
    "data": []
}
```

---

# Filtering

Example

```http
GET /books/101/reviews?rating=5
```

```http
GET /users/1/bookmarks?status=active
```

---

# Sorting

Example

```http
GET /books/101/reviews?sort=created_at&order=desc
```

---

# Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# API Versioning

Current version:

```text
v1
```

Example

```http
/api/v1/books/101/reviews
```

Future versions

```text
v2
v3
```

---

# Best Practices

- Use HTTPS for all requests.
- Authenticate using JWT Bearer tokens.
- Validate all request payloads.
- Return consistent JSON responses.
- Support pagination for collection endpoints.
- Use filtering and sorting to reduce payload size.
- Keep endpoints resource-oriented and RESTful.
- Log user actions for analytics and auditing.
- Apply rate limiting to protect the API.
- Version APIs to maintain backward compatibility.

---

# Future APIs

Planned endpoints include:

- Reading Streaks
- Reading Goals
- Achievement Badges
- AI Reading Assistant
- AI Note Summaries
- AI Review Analysis
- Reading Heatmaps
- Shared Bookshelves
- Reading Clubs
- Friend Activity Feed
- Voice Notes
- Collaborative Annotations
- Recommendation Feedback
- Reading Challenges

---

# Status

**Production Ready**

Supports:

- Reading Progress
- Reading History
- Ratings
- Reviews
- Bookmarks
- Notes
- Highlights
- Bookshelves
- Collections
- Comments
- Reactions
- Notifications
- Preferences
- Search History
- Recommendations
- Activity Logs
- RESTful Architecture
- JWT Authentication
- Pagination & Filtering
- Versioned APIs