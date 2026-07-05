-- ============================================================================
-- File       : insert.author.sql
-- Module     : Author
-- Database   : SQLite
-- Description: Insert a new author with related data.
-- ============================================================================

BEGIN TRANSACTION;

------------------------------------------------------------
-- Author
------------------------------------------------------------

INSERT INTO author (
    gender,
    birth_date,
    death_date
)
VALUES (
    ?,
    ?,
    ?
);

------------------------------------------------------------
-- Author Translation
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
    last_insert_rowid(),
    ?,
    ?,
    ?,
    ?,          
    ?
);

COMMIT;