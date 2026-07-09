-- ============================================================================
-- File       : 01.author.table.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Creates the main author table.
-- ============================================================================

CREATE TABLE IF NOT EXISTS author (

    -- Primary Key
    author_id      INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Personal Information
    gender         TEXT,

    -- Life Dates (ISO 8601: YYYY-MM-DD)
    birth_date     TEXT,
    death_date     TEXT

);