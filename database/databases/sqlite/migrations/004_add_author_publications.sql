-- ============================================
-- MIGRATION: 004_add_author_publications
-- Description: Add author-publication relationships
-- Date: 2024-01-04
-- ============================================

-- ============================================
-- 1. AUTHOR_PUBLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS author_publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    publication_id INTEGER NOT NULL,
    role TEXT, -- author, editor, contributor, consultant
    contract_start DATE,
    contract_end DATE,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE CASCADE,
    UNIQUE(author_id, publication_id)
);

-- ============================================
-- 2. AUTHOR_BOOKS VIEW (Virtual)
-- ============================================
-- Note: SQLite doesn't support views in migrations easily
-- This is for reference only
-- CREATE VIEW author_books AS
-- SELECT a.id as author_id, a.name as author_name, 
--        b.id as book_id, b.title as book_title, b.slug
-- FROM authors a
-- JOIN books b ON a.id = b.author_id
-- WHERE a.is_active = 1 AND b.status = 'published';

-- ============================================
-- 3. AUTHOR_STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS author_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    total_books_published INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    monthly_sales INTEGER DEFAULT 0,
    yearly_sales INTEGER DEFAULT 0,
    last_published_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    UNIQUE(author_id)
);