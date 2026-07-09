-- =============================================
-- Indexes for: book_tags table
-- Purpose: Optimize book-tag relationship queries
-- =============================================

-- Primary key index (automatically created)
-- PRIMARY KEY (id)

-- 1. Unique composite index on book_id + tag_id (prevents duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS idx_book_tags_book_tag ON book_tags(book_id, tag_id);

-- 2. Index on book_id (for fetching tags of a book)
CREATE INDEX IF NOT EXISTS idx_book_tags_book_id ON book_tags(book_id);

-- 3. Index on tag_id (for fetching books of a tag)
CREATE INDEX IF NOT EXISTS idx_book_tags_tag_id ON book_tags(tag_id);

-- 4. Index on is_primary (for filtering primary tags)
CREATE INDEX IF NOT EXISTS idx_book_tags_is_primary ON book_tags(is_primary);

-- 5. Composite index on book_id + is_primary (for fetching primary tags of a book)
CREATE INDEX IF NOT EXISTS idx_book_tags_book_primary ON book_tags(book_id, is_primary);

-- 6. Composite index on tag_id + is_primary (for fetching primary books of a tag)
CREATE INDEX IF NOT EXISTS idx_book_tags_tag_primary ON book_tags(tag_id, is_primary);

-- 7. Index on created_at (for time-based queries)
CREATE INDEX IF NOT EXISTS idx_book_tags_created_at ON book_tags(created_at);

-- 8. Composite index on book_id + tag_id + is_primary (covering index)
CREATE INDEX IF NOT EXISTS idx_book_tags_book_tag_primary ON book_tags(book_id, tag_id, is_primary);