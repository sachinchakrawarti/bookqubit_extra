-- =============================================================================
-- BookQubit Database
-- Schema: Language Schema
-- Table: languages
-- File: languages.index.sql
-- Description: Indexes for languages
-- Database: SQLite
-- =============================================================================

-- ============================================================================
-- Language Code
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_code
ON languages(code);

-- ============================================================================
-- Language Name
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_name
ON languages(name);

-- ============================================================================
-- Status
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_status
ON languages(status);

-- ============================================================================
-- Created Date
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_languages_created_at
ON languages(created_at);