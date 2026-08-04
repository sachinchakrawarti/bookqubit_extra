CREATE TABLE language_transliterations (
    id                              INTEGER PRIMARY KEY AUTOINCREMENT,
    language_id                     INTEGER NOT NULL,
    transliteration_language_id     INTEGER NOT NULL,
    transliterated_name             VARCHAR(150) NOT NULL,
    created_at                      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (language_id)
        REFERENCES languages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (transliteration_language_id)
        REFERENCES languages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    UNIQUE (language_id, transliteration_language_id)
);