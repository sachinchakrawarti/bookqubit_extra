PRAGMA foreign_keys = ON;

-- ==========================================================
-- Table: book_tags
-- Description: Master list of tags used for books.
-- ==========================================================

CREATE TABLE IF NOT EXISTS book_tags
(
    tag_id              INTEGER PRIMARY KEY AUTOINCREMENT,

    tag_code            TEXT NOT NULL UNIQUE,
    slug                TEXT NOT NULL UNIQUE,

    parent_tag_id       INTEGER,

    icon                TEXT,
    color               TEXT,

    sort_order          INTEGER DEFAULT 0,

    is_system           INTEGER NOT NULL DEFAULT 0
                        CHECK(is_system IN (0,1)),

    is_featured         INTEGER NOT NULL DEFAULT 0
                        CHECK(is_featured IN (0,1)),

    is_active           INTEGER NOT NULL DEFAULT 1
                        CHECK(is_active IN (0,1)),

    created_at          TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(parent_tag_id)
        REFERENCES book_tags(tag_id)
        ON DELETE SET NULL
);