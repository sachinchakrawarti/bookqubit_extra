# Authentication Schema ER Diagram

## Overview

This document describes the **Entity Relationship (ER) Diagram** for the **Authentication Schema (`authschema`)**.

The Authentication Schema is responsible for user authentication, credential management, Google OAuth integration, login sessions, password recovery, and authentication auditing.

It works together with the **User Schema (`userschema`)**, which stores user profile information.

---

# High-Level Architecture

```text
                    +------------------+
                    |      users       |
                    +------------------+
                             |
                             | 1 : 1
                             |
                             ▼
                    +----------------------+
                    |    auth_accounts     |
                    +----------------------+
                             |
         +-------------------+-------------------+
         |                   |                   |
         ▼                   ▼                   ▼
+----------------+   +------------------+   +----------------------+
|auth_credentials|   |auth_google_      |   |auth_account_status   |
|                |   |accounts          |   |                      |
+----------------+   +------------------+   +----------------------+
         |
         |
         ▼
+----------------------+
|auth_email_           |
|verification          |
+----------------------+

         |
         ▼
+----------------------+
|auth_password_resets  |
+----------------------+

         |
         ▼
+----------------------+
|auth_sessions         |
+----------------------+
         |
         +----------------------+
         |                      |
         ▼                      ▼
+----------------------+  +----------------------+
|auth_refresh_tokens   |  |auth_login_history    |
+----------------------+  +----------------------+
                                |
                                ▼
                     +----------------------+
                     |auth_security_logs    |
                     +----------------------+
                                |
                                ▼
                     +----------------------+
                     |auth_audit_logs       |
                     +----------------------+
```

---

# Entity Relationships

## users

Stores profile information.

Relationship:

```text
users (1)
      │
      │
      ▼
auth_accounts (1)
```

One user owns exactly one authentication account.

---

## auth_accounts

The central authentication table.

Connected tables:

- auth_credentials
- auth_google_accounts
- auth_account_status
- auth_sessions

---

## auth_credentials

Stores:

- Email
- Password Hash

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_credentials (1)
```

---

## auth_google_accounts

Stores:

- Google ID
- Google Email
- Avatar
- OAuth Metadata

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_google_accounts (0..1)
```

Only users using Google Sign-In will have a record.

---

## auth_email_verification

Stores email verification tokens.

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_email_verification (0..N)
```

---

## auth_password_resets

Stores password reset requests.

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_password_resets (0..N)
```

---

## auth_sessions

Stores active login sessions.

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_sessions (0..N)
```

A user may have multiple devices logged in simultaneously.

---

## auth_refresh_tokens

Stores refresh tokens.

Relationship:

```text
auth_sessions (1)
        │
        ▼
auth_refresh_tokens (1)
```

---

## auth_login_history

Stores every successful login.

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_login_history (0..N)
```

---

## auth_security_logs

Stores authentication security events.

Examples:

- Failed Login
- Password Changed
- Email Verified
- Google Login
- Password Reset

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_security_logs (0..N)
```

---

## auth_account_status

Stores account state.

Possible values:

- Active
- Pending Verification
- Suspended
- Blocked
- Deleted

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_account_status (1)
```

---

## auth_audit_logs

Stores authentication audit records.

Examples:

- Account Created
- Login
- Logout
- Password Changed
- Email Changed

Relationship:

```text
auth_accounts (1)
        │
        ▼
auth_audit_logs (0..N)
```

---

# Complete Relationship Diagram

```text
users
   │
   │ 1
   ▼
auth_accounts
   │
   ├──────────────┐
   │              │
   ▼              ▼
auth_credentials  auth_google_accounts
   │
   ├──────────────┐
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
refresh_tokens   login_history
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

# Cardinality Summary

| Parent | Child | Relationship |
|---------|-------|--------------|
| users | auth_accounts | 1 : 1 |
| auth_accounts | auth_credentials | 1 : 1 |
| auth_accounts | auth_google_accounts | 1 : 0..1 |
| auth_accounts | auth_email_verification | 1 : N |
| auth_accounts | auth_password_resets | 1 : N |
| auth_accounts | auth_sessions | 1 : N |
| auth_sessions | auth_refresh_tokens | 1 : 1 |
| auth_accounts | auth_login_history | 1 : N |
| auth_accounts | auth_security_logs | 1 : N |
| auth_accounts | auth_account_status | 1 : 1 |
| auth_accounts | auth_audit_logs | 1 : N |

---

# Design Principles

- Single authentication account per user
- Multiple login sessions supported
- Multiple password reset requests supported
- Google authentication is optional
- Authentication separated from user profile
- Audit logs preserved
- Security events recorded
- Easily extendable for future providers

---

# Future Expansion

The ER model can be extended with:

- Apple Sign-In
- GitHub OAuth
- Microsoft OAuth
- Multi-Factor Authentication (MFA)
- Passkeys (WebAuthn)
- Trusted Devices
- Device Management
- Login Notifications

without changing the existing relationships.

---

# Status

**Schema:** Authentication Schema

**Version:** 1.0.0

**Authentication Methods:**
- Email + Password
- Google Sign-In

**Database Compatibility:**
- SQLite
- PostgreSQL
- MySQL

**ER Diagram Status:** Production Ready