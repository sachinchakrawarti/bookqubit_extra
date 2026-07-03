-- =============================================================================
-- BookQubit Database
-- Schema: Author Schema
-- Table: authors
-- File: authors.sql
-- Description: Master author table
-- Database: SQLite
-- =============================================================================

DROP TABLE IF EXISTS authors;

CREATE TABLE authors (

    author_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid           TEXT NOT NULL UNIQUE,
    slug           TEXT NOT NULL UNIQUE,
    status         TEXT DEFAULT 'active',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP

);