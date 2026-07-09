-- =============================================
-- Constraints for: academic_subjects table
-- Description: Data integrity rules for academic subjects
-- =============================================

-- =============================================
-- 1. NOT NULL CONSTRAINTS
-- =============================================

ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_name_not_null 
    CHECK (name IS NOT NULL AND length(trim(name)) > 0);

-- =============================================
-- 2. CHECK CONSTRAINTS FOR DATA VALIDATION
-- =============================================

-- 2.1 Name length validation
ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_name_length 
    CHECK (length(trim(name)) >= 2 AND length(trim(name)) <= 200);

-- 2.2 Code length validation
ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_code_length 
    CHECK (code IS NULL OR length(trim(code)) >= 1 AND length(trim(code)) <= 50);

-- 2.3 Level must be positive
ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_level_positive 
    CHECK (level >= 1);

-- 2.4 Sort order must be non-negative
ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_sort_order_positive 
    CHECK (sort_order >= 0);

-- 2.5 Code format validation
ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_code_format 
    CHECK (code IS NULL OR code GLOB '[A-Z0-9]*');

-- =============================================
-- 3. UNIQUE CONSTRAINTS (already defined in table)
-- =============================================

-- UNIQUE(code)

-- =============================================
-- 4. BOOLEAN VALIDATION
-- =============================================

ALTER TABLE academic_subjects ADD CONSTRAINT ck_academic_subjects_is_active_boolean 
    CHECK (is_active IN (0, 1));

-- =============================================
-- 5. FOREIGN KEY VALIDATION TRIGGERS
-- =============================================

-- 5.1 Prevent circular references in hierarchy
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_prevent_circular
BEFORE INSERT ON academic_subjects
BEGIN
    SELECT CASE
        WHEN NEW.parent_id = NEW.id
        THEN RAISE(ABORT, 'Subject cannot reference itself')
    END;
END;

-- 5.2 Validate parent exists and is active
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_validate_parent
BEFORE INSERT ON academic_subjects
BEGIN
    SELECT CASE
        WHEN NEW.parent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM academic_subjects WHERE id = NEW.parent_id AND is_active = 1)
        THEN RAISE(ABORT, 'Invalid or inactive parent subject')
    END;
END;

-- 5.3 Prevent circular references on update
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_prevent_circular_update
BEFORE UPDATE ON academic_subjects
WHEN NEW.parent_id != OLD.parent_id
BEGIN
    SELECT CASE
        WHEN NEW.parent_id = NEW.id
        THEN RAISE(ABORT, 'Subject cannot reference itself')
    END;
    
    SELECT CASE
        WHEN NEW.parent_id IS NOT NULL AND 
             NOT EXISTS (SELECT 1 FROM academic_subjects WHERE id = NEW.parent_id AND is_active = 1)
        THEN RAISE(ABORT, 'Invalid or inactive parent subject')
    END;
END;

-- =============================================
-- 6. HIERARCHY VALIDATION FUNCTIONS
-- =============================================

-- 6.1 Function to check if subject has children
CREATE FUNCTION IF NOT EXISTS has_academic_subject_children(subject_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN EXISTS (SELECT 1 FROM academic_subjects WHERE parent_id = subject_id AND is_active = 1);
END;

-- 6.2 Function to get subject depth
CREATE FUNCTION IF NOT EXISTS get_academic_subject_depth(subject_id INTEGER)
RETURNS INTEGER
BEGIN
    DECLARE depth INTEGER DEFAULT 0;
    DECLARE current_id INTEGER;
    
    SET current_id = subject_id;
    
    WHILE current_id IS NOT NULL DO
        SET current_id = (SELECT parent_id FROM academic_subjects WHERE id = current_id);
        SET depth = depth + 1;
    END WHILE;
    
    RETURN depth - 1;
END;

-- 6.3 Function to check if subject is leaf
CREATE FUNCTION IF NOT EXISTS is_academic_subject_leaf(subject_id INTEGER)
RETURNS BOOLEAN
BEGIN
    RETURN NOT EXISTS (SELECT 1 FROM academic_subjects WHERE parent_id = subject_id AND is_active = 1);
END;

-- 6.4 Function to get subject path
CREATE FUNCTION IF NOT EXISTS get_academic_subject_path(subject_id INTEGER)
RETURNS TEXT
BEGIN
    WITH RECURSIVE path_cte AS (
        SELECT id, name, parent_id, name as path
        FROM academic_subjects
        WHERE id = subject_id
        
        UNION ALL
        
        SELECT s.id, s.name, s.parent_id, s.name || ' → ' || p.path
        FROM academic_subjects s
        INNER JOIN path_cte p ON s.id = p.parent_id
        WHERE s.parent_id IS NOT NULL
    )
    SELECT path FROM path_cte ORDER BY level DESC LIMIT 1;
    RETURN (SELECT path FROM path_cte ORDER BY level DESC LIMIT 1);
END;