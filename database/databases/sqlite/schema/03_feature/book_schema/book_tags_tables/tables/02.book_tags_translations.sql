CREATE TABLE IF NOT EXISTS book_tags_translations
(
    translation_id      INTEGER PRIMARY KEY AUTOINCREMENT,

    tag_id              INTEGER NOT NULL,

    language_code       TEXT NOT NULL,

    tag_name            TEXT NOT NULL,

    short_name          TEXT,

    description         TEXT,

    seo_title           TEXT,

    seo_description     TEXT,

    created_at          TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at          TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(tag_id, language_code),

    FOREIGN KEY(tag_id)
        REFERENCES book_tags(tag_id)
        ON DELETE CASCADE
);