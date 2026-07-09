-- =============================================
-- Constraints for: book_tags table
-- Purpose: Data integrity rules for book-tag relationships
-- =============================================

-- 1. Primary Key constraint (automatically created with INTEGER PRIMARY KEY)
-- PRIMARY KEY (id)

-- 2. NOT NULL constraints
ALTER TABLE book_tags ADD CONSTRAINT ck_book_tags_book_id_not_null 
    CHECK (book_id IS NOT NULL);

ALTER TABLE book_tags ADD CONSTRAINT ck_book_tags_tag_id_not_null 
    CHECK (tag_id IS NOT NULL);

-- 3. Unique constraints (already defined in table)
-- UNIQUE(book_id, tag_id)

-- 4. Check constraints for data validation

-- 4.1. is_primary must be 0 or 1 (BOOLEAN)
ALTER TABLE book_tags ADD CONSTRAINT ck_book_tags_is_primary_boolean 
    CHECK (is_primary IN (0, 1));

-- 4.2. Book must exist (handled by foreign key)
-- FOREIGN KEY (book_id) REFERENCES books(id)

-- 4.3. Tag must exist and be active (handled by foreign key)
-- FOREIGN KEY (tag_id) REFERENCES tags(id)

-- 4.4. Ensure only one primary tag per book (enforced by trigger or application)
-- This is a business rule: each book should have only one primary tag
-- Can be enforced using a partial unique index

-- 4.5. Prevent duplicate book-tag pairs (already defined)
-- UNIQUE(book_id, tag_id) ensures no duplicates

-- 4.6. Check if tag is active (can be enforced with trigger)
-- This ensures inactive tags are not assigned to books