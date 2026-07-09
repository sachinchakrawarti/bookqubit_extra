-- =============================================
-- Table: book_tags
-- Description: Junction table for book-tag relationships
-- Dependencies: tags, book_schema (books)
-- =============================================

CREATE TABLE IF NOT EXISTS book_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    is_primary BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book_id, tag_id)
);

-- Indexes for book_tags table
CREATE INDEX IF NOT EXISTS idx_book_tags_book_id ON book_tags(book_id);
CREATE INDEX IF NOT EXISTS idx_book_tags_tag_id ON book_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_book_tags_is_primary ON book_tags(is_primary);