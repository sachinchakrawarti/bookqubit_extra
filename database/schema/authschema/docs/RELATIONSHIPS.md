# Authentication Schema Relationships

## Overview

This document describes the relationships between tables in the **Authentication Schema (`authschema`)**.

The schema is designed around a single authentication account for each user while supporting multiple login sessions, password recovery, Google authentication, and authentication auditing.

---

# Relationship Summary

| Parent Table | Child Table | Relationship |
|--------------|-------------|--------------|
| users | auth_accounts | One-to-One (1:1) |
| auth_accounts | auth_credentials | One-to-One (1:1) |
| auth_accounts | auth_google_accounts | One-to-One (0..1) |
| auth_accounts | auth_email_verification | One-to-Many (1:N) |
| auth_accounts | auth_password_resets | One-to-Many (1:N) |
| auth_accounts | auth_sessions | One-to-Many (1:N) |
| auth_sessions | auth_refresh_tokens | One-to-One (1:1) |
| auth_accounts | auth_login_history | One-to-Many (1:N) |
| auth_accounts | auth_security_logs | One-to-Many (1:N) |
| auth_accounts | auth_account_status | One-to-One (1:1) |
| auth_accounts | auth_audit_logs | One-to-Many (1:N) |

---

# Relationship Diagram

```text
users
  │
  │ 1 : 1
  ▼
auth_accounts
  │
  ├──────────────┐
  │              │
  ▼              ▼
auth_credentials auth_google_accounts
  │
  ├──────────────┐
  │              │
  ▼              ▼
email_verification
password_resets
  │
  ▼
auth_sessions
  │
  ├──────────────┐
  │              │
  ▼              ▼
refresh_tokens  login_history
                     │
                     ▼
              security_logs
                     │
                     ▼
                audit_logs

auth_accounts
      │
      ▼
account_status
```

---

# Individual Relationships

## users → auth_accounts

### Relationship

```text
1 User
      │
      ▼
1 Authentication Account
```

### Type

**One-to-One**

### Description

Every user has exactly one authentication account.

---

## auth_accounts → auth_credentials

### Relationship

```text
1 Account
      │
      ▼
1 Credential Record
```

### Type

**One-to-One**

### Description

Stores the email address and hashed password used for Email + Password authentication.

---

## auth_accounts → auth_google_accounts

### Relationship

```text
1 Account
      │
      ▼
0 or 1 Google Account
```

### Type

**Optional One-to-One**

### Description

Only users who authenticate with Google will have a corresponding record.

---

## auth_accounts → auth_email_verification

### Relationship

```text
1 Account
      │
      ▼
Multiple Verification Records
```

### Type

**One-to-Many**

### Description

A user may request multiple email verification links over time.

---

## auth_accounts → auth_password_resets

### Relationship

```text
1 Account
      │
      ▼
Multiple Password Reset Requests
```

### Type

**One-to-Many**

### Description

Each password reset request is stored independently.

---

## auth_accounts → auth_sessions

### Relationship

```text
1 Account
      │
      ▼
Multiple Sessions
```

### Type

**One-to-Many**

### Description

Users can be logged in on multiple devices simultaneously.

Examples:

- Desktop
- Mobile
- Tablet

---

## auth_sessions → auth_refresh_tokens

### Relationship

```text
1 Session
      │
      ▼
1 Refresh Token
```

### Type

**One-to-One**

### Description

Each active session has one refresh token used to renew authentication.

---

## auth_accounts → auth_login_history

### Relationship

```text
1 Account
      │
      ▼
Many Login Records
```

### Type

**One-to-Many**

### Description

Each successful login is stored for auditing and account activity.

---

## auth_accounts → auth_security_logs

### Relationship

```text
1 Account
      │
      ▼
Many Security Events
```

### Type

**One-to-Many**

### Description

Security logs capture authentication-related events.

Examples:

- Failed Login
- Password Change
- Email Verification
- Password Reset
- Session Revoked

---

## auth_accounts → auth_account_status

### Relationship

```text
1 Account
      │
      ▼
1 Status Record
```

### Type

**One-to-One**

### Description

Stores the current state of the account.

Possible values:

- Active
- Pending Verification
- Suspended
- Blocked
- Deleted

---

## auth_accounts → auth_audit_logs

### Relationship

```text
1 Account
      │
      ▼
Many Audit Records
```

### Type

**One-to-Many**

### Description

Audit logs record important authentication actions.

Examples:

- Account Created
- Login
- Logout
- Password Updated
- Email Changed

---

# Cardinality Overview

```text
users
    │
    └───1────────────1────────── auth_accounts
                                     │
                ┌────────────────────┼────────────────────┐
                │                    │                    │
              1 │                  0..1                  1
                ▼                    ▼                    ▼
auth_credentials      auth_google_accounts      auth_account_status

                                     │
                                     │1
                                     ▼
                          auth_sessions (N)
                                     │
                                     ▼
                           auth_refresh_tokens (1)

auth_accounts
     │
     ├────────────► auth_email_verification (N)
     ├────────────► auth_password_resets (N)
     ├────────────► auth_login_history (N)
     ├────────────► auth_security_logs (N)
     └────────────► auth_audit_logs (N)
```

---

# Foreign Key Overview

| Child Table | References |
|-------------|------------|
| auth_accounts | users.user_id |
| auth_credentials | auth_accounts.auth_account_id |
| auth_google_accounts | auth_accounts.auth_account_id |
| auth_email_verification | auth_accounts.auth_account_id |
| auth_password_resets | auth_accounts.auth_account_id |
| auth_sessions | auth_accounts.auth_account_id |
| auth_refresh_tokens | auth_sessions.session_id |
| auth_login_history | auth_accounts.auth_account_id |
| auth_security_logs | auth_accounts.auth_account_id |
| auth_account_status | auth_accounts.auth_account_id |
| auth_audit_logs | auth_accounts.auth_account_id |

---

# Design Principles

The relationship model follows these principles:

- One authentication account per user.
- Authentication is independent of user profile data.
- Multiple concurrent sessions are supported.
- Authentication history is never overwritten.
- Security events are stored separately from audit records.
- Google authentication is optional.
- Password recovery is fully independent from active sessions.
- The model is extensible for future authentication providers.

---

# Future Relationship Extensions

The current relationship model can be expanded to include:

| Future Table | Parent |
|--------------|--------|
| auth_passkeys | auth_accounts |
| auth_mfa | auth_accounts |
| auth_trusted_devices | auth_sessions |
| auth_api_keys | auth_accounts |
| auth_oauth_providers | auth_accounts |

These additions can be introduced without changing the existing relationships.

---

# Status

**Schema:** Authentication Schema

**Version:** 1.0.0

**Total Relationships:** 11

**Relationship Model:** Normalized (3NF)

**Database Compatibility:**

- SQLite
- PostgreSQL
- MySQL

**Status:** Production Ready