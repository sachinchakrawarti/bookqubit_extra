-- =============================================
-- Indexes for: academic_books table
-- Description: Performance optimization for academic book queries
-- =============================================

-- =============================================
-- 1. PRIMARY KEY & UNIQUE INDEXES
-- =============================================

-- Primary key is automatically indexed
-- PRIMARY KEY (id)

-- Unique indexes for identifiers
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_books_isbn ON academic_books(isbn);
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_books_isbn10 ON academic_books(isbn10);
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_books_doi ON academic_books(doi);

-- =============================================
-- 2. BASIC SEARCH INDEXES
-- =============================================

-- Title search (most common query)
CREATE INDEX IF NOT EXISTS idx_academic_books_title ON academic_books(title);

-- Publication year queries
CREATE INDEX IF NOT EXISTS idx_academic_books_publication_year ON academic_books(publication_year);

-- Edition and volume queries
CREATE INDEX IF NOT EXISTS idx_academic_books_edition ON academic_books(edition);
CREATE INDEX IF NOT EXISTS idx_academic_books_volume ON academic_books(volume);

-- Series queries
CREATE INDEX IF NOT EXISTS idx_academic_books_series ON academic_books(series);

-- =============================================
-- 3. FOREIGN KEY INDEXES
-- =============================================

-- Language lookups
CREATE INDEX IF NOT EXISTS idx_academic_books_language_id ON academic_books(language_id);

-- Publisher lookups
CREATE INDEX IF NOT EXISTS idx_academic_books_publisher_id ON academic_books(publisher_id);

-- =============================================
-- 4. STATUS & FILTER INDEXES
-- =============================================

-- Active status filtering
CREATE INDEX IF NOT EXISTS idx_academic_books_is_active ON academic_books(is_active);

-- Sort order for listing
CREATE INDEX IF NOT EXISTS idx_academic_books_sort_order ON academic_books(sort_order);

-- =============================================
-- 5. COMPOSITE INDEXES
-- =============================================

-- Combined active + year for filtering
CREATE INDEX IF NOT EXISTS idx_academic_books_active_year ON academic_books(is_active, publication_year);

-- Combined active + title for listing
CREATE INDEX IF NOT EXISTS idx_academic_books_active_title ON academic_books(is_active, title);

-- Combined language + year for language-specific queries
CREATE INDEX IF NOT EXISTS idx_academic_books_lang_year ON academic_books(language_id, publication_year);

-- Combined publisher + year for publisher-specific queries
CREATE INDEX IF NOT EXISTS idx_academic_books_publisher_year ON academic_books(publisher_id, publication_year);

-- =============================================
-- 6. TEXT SEARCH INDEXES (FTS)
-- =============================================

-- Full-text search for academic books
CREATE VIRTUAL TABLE IF NOT EXISTS academic_books_fts USING fts5(
    title,
    subtitle,
    abstract,
    keywords,
    content='academic_books',
    content_rowid='id'
);

-- =============================================
-- 7. FTS SYNC TRIGGERS
-- =============================================

CREATE TRIGGER IF NOT EXISTS tr_academic_books_fts_insert AFTER INSERT ON academic_books
BEGIN
    INSERT INTO academic_books_fts(rowid, title, subtitle, abstract, keywords)
    VALUES (new.id, new.title, new.subtitle, new.abstract, new.keywords);
END;

CREATE TRIGGER IF NOT EXISTS tr_academic_books_fts_update AFTER UPDATE ON academic_books
BEGIN
    UPDATE academic_books_fts
    SET title = new.title,
        subtitle = new.subtitle,
        abstract = new.abstract,
        keywords = new.keywords
    WHERE rowid = new.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_academic_books_fts_delete AFTER DELETE ON academic_books
BEGIN
    DELETE FROM academic_books_fts WHERE rowid = old.id;
END;