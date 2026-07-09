-- =============================================
-- Table: academic_translations
-- Description: Translations for academic books
-- Dependencies: academic_books, language_schema (languages)
-- =============================================

CREATE TABLE IF NOT EXISTS academic_translations (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Foreign Keys
    book_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    
    -- Translated Content
    title VARCHAR(500) NOT NULL,
    subtitle VARCHAR(500),
    abstract TEXT,
    keywords TEXT,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(book_id, language_id),
    
    -- Foreign Keys
    FOREIGN KEY (book_id) REFERENCES academic_books(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
);

-- =============================================
-- Indexes for academic_translations
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_translations_book_id ON academic_translations(book_id);
CREATE INDEX IF NOT EXISTS idx_academic_translations_language_id ON academic_translations(language_id);
CREATE INDEX IF NOT EXISTS idx_academic_translations_title ON academic_translations(title);