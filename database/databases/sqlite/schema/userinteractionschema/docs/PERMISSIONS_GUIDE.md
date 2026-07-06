# User Interaction Schema Permissions Guide

## Overview

The **User Interaction Schema Permissions Guide** defines the authorization model for accessing, creating, updating, and deleting user interaction data within the BookQubit platform.

Permissions determine **who can perform which actions** on user-generated content such as reviews, ratings, bookmarks, notes, highlights, bookshelves, collections, notifications, and activity logs.

Authentication verifies **who the user is**, while authorization (permissions) determines **what the user is allowed to do**.

---

# Objectives

The permission system is designed to:

- Protect user data
- Enforce access control
- Prevent unauthorized operations
- Support role-based authorization
- Secure APIs and databases
- Maintain auditability

---

# Permission Architecture

```text
User
   │
   ▼
Authentication
   │
   ▼
Role Verification
   │
   ▼
Permission Check
   │
   ▼
Business Rules
   │
   ▼
Database Operation
```

---

# User Roles

| Role | Description |
|------|-------------|
| Guest | Unauthenticated visitor |
| User | Registered user |
| Premium User | User with premium features |
| Moderator | Community moderator |
| Administrator | Full system administrator |
| System | Internal services and scheduled jobs |

---

# Permission Levels

| Permission | Description |
|------------|-------------|
| Create | Create new records |
| Read | View records |
| Update | Modify existing records |
| Delete | Remove or soft-delete records |
| Restore | Restore deleted records |
| Moderate | Review or hide content |
| Export | Export data |
| Manage | Full administrative access |

---

# Resource Permissions

| Resource | Guest | User | Premium | Moderator | Admin |
|----------|:-----:|:----:|:--------:|:----------:|:-----:|
| Reviews | Read Public | CRUD Own | CRUD Own | Moderate | Full |
| Ratings | Read | CRUD Own | CRUD Own | Read | Full |
| Bookmarks | — | CRUD Own | CRUD Own | — | Full |
| Notes | — | CRUD Own | CRUD Own | — | Full |
| Highlights | — | CRUD Own | CRUD Own | — | Full |
| Bookshelves | Read Public | CRUD Own | CRUD Own | Read | Full |
| Collections | Read Public | CRUD Own | CRUD Own | Moderate | Full |
| Notifications | — | Read Own | Read Own | — | Full |
| Reading History | — | CRUD Own | CRUD Own | — | Full |
| Activity Logs | — | Read Own | Read Own | Read | Full |
| Reports | — | Create | Create | Manage | Full |

---

# Ownership Rules

Users may only modify their own records unless they have elevated privileges.

Example:

```text
User A → Can update User A's review
User B → Cannot update User A's review
Moderator → Can hide User A's review
Administrator → Can update any review
```

---

# Public vs Private Data

## Public

- Published reviews
- Public bookshelves
- Public collections
- Public ratings (if enabled)

## Private

- Personal notes
- Reading progress
- Reading history
- Notifications
- Search history
- Activity logs
- Private bookmarks

---

# API Authorization

Every protected endpoint should verify:

1. Authentication
2. User role
3. Resource ownership
4. Required permission

Example:

```text
Request
   │
   ▼
JWT / Session Validation
   │
   ▼
Role Check
   │
   ▼
Ownership Check
   │
   ▼
Execute Request
```

---

# Example Permission Logic

```javascript
if (review.user_id !== currentUser.id && currentUser.role !== "admin") {
    return res.status(403).json({
        success: false,
        message: "Permission denied."
    });
}
```

---

# Common Permission Rules

## Reviews

- Anyone may read published reviews.
- Only the author may edit their review.
- Moderators may hide inappropriate reviews.
- Administrators may manage all reviews.

---

## Ratings

- One rating per user per book.
- Users may update or delete their own rating.
- Administrators may manage all ratings.

---

## Notes

- Notes are private by default.
- Only the owner can view or edit notes.
- Administrators may access notes only for support or legal purposes, according to platform policy.

---

## Notifications

- Users may only read their own notifications.
- Only the system or administrators may create system notifications.
- Users may mark their own notifications as read.

---

## Reading History

- Only the owner may view or modify reading history.
- Administrators may access records for maintenance, auditing, or support when permitted by policy.

---

# Database-Level Security

Recommended database protections:

- Foreign keys
- CHECK constraints
- UNIQUE constraints
- Triggers for audit logging
- Views exposing only approved fields

---

# Permission Matrix

| Action | Owner | Moderator | Admin |
|--------|:-----:|:----------:|:-----:|
| Create | ✔ | ✔ | ✔ |
| Read Own | ✔ | ✔ | ✔ |
| Read Public | ✔ | ✔ | ✔ |
| Update Own | ✔ | ✔ | ✔ |
| Update Others | ✖ | Limited | ✔ |
| Delete Own | ✔ | ✔ | ✔ |
| Delete Others | ✖ | Limited | ✔ |
| Moderate | ✖ | ✔ | ✔ |
| Export | Limited | ✔ | ✔ |

---

# Error Responses

Unauthorized:

```json
{
    "success": false,
    "message": "Authentication required."
}
```

Forbidden:

```json
{
    "success": false,
    "message": "Permission denied."
}
```

---

# Audit Logging

Sensitive actions should be logged:

- Review deletion
- Content moderation
- Permission changes
- Data exports
- Administrative updates

Example log:

```text
2026-07-03 14:30:00
Admin 5 deleted review 120
```

---

# Best Practices

- Authenticate every protected request.
- Enforce least-privilege access.
- Validate ownership before updates or deletes.
- Never trust client-provided user IDs.
- Log administrative actions.
- Keep permission logic centralized.
- Regularly review role assignments.
- Return consistent authorization error messages.

---

# Future Enhancements

Planned improvements include:

- Attribute-Based Access Control (ABAC)
- Fine-grained resource permissions
- Team and organization roles
- Temporary delegated access
- Permission inheritance
- Multi-tenant isolation
- Policy-based authorization engine
- External identity provider integration (OAuth/OpenID Connect)

---

# Status

**Production Ready**

Supports:

- Role-based access control (RBAC)
- Resource ownership validation
- CRUD permissions
- Moderator workflows
- Administrative access
- Secure API authorization
- Audit logging
- SQLite, PostgreSQL, and MySQL compatibility