-- =============================================
-- Table: academic_book_subjects
-- Description: Junction table for book-subject relationships
-- Dependencies: academic_books, academic_subjects
-- =============================================

CREATE TABLE IF NOT EXISTS academic_book_subjects (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Foreign Keys
    book_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    
    -- Metadata
    is_primary BOOLEAN DEFAULT 0,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(book_id, subject_id),
    
    -- Foreign Keys
    FOREIGN KEY (book_id) REFERENCES academic_books(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES academic_subjects(id) ON DELETE CASCADE
);

-- =============================================
-- Indexes for academic_book_subjects
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_book_subjects_book_id ON academic_book_subjects(book_id);
CREATE INDEX IF NOT EXISTS idx_academic_book_subjects_subject_id ON academic_book_subjects(subject_id);
CREATE INDEX IF NOT EXISTS idx_academic_book_subjects_is_primary ON academic_book_subjects(is_primary);