-- =============================================
-- Foreign Keys for: book_tags table
-- Purpose: Define relationships with books and tags
-- =============================================

-- 1. Foreign key to books table (from book_schema)
-- book_tags.book_id → books.id
ALTER TABLE book_tags ADD CONSTRAINT fk_book_tags_book_id 
    FOREIGN KEY (book_id) 
    REFERENCES books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 2. Foreign key to tags table
-- book_tags.tag_id → tags.id
ALTER TABLE book_tags ADD CONSTRAINT fk_book_tags_tag_id 
    FOREIGN KEY (tag_id) 
    REFERENCES tags(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 3. Foreign key to users table (creator)
-- book_tags.created_by → users.id
ALTER TABLE book_tags ADD CONSTRAINT fk_book_tags_created_by 
    FOREIGN KEY (created_by) 
    REFERENCES users(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 4. Composite foreign key (if needed)
-- This ensures book and tag combination is valid
-- Handled by individual foreign keys above