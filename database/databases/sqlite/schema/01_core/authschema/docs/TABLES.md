# Authentication Schema Tables

## Overview

This document describes all tables included in the **Authentication Schema (`authschema`)** for the BookQubit platform.

The schema is responsible for authentication, login sessions, account security, email verification, password recovery, and authentication auditing.

It supports two authentication methods:

- **Email + Password**
- **Google Sign-In (OAuth 2.0)**

---

# Table Summary

| Table | Purpose | Status |
|--------|---------|--------|
| auth_accounts | Master authentication account | ✅ Planned |
| auth_credentials | Email and password credentials | ✅ Planned |
| auth_google_accounts | Google OAuth account mapping | ✅ Planned |
| auth_email_verification | Email verification records | ✅ Planned |
| auth_password_resets | Password reset requests | ✅ Planned |
| auth_sessions | Active user sessions | ✅ Planned |
| auth_refresh_tokens | Refresh token management | ✅ Planned |
| auth_login_history | Login history | ✅ Planned |
| auth_security_logs | Authentication security events | ✅ Planned |
| auth_account_status | Account status management | ✅ Planned |
| auth_audit_logs | Authentication audit logs | ✅ Planned |

---

# Table Details

## auth_accounts

### Purpose

The central table for every authentication account.

Each record represents one authentication identity linked to one user.

### Primary Key

```text
auth_account_id
```

### Relationships

- users
- auth_credentials
- auth_google_accounts
- auth_sessions
- auth_account_status

---

## auth_credentials

### Purpose

Stores credentials for Email + Password authentication.

### Stores

- Email
- Password Hash
- Password Updated Date

### Authentication

Email Login

---

## auth_google_accounts

### Purpose

Stores Google OAuth account information.

### Stores

- Google User ID
- Google Email
- Google Name
- Google Avatar
- Google Profile URL

### Authentication

Google Sign-In

---

## auth_email_verification

### Purpose

Stores email verification requests and verification tokens.

### Used For

- Email verification
- Resend verification
- Verification expiry

---

## auth_password_resets

### Purpose

Stores password reset requests.

### Used For

- Forgot Password
- Reset Password
- Token validation
- Token expiration

---

## auth_sessions

### Purpose

Stores active login sessions.

### Typical Data

- Session ID
- Device
- Browser
- IP Address
- Login Time
- Last Activity
- Expiration Time

---

## auth_refresh_tokens

### Purpose

Stores refresh tokens for authenticated sessions.

### Used For

- Session renewal
- Access token refresh
- Logout invalidation

---

## auth_login_history

### Purpose

Stores successful login history.

### Example Information

- Login Time
- Device
- Browser
- IP Address
- Country
- Authentication Method

---

## auth_security_logs

### Purpose

Stores security-related authentication events.

### Example Events

- Failed Login
- Password Changed
- Email Verified
- Password Reset
- Google Login
- Session Revoked

---

## auth_account_status

### Purpose

Stores the current status of an authentication account.

### Possible Statuses

- active
- pending_verification
- suspended
- blocked
- deleted

---

## auth_audit_logs

### Purpose

Stores audit records for authentication activities.

### Example Actions

- Account Created
- Login
- Logout
- Password Updated
- Email Changed
- Account Suspended

---

# Relationship Overview

```text
users
    │
    ▼
auth_accounts
    │
    ├───────────────► auth_credentials
    ├───────────────► auth_google_accounts
    ├───────────────► auth_email_verification
    ├───────────────► auth_password_resets
    ├───────────────► auth_sessions
    ├───────────────► auth_login_history
    ├───────────────► auth_security_logs
    ├───────────────► auth_account_status
    └───────────────► auth_audit_logs

auth_sessions
        │
        ▼
auth_refresh_tokens
```

---

# Authentication Coverage

| Feature | Table |
|---------|-------|
| Email Login | auth_credentials |
| Google Login | auth_google_accounts |
| Email Verification | auth_email_verification |
| Forgot Password | auth_password_resets |
| Active Sessions | auth_sessions |
| Refresh Tokens | auth_refresh_tokens |
| Login History | auth_login_history |
| Security Monitoring | auth_security_logs |
| Account Status | auth_account_status |
| Authentication Auditing | auth_audit_logs |

---

# Table Categories

## Core Authentication

- auth_accounts
- auth_credentials
- auth_google_accounts

---

## Account Recovery

- auth_email_verification
- auth_password_resets

---

## Session Management

- auth_sessions
- auth_refresh_tokens

---

## Monitoring & Security

- auth_login_history
- auth_security_logs
- auth_account_status
- auth_audit_logs

---

# Database Design Principles

The Authentication Schema follows these principles:

- One authentication account per user
- Separate credential storage
- Optional Google authentication
- Secure password hashing
- Multiple concurrent sessions
- Complete authentication audit trail
- Security event logging
- Modular table design
- Future extensibility

---

# Future Tables (Optional)

Possible future additions include:

- auth_mfa
- auth_passkeys
- auth_trusted_devices
- auth_device_management
- auth_login_notifications
- auth_oauth_providers
- auth_api_keys

These are not required for the current authentication model but can be added without changing the core architecture.

---

# Status

**Schema:** Authentication Schema

**Version:** 1.0.0

**Authentication Methods:**

- ✅ Email + Password
- ✅ Google Sign-In

**Total Tables:** **11**

**Database Compatibility:**

- SQLite
- PostgreSQL
- MySQL

**Implementation Status:** Ready for Development