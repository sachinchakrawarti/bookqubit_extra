# Authentication Schema Data Fields

## Overview

This document defines the standard data fields used across the **Authentication Schema (`authschema`)**.

It serves as a reference for database developers, backend developers, API designers, and maintainers.

---

# Common Field Standards

Most tables follow these conventions:

### Primary Key

```text
id
```

or

```text
<entity>_id
```

Example

```text
auth_account_id
session_id
credential_id
```

---

### Foreign Key

```text
user_id

auth_account_id

session_id
```

---

### UUID

```text
uuid
```

Globally unique identifier.

---

### Timestamps

```text
created_at

updated_at

deleted_at
```

---

# auth_accounts

| Field | Description |
|--------|-------------|
| auth_account_id | Primary key |
| user_id | Linked user |
| uuid | Public unique identifier |
| auth_provider | email, google |
| account_status | Current account status |
| last_login_at | Last successful login |
| created_at | Record creation time |
| updated_at | Last update time |
| deleted_at | Soft delete timestamp |

---

# auth_credentials

| Field | Description |
|--------|-------------|
| credential_id | Primary key |
| auth_account_id | Parent authentication account |
| email | User email |
| password_hash | Secure password hash |
| password_algorithm | bcrypt / Argon2id |
| password_updated_at | Last password change |
| created_at | Creation timestamp |
| updated_at | Last update |

---

# auth_google_accounts

| Field | Description |
|--------|-------------|
| google_account_id | Primary key |
| auth_account_id | Parent account |
| google_user_id | Google unique ID |
| google_email | Google email |
| google_name | Display name |
| avatar_url | Google profile image |
| email_verified | Google verification status |
| linked_at | Account linking time |
| created_at | Creation timestamp |

---

# auth_email_verification

| Field | Description |
|--------|-------------|
| verification_id | Primary key |
| auth_account_id | Parent account |
| email | Email being verified |
| verification_token | Verification token |
| expires_at | Expiration date |
| verified_at | Verification time |
| created_at | Creation timestamp |

---

# auth_password_resets

| Field | Description |
|--------|-------------|
| reset_id | Primary key |
| auth_account_id | Parent account |
| reset_token | Reset token |
| expires_at | Expiration time |
| used_at | Token usage time |
| created_at | Request time |

---

# auth_sessions

| Field | Description |
|--------|-------------|
| session_id | Primary key |
| auth_account_id | Parent account |
| session_token | Session identifier |
| ip_address | Login IP |
| device_name | Device name |
| browser | Browser |
| operating_system | Operating system |
| user_agent | Browser user agent |
| login_at | Login timestamp |
| expires_at | Session expiry |
| last_activity_at | Last activity |
| revoked_at | Session revocation |
| created_at | Creation timestamp |

---

# auth_refresh_tokens

| Field | Description |
|--------|-------------|
| refresh_token_id | Primary key |
| session_id | Linked session |
| refresh_token | Refresh token |
| expires_at | Expiration |
| revoked_at | Revocation timestamp |
| created_at | Creation timestamp |

---

# auth_login_history

| Field | Description |
|--------|-------------|
| login_history_id | Primary key |
| auth_account_id | Parent account |
| login_method | email, google |
| ip_address | Login IP |
| device_name | Device |
| browser | Browser |
| operating_system | Operating system |
| country | Country |
| city | City |
| login_at | Login timestamp |

---

# auth_security_logs

| Field | Description |
|--------|-------------|
| security_log_id | Primary key |
| auth_account_id | Parent account |
| event_type | Security event |
| severity | Low, Medium, High, Critical |
| ip_address | Event IP |
| description | Event details |
| event_time | Event timestamp |
| created_at | Creation timestamp |

---

# auth_account_status

| Field | Description |
|--------|-------------|
| status_id | Primary key |
| auth_account_id | Parent account |
| status | Active, Suspended, Blocked |
| reason | Optional explanation |
| changed_at | Status change time |
| created_at | Creation timestamp |

---

# auth_audit_logs

| Field | Description |
|--------|-------------|
| audit_log_id | Primary key |
| auth_account_id | Parent account |
| action | Audit action |
| performed_by | User/System |
| description | Action description |
| ip_address | Request IP |
| created_at | Action timestamp |

---

# Authentication Provider Values

```text
email

google
```

---

# Login Methods

```text
email

google
```

---

# Account Status Values

```text
active

pending_verification

suspended

blocked

deleted
```

---

# Password Algorithms

Recommended values:

```text
argon2id

bcrypt
```

---

# Security Event Types

```text
login_success

login_failed

logout

password_changed

password_reset

email_verified

google_login

session_revoked

account_created

account_deleted
```

---

# Audit Actions

```text
create_account

login

logout

update_password

verify_email

reset_password

change_email

suspend_account

delete_account
```

---

# Timestamp Fields

| Field | Purpose |
|--------|---------|
| created_at | Record creation |
| updated_at | Record update |
| deleted_at | Soft delete |
| login_at | Login time |
| last_login_at | Last login |
| last_activity_at | Last session activity |
| expires_at | Expiration |
| verified_at | Email verification |
| linked_at | Google account linked |
| changed_at | Status changed |
| revoked_at | Session/token revoked |

---

# Naming Conventions

## Primary Keys

```text
auth_account_id

credential_id

session_id

audit_log_id
```

---

## Foreign Keys

```text
user_id

auth_account_id

session_id
```

---

## Boolean Fields

```text
email_verified

is_active

is_revoked
```

---

## Date & Time Fields

Use UTC timestamps.

Examples:

```text
created_at

updated_at

expires_at
```

---

# Best Practices

- Use UUIDs for public identifiers.
- Store passwords only as secure hashes.
- Never store plain-text passwords.
- Record authentication events for auditing.
- Use foreign keys to maintain integrity.
- Index frequently queried fields such as `email`, `auth_account_id`, and `session_token`.
- Store timestamps in UTC.
- Keep authentication data separate from user profile information.

---

# Status

**Schema:** Authentication Schema

**Version:** 1.0.0

**Total Tables:** 11

**Purpose:** Standard Field Reference

**Database Compatibility:**

- SQLite
- PostgreSQL
- MySQL