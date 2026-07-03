-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: authors
-- File: authors.trigger.sql
-- Description: Triggers for authors table
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Remove Existing Triggers
-- ============================================================================

DROP TRIGGER IF EXISTS trg_authors_updated_at;
DROP TRIGGER IF EXISTS trg_authors_soft_delete;
DROP TRIGGER IF EXISTS trg_authors_validate_dates;
DROP TRIGGER IF EXISTS trg_authors_validate_counts;

-- ============================================================================
-- Automatically Update updated_at
-- ============================================================================

CREATE TRIGGER trg_authors_updated_at
AFTER UPDATE ON authors
FOR EACH ROW
BEGIN
    UPDATE authors
    SET updated_at = CURRENT_TIMESTAMP
    WHERE author_id = OLD.author_id;
END;

-- ============================================================================
-- Validate Birth & Death Dates
-- Birth date cannot be after death date
-- ============================================================================

CREATE TRIGGER trg_authors_validate_dates
BEFORE INSERT ON authors
FOR EACH ROW
WHEN
    NEW.birth_date IS NOT NULL
    AND NEW.death_date IS NOT NULL
    AND NEW.birth_date > NEW.death_date
BEGIN
    SELECT RAISE(ABORT, 'Birth date cannot be later than death date.');
END;

-- ============================================================================
-- Validate Book & Comic Counts
-- ============================================================================

CREATE TRIGGER trg_authors_validate_counts
BEFORE INSERT ON authors
FOR EACH ROW
WHEN
    NEW.book_count < 0
    OR NEW.comic_count < 0
BEGIN
    SELECT RAISE(ABORT, 'Book count and comic count must be zero or greater.');
END;

-- ============================================================================
-- Soft Delete
-- Automatically set deleted_at when status becomes inactive
-- ============================================================================

CREATE TRIGGER trg_authors_soft_delete
AFTER UPDATE OF status ON authors
FOR EACH ROW
WHEN
    NEW.status = 'inactive'
    AND OLD.status <> 'inactive'
BEGIN
    UPDATE authors
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE author_id = NEW.author_id;
END;