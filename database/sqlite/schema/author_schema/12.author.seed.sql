-- ============================================================================
-- File       : 12.author.seed.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Seed data for the Author module.
-- ============================================================================

BEGIN TRANSACTION;

------------------------------------------------------------
-- Default Author
------------------------------------------------------------

INSERT INTO author (
    author_id,
    gender,
    birth_date,
    death_date
)
VALUES (
    1,
    'unknown',
    NULL,
    NULL
);

------------------------------------------------------------
-- Default Translation (English)
------------------------------------------------------------

INSERT INTO author_translation (
    author_id,
    language_code,
    name,
    biography,
    nationality,
    birth_place
)
VALUES (
    1,
    'en',
    'Unknown Author',
    'Default author record used when author information is unavailable.',
    'Unknown',
    'Unknown'
);

COMMIT;