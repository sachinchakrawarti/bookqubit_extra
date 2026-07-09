-- =============================================
-- Table: academic_reviews
-- Description: Academic book reviews
-- Dependencies: academic_books
-- =============================================

CREATE TABLE IF NOT EXISTS academic_reviews (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Foreign Key
    book_id INTEGER NOT NULL,
    
    -- Reviewer Information
    reviewer_name VARCHAR(200),
    reviewer_institution VARCHAR(255),
    
    -- Review Content
    rating INTEGER DEFAULT 0,
    review_text TEXT,
    
    -- Status
    is_public BOOLEAN DEFAULT 1,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key
    FOREIGN KEY (book_id) REFERENCES academic_books(id) ON DELETE CASCADE
);

-- =============================================
-- Indexes for academic_reviews
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_reviews_book_id ON academic_reviews(book_id);
CREATE INDEX IF NOT EXISTS idx_academic_reviews_rating ON academic_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_academic_reviews_is_public ON academic_reviews(is_public);
CREATE INDEX IF NOT EXISTS idx_academic_reviews_created_at ON academic_reviews(created_at);