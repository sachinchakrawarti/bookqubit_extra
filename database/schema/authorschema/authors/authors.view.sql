-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- File: authors.view.sql
-- Table: authors
-- Description: Views for authors
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Remove Existing Views
-- ============================================================================

DROP VIEW IF EXISTS v_authors_public;
DROP VIEW IF EXISTS v_authors_active;
DROP VIEW IF EXISTS v_authors_verified;
DROP VIEW IF EXISTS v_authors_popular;
DROP VIEW IF EXISTS v_authors_recent;
DROP VIEW IF EXISTS v_authors_deceased;
DROP VIEW IF EXISTS v_authors_living;

-- ============================================================================
-- Public Authors
-- ============================================================================

CREATE VIEW v_authors_public AS
SELECT *
FROM authors
WHERE
    visibility = 'public'
    AND status = 'active'
    AND deleted_at IS NULL;

-- ============================================================================
-- Active Authors
-- ============================================================================

CREATE VIEW v_authors_active AS
SELECT *
FROM authors
WHERE
    status = 'active'
    AND deleted_at IS NULL;

-- ============================================================================
-- Verified Authors
-- ============================================================================

CREATE VIEW v_authors_verified AS
SELECT *
FROM authors
WHERE
    verified = 1
    AND status = 'active'
    AND deleted_at IS NULL;

-- ============================================================================
-- Popular Authors
-- Based on total published works
-- ============================================================================

CREATE VIEW v_authors_popular AS
SELECT
    *,
    (book_count + comic_count) AS total_works
FROM authors
WHERE
    status = 'active'
    AND deleted_at IS NULL
ORDER BY total_works DESC;

-- ============================================================================
-- Recently Added Authors
-- ============================================================================

CREATE VIEW v_authors_recent AS
SELECT *
FROM authors
WHERE deleted_at IS NULL
ORDER BY created_at DESC;

-- ============================================================================
-- Living Authors
-- ============================================================================

CREATE VIEW v_authors_living AS
SELECT *
FROM authors
WHERE
    death_date IS NULL
    AND deleted_at IS NULL;

-- ============================================================================
-- Deceased Authors
-- ============================================================================

CREATE VIEW v_authors_deceased AS
SELECT *
FROM authors
WHERE
    death_date IS NOT NULL
    AND deleted_at IS NULL;