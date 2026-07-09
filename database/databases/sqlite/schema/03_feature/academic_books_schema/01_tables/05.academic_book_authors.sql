-- =============================================
-- Table: academic_book_authors
-- Description: Junction table for book-author relationships
-- Dependencies: academic_books, academic_authors
-- =============================================

CREATE TABLE IF NOT EXISTS academic_book_authors (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Foreign Keys
    book_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    
    -- Metadata
    author_order INTEGER DEFAULT 0,
    is_corresponding BOOLEAN DEFAULT 0,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(book_id, author_id),
    
    -- Foreign Keys
    FOREIGN KEY (book_id) REFERENCES academic_books(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES academic_authors(id) ON DELETE CASCADE
);

-- =============================================
-- Indexes for academic_book_authors
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_book_authors_book_id ON academic_book_authors(book_id);
CREATE INDEX IF NOT EXISTS idx_academic_book_authors_author_id ON academic_book_authors(author_id);
CREATE INDEX IF NOT EXISTS idx_academic_book_authors_author_order ON academic_book_authors(author_order);
CREATE INDEX IF NOT EXISTS idx_academic_book_authors_is_corresponding ON academic_book_authors(is_corresponding);