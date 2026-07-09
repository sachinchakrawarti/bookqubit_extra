-- =============================================
-- Foreign Keys for: academic_subjects table
-- Description: Define relationships for academic subjects
-- =============================================

-- =============================================
-- 1. ACADEMIC SUBJECTS SELF-REFERENCING FOREIGN KEY
-- =============================================

-- 1.1 Self-referencing foreign key for subject hierarchy
ALTER TABLE academic_subjects ADD CONSTRAINT fk_academic_subjects_parent_id 
    FOREIGN KEY (parent_id) 
    REFERENCES academic_subjects(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- =============================================
-- 2. ACADEMIC BOOK SUBJECTS FOREIGN KEYS
-- =============================================

-- These are already defined in 01.academic_books.foreign_keys.sql
-- Included here for completeness

-- 2.1 Foreign key from academic_book_subjects to academic_books
-- ALTER TABLE academic_book_subjects ADD CONSTRAINT fk_academic_book_subjects_book_id 
--     FOREIGN KEY (book_id) 
--     REFERENCES academic_books(id) 
--     ON DELETE CASCADE 
--     ON UPDATE CASCADE;

-- 2.2 Foreign key from academic_book_subjects to academic_subjects
-- ALTER TABLE academic_book_subjects ADD CONSTRAINT fk_academic_book_subjects_subject_id 
--     FOREIGN KEY (subject_id) 
--     REFERENCES academic_subjects(id) 
--     ON DELETE CASCADE 
--     ON UPDATE CASCADE;

-- =============================================
-- 3. VALIDATION TRIGGERS FOR SUBJECT HIERARCHY
-- =============================================

-- 3.1 Trigger to prevent circular references
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_prevent_circular_fk
BEFORE INSERT ON academic_subjects
BEGIN
    SELECT CASE
        WHEN NEW.parent_id IS NOT NULL AND 
             EXISTS (
                WITH RECURSIVE ancestors AS (
                    SELECT parent_id FROM academic_subjects WHERE id = NEW.parent_id
                    UNION ALL
                    SELECT s.parent_id FROM academic_subjects s
                    INNER JOIN ancestors a ON s.id = a.parent_id
                    WHERE s.parent_id IS NOT NULL
                )
                SELECT 1 FROM ancestors WHERE parent_id = NEW.id
             )
        THEN RAISE(ABORT, 'Circular reference detected in subject hierarchy')
    END;
END;

-- 3.2 Trigger to validate parent exists before insert
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_validate_parent_fk
BEFORE INSERT ON academic_subjects
BEGIN
    SELECT CASE
        WHEN NEW.parent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM academic_subjects WHERE id = NEW.parent_id)
        THEN RAISE(ABORT, 'Parent subject does not exist')
    END;
END;

-- 3.3 Trigger to prevent deleting subject with children
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_prevent_delete_children
BEFORE DELETE ON academic_subjects
BEGIN
    SELECT CASE
        WHEN EXISTS (SELECT 1 FROM academic_subjects WHERE parent_id = OLD.id)
        THEN RAISE(ABORT, 'Cannot delete subject with children')
    END;
END;

-- 3.4 Trigger to update child levels when parent changes
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_update_child_levels
AFTER UPDATE ON academic_subjects
WHEN NEW.parent_id != OLD.parent_id
BEGIN
    UPDATE academic_subjects
    SET level = (
        WITH RECURSIVE parent_level AS (
            SELECT id, 0 as level FROM academic_subjects WHERE id = NEW.id
            UNION ALL
            SELECT s.id, pl.level + 1 FROM academic_subjects s
            INNER JOIN parent_level pl ON s.parent_id = pl.id
        )
        SELECT level FROM parent_level WHERE id = academic_subjects.id
    )
    WHERE parent_id = NEW.id;
END;