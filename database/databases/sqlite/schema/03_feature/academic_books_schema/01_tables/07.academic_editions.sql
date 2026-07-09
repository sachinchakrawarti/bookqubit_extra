-- =============================================
-- Table: academic_editions
-- Description: Book editions information
-- Dependencies: academic_books
-- =============================================

CREATE TABLE IF NOT EXISTS academic_editions (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Foreign Key
    book_id INTEGER NOT NULL,
    
    -- Edition Information
    edition_number INTEGER NOT NULL,
    edition_name VARCHAR(100),
    publication_year INTEGER,
    
    -- Identifiers
    isbn VARCHAR(13),
    
    -- Physical Details
    pages INTEGER,
    price DECIMAL(10,2),
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key
    FOREIGN KEY (book_id) REFERENCES academic_books(id) ON DELETE CASCADE
);

-- =============================================
-- Indexes for academic_editions
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_editions_book_id ON academic_editions(book_id);
CREATE INDEX IF NOT EXISTS idx_academic_editions_edition_number ON academic_editions(edition_number);
CREATE INDEX IF NOT EXISTS idx_academic_editions_isbn ON academic_editions(isbn);
CREATE INDEX IF NOT EXISTS idx_academic_editions_is_active ON academic_editions(is_active);