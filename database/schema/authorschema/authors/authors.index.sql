-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: authors
-- File: authors.index.sql
-- Description: Indexes for authors table
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Primary Lookup
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_uuid
ON authors(uuid);

CREATE INDEX IF NOT EXISTS idx_authors_slug
ON authors(slug);

-- ============================================================================
-- Status & Visibility
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_status
ON authors(status);

CREATE INDEX IF NOT EXISTS idx_authors_visibility
ON authors(visibility);

CREATE INDEX IF NOT EXISTS idx_authors_verified
ON authors(verified);

CREATE INDEX IF NOT EXISTS idx_authors_status_visibility
ON authors(status, visibility);

-- ============================================================================
-- Nationality
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_nationality
ON authors(nationality);

CREATE INDEX IF NOT EXISTS idx_authors_country_code
ON authors(country_code);

CREATE INDEX IF NOT EXISTS idx_authors_country_status
ON authors(country_code, status);

-- ============================================================================
-- Profession
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_profession
ON authors(primary_profession);

-- ============================================================================
-- Career Timeline
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_active_from
ON authors(active_from);

CREATE INDEX IF NOT EXISTS idx_authors_active_to
ON authors(active_to);

CREATE INDEX IF NOT EXISTS idx_authors_birth_date
ON authors(birth_date);

CREATE INDEX IF NOT EXISTS idx_authors_death_date
ON authors(death_date);

-- ============================================================================
-- Statistics
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_book_count
ON authors(book_count);

CREATE INDEX IF NOT EXISTS idx_authors_comic_count
ON authors(comic_count);

-- ============================================================================
-- Timestamps
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_created_at
ON authors(created_at);

CREATE INDEX IF NOT EXISTS idx_authors_updated_at
ON authors(updated_at);

CREATE INDEX IF NOT EXISTS idx_authors_published_at
ON authors(published_at);

CREATE INDEX IF NOT EXISTS idx_authors_deleted_at
ON authors(deleted_at);

-- ============================================================================
-- Composite Indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_authors_verified_status
ON authors(verified, status);

CREATE INDEX IF NOT EXISTS idx_authors_visibility_status
ON authors(visibility, status);

CREATE INDEX IF NOT EXISTS idx_authors_profession_status
ON authors(primary_profession, status);

CREATE INDEX IF NOT EXISTS idx_authors_nationality_status
ON authors(nationality, status);

CREATE INDEX IF NOT EXISTS idx_authors_bookcount_status
ON authors(book_count, status);

CREATE INDEX IF NOT EXISTS idx_authors_comiccount_status
ON authors(comic_count, status);