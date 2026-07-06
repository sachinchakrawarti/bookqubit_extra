-- ============================================================================
-- File       : 08.author.view.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Reusable views for the Author module.
-- ============================================================================

------------------------------------------------------------
-- View: author_details
------------------------------------------------------------

CREATE VIEW IF NOT EXISTS author_details AS
SELECT
    a.author_id,
    a.gender,
    a.birth_date,
    a.death_date,

    t.language_code,
    t.name,
    t.biography,
    t.nationality,
    t.birth_place

FROM author a
LEFT JOIN author_translation t
    ON a.author_id = t.author_id;


------------------------------------------------------------
-- View: active_authors
------------------------------------------------------------

CREATE VIEW IF NOT EXISTS active_authors AS
SELECT *
FROM author_details
WHERE death_date IS NULL;