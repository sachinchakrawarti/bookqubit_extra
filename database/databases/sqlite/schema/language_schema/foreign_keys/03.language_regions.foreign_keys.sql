-- ============================================================================
-- File: 03.language_regions.foreign_keys.sql
-- Schema: language_schema
-- Table : language_regions
-- Purpose: Foreign key definitions for language_regions
-- Database: SQLite
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ============================================================================
-- FOREIGN KEYS
-- ============================================================================

/*

language_regions
----------------

language_region_id    INTEGER PRIMARY KEY AUTOINCREMENT,

language_id           INTEGER NOT NULL,
country_id            INTEGER NOT NULL,

region_type           TEXT DEFAULT 'official',

is_official           INTEGER DEFAULT 0,
is_primary            INTEGER DEFAULT 0,
is_active             INTEGER DEFAULT 1,

sort_order            INTEGER DEFAULT 0,

created_at            TEXT DEFAULT CURRENT_TIMESTAMP,
updated_at            TEXT DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (language_id)
    REFERENCES languages(language_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

FOREIGN KEY (country_id)
    REFERENCES countries(country_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE

*/

-- ============================================================================
-- Relationship
-- ============================================================================
--
-- languages (1)
--      │
--      ├──────────────┐
--      │              │
--      ▼              ▼
-- language_regions    countries
--
-- One language can exist in many countries.
-- One country can contain many languages.
--
-- This is a many-to-many relationship.
--
-- ============================================================================

-- Example
--
-- English  → United States
-- English  → United Kingdom
-- English  → Canada
-- English  → Australia
--
-- French   → France
-- French   → Canada
-- French   → Belgium
--
-- Hindi    → India
--
-- Urdu     → Pakistan
-- Urdu     → India
--
-- Spanish  → Spain
-- Spanish  → Mexico
-- Spanish  → Argentina
--
-- ============================================================================

-- Referenced Tables
--
-- languages(language_id)
-- countries(country_id)
--
-- ============================================================================

-- End of File
-- ============================================================================