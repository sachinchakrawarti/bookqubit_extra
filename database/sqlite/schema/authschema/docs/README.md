# Authentication Schema (authschema)

## Overview

The **Authentication Schema (`authschema`)** manages user authentication, account security, and login sessions for the BookQubit platform.

Its responsibility is to verify user identity and manage authentication-related data. It does **not** store user profile information, book data, or user interactions.

BookQubit currently supports two authentication methods:

- **Email + Password**
- **Google Sign-In (OAuth 2.0)**

The schema is designed to be secure, modular, and scalable, allowing additional authentication methods to be added in the future without major architectural changes.

---

# Objectives

The Authentication Schema provides:

- User registration
- User login
- Secure password storage
- Google authentication
- Email verification
- Password reset
- Login session management
- Authentication audit logs
- Security event logging
- Account status management

---

# Supported Authentication Methods

## Email & Password

Users register using:

- Name
- Email Address
- Password

Passwords are securely hashed before being stored.

---

## Google Sign-In

Users can authenticate using their Google account.

The backend validates the Google ID Token before creating or logging into an account.

---

# Directory Structure

```text
authschema/
│
├── auth_accounts/
├── auth_credentials/
├── auth_google_accounts/
├── auth_email_verification/
├── auth_password_resets/
├── auth_sessions/
├── auth_refresh_tokens/
├── auth_login_history/
├── auth_security_logs/
├── auth_account_status/
├── auth_audit_logs/
│
├── docs/
│   ├── README.md
│   ├── ER_DIAGRAM.md
│   ├── TABLES.md
│   ├── RELATIONSHIPS.md
│   ├── DATA_FIELDS.md
│   ├── DATA_TYPES.md
│   ├── API_GUIDE.md
│   ├── AUTH_FLOW.md
│   ├── GOOGLE_OAUTH_GUIDE.md
│   ├── EMAIL_AUTH_GUIDE.md
│   ├── PASSWORD_GUIDE.md
│   ├── SESSION_GUIDE.md
│   ├── TOKEN_GUIDE.md
│   ├── EMAIL_VERIFICATION_GUIDE.md
│   ├── PASSWORD_RESET_GUIDE.md
│   ├── ACCOUNT_STATUS_GUIDE.md
│   ├── SECURITY_GUIDE.md
│   ├── VALIDATION_GUIDE.md
│   ├── MIGRATION_GUIDE.md
│   ├── INDEX_GUIDE.md
│   ├── VIEW_GUIDE.md
│   ├── TRIGGER_GUIDE.md
│   ├── JSON_SEED_GUIDE.md
│   ├── BACKUP_GUIDE.md
│   ├── VERSIONING_GUIDE.md
│   ├── BEST_PRACTICES.md
│   ├── FAQ.md
│   ├── GLOSSARY.md
│   ├── DUMMY_TABLES.md
│   ├── ROADMAP.md
│   └── CHANGELOG.md
│
├── README.md
├── CHANGELOG.md
└── ROADMAP.md
```

---

# Core Tables

| Table | Purpose |
|--------|---------|
| auth_accounts | Master authentication account |
| auth_credentials | Email and hashed password |
| auth_google_accounts | Google account mapping |
| auth_email_verification | Email verification records |
| auth_password_resets | Password reset requests |
| auth_sessions | Active login sessions |
| auth_refresh_tokens | Refresh token storage |
| auth_login_history | User login history |
| auth_security_logs | Authentication security events |
| auth_account_status | Account state management |
| auth_audit_logs | Authentication audit trail |

---

# Authentication Flow

## Email Authentication

```text
User
    │
    ▼
Register
    │
    ▼
Hash Password
    │
    ▼
Store Credentials
    │
    ▼
Verify Email
    │
    ▼
Login
    │
    ▼
Create Session
```

---

## Google Authentication

```text
User
    │
    ▼
Google Sign-In
    │
    ▼
Verify Google Token
    │
    ▼
Create Account (First Login)
    │
    ▼
Create Session
```

---

# Schema Responsibilities

The Authentication Schema manages:

- Authentication accounts
- Password authentication
- Google OAuth authentication
- Login sessions
- Refresh tokens
- Email verification
- Password reset
- Authentication history
- Security logs
- Account status
- Authentication auditing

---

# What This Schema Does NOT Store

The following data belongs in other schemas:

| Schema | Responsibility |
|--------|----------------|
| userschema | User profiles and personal information |
| bookschema | Books and book metadata |
| userinteractionschema | Reviews, ratings, bookmarks, reading progress |
| permissionschema | Roles and permissions |
| notificationschema | User notifications |

---

# Security Features

- Password hashing (Argon2id or bcrypt)
- Parameterized SQL queries
- Secure session management
- Email verification
- Password reset tokens
- Audit logging
- Security event tracking
- Account status management
- HTTPS-only authentication endpoints

---

# Database Compatibility

The Authentication Schema is designed for:

- SQLite
- PostgreSQL
- MySQL

---

# Documentation

Detailed documentation is available in the `docs/` directory:

- Architecture
- Tables
- Relationships
- API Reference
- Authentication Flow
- Security
- Validation
- Migrations
- Indexes
- Best Practices
- Version History
- Roadmap
- FAQ

---

# Future Enhancements

Planned features include:

- Multi-Factor Authentication (MFA)
- Passkey (WebAuthn) support
- Apple Sign-In
- GitHub Login
- Microsoft Login
- Trusted devices
- Session dashboard
- Login notifications
- Device management
- Risk-based authentication

---

# Version

**Schema:** Authentication Schema

**Version:** 1.0.0

**Authentication Methods:**

- ✅ Email + Password
- ✅ Google Sign-In

**Status:** Production Ready

**License:** BookQubit Internal Database Schema