-- =============================================
-- Table: academic_books
-- Description: Core academic book information
-- Dependencies: language_schema (languages), geography_schema (countries)
-- =============================================

CREATE TABLE IF NOT EXISTS academic_books (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Basic Information
    title VARCHAR(500) NOT NULL,
    subtitle VARCHAR(500),
    series VARCHAR(200),
    volume INTEGER,
    edition VARCHAR(50),
    publication_year INTEGER,
    
    -- Identifiers
    isbn VARCHAR(13) UNIQUE,
    isbn10 VARCHAR(10),
    doi VARCHAR(100) UNIQUE,
    
    -- Content
    abstract TEXT,
    keywords TEXT,
    pages INTEGER,
    
    -- Foreign Keys
    language_id INTEGER,
    publisher_id INTEGER,
    
    -- Pricing
    price DECIMAL(10,2),
    currency_code VARCHAR(3),
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Indexes for academic_books
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_books_title ON academic_books(title);
CREATE INDEX IF NOT EXISTS idx_academic_books_isbn ON academic_books(isbn);
CREATE INDEX IF NOT EXISTS idx_academic_books_doi ON academic_books(doi);
CREATE INDEX IF NOT EXISTS idx_academic_books_publication_year ON academic_books(publication_year);
CREATE INDEX IF NOT EXISTS idx_academic_books_language_id ON academic_books(language_id);
CREATE INDEX IF NOT EXISTS idx_academic_books_publisher_id ON academic_books(publisher_id);
CREATE INDEX IF NOT EXISTS idx_academic_books_is_active ON academic_books(is_active);

-- =============================================
-- Foreign Keys
-- =============================================

-- Foreign key to languages table
ALTER TABLE academic_books ADD CONSTRAINT fk_academic_books_language_id 
    FOREIGN KEY (language_id) 
    REFERENCES languages(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- Foreign key to academic_publishers table
ALTER TABLE academic_books ADD CONSTRAINT fk_academic_books_publisher_id 
    FOREIGN KEY (publisher_id) 
    REFERENCES academic_publishers(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;