# Authentication Schema Data Types

## Overview

This document defines the recommended database data types for every field used in the **Authentication Schema (`authschema`)**.

The schema is designed to be compatible with:

- SQLite
- PostgreSQL
- MySQL

Where database-specific types differ, the closest equivalent should be used.

---

# Data Type Mapping

| Logical Type | SQLite | PostgreSQL | MySQL |
|--------------|---------|------------|-------|
| UUID | TEXT | UUID | CHAR(36) |
| String | TEXT | VARCHAR | VARCHAR |
| Long Text | TEXT | TEXT | TEXT |
| Integer | INTEGER | INTEGER | INT |
| Boolean | INTEGER (0/1) | BOOLEAN | BOOLEAN / TINYINT(1) |
| Date | TEXT (ISO 8601) | DATE | DATE |
| DateTime | TEXT (ISO 8601 UTC) | TIMESTAMP | DATETIME |
| JSON | TEXT | JSONB | JSON |
| IP Address | TEXT | INET / VARCHAR(45) | VARCHAR(45) |

---

# auth_accounts

| Field | Recommended Type |
|--------|------------------|
| auth_account_id | INTEGER |
| user_id | INTEGER |
| uuid | TEXT / UUID |
| auth_provider | VARCHAR(20) |
| account_status | VARCHAR(30) |
| last_login_at | DATETIME |
| created_at | DATETIME |
| updated_at | DATETIME |
| deleted_at | DATETIME (Nullable) |

---

# auth_credentials

| Field | Recommended Type |
|--------|------------------|
| credential_id | INTEGER |
| auth_account_id | INTEGER |
| email | VARCHAR(255) |
| password_hash | TEXT |
| password_algorithm | VARCHAR(20) |
| password_updated_at | DATETIME |
| created_at | DATETIME |
| updated_at | DATETIME |

---

# auth_google_accounts

| Field | Recommended Type |
|--------|------------------|
| google_account_id | INTEGER |
| auth_account_id | INTEGER |
| google_user_id | VARCHAR(255) |
| google_email | VARCHAR(255) |
| google_name | VARCHAR(255) |
| avatar_url | TEXT |
| email_verified | BOOLEAN |
| linked_at | DATETIME |
| created_at | DATETIME |

---

# auth_email_verification

| Field | Recommended Type |
|--------|------------------|
| verification_id | INTEGER |
| auth_account_id | INTEGER |
| email | VARCHAR(255) |
| verification_token | VARCHAR(255) |
| expires_at | DATETIME |
| verified_at | DATETIME (Nullable) |
| created_at | DATETIME |

---

# auth_password_resets

| Field | Recommended Type |
|--------|------------------|
| reset_id | INTEGER |
| auth_account_id | INTEGER |
| reset_token | VARCHAR(255) |
| expires_at | DATETIME |
| used_at | DATETIME (Nullable) |
| created_at | DATETIME |

---

# auth_sessions

| Field | Recommended Type |
|--------|------------------|
| session_id | INTEGER |
| auth_account_id | INTEGER |
| session_token | VARCHAR(255) |
| ip_address | VARCHAR(45) |
| device_name | VARCHAR(150) |
| browser | VARCHAR(100) |
| operating_system | VARCHAR(100) |
| user_agent | TEXT |
| login_at | DATETIME |
| last_activity_at | DATETIME |
| expires_at | DATETIME |
| revoked_at | DATETIME (Nullable) |
| created_at | DATETIME |

---

# auth_refresh_tokens

| Field | Recommended Type |
|--------|------------------|
| refresh_token_id | INTEGER |
| session_id | INTEGER |
| refresh_token | VARCHAR(255) |
| expires_at | DATETIME |
| revoked_at | DATETIME (Nullable) |
| created_at | DATETIME |

---

# auth_login_history

| Field | Recommended Type |
|--------|------------------|
| login_history_id | INTEGER |
| auth_account_id | INTEGER |
| login_method | VARCHAR(20) |
| ip_address | VARCHAR(45) |
| device_name | VARCHAR(150) |
| browser | VARCHAR(100) |
| operating_system | VARCHAR(100) |
| country | VARCHAR(100) |
| city | VARCHAR(100) |
| login_at | DATETIME |

---

# auth_security_logs

| Field | Recommended Type |
|--------|------------------|
| security_log_id | INTEGER |
| auth_account_id | INTEGER |
| event_type | VARCHAR(50) |
| severity | VARCHAR(20) |
| ip_address | VARCHAR(45) |
| description | TEXT |
| event_time | DATETIME |
| created_at | DATETIME |

---

# auth_account_status

| Field | Recommended Type |
|--------|------------------|
| status_id | INTEGER |
| auth_account_id | INTEGER |
| status | VARCHAR(30) |
| reason | TEXT |
| changed_at | DATETIME |
| created_at | DATETIME |

---

# auth_audit_logs

| Field | Recommended Type |
|--------|------------------|
| audit_log_id | INTEGER |
| auth_account_id | INTEGER |
| action | VARCHAR(50) |
| performed_by | VARCHAR(100) |
| description | TEXT |
| ip_address | VARCHAR(45) |
| created_at | DATETIME |

---

# Standard Field Types

## Primary Keys

```text
INTEGER
```

Auto-increment integer IDs for internal relationships.

---

## UUID

```text
TEXT
```

Example:

```text
550e8400-e29b-41d4-a716-446655440000
```

Used as public-facing identifiers.

---

## Email

```text
VARCHAR(255)
```

Example:

```text
user@example.com
```

---

## Password Hash

```text
TEXT
```

Stores only hashed passwords (Argon2id or bcrypt).

---

## Tokens

```text
VARCHAR(255)
```

Examples:

- Verification Token
- Refresh Token
- Reset Token
- Session Token

---

## URLs

```text
TEXT
```

Example:

```text
https://lh3.googleusercontent.com/...
```

---

## IP Address

```text
VARCHAR(45)
```

Supports both IPv4 and IPv6.

Examples:

```text
192.168.1.10

2405:201:3000:abcd::1
```

---

## Status Values

```text
VARCHAR(30)
```

Examples:

- active
- pending_verification
- suspended
- blocked
- deleted

---

## Authentication Providers

```text
VARCHAR(20)
```

Supported values:

- email
- google

---

## Login Methods

```text
VARCHAR(20)
```

Examples:

- email
- google

---

## Security Severity

```text
VARCHAR(20)
```

Examples:

- low
- medium
- high
- critical

---

## Date & Time

Use UTC timestamps in ISO 8601 format.

SQLite Example:

```text
2026-07-03T10:15:30Z
```

---

# Nullable Fields

Examples of nullable fields:

| Field | Reason |
|--------|--------|
| deleted_at | Record not deleted |
| verified_at | Email not yet verified |
| revoked_at | Session/token still active |
| used_at | Reset token not yet used |
| reason | Optional status description |

---

# Recommended Constraints

| Field | Constraint |
|--------|------------|
| email | UNIQUE, NOT NULL |
| google_user_id | UNIQUE |
| uuid | UNIQUE |
| session_token | UNIQUE |
| refresh_token | UNIQUE |
| verification_token | UNIQUE |
| reset_token | UNIQUE |

---

# Best Practices

- Use `INTEGER` for internal IDs.
- Use UUIDs for public references.
- Store timestamps in UTC.
- Never store plain-text passwords.
- Keep password hashes in `TEXT`.
- Use `VARCHAR(255)` for emails and tokens.
- Index frequently searched fields (`email`, `google_user_id`, `session_token`).
- Apply `NOT NULL` where appropriate.
- Use `UNIQUE` constraints to prevent duplicate identities and tokens.

---

# Status

**Schema:** Authentication Schema

**Version:** 1.0.0

**Purpose:** Standard Data Type Reference

**Supported Databases:**

- SQLite
- PostgreSQL
- MySQL

**Status:** Production Ready