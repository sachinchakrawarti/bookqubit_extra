-- =============================================================================
-- BookQubit Database
-- File: 02_create_tables.sql
-- Purpose: Create all database tables
-- Database: SQLite
-- Version: 1.0.0
-- =============================================================================

PRAGMA foreign_keys = OFF;

-- =============================================================================
-- AUTH SCHEMA
-- =============================================================================

.read ../schema/authschema/auth_accounts/auth_accounts.sql
.read ../schema/authschema/auth_credentials/auth_credentials.sql
.read ../schema/authschema/auth_google_accounts/auth_google_accounts.sql
.read ../schema/authschema/auth_email_verification/auth_email_verification.sql
.read ../schema/authschema/auth_password_resets/auth_password_resets.sql
.read ../schema/authschema/auth_sessions/auth_sessions.sql
.read ../schema/authschema/auth_refresh_tokens/auth_refresh_tokens.sql
.read ../schema/authschema/auth_login_history/auth_login_history.sql
.read ../schema/authschema/auth_security_logs/auth_security_logs.sql
.read ../schema/authschema/auth_account_status/auth_account_status.sql
.read ../schema/authschema/auth_audit_logs/auth_audit_logs.sql

-- =============================================================================
-- USER SCHEMA
-- =============================================================================

.read ../schema/userschema/users/users.sql

-- Add remaining user tables here...

-- =============================================================================
-- BOOK SCHEMA
-- =============================================================================

.read ../schema/bookschema/books/books.sql
.read ../schema/bookschema/book_authors/book_authors.sql
.read ../schema/bookschema/book_publishers/book_publishers.sql
.read ../schema/bookschema/book_categories/book_categories.sql
.read ../schema/bookschema/book_genres/book_genres.sql
.read ../schema/bookschema/book_tags/book_tags.sql
.read ../schema/bookschema/book_subjects/book_subjects.sql
.read ../schema/bookschema/book_formats/book_formats.sql
.read ../schema/bookschema/book_series/book_series.sql
.read ../schema/bookschema/book_collections/book_collections.sql
.read ../schema/bookschema/book_awards/book_awards.sql
.read ../schema/bookschema/book_links/book_links.sql
.read ../schema/bookschema/book_media/book_media.sql
.read ../schema/bookschema/book_statistics/book_statistics.sql
.read ../schema/bookschema/book_ratings/book_ratings.sql
.read ../schema/bookschema/book_reviews/book_reviews.sql
.read ../schema/bookschema/book_translations/book_translations.sql
.read ../schema/bookschema/book_editions/book_editions.sql

-- =============================================================================
-- ACADEMIC SCHEMA
-- =============================================================================

-- .read ../schema/academicschema/...

-- =============================================================================
-- USER INTERACTION SCHEMA
-- =============================================================================

-- .read ../schema/userinteractionschema/...

-- =============================================================================
-- TRADING SCHEMA
-- =============================================================================

-- .read ../schema/tradingschema/...

PRAGMA foreign_keys = ON;

SELECT 'All tables created successfully.' AS status;